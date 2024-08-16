import { exec } from 'child_process';
import { platform } from 'os';

interface ScreenInfo {
    width: number;
    height: number;
    deviceScaleFactor: number;
}

const getScreenInfo = (): Promise<ScreenInfo> => {
    return new Promise((resolve, reject) => {
        if (platform() !== 'darwin') {
            reject(new Error('This method is only for macOS'));
            return;
        }

        const command = 'system_profiler SPDisplaysDataType';

        exec(command, (error, stdout) => {
            if (error) {
                reject(error);
                return;
            }

            let width: number, height: number, deviceScaleFactor: number;

            // 解析分辨率
            const resolutionMatch = stdout.match(/Resolution:\s*(\d+)\s*x\s*(\d+)/);
            if (resolutionMatch) {
                width = parseInt(resolutionMatch[1], 10);
                height = parseInt(resolutionMatch[2], 10);
            }

            // 尝试查找 Retina 显示器的标志
            const isRetina = /Retina/.test(stdout) || /retina/.test(stdout);

            // 尝试查找具体的像素深度
            const pixelDepthMatch = stdout.match(/Pixel Depth:\s*(.*)/);
            const pixelDepth = pixelDepthMatch ? pixelDepthMatch[1] : '';

            // 根据像素深度和 Retina 标志来确定 deviceScaleFactor
            if (isRetina || pixelDepth.includes('Retina')) {
                deviceScaleFactor = 2;
            } else {
                deviceScaleFactor = 1;
            }

            // 如果没有找到分辨率信息，尝试使用另一种方法
            if (!width || !height) {
                exec('system_profiler SPDisplaysDataType | grep Resolution', (error, stdout) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    const match = stdout.match(/(\d+) x (\d+)/);
                    if (match) {
                        width = parseInt(match[1], 10);
                        height = parseInt(match[2], 10);
                    }
                    if (width && height && deviceScaleFactor) {
                        resolve({ width, height, deviceScaleFactor });
                    } else {
                        reject(new Error('Failed to parse screen info'));
                    }
                });
            } else if (width && height && deviceScaleFactor) {
                resolve({ width, height, deviceScaleFactor });
            } else {
                reject(new Error('Failed to parse screen info'));
            }
        });
    });
};
// 使用异步函数调用
export const getScreen = async () => {
    try {
        const info = await getScreenInfo();
        return {width: (info.width/info.deviceScaleFactor).toFixed(0), height: (info.height/info.deviceScaleFactor).toFixed(0), deviceScaleFactor: info.deviceScaleFactor}
    } catch (error) {
        console.error('获取屏幕信息失败:', error);
    }
    return {
        width: 1920,
        height:1080,
        deviceScaleFactor: 1
    }
};

