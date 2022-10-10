const showUmichEventsButton = document.querySelector('#show-umich-events');
const clearUmichEventsButton = document.querySelector('#clear-umich-events');
const eventsListContainer = document.querySelector('#events-list');

// @todo 
// When showUmichEventsButton is clicked:
// - The contents of eventsListContainer should be 'waiting...' (a progress notification)
// - fetch https://events.umich.edu/day/json?v=2
// - Once you have the event listings array, eventsListContainer should
//   show each result as a list item with the following format:
//   `<li class="list-item"><b>{THE EVENT TITLE}</b>: {THE EVENT START DATE}</li>`

showUmichEventsButton.addEventListener('click', (e) => {

})


// @todo 
// When clearUmichEventsButton is clicked, the eventsListContainer should be
// cleared.
clearUmichEventsButton.addEventListener('click', () => {

})

// The answer key version of this added 11 lines of code, so that's a good range to be in.