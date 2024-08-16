// storage-state-manager.ts
import path from 'path';
import fs from 'fs/promises';
import { BrowserContext } from 'playwright';
import { FingerprintManager } from './fingerprint-manager';

const webStorage = 'webStorage'
export class StorageStateManager {
    private static instances: Map<string, StorageStateManager> = new Map();
    private fingerprintManager: FingerprintManager;
    private userDataDir: string;

    private constructor(userDataDir: string) {
        this.fingerprintManager = new FingerprintManager();

        if (this.isElectron()) {
            // Electron 环境
            const { app } = require('electron');
            this.userDataDir = path.join(app.getPath('userData'),webStorage, userDataDir);
        } else {
            // 脚本环境
            this.userDataDir = path.resolve(process.cwd(),webStorage, userDataDir);
        }
    }

    static manager(userDataDir: string = "tk"): StorageStateManager {
        if (!StorageStateManager.instances.has(userDataDir)) {
            StorageStateManager.instances.set(userDataDir, new StorageStateManager(userDataDir));
        }
        return StorageStateManager.instances.get(userDataDir)!;
    }

    private isElectron(): boolean {
        return process.type === 'browser' && typeof require('electron') !== 'undefined';
    }

    private getUserDataPath(username: string): string {
        return path.join(this.userDataDir, `${username}.json`);
    }

    async getStorageState(username: string): Promise<object | null> {
        const userDataPath = this.getUserDataPath(username);
        try {
            console.log(`Checking path: ${userDataPath}`);
            await fs.access(userDataPath);
            const data = await fs.readFile(userDataPath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.log('Error accessing file:', error);
            if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
                return null;
            }
            throw error;
        }
    }

    async saveStorageState(username: string, context: BrowserContext): Promise<void> {
        try {
            await fs.mkdir(this.userDataDir, { recursive: true });
            const userDataPath = this.getUserDataPath(username);
            console.log("----ddss",userDataPath)

            // 获取 storageState
            const storageState = await context.storageState();
            console.log("----_::==",storageState)

            // 将 storageState 写入文件
            await fs.writeFile(userDataPath, JSON.stringify(storageState, null, 2));

            let fingerprintId = this.fingerprintManager.getFingerprintForUser(username);
            if (!fingerprintId) {
                fingerprintId = this.fingerprintManager.createFingerprint();
                this.fingerprintManager.associateUserWithFingerprint(username, fingerprintId);
            }
        } catch (error) {
            console.error(`Error saving storage state for user ${username}:`, error);
            throw error;
        }
    }

    async deleteStorageState(username: string): Promise<void> {
        const userDataPath = this.getUserDataPath(username);
        try {
            await fs.unlink(userDataPath);
        } catch (error) {
            if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
                throw error;
            }
        }
        this.fingerprintManager.removeUserFingerprint(username);
    }

    async listUsers(): Promise<string[]> {
        const files = await fs.readdir(this.userDataDir);
        return files
            .filter(file => file.endsWith('.json'))
            .map(file => path.basename(file, '.json'));
    }
}