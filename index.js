const puppeteer = require('puppeteer');

(async () => {
  var browserOption = {
    executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    headless: false 
  }

  const browser = await puppeteer.launch(browserOption);
  const page = await browser.newPage();
  await page.goto('https://example.com');

  // Get the "viewport" of the page, as reported by the page.
  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio
    };
  });

  // DEBUGGING
  page.on('console', msg => console.log('PAGE LOG:', msg.text())); //capturing browser's log
  page.evaluate(() => console.log(`url is ${location.href}`)); //send log to browser's console

  console.log('Dimensions:', dimensions);

//   await browser.close();
})();
