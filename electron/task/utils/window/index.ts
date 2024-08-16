import getChromiumExecutablePath from "../chromium";
// import {injectStorageListener} from "../storage/inject";
import {StorageStateManager} from "../storage/storage-state-manager";
import {Browser, BrowserContext, BrowserContextOptions, CDPSession, chromium, Page, webkit} from "playwright";

export type WindowObject = {
    browser: Browser,
    session: CDPSession,
    page: Page,
}

class TPWindow {
    user: TP.User
    frame: TP.Frame = {x: 0, y: 0, width: 100, height: 100}
    siteKey?:string

    constructor(user: TP.User) {
        this.user = user
    }

    index: number = 0

    browser?: Browser
    session?: CDPSession
    page?: Page
    context?: BrowserContext
    windowId?: number

    get storageManager(): StorageStateManager {
        return StorageStateManager.manager(this.siteKey || 'tk')
    }

    async saveStorage(){
        try {
            await this.storageManager.saveStorageState(this.user.auth.username, this.context)
        }catch (e) {

        }
    }

    /**
     * 窗口位移，调整大小
     */
    layout: () => Promise<void> = () => {
        const ws = this
        return new Promise(async (resolve, reject) => {
            // 移动窗口位置
            await ws.session.send('Browser.setWindowBounds', {
                windowId: ws.windowId,
                bounds: {left: ws.frame.x, top: ws.frame.y, width: ws.frame.width, height: ws.frame.height}
            });

            resolve()
        })
    }

    initBrowser: () => Promise<WindowObject> = () => {
        const ws = this
        return new Promise<WindowObject>(async (resolve, reject) => {
            if (ws.browser) {
                resolve({
                    browser: ws.browser,
                    session: ws.session,
                    page: ws.page
                })
            } else {
                const executablePath = getChromiumExecutablePath()
                try {
                    const browser = await chromium.launch({
                        headless: false,
                        // executablePath,
                    });
                    let store = await ws.storageManager.getStorageState(ws.user.auth.username) || {}

                    const configOpt: BrowserContextOptions = {
                        // proxy: this.user.proxy,
                        viewport: {width: this.frame.width, height: this.frame.height},
                        screen: {width: this.frame.width, height: this.frame.height},
                        // storageState: store as any
                        // deviceScaleFactor: Const.window.deviceScaleFactor,
                        // isMobile: true,
                        // hasTouch: false,
                    }

                    const context = await browser.newContext(configOpt);

                    const session = await browser.newBrowserCDPSession();
                    const page = await context.newPage();
                    const targets = await session.send('Target.getTargets');
                    const targetInfo = targets.targetInfos.find(t => t.type === 'page');
                    const {windowId} = await session.send('Browser.getWindowForTarget', {
                        targetId: targetInfo?.targetId
                    });

                    ws.context = context
                    ws.windowId = windowId
                    ws.browser = browser
                    ws.session = session
                    ws.page = page

                    resolve({
                        browser: browser,
                        session: session,
                        page: page,
                    })

                } catch (e) {
                    console.log("----oos",e)
                    reject(e)
                }

            }
        });
    }



    /**
     * 加载网页
     */
    async load() {
        try {

            const {page} = await this.initBrowser()
            await this.layout()
            await this.begin(page)

        } catch (e) {

        }
    }

    async begin(page: Page) {
        let ws = this
        // await page.goto('http://myip.ipip.net'); // 或者任何一个URL
        await page.goto('http://www.firstvar.com/h5/pages/index/home/index')


        try {
            //接受cookie
            await page.locator('#agree').click();
        }catch (e) {

        }
        try {


            //登录输入
            await page.locator('#username > div > input').fill(this.user.auth.username);
            await page.locator('#pwd > div > input').fill(this.user.auth.password);

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
        }catch (e) {

        }
        await new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve()
            }, 2000)
        })

    }
}

export default TPWindow