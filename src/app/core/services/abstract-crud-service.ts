import { IdentitfiableInterface } from "../interfaces/identitfiable-interface";
import { LocalStorageService } from "./local-storage.service";

export abstract class AbstractCrudService<T extends IdentitfiableInterface> {
  private data: T[];

  constructor(
    private localStorage: LocalStorageService,
    private storageKey: string
  ) {
    if (this.isLocalStorageSupported) {
      let tmpData = this.localStorage.get(this.storageKey);
      if (tmpData == null) {
        console.log(
          this.storageKey +
            " not found localy, retrieve from base configuration"
        );
        this.data = this.loadBaseData();
        this.storeData();
      } else {
        console.log(this.storageKey + " retrieved");
        this.data = tmpData;
      }
    } else {
      console.log(
        this.storageKey + " from base configuration (no local persistance)"
      );
      this.data = this.loadBaseData();
    }
    this.data = this.data.map((d) => this.castJsonObject(d));
    console.log(this.data);
  }

  protected abstract loadBaseData(): T[];

  private genId(): number {
    return this.data.length > 0
      ? Math.max(...this.data.map((w) => w.id)) + 1
      : this.minId;
  }

  protected abstract get minId(): number;

  public get storedData(): T[] {
    return this.data;
  }

  public get(id: number): T {
    if (id != null) {
      return this.data.find((w) => w.id == id);
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

  public remove(value: T): void {
    this.data = this.data.filter((d) => d.id != value.id);
    this.storeData();
  }

  public storeData(): void {
    if (this.isLocalStorageSupported) {
      this.localStorage.set(this.storageKey, this.data);
      console.log(this.storageKey + " stored");
    }
  }

  public resetData(): void {
    if (this.isLocalStorageSupported) {
      console.log("Reset " + this.storageKey);
      this.localStorage.remove(this.storageKey);
      console.log(this.storageKey + "from base configuration");
      this.data = this.loadBaseData();
      this.storeData();
    }
  }

  public get isLocalStorageSupported(): boolean {
    return this.localStorage.isLocalStorageSupported;
  }

  public get exportableData(): T[] {
    return this.data;
  }

  public importData(data: any): void {
    console.log("try import:");
    console.log(data);
    let imported = this.convertData(data);
    console.log("imported:");
    console.log(imported);
    imported.forEach((e) => {
      e.id = this.genId();
      this.save(e);
    });
    this.storeData();
  }

  protected abstract convertData(data: any): T[];

  protected abstract castJsonObject(obj: T): T;
}
