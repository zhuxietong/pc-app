import {webkit} from "playwright";
import {getUsers} from "./users";
import {WindowsManager} from "./windows";
import {init} from "../utils/const";

const manager = new WindowsManager()

/**
 * 打开多个用户
 */
const openTk = async () => {
    // await init()
    // const users = await getUsers()
    // await manager.loadUsers(users)

    const browser = await webkit.launch({
        headless:false,
    });
    const page = await browser.newPage();
    await page.goto('http://www.firstvar.com/h5/pages/index/home/index')


    try {
        //接受cookie
        await page.locator('#agree').click();
    }catch (e) {

    }
    try {


        //登录输入
        await page.locator('#username > div > input').fill('zhuxietong');
        await page.locator('#pwd > div > input').fill('111111');

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

}

export default openTk