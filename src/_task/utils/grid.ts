/**
 * @description $ $
 * @author zxt
 * @date: 2024/8/9
 * @copyright
 */

import { UTILS} from "./type";

type AuthPage = UTILS.AuthPage;

/**
 * @description Playwright多窗口实现网格布局，支持多个页面
 * @param pages {Page[]} 页面数组
 * @param config {{rows: number, cols: number}} 布局配置，需要根据屏幕大小计算进行布局
 */
export async function arrangeWindowsInGrid(
  pages: AuthPage[],
  config: { rows: number; cols: number }
) {
  const { rows, cols } = config;
  const totalWindows = pages.length;

  if (totalWindows === 0) {
    console.log('No pages to arrange');
    return;
  }



  // 获取主窗口的大小
  const mainWindow = pages[0].page;
  const { width: screenWidth, height: screenHeight } =
    (await mainWindow.viewportSize()) || { width: 1024, height: 768 };

  // 计算每个窗口的大小
  const windowWidth = Math.floor(screenWidth / cols);
  const windowHeight = Math.floor(screenHeight / rows);

  const points: { x: number; y: number }[] = [];

  for (let i = 0; i < totalWindows; i++) {
    const row = Math.floor(i / cols);
    const col = i % cols;

    const x = col * windowWidth;
    const y = row * windowHeight;
    points.push({ x: x, y: y});
    const page = pages[i];
    await page.page.setViewportSize({
      width: windowWidth,
      height: windowHeight
    });
    const session = await page.session

    // 获取窗口ID
    const targets = await session.send('Target.getTargets');
    const targetInfo = targets.targetInfos.find(t => t.type === 'page');
    const { windowId } = await session.send('Browser.getWindowForTarget', {
      targetId: targetInfo?.targetId
    });

    // await new Promise<void>(resolve => setTimeout(()=>{resolve()},100))

    // 移动窗口位置
    await session.send('Browser.setWindowBounds', {
      windowId,
      bounds: { left: x, top: y, width: windowWidth, height: windowHeight }
    });
  }
}
