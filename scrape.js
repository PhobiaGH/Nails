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
    const baseURL = process.argv[2];
    console.log(`Starting to scrape ${baseURL}`);
    
    // Starts headless browser, and directs to site
    const browser = await puppeteer.launch({headless: "new"})
    const page = await browser.newPage(scrapePage)
    await page.goto(`${baseURL}`)
    await page.setViewport({
        width: 1920,
        height: 1080
    });

    await autoScroll(page, 250);
    
    // Creates new dir, saves screenshot of site, all text inside page body, and all pictures on site
    var d = new Date();
    const dir = `./Scraped/${d}`;
    await fs.mkdir(dir);
    await page.screenshot({path: `./${dir}/screenshot.png` , fullPage: true});
    
// Creates text.txt with all text on page
    const text = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("body")).map(x => x.textContent)
    });
    await fs.writeFile(`./${dir}/text.txt`, text.join("\r\n"));

    // Grabs any links onpage, and saves them to links.txt
    const links = await page.$$eval("a", link => {
        return link.map(x => x.href)
    });
    await fs.writeFile(`${dir}/links.txt`, links.join("\r\n"));

    /* Still in development please ignore for now
    await page.type("input", "");
    await Promise.all([page.click("button"), page.waitForNavigation()]);
    const info = await page.$eval("h1", el => el.textContent);
    const info2 = await page.$eval("p", el => el.textContent);
    console.log(info);
    console.log(info2); */

    const photos = await page.$$eval("img", imgs => {
        return imgs.map(x => x.src)
    });
    // Visits img URL, and downloads the img
    for (const photo of photos) {
        const imagePage = await page.goto(photo)
        await fs.writeFile(`${dir}/${photo.split("/").pop()}`, await imagePage.buffer())
    };
    console.log(links)
    await browser.close()
};

// Auto scrolls down to load the entire page before extracting data
async function autoScroll(page, maxScrolls) {
    await page.evaluate(async (maxScrolls) => {
        await new Promise((resolve) => {
            var totalHeight = 0
            var distance = 100
            var scrolls = 0 // Scrolls counter
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight
                window.scrollBy(0, distance)
                totalHeight += distance
                scrolls++ // Incriment counter
                
                // Stops scrolling if end of page is reached, or maxScrolls is reached
                try {
                    if (totalHeight >= scrollHeight - window.innerHeight || scrolls >= maxScrolls) {
                        clearInterval(timer)
                        resolve()
                    };
                } catch (err) {
                    console.log(`error with autoScroll: ${err.message}`)
                };
            }, 100)
        });
    }, maxScrolls); // Pass maxScrolls to the function
};

scrape();