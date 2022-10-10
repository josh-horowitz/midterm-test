// Monitor console warnings, errors, and logs
let consoleError;
let consoleWarning;
let consoleLog;


Cypress.on('window:before:load', (win) => {
  consoleError = cy.spy(win.console, 'error');
  consoleWarning = cy.spy(win.console, 'warn');
  consoleLog = cy.spy(win.console, 'log');
});
const DELAY = 1000;


describe('Test all', function() {
  beforeEach(function() {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test.
    cy.visit(`http://localhost:${Cypress.env('theport') || 8080}`)

    cy.fixture('events.json').then((json) => {
      this.events = json.map((e) => [e.event_title, e.date_start])
    })
    cy.intercept('GET', 'https://events.umich.edu/day/json?v=2', (req) => {
      // wait before return to allow us to check for 'waiting...' consistently
      req.on('response', (res) => {
        res.setDelay(1000)
      })
      req.reply({
        fixture: 'events.json'
      })
    }).as('event')
  })

  it('has a title so we know tests work in general', () => {
    cy.get('h1').should('include.text', 'Midterm 1')
    cy.get('main').should('include.text', 'What the bleep')
  })
  let followedLink
  it('problem 1', () => {
    const links = [
      {selector:'#link-list a:first-child', alias: 'umsi', text: 'UMSI Site,', url: 'https://si.umich.edu'},
      {selector:'#link-list a:nth-child(2)', alias: 'mdn', text: 'MDN Docs,', url: 'https://developer.mozilla.org/en-US/'},
      {selector:'#link-list a:nth-child(3)', alias: 'wtfjs', text: 'What the bleep JavaScript', url: 'https://github.com/denysdovhan/wtfjs'},
    ];
    let linkName;
    cy.document().then((doc) => {
      doc.querySelector('#link-list').addEventListener('click', (e) => {
        if(!e.defaultPrevented) {
          throw new Error(`Clicking on the link ${linkName} in #link-list should not change the page!`)
        }
      })
    })

    links.forEach((link) => {
      cy.get(link.selector).invoke('text').then((text)=> linkName = text)
      cy.get(link.selector).click().should('contain.text', link.text).should('have.attr', 'href', link.url);
      cy.get('#link-output').should(($linkOutput) => {
        expect($linkOutput.text()).to.equal(link.url, `Clicking ${link.text} should result in #link-output displaying ${link.url}`)
      });
    })
  })

  it('problem 2', () => {
    cy.get('#start-counter').invoke('attr', 'disabled').then((attr) => {
      expect(attr).to.equal(undefined, 'The start button begins enabled')
    }) 
    cy.get('#stop-counter').invoke('attr', 'disabled').then((attr) => {
      expect(attr).to.equal('disabled', 'The stop button begins disabled')
    })
    cy.get('#counter').should(($counter) => {
      expect($counter.text()).to.equal('', 'The counter begins blank');
    })

    cy.get('#start-counter').click().then(() => {
      cy.get('#start-counter').invoke('attr', 'disabled').then((attr) => {
        expect(attr).to.equal('disabled', 'The start button should be disabled after clicking start')
      })
      cy.get('#stop-counter').invoke('attr', 'disabled').then((attr) => {
        expect(attr).to.equal(undefined, 'The stop button should be enabled after clicking start')
      })
    })

    cy.wait(750).then( () => {
      cy.get('#counter').invoke('text').then((text) => {
        cy.wrap(text).as('start')
      })
      cy.wait(1750).then(() => {
        cy.get('#counter').invoke('text').then((text) => {
          cy.wrap(text).as('end')
        })
      })
    })
    cy.get('@start').then((start) => {
      cy.get('@end').then((end) => {
        expect(start).to.not.equal(end, 'counter should start after clicking start')
        expect(parseInt(start, 10)).to.be.lessThan(parseInt(end, 10), 'counter end number should be greater than counter start number')
      })
    })

    cy.get('#stop-counter').click().then(() => {
      cy.get('#start-counter').invoke('attr', 'disabled').then((attr) => {
        expect(attr).to.equal(undefined, 'The start button should be enabled after clicking stop')
      })
      cy.get('#stop-counter').invoke('attr', 'disabled').then((attr) => {
        expect(attr).to.equal('disabled', 'The stop button should be disabled after clicking stop')
      })
    })

    cy.wait(750).then( () => {
      cy.get('#counter').invoke('text').then((text) => {
        cy.wrap(text).as('start_const')
      })
      cy.wait(750).then(() => {
        cy.get('#counter').invoke('text').then((text) => {
          cy.wrap(text).as('end_const')
        })
      })
    })
    cy.get('@start_const').then((start) => {
      cy.get('@end_const').then((end) => {
        expect(start).to.equal(end, 'counter should stop after clicking stop')
      })
    })
  })

  it('problem 3', () => {
    const evenCheckClasses = (numWords) => {
      cy.get('#evenodd-feedback').invoke('attr', 'class')
        .then((classes) => {
          expect(classes).to.contain('feedback-even', `evenodd-feedback should have class feedback-even when there are ${numWords} words in evenodd-input.`)
          expect(classes).not.to.contain('feedback-odd', `evenodd-feedback should not have class feedback-odd when there are ${numWords} words in evenodd-input.`)
        })
      cy.get('#evenodd-input').invoke('attr', 'class')
      .then((classes) => {
        expect(classes).to.contain('input-even', `evenodd-input should have class input-even when there are ${numWords} words in evenodd-input.`)
        expect(classes).not.to.contain('input-odd', `evenodd-input should not have class input-odd when there are ${numWords} words in evenodd-input.`)
      })
    }
    const oddCheckClasses = (numWords, onLoad=false) => {
      let msg1 = ''
      let msg2 = ''
      if (onLoad) {
        msg1 = 'Classes must be added to evenodd-feedback as soon as the page loads. '
        msg2 = 'Classes must be added to evenodd-input as soon as the page loads. '
      }
      cy.get('#evenodd-feedback').invoke('attr', 'class')
        .then((classes) => {
          expect(classes).to.contain('feedback-odd', `${msg1}evenodd-feedback should have class feedback-odd when there are ${numWords} words in evenodd-input.`)
          expect(classes).not.to.contain('feedback-even', `${msg1}evenodd-feedback should not have class feedback-even when there are ${numWords} words in evenodd-input.`)
        })
      cy.get('#evenodd-input').invoke('attr', 'class')
      .then((classes) => {
        expect(classes).to.contain('input-odd', `${msg2}evenodd-input should have class input-odd when there are ${numWords} words in evenodd-input.`)
        expect(classes).not.to.contain('input-even', `${msg2}evenodd-input should not have class input-even when there are ${numWords} words in evenodd-input.`)
      })
    }
    const feedbackStatusAndClassesCheck = (sentence, onLoad=false) => {
      let numWords = 0
      if(sentence.length !== 0) {
        numWords = sentence.split(' ').filter(String).length
      }
      if (onLoad) {
        cy.get('#evenodd-feedback').invoke('text').then((text) => {
          expect(text).to.equal('An odd number of words', '#evenodd-feedback should equal "An odd number of words" as soon as the page loads.')
        }).then(() => {
          oddCheckClasses(numWords, onLoad)
        })
        return
      }
      if (numWords === 0) {
        cy.get('#evenodd-feedback').invoke('text').then((text) => {
          expect(text).to.equal('No words', '#evenodd-feedback should equal "No words" when there are no words in #evenodd-input')
        }).then(() => {
          evenCheckClasses(numWords)
        })
      }
      else if (numWords === 1) {
        cy.get('#evenodd-feedback').invoke('text').then((text) => {
          expect(text).to.equal('One word', '#evenodd-feedback should equal "One word" when there is one word in #evenodd-input')
        }).then(() => {
          oddCheckClasses(numWords)
        })
      }
      else {
        // the number of words is > 1
        if (!!(numWords % 2 === 0)) {
          // an even number of words
          cy.get('#evenodd-feedback').invoke('text').then((text) => {
            expect(text).to.equal('An even number of words', '#evenodd-feedback should equal "An even number of words" when there is an even number of words in #evenodd-input')
          }).then(() => {
            evenCheckClasses(numWords)
          })
        }
        else {
          // an odd number of words
          cy.get('#evenodd-feedback').invoke('text').then((text) => {
            expect(text).to.equal('An odd number of words', '#evenodd-feedback should equal "An odd number of words" when there is an odd number of words in #evenodd-input')
          }).then(() => {
            oddCheckClasses(numWords)
          })
        }
      }
    }

    const sentences = [
      'there is just no way in heaven i am seven eleven',
      'down with the disco',
      'boogie time',
      'jennifer',
      'oh my gosh',
      'the quick brown dog jumped over the lazy fox',
      'one two three four five six seven eight nine ten eleven twelve'
    ]

    // check every sentence in sentences
    sentences.forEach((sentence) => {
      cy.get('#evenodd-input').clear().should('have.value', '')
        .then(() => {
          cy.get('#evenodd-input').type(sentence)
            .then(() => {
              feedbackStatusAndClassesCheck(sentence)
            })
        })
    })

    // check when evenodd-input is empty (0 words)
    cy.get('#evenodd-input').clear().should('have.value', '')
        .then(() => {
          feedbackStatusAndClassesCheck('')
        })

    // check as soon as the page loads
    cy.visit(`http://localhost:${Cypress.env('theport') || 8080}`)
    cy.get('#evenodd-input')
      .then(() => {
        feedbackStatusAndClassesCheck('An odd number of words', true)
      })
  })

  it('problem 4', function() {
    const paragraphs = [
      `Don't forget that gifts often come with costs that go beyond their purchase price. When you purchase a child the latest smartphone, you're also committing to a monthly phone bill. When you purchase the latest gaming system, you're likely not going to be satisfied with the games that come with it for long and want to purchase new titles to play. When you buy gifts it's important to remember that some come with additional costs down the road that can be much more expensive than the initial gift itself.`,
      `"Do Not Enter." The sign made it clear that they didn't want anyone around. That wasn't going to stop Jack. Jack always lived with the notion that signs were mere suggestions, not actually absolute rules. That's why the moment Jack looked at the "Do Not Enter" sign, he walked past it and onto their property.`,
      `He ordered his regular breakfast. Two eggs sunnyside up, hash browns, and two strips of bacon. He continued to look at the menu wondering if this would be the day he added something new. This was also part of the routine. A few seconds of hesitation to see if something else would be added to the order before demuring and saying that would be all. It was the same exact meal that he had ordered every day for the past two years.`,
      `Here's the thing. She doesn't have anything to prove, but she is going to anyway. That's just her character. She knows she doesn't have to, but she still will just to show you that she can. Doubt her more and she'll prove she can again. We all already know this and you will too.`,
      `The desert wind blew the tumbleweed in front of the car. Alex swerved to avoid the tumbleweed, but he turned the wheel a bit too strong and the car left the road and skidded onto the dirt median. He instantly slammed on the brakes and the car stopped in a cloud of dirt. When the dust cloud had settled and he could see around him again, he realized that he'd somehow crossed over into an entirely new dimension.`,
      `One dollar and eighty-seven cents. That was all. And sixty cents of it was in pennies. Pennies saved one and two at a time by bulldozing the grocer and the vegetable man and the butcher until one’s cheeks burned with the silent imputation of parsimony that such close dealing implied. One dollar and eighty-seven cents. And the next day would be Christmas`,
      `There were a variety of ways to win the game. James had played it long enough to know most of them and he could see what his opponent was trying to do. There was a simple counterattack that James could use and the game should be his. He began deploying it with the confidence of a veteran player who had been in this situation a thousand times in the past. So, it was with great surprise when his opponent used a move he had never before seen or anticipated to easily defeat him in the game.`,
      `He had three simple rules by which he lived. The first was to never eat blue food. There was nothing in nature that was edible that was blue. People often asked about blueberries, but everyone knows those are actually purple. He understood it was one of the stranger rules to live by, but it had served him well thus far in the 50+ years of his life.`,
    ]
    const shortenedParas = paragraphs.map((item) => `${item.substring(0,80)}...`)

    // check text contains nothing before button is clicked
    cy.get('#summarized-container').invoke('text')
      .then((text) => {
        expect(text.trim()).to.equal('', '#summarized-container should be empty initially')
      })
    // check does not contain the first 2 words of the first line
    cy.get('#summarized-container').should('not.contain', "Don't forget")

    // function to help format
    const nth = (num) => {
      if (num === 1) {
        return '1st'
      }
      if (num === 2) {
        return '2nd'
      }
      return `${num}th`
    }

    // check text contains correct content after button is clicked
    cy.get('#summarize-paragraphs').click()
    cy.get('#summarized-container p')
      .each(($p, index, $list) => {
        const listLen = $list.length
        const msg = nth(index+1)
        expect(listLen).to.equal(shortenedParas.length, 'The number of p tags in #summarized-container should equal the number of items in paragraphs.')
        expect($p.text().length).to.equal(shortenedParas[index].length, `Expected a length of ${shortenedParas[index].length}, but found ${$p.text().length}`)
        expect($p.text()).to.equal(shortenedParas[index], `The text in the ${msg} paragraph tag should equal the first 80 characters of the ${msg} item in paragraphs with "..." appended to the end`)
      })
  })

  it('problem 5', function() {
    function testClear() {
    cy.get('#clear-umich-events').click()
      .then(() => {
        cy.get('#events-list').invoke('text')
          .then(function(text) {
            expect(text).to.equal('', 'The html of #events-list should be reset to nothing after #clear-umich-events is clicked.')
          })
      })
    }

    // function to help format
    const nth = (num) => {
      if (num === 1) {
        return '1st'
      }
      if (num === 2) {
        return '2nd'
      }
      return `${num}th`
    }

    const testEvents = () => {
    cy.get('#show-umich-events').click()
      .then(() => {
        cy.get('#events-list').should('have.text', 'waiting...')
        cy.get('#events-list').invoke('text')
          .then(function(text) {
            expect(text).to.equal('waiting...', 'The contents of #events-list should equal "waiting..." immediately after #show-umich-events is clicked.'
            )
          })
        // wait until the stubbed api returns our fixture
        cy.wait('@event').then(function() {
          // check the student has all necesary li tags
          cy.get('#events-list li').should(($li) => {
            let texts = $li.map((i, el) => Cypress.$(el).text())
            texts = texts.get()
            expect(texts).to.have.length(this.events.length, `There should be ${this.events.length} total list item tags inside #events-list`)
          })
          // check the student has all necesary b tags
          cy.get('#events-list b').should(($b) => {
            let texts = $b.map((i, el) => Cypress.$(el).text())
            texts = texts.get()
            expect(texts).to.have.length(this.events.length, `There should be ${this.events.length} total b tags inside #events-list`)
          })
          // check content of each list item
          cy.get('#events-list li')
          .each(($li, index, $list) => {
            cy.wrap($li).invoke('text')
              .then((html) => {
                const msg = nth(index+1)
                expect(html).to.equal(`${this.events[index][0]}: ${this.events[index][1]}`,
                  `The html inside the ${msg} list item should equal "<b>${this.events[index][0]}</b>: ${this.events[index][1]}" with events fetched from the api given.`)
              })
          })
        })
      })
    }

      testClear()
      testEvents()
      testClear()
      testEvents()
  })

  afterEach(() => {
    // Confirm there are no console log/warning/errors after every test iteration.
    cy.wait(DELAY).then(() => {
      expect(consoleError, 'ERRORS FOUND IN YOUR CODE, CHECK THE JS CONSOLE').to.not.be.called;
      expect(consoleWarning).to.not.be.called;
      expect(consoleLog, 'YOU SHOULD NOT HAVE console.log() IN YOUR SUBMITTED CODE').to.not.be.called;
    });
  });
})
