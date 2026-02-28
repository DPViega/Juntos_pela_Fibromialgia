const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    // Listen to console events
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.error('PAGE ERROR:', error.message));

    // Wait until network is idle
    await page.goto('http://localhost:4173/login', { waitUntil: 'networkidle0' });

    await page.waitForSelector('#email');
    await page.type('#email', 'vivendocomfibro2025@gmail.com');
    await page.type('#password', 'senha1234');
    await page.click('button[type="submit"]');

    console.log("CLICKED SUBMIT, WAITING 5s");
    await new Promise(r => setTimeout(r, 5000));

    const html = await page.content();
    console.log("HTML:", html.substring(0, 500));

    await browser.close();
})();
