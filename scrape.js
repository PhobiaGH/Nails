const puppeteer = require('puppeteer');
const {scrapePage} = require('./scrapePage.js');
const fs  = require('fs/promises');

// Main code for starting puppeteer and grabbing site screenshots
async function scrape () {
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

    // Grabs URL you pass to the terminal
    const baseURL = process.argv[2]
    console.log(`Starting to scrape ${baseURL}`)
    
    // Starts headless browser, and directs to site
    const browser = await puppeteer.launch({headless: "new"})
    const page = await browser.newPage(scrapePage)
    await page.goto(`${baseURL}`)
    
    // Creates new dir, saves screenshot of site, all text inside page body, and all pictures on site
    var d = new Date()
    const dir = `./Scraped/${d}`
    await fs.mkdir(dir);
    await page.screenshot({path: `./${dir}/screenshot.png` , fullPage: true})
    const text = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("body")).map(x => x.textContent)
    });
    
    await fs.writeFile(`./${dir}/text.txt`, text.join("\r\n"))
    const photos = await page.$$eval("img", imgs => {
        return imgs.map(x => x.src)
    });
    
    for (const photo of photos) {
        const imagePage = await page.goto(photo)
        await fs.writeFile(`${dir}/${photo.split("/").pop()}`, await imagePage.buffer())
    }
    await browser.close()
};

scrape();