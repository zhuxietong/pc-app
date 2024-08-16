
import { chromium } from 'playwright';

const isDev = process.env.NODE_ENV === 'development';

function getChromiumExecutablePath():string {
    if (isDev) {
        return chromium.executablePath();
    } else {
        // 你也可以直接使用条件判断
        if (process.platform === 'win32') {return  process.env.chromium_path

        } else if (process.platform === 'darwin') {
            console.log('Running on macOS');
        } else if (process.platform === 'linux') {
            console.log('Running on Linux');
            return chromium.executablePath();
        } else {
            return  process.env.chromium_path
        }
    }
}

export default getChromiumExecutablePath