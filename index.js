const puppeteer = require('puppeteer');
(async () => {
  var browserOption = {
    // executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized']
  }

  const log = console.log;
  const link = 'https://web.whatsapp.com/';
  const browser = await puppeteer.launch(browserOption)
  
  
  try {
    const page = await browser.newPage()
    
    if(await page.goto(link, { waitUntil: 'networkidle2' }))
        log("[LOG]: Page loaded.");
    
    page.waitForNavigation().then(() => log("[LOG]: QR code scanned."));
    
    await page.waitForSelector('#pane-side > div:nth-child(1) > div > div > div:nth-child(2) > div');
    await page.click('#pane-side > div:nth-child(1) > div > div > div:nth-child(2) > div');



    // await page.keyboard.type(key_words);
    // await page.keyboard.press('Enter');

    // await page.waitFor(3000);

    // await page.waitForSelector(
    //   '#main > div #center_col #search > div > div > div'
    // );
    // const url = await getHref(
    //   page,
    //   `#main > div #center_col #search > div > div > div a`
    // );

    // await page.goto(url, { waitUntil: 'domcontentloaded' });

    // await page.screenshot({
    //   fullPage: true,
    //   path: 'new_image.png'
    // });
    // const screenshotPath = process.cwd() + '\new_image.png';

    // console.log('URL of the page:', url);
    // console.log('Location of the screenshot:', screenshotPath);

    // await page.close();
    // await browser.close();
  } 
  catch (error) {
    console.log(error);
    await browser.close();
  }

})()