// import tiktok_control from "#/api/tiktok_control";
//
// tiktok_control()
import { webkit } from 'playwright';
//
(async () => {
    const browser = await webkit.launch({
        headless:false,
    });
    const page = await browser.newPage();
    await page.goto('http://myip.ipip.net'); // 或者任何一个URL

    const screenWidth = await page.evaluate(() => {
        return window.screen.width;
    });

    console.log(`Screen width: ${screenWidth}px`);

    // await browser.close();
})();