import { chromium } from 'playwright-core';
import path from 'path';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  try {
    const browserPath = path.dirname(await chromium.executablePath());
    // 修改目标路径
    const destPath = path.join(__dirname, 'build', 'playwright', 'chromium');
    await fs.copy(browserPath, destPath, { overwrite: true });
    console.log('Playwright browsers copied successfully to:', destPath);
  } catch (error) {
    console.error('Error copying Playwright browsers:', error);
  }
})();