import { Identitfiable } from './entities/identitfiable';
import { LocalStorageService } from './local-storage.service';

export abstract class AbstractCrudService<T extends Identitfiable> {

    private data: T[];

    constructor(private localStorage: LocalStorageService, private storageKey: string) {
        if (this.localStorage.isLocalStorageSupported) {
            let tmpData = this.localStorage.get(this.storageKey);
            if (tmpData == null) {
                console.log(this.storageKey + " not found localy, retrieve from base configuration");
                this.data = this.loadBaseData();
                this.storeData();
            } else {
                console.log(this.storageKey + " retrieved");
                this.data = tmpData;
            }
        } else {
            console.log(this.storageKey + " from base configuration (no local persistance)");
            this.data = this.loadBaseData();
        }
        console.log(this.data);
    }

    protected abstract loadBaseData(): T[];

    private genId(): number {
        return this.data.length > 0 ? Math.max(...this.data.map(w => w.id)) + 1 : this.minId;
    }

    protected abstract get minId(): number;

    public get soredData(): T[] {
        return this.data;
    }

    public get(id: number): T {
        if (id != null) {
            return this.data.find(w => w.id == id);
        } else {
            return null;
        }
    }

    public save(value: T): void {
        if (value.id) {
            let found: T = this.get(value.id);
            if (found) {
                Object.assign(found, value);
            } else {
                this.data.push(value);
            }
        } else {
            value.id = this.genId();
            this.data.push(value);
        }
        this.storeData();
    }

    public storeData(): void {
        if (this.localStorage.isLocalStorageSupported) {
            this.localStorage.set(this.storageKey, this.data);
            console.log(this.storageKey + " stored");
        }
    }

    public resetData(): void {
        if (this.localStorage.isLocalStorageSupported) {
            console.log("Reset " + this.storageKey);
            this.localStorage.remove(this.storageKey);
            console.log(this.storageKey + "from base configuration");
            this.data = this.loadBaseData();
            this.storeData();
        }
    }

}
