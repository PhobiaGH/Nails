const {JSDOM} = require('jsdom');

// Sends GET request, grabbing the HTML of the crawled URL
async function scrapePage(baseURL, currentURL) {
    const baseURLGiven = new URL(baseURL);
    const currentURLGiven = new URL(currentURL);

    // Stops crawler from following external links
    if (baseURLGiven.hostname !== currentURLGiven.hostname) {
        return
    };
    
    try {
        // Catches broken URLs, logs the status code and continues to next URL
        const resp = await fetch(currentURL);
        if (resp.status > 399) {
            console.log(`error attempting fetch with status code: ${resp.status} on page: ${currentURL}`)
            return
        };
        // Makes sure response is HTML, skips and logs all other responses
        const contentType = resp.headers.get("content-type");
        if (!contentType.includes("text/html")) {
            console.log(`Non HTML response, content type: ${contentType} on page ${currentURL}`)
            return
        };

    } catch (err) {
        // Catches non-responsive URLs, skips them and logs the error
        console.log(`error attempting fetch: ${err.message}, on page: ${currentURL}`)
    };
};    

// Grabs URLs, changes relative URLs into absolute URLs, and catches invalid URLs
function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []; //˚ʚ🦊ɞ˚
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll('a');
    for (const element of linkElements) {
        if (element.href.slice(0, 1) === '/') {
            // Relative URLs
            try {
                const urlGiven = new URL(`${baseURL}${element.href}`)
                urls.push(urlGiven.href)
            } catch (err) {
                console.log(`error with releative url: ${err,message}`)
            };
        } else {
            // Absolute URLs
            try {
                const urlGiven = new URL(element.href)
                urls.push(urlGiven.href)
            } catch (err) {
                console.log(`error with absolute url: ${err.message}`)
            };
        };
    };
    return urls;
};

/* Normalize(consolidate to same string) URLs with differing strings, but same destination into 
a unified string while also stripping the protocol, and any trailing slashes from said string */
function normalizeURL(urlString) {
    const urlGiven = new URL(urlString);
    const hostPath = `${urlGiven.hostname}${urlGiven.pathname}`;
    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1)
    };
    return hostPath;
};

// Exports functions for use elsewhere in the app
module.exports = {
    normalizeURL, getURLsFromHTML, scrapePage
};