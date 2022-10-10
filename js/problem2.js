const startCounter = document.querySelector('#start-counter');
const stopCounter = document.querySelector('#stop-counter');
const counter = document.querySelector('#counter');
let count = 0;
let intervalId = null;

// Some of this is already taken care of, when you click "start counter",
// the counter starts.
// @todo
//  1.  when startCounter is clicked:
//     - its disabled attribute should be "true"
//     - stopCounter's disabled attribute should be removed.
//  2.  when stopCounter is clicked
//     - its disabled attribute should be "true"
//     - startCounter's disabled attribute should be removed.
//     - the counter should stop by clearing the interval
//
//  In other words, the start button shouldn't be clickable if the counter is
//  already counting, and the stop button shouldn't be clickable if the counter
//  is already stopped. Plus and you'll need to make the counter stop when the
//  stop button is clicked.

// The solution for this should not require more than 10 additional lines of code.


startCounter.addEventListener('click', () => {
    // Starting the counter is provided for you.
    intervalId = setInterval(() => {
        count++;
        counter.textContent = count;
    }, 500);
})

stopCounter.addEventListener('click', () => {

});
