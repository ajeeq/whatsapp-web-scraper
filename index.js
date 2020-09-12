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
    
    page.setDefaultNavigationTimeout(60000);
    page.waitForNavigation().then(() => log("[LOG]: QR code scanned."));
    await page.addScriptTag({path: "./jquery.js"}); // adding jquery.js

    // GETTING CONTACT AND GROUP COUNT:
    // await page.waitFor(2000);
    // await page.waitForSelector("#pane-side > div:nth-child(1) > div > div > div");
    // const count = await page.evaluate(() => {
    //   var n = 0;
    //   if(n == 0) {
        
    //     n =  $("#pane-side > div:nth-child(1) > div > div > div").length;
    //     return n;
    //   }
    //   else 
    //     return "contact count returned zero, cannot proceed.";
    // })
    // log("contact count(unarchived): ", count);
    // #pane-side > div:nth-child(1) > div > div > div:nth-child(1)

    // RUN IN BROWSER'S CONSOLE:
    // var li = $("#pane-side > div:nth-child(1) > div > div > div");

    // alert(li.length);
    // alert(li.size());
  
    //GETTING CONTACT AND GROUP NAME:
    var n = 99999;
    var i = 1;

    do {
      await page.waitForSelector("#pane-side > div:nth-child(1) > div > div > div:nth-child("+[i]+") > div");
      await page.click("#pane-side > div:nth-child(1) > div > div > div:nth-child("+[i]+") > div");
      
      const name = await page.evaluate(() => {
        let headerName =  $("#main > header > div:nth-child(2) > div:nth-child(1) > div > span").attr("title")
        return headerName;
      })
      log("name: ", name )

      await page.keyboard.press('ArrowDown');
      i++
    }
    while (n != -1)

    //browser's console input format testing:
    // let four = document.querySelector("#pane-side > div:nth-child(1) > div > div > div:nth-child(2) > div > div > div._2kHpK > div._3dtfX > div").getAttribute("class");
    
    // const contactName = await page.evaluate(() => {
    //   let one = $("#pane-side > div:nth-child(1) > div > div > div:nth-child(2) > div > div").attr("class");
    //   let two = $("#pane-side > div:nth-child(1) > div > div > div:nth-child(2) > div > div > div:nth-child(2)").attr("class");
    //   let three = $("#pane-side > div:nth-child(1) > div > div > div:nth-child(2) > div > div > div." + two + " > div").attr("class");
    //   let four = $("#pane-side > div:nth-child(1) > div > div > div:nth-child(2) > div > div > div." + two + " > div." + three + " > div").attr("class");
    //   let name = $("#pane-side > div:nth-child(1) > div > div > div:nth-child(2) > div > div > div." + two + " > div." + three + " > div." + four + " > span > span").text();

    //   return{one, two, three, four, name}
    // })
    // log("Contact name retrieved: ", contactName)
  } 
  catch (error) {
    console.log(error);
    // await browser.close();
  }

})()