/**
 * Gets the number of words in a sentence.
 *
 * @param {string} sentence
 *   Usually a sentence, but could be a single word or empty string
 * @returns {number}
 */
 function numberOfWords(sentence) {
    if(sentence.length === 0) {
        return 0;
    }
    return sentence.split(' ').filter(String).length;
}

/**
 * Checks if a number is even.
 *
 * @param {number}number
 *   A number to check
 * @returns {boolean}
 *   True if the number is even, otherwise false.
 */
function isEvenNumber(number) {
    return (number % 2 === 0);
}

const evenOddInput = document.querySelector('#evenodd-input');
const evenOddFeedback = document.querySelector('#evenodd-feedback');

function messageInput() {
    const wordCount = numberOfWords(evenOddInput.value);
    const isEven = isEvenNumber(wordCount);
    // @todo 👆 notice above we are already checking if the number of words typed
    // into evenOddInput is even or odd. You need to make several changes based on
    // isEven being true or false.

    // WHEN THE NUMBER OF WORDS IS EVEN:
    // - any *-odd classes are removed from evenOddFeedback and evenOddInput
    // - evenOddFeedback gets the feedback-even class
    // - evenOddInput gets the input-even class
    // WHEN THE NUMBER OF WORDS IS ODD:
    // - any *-even classes are removed from evenOddFeedback and evenOddInput
    // - evenOddFeedback gets the feedback-odd class
    // - evenOddInput gets the input-odd class
    /** UPDATING FEEDBACK STATUS: */
    // - When the number of words is 0, evenOddFeedback should say "No words"
    // - When the number of words is 1, evenOddFeedback should say "One word"
    // - Number of words more than 1: "An even number of words" or "An odd number of words",
    //   depending on the number of words being odd/even.
    /** THIS ALSO NEEDS TO BE INVOKED AS SOON AS THE PAGE LOADS */
    // In addition to happening every time you type, this should happen
    // on page load so the default message is assessed and the display & classes
    // reflect the fact that it is an odd number of words.

    // Solution in the answer key is an additional (kind of repetitive) 39 lines of code,
    // If your solution is significantly more or less you may be doing something
    // incorrectly.
}

evenOddInput.addEventListener("input", messageInput);
