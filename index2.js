const puppeteer = require('puppeteer');

(async () => {
  var browserOption = {
    // executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    headless: false,
    slowMo: 100,
    defaultViewport: null,
    args: ['--start-maximized']
  }

  const log = console.log;
  const link = 'https://web.whatsapp.com/';
  const browser = await puppeteer.launch(browserOption)
  
  try {
    const page = await browser.newPage();
    
    if(await page.goto(link, { waitUntil: 'networkidle2' }))
      log("[LOG]: Page loaded.");
    
    page.waitForNavigation()
      .then(() => log("[LOG]: QR code scanned."));
    
    await page.waitForSelector('#pane-side > div:nth-child(1) > div > div > div:nth-child(1) > div');
    await page.click('#pane-side > div:nth-child(1) > div > div > div:nth-child(1) > div');
    
    await page.addScriptTag({path: "./jquery.js"});
    var n = 99999;
    var i = 1;

    //browser's console input format testing:
    // let four = document.querySelector("#pane-side > div:nth-child(1) > div > div > div:nth-child(2) > div > div > div._2kHpK > div._3dtfX > div").getAttribute("class");
    
    while (i < n) {
      await page.waitFor(3000);
      const result = await page.evaluate(() => {
        let one = $("#pane-side > div:nth-child(1) > div > div > div:nth-child(1) > div > div").attr("class");
        let two = $("#pane-side > div:nth-child(1) > div > div > div:nth-child(1) > div > div > div:nth-child(2)").attr("class");
        let three = $("#pane-side > div:nth-child(1) > div > div > div:nth-child(1) > div > div > div." + two + " > div").attr("class");
        let four = $("#pane-side > div:nth-child(1) > div > div > div:nth-child(1) > div > div > div." + two + " > div." + three + " > div").attr("class");
        let name = $("#pane-side > div:nth-child(1) > div > div > div:nth-child(1) > div > div > div." + two + " > div." + three + " > div." + four + " > span > span").text();
        //          ("#pane-side > div:nth-child(1) > div > div > div:nth-child(1) > div > div > div._2kHpK > div._3dtfX > div._3CneP > span > span")
        return name;
      })
      log("name: ", result);

      await page.keyboard.press('ArrowDown');
      await page.focus('#pane-side > div:nth-child(1) > div > div > div > div');
      
      i++;
    }
  } 
  catch (error) {
    console.log(error);
    // await browser.close();
  }

})()