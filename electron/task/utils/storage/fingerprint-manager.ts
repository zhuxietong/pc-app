// storage-manager.ts
import { v4 as uuidv4 } from 'uuid';

export class FingerprintManager {
    private fingerprintIds: string[] = [];
    private userFingerprints: Map<string, string> = new Map();

    createFingerprint(): string {
        const id = uuidv4();
        this.fingerprintIds.push(id);
        return id;
    }

    getFingerprints(): string[] {
        return this.fingerprintIds;
    }

    getFingerprintForUser(username: string): string | undefined {
        return this.userFingerprints.get(username);
    }

    associateUserWithFingerprint(username: string, fingerprintId: string): void {
        this.userFingerprints.set(username, fingerprintId);
    }

    removeUserFingerprint(username: string): void {
        this.userFingerprints.delete(username);
    }

    // 可以根据需要添加其他方法...
}