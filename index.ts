import { chromium, Browser, Page, BrowserContext } from 'playwright';

interface StorageEvent {
    key?: string;
    value?: string;
    type: 'setItem' | 'removeItem' | 'clear';
}

async function injectStorageListener(page: Page,change:(event:StorageEvent)=>void ): Promise<void> {
    await page.evaluate(() => {
        const originalSetItem = localStorage.setItem;
        const originalRemoveItem = localStorage.removeItem;
        const originalClear = localStorage.clear;

        localStorage.setItem = function(key: string, value: string): void {
            const event: StorageEvent = { key, value, type: 'setItem' };
            console.log('STORAGE_CHANGE', JSON.stringify(event));
            originalSetItem.call(this, key, value);
        };

        localStorage.removeItem = function(key: string): void {
            const event: StorageEvent = { key, type: 'removeItem' };
            console.log('STORAGE_CHANGE', JSON.stringify(event));
            originalRemoveItem.call(this, key);
        };

        localStorage.clear = function(): void {
            const event: StorageEvent = { type: 'clear' };
            console.log('STORAGE_CHANGE', JSON.stringify(event));
            originalClear.call(this);
        };
    });
    // 添加控制台消息监听器
    page.on('console', (msg) => {
        if (msg.text().startsWith('STORAGE_CHANGE')) {
            const eventData = JSON.parse(msg.text().split('STORAGE_CHANGE ')[1]);
            console.log('Storage changed:', eventData);
            change(eventData)
        }
    });
}

async function main(): Promise<void> {
    const browser: Browser = await chromium.launch();
    const context: BrowserContext = await browser.newContext();
    const page: Page = await context.newPage();


    // 导航到目标页面
    await page.goto('http://localhost:3000');

    try {
        await injectStorageListener(page,(event)=>{
            console.log("---dd",event)
        });

        // 模拟 localStorage 变化
        await page.evaluate(() => {
            localStorage.setItem('testKey', 'testValue');
            localStorage.removeItem('testKey');
        });

        // 等待一段时间以确保事件被触发
        await page.waitForTimeout(1000);
    } catch (error) {
        console.error('Error occurred:', error);
    }

    // await browser.close();
}

main().catch(console.error);