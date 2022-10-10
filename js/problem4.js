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

const summarizeButton = document.querySelector('#summarize-paragraphs');
const summarizedContainer = document.querySelector('#summarized-container');

// @todo, when summarizeButton is clicked, it should go through each item in 
// the `paragraphs` array above, limit it to 80 characters, add an `...` at the end
// and insert the shortened string inside a `<p></p>` within summarizedContainer.

// In the solution, 3 lines of code are added. It's fine if your solution requires a
// bit more, but be aware if it is possible.