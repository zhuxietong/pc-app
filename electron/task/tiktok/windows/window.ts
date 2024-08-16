import {injectStorageListener} from "../../utils/storage/inject";
import TPWindow from "../../utils/window";
import {Page} from "playwright";


export class TKWindow extends TPWindow {

    siteKey = 'tk'
    async begins(page: Page) {
        await page.goto('http://localhost:3000')
        const ws = this
        await injectStorageListener(page, (event) => {
            ws.saveStorage()
        })
    }
    async begin(page: Page) {
        await page.goto('http://www.firstvar.com/h5/pages/index/home/index')
        // await page.goto('http://myip.ipip.net'); // 或者任何一个URL

        const ws = this
        try {
            // await injectStorageListener(page, (event) => {
            //     ws.saveStorage()
            // })
        }catch (e) {

        }

        try {
            console.log("---001")
            // 接受cookie
            await page.locator('#agree').click();
            console.log('----sss',page)
        } catch (e) {
            console.log("---ee",e)

        }
        try {

            console.log("---002")
            //登录输入
            await page.locator('#username > div > input').fill(this.user.auth.username);
            await page.locator('#pwd > div > input').fill(this.user.auth.password);
            console.log("---003")

            // 拦截登录请求并修改响应
            // await page.route('https://nc.skyeyes.com.cn/api/sys.account/login', (route) => {
            //   console.log('拦截登录请求');
            //   route.fulfill({
            //     status: 200,
            //     contentType: 'application/json',
            //     body: JSON.stringify({ success: true, redirect: false })
            //   });
            // });


            await page.locator('#login-btn').click();
        } catch (e) {

        }
        await new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve()
            }, 2000)
        })

    }
}