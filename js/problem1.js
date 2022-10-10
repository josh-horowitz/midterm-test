const linkList = document.querySelector('#link-list');
const linkOutput = document.querySelector('#link-output');


// We've already set it up so when we click the links the URLs/href 
// attribute show up in linkOutput.
// However, clicking the links also take you to the page that is linked to....
// @todo, clicking a link should not take us to a new page. 
//    this only requires one additional line somewhere in this file.

linkList.addEventListener('click', (e) => {
    linkOutput.innerHTML = e.target.getAttribute('href');
})