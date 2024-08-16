// storage.ts
import {v4 as uuidv4} from 'uuid';

export interface IFingerprintStorage {
    save(fingerprintId: string, data: any): Promise<void>;

    load(fingerprintId: string): Promise<any>;
}

export class Fingerprint {
    readonly id: string;
    private data: any;

    constructor(id?: string) {
        this.id = id || uuidv4();
        this.data = {};
    }

    setData(key: string, value: any): void {
        this.data[key] = value;
    }

    getData(key: string): any {
        return this.data[key];
    }

    getAllData(): any {
        return {...this.data};
    }
}

export class FingerprintManager {
    private fingerprints: Map<string, Fingerprint> = new Map();
    private storage: IFingerprintStorage;

    constructor(storage: IFingerprintStorage) {
        this.storage = storage;
    }

    createFingerprint(): Fingerprint {
        const fingerprint = new Fingerprint();
        this.fingerprints.set(fingerprint.id, fingerprint);
        return fingerprint;
    }

    getFingerprint(id: string): Fingerprint | undefined {
        return this.fingerprints.get(id);
    }

    getAllFingerprints(): Fingerprint[] {
        return Array.from(this.fingerprints.values());
    }

    async saveFingerprint(fingerprintId: string): Promise<void> {
        const fingerprint = this.getFingerprint(fingerprintId);
        if (fingerprint) {
            await this.storage.save(fingerprintId, fingerprint.getAllData());
        }
    }

    async loadFingerprint(fingerprintId: string): Promise<Fingerprint | undefined> {
        const data = await this.storage.load(fingerprintId);
        if (data) {
            const fingerprint = new Fingerprint(fingerprintId);
            Object.entries(data).forEach(([key, value]) => {
                fingerprint.setData(key, value);
            });
            this.fingerprints.set(fingerprintId, fingerprint);
            return fingerprint;
        }
        return undefined;
    }
}

// 示例存储实现
export class LocalStorageAdapter implements IFingerprintStorage {
    async save(fingerprintId: string, data: any): Promise<void> {
        localStorage.setItem(fingerprintId, JSON.stringify(data));
    }

    async load(fingerprintId: string): Promise<any> {
        const data = localStorage.getItem(fingerprintId);
        return data ? JSON.parse(data) : null;
    }
}