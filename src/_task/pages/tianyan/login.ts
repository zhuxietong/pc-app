import { UTILS} from "../../utils/type";
import {BrowserContext, CDPSession, Page} from 'playwright';

class TYLoginPage{


  // auth: UTILS.Auth;
  // page: Page;
  //
  // constructor(auth: UTILS.Auth, page: Page) {
  //   this.auth = auth;
  //   this.page = page;
  // }
  //
  // async inputAuthInfo() {
  //   const page = this.page;
  //
  //   await page.goto('http://www.firstvar.com/h5/dialog/private');
  //
  //   // 注入浮动面板的HTML和CSS
  //   const panelHTML = `
  //   <div id="floating-panel" style="
  //     position: fixed;
  //     bottom: 20px;
  //     right: 20px;
  //     width: 200px;
  //     height: 100px;
  //     background-color: white;
  //     border: 1px solid #000;
  //     box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  //     z-index: 1000;
  //     padding: 10px;
  //   ">
  //     <p>这是一个浮动面板</p>
  //   </div>
  // `;
  //
  //   // 执行JavaScript代码在网页中注入浮动面板
  //   await page.evaluate((panelHTML) => {
  //     const body = document.querySelector('body');
  //     if (body) {
  //       body.insertAdjacentHTML('beforeend', panelHTML);
  //     }
  //   }, panelHTML);
  //
  //   /**
  //    * 接受cookie
  //    */
  //   await page.locator('#agree').click();
  //
  //   /**
  //    * 登录输入
  //    */
  //   await page.locator('#username > div > input').fill(this.auth.username);
  //   await page.locator('#pwd > div > input').fill(this.auth.password);
  //
  //   // 拦截登录请求并修改响应
  //   // await page.route('https://nc.skyeyes.com.cn/api/sys.account/login', (route) => {
  //   //   console.log('拦截登录请求');
  //   //   route.fulfill({
  //   //     status: 200,
  //   //     contentType: 'application/json',
  //   //     body: JSON.stringify({ success: true, redirect: false })
  //   //   });
  //   // });
  //
  //
  //   await page.locator('#login-btn').click();
  // }
}

export default TYLoginPage;