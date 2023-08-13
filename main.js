const puppeteer = require('puppeteer');
const {scrapePage} = require('./scrape.js');
const fs  = require('fs');

// Main code for starting puppeteer and grabbing site screenshots
async function browse () {
    // Makes sure input is a valid URL
    if (process.argv.length < 3) {
        console.log("No URL provided")
        process.exit(1)
    };
    // Prevents more than one argument at a time
    if (process.argv.length > 3) {
        console.log("Too many command line arguments")
        process.exit(1)
    };
    const baseURL = process.argv[2]
    console.log(`Starting to scrape ${baseURL}`)
    const browser = await puppeteer.launch({headless: "new"})
    const page = await browser.newPage(scrapePage)
    await page.goto(`${baseURL}`)
    var d = new Date()
    const dir = `./Scrapped/${d}`
    if (!fs.existsSync(dir)) {
        await fs.mkdirSync(dir);
    };
    await page.screenshot({path: `./${dir}/screenshot.png` , fullPage: true})
    await browser.close();
};

browse();