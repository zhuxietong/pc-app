import { chromium, Browser, Page, BrowserContext } from 'playwright';

interface StorageEvent {
    key?: string;
    value?: string;
    type: 'setItem' | 'removeItem' | 'clear';
}

export async function injectStorageListener(page: Page,change:(event:StorageEvent)=>void ): Promise<void> {
    // 暴露一个函数给页面使用
    await page.exposeFunction('reportStorageChange', (event: StorageEvent) => {
        console.log('Storage changed:', event);
        change(event)
    });
    await page.evaluate(() => {
        const originalSetItem = localStorage.setItem;
        const originalRemoveItem = localStorage.removeItem;
        const originalClear = localStorage.clear;

        localStorage.setItem = function(key: string, value: string): void {
            originalSetItem.call(this, key, value);
            (window as any).reportStorageChange({ key, value, type: 'setItem' });

        };

        localStorage.removeItem = function(key: string): void {
            originalRemoveItem.call(this, key);
            (window as any).reportStorageChange({ key, type: 'removeItem' });
        };

        localStorage.clear = function(): void {
            originalClear.call(this);
            (window as any).reportStorageChange({ type: 'clear' });
        };
    });
    // await page.evaluate(() => {
    //     const originalSetItem = localStorage.setItem;
    //     const originalRemoveItem = localStorage.removeItem;
    //     const originalClear = localStorage.clear;
    //
    //     localStorage.setItem = function(key: string, value: string): void {
    //         const event: StorageEvent = { key, value, type: 'setItem' };
    //         console.log('STORAGE_CHANGE', JSON.stringify(event));
    //         originalSetItem.call(this, key, value);
    //     };
    //
    //     localStorage.removeItem = function(key: string): void {
    //         const event: StorageEvent = { key, type: 'removeItem' };
    //         console.log('STORAGE_CHANGE', JSON.stringify(event));
    //         originalRemoveItem.call(this, key);
    //     };
    //
    //     localStorage.clear = function(): void {
    //         const event: StorageEvent = { type: 'clear' };
    //         console.log('STORAGE_CHANGE', JSON.stringify(event));
    //         originalClear.call(this);
    //     };
    // });


    // 添加控制台消息监听器
    // page.on('console', (msg) => {
    //     if (msg.text().startsWith('STORAGE_CHANGE')) {
    //         const eventData = JSON.parse(msg.text().split('STORAGE_CHANGE ')[1]);
    //         console.log('Storage changed:', eventData);
    //         change(eventData)
    //     }
    // });
}