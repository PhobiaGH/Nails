/* This is the test enviorment for Jest, it is used for development purposes only. 
If you are looking for the meat and bones of the code, you may safely ignore this 
file unless you are interested in the complete workings of this app. Feel free install 
Jest on your own machine, and borrow the code below if you are interested in giving Jest a try */

const {normalizeURL, getURLsFromHTML} = require('./scrapePage.js');
const {test,expect} =require('@jest/globals');

// Tests that the protocol gets stripped
test('normalizeURL strip protocol', () => {
    const input = 'https://github.com/PhobiaGH/'
    const actual = normalizeURL(input)
    const expected = 'github.com/PhobiaGH'
    expect(actual).toEqual(expected)
});

// Tests that trailing shashes get stripped from output
test('normalizeURL strip trailing slashes', () => {
    const input = 'http://github.com/PhobiaGH/'
    const actual = normalizeURL(input)
    const expected = 'github.com/PhobiaGH'
    expect(actual).toEqual(expected)
});

// Tests that http protocol doesn't break anything
test('normalizeURL strip s from https', () => {
    const input = 'http://github.com/PhobiaGH/'
    const actual = normalizeURL(input)
    const expected = 'github.com/PhobiaGH'
    expect(actual).toEqual(expected)
});

// Tests that capitals get changed to lowercase
test('normalizeURL capitals', () => {
    const input = 'https://GITHUB.com/PhobiaGH/'
    const actual = normalizeURL(input)
    const expected = 'github.com/PhobiaGH'
    expect(actual).toEqual(expected)
});

// Tests that the getURLsFromHTML function is working properly (absolute URLs)
test('getURLsFromHTML absolute', () => {
    const HTMLBody = `
        <html>
            <body>
                <a href="https://github.com/PhobiaGH/Nails/">
                    PhobiaGH
                </a>
            </body>
        </html>
    `
    const BaseURL = "https://github.com/PhobiaGH/Nails/"
    const actual = getURLsFromHTML(HTMLBody, BaseURL)
    const expected = ["https://github.com/PhobiaGH/Nails/"]
    expect(actual).toEqual(expected)
});

// Tests that the getURLsFromHTML function is working properly (relative URLs)
test('getURLsFromHTML relative', () => {
    const HTMLBody = `
        <html>
            <body>
                <a href="/PhobiaGH/Nails">
                    PhobiaGH
                </a>
            </body>
        </html>
    `
    const BaseURL = "https://github.com"
    const actual = getURLsFromHTML(HTMLBody, BaseURL)
    const expected = ["https://github.com/PhobiaGH/Nails"]
    expect(actual).toEqual(expected)
});