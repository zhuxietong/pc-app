/**
 * @description TikTok Login Page class for handling authentication using Playwright
 */

import { UTILS} from "../../utils/type";
import { BrowserContext, BrowserContextOptions, CDPSession, chromium,Page} from 'playwright';
import getChromiumExecutablePath from "./chromium";


class TKLoginPage implements UTILS.AuthPage {
  config: UTILS.PageConfig;
  page: Page;
  context: BrowserContext;
  session:CDPSession;

  get auth(): UTILS.Auth {
    return this.config.auth;
  }

  private constructor(
    config: UTILS.PageConfig,
    page: Page,
    context: BrowserContext,
    session:CDPSession
  ) {
    this.config = config;
    this.context = context;
    this.page = page;
    this.session = session;
  }

  static async create(config: UTILS.PageConfig): Promise<TKLoginPage> {
    //const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || 
    //path.join(process.resourcesPath, 'playwright', 'chromium', 'chrome.exe');

    //const executablePath = path.join(process.resourcesPath, 'playwright', 'chromium', 'chrome.exe') || process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;

    //const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
    //console.log('000000ss',executablePath);

    const executablePath = getChromiumExecutablePath()
    console.log('-----dd',executablePath);
    const browser = await chromium.launch({
      headless: false,
      executablePath
      // args: ['--window-position=400,00'] // 设置窗口的初始位置
    });

    const configOpt: BrowserContextOptions = {
    }
  

 
    // 创建新的浏览器上下文并设置代理
    const context = await browser.newContext(configOpt);
    const session = await browser.newBrowserCDPSession();

    const page = await context.newPage();

    return new TKLoginPage(
      config,
      page,
      context,
      session
    );
  }

  async inputAuthInfo() {
    const page = this.page;
    // await page.goto('https://www.youtube.com');
    await page.goto('http://myip.ipip.net');

    // await page.goto('https://www.tiktok.com');
    // 拦截并处理特定的POST请求

    /**
     * 接受cookie
     */
    // await page
    //   .locator('.tiktok-cookie-banner .button-wrapper > button:nth-child(2)')
    //   .click();

    // Intercept and handle the captcha verification request

    // // 使用正则表达式拦截包含查询参数的URL
    // await page.route('**/captcha/verify**', (route) => {
    //   console.log("0000DD")
    //   // 判断是否为POST请求
    //   if (route.request().method() === 'POST') {
    //     route.fulfill({
    //       status: 200,
    //       contentType: 'application/json',
    //       body: JSON.stringify({
    //         code: 200,
    //         data: null,
    //         message: '成功s',
    //         msg_code: '200',
    //         msg_sub_code: 'success'
    //       })
    //     });
    //   } else {
    //     route.continue();
    //   }
    // });
    //
    // /**
    //  * 登录输入
    //  */
    // await page.locator('#header-login-button').click();
    // await page.locator('#login-modal-title + div > div:nth-child(2)').click();
    // await page.waitForTimeout(1000); // 等待1秒
    // await page.locator('[href=\\/login\\/phone-or-email\\/email]').click();
    // await page.waitForTimeout(1000); // 等待1秒
    // await page.locator('[name=username]').fill(this.auth.username);
    // await page.locator('[type=password]').fill(this.auth.password);
    // await page.waitForTimeout(1000); // 等待1秒
    //
    // await page.locator('[data-e2e=login-button]').click();

    // await page.waitForTimeout(500000);
  }
}

export default TKLoginPage;
