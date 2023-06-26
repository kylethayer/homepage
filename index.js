headerText = false;
footerText = false;

headerFilled = false;
footerFilled = false;


async function loadHeaderPartial(){
    headerResult = await fetch("header_partial.html")
    headerText = await headerResult.text();
    
    fillHeaderPartials()
}

async function loadFooterPartial(){
    footerResult = await fetch("footer_partial.html")
    footerText = await footerResult.text();

    fillFooterPartials()
}

loadHeaderPartial();
loadFooterPartial();

function pageLoaded(){
    if(headerText){
        fillHeaderPartials()
    }
    if(footerText){
        fillFooterPartials()
    }
}


// code snippet based on: https://stackoverflow.com/questions/7434685/how-can-i-be-notified-when-an-element-is-added-to-the-page
const SEARCH_DELAY = 100; // in ms

// it may run indefinitely. TODO: make it cancellable, using Promise's `reject`
function getDivWhenReady(id) {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (element = document.getElementById(id)) {
        clearInterval(interval);
        resolve(element);
      }
    }, SEARCH_DELAY);
  });
}


async function fillHeaderPartials(){
    headerDiv = await getDivWhenReady("pageHeader")
    if(!headerFilled){
        headerFilled = true
        headerDiv.innerHTML = headerText

        //Set which page is loaded:
        if(window.location.href.endsWith("projects.html")){
            document.getElementById("projectsLink").classList.add("active")
        } else if(window.location.href.endsWith("publications.html")){
            document.getElementById("publicationsLink").classList.add("active")
        } else{
            document.getElementById("homeLink").classList.add("active")
        }
    }
}

async function fillFooterPartials(){
    footerDiv = await getDivWhenReady("pageFooter")
    if(!footerFilled){
        footerFilled = true
        footerDiv.innerHTML = footerText;
    }
}