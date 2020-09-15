const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const twitterBtn = document.getElementById('twitter');

// Get Quote from API - Forismatic
async function getQuote() {
    const proxyURL = 'https://cors-anywhere.herokuapp.com/';
    const requestURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    
    try {
        const response = await fetch(proxyURL + requestURL);
        const data = response.json();

        if (!data.quoteAuthor) {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }

        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }

        quoteText.innerText = data.quoteText;
    } catch(error) {
        getQuote();
    }
}

// Run getQuote On Page Load
