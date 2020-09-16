const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const twitterBtn = document.getElementById('twitter');
const loader = document.getElementById('loader');

// Get Quote from API - Forismatic
async function getQuote() {
    // Before anything else runs, show the loader and hide the quote box
    loading();
    
    // Declare endpoint URLs and make request 
    const proxyURL = 'https://damp-thicket-42276.herokuapp.com/';
    const requestURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    
    try {
        // Wait for response to be assigned to var before executing further
        const response = await fetch(proxyURL + requestURL);

        // wait for response formatted in json to be assigned to var before executing further
        const data = await response.json();
        console.log(data);

        // if Author is an empty string, replace with Unknown
        if (!data.quoteAuthor) {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }

        // If quote is longer than 120 chars, decrease font size
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }

        quoteText.innerText = data.quoteText;

        // Once the quote is loaded and data is assigned to elements, stop the loader and show the quoteContainer
        complete();
    } catch(error) {
        getQuote();
    }
}

// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterURL, '_blank');
}

// Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Loading Complete
function complete() {
    if (!loader.hidden) {
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// Run getQuote On Page Load
getQuote();