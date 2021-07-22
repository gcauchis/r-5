import { BehaviorSubject, Observable, Subject } from "rxjs";
import { IdentitfiableInterface } from "../interfaces/identitfiable-interface";
import { environment } from "./../../../environments/environment";
import { LocalStorageService } from "./local-storage.service";

export abstract class AbstractCrudService<T extends IdentitfiableInterface> {
  private _values: T[] = [];
  private data$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>(this._values);

  constructor(
    private localStorage: LocalStorageService,
    private storageKey: string
  ) {
    if (this.isLocalStorageSupported) {
      let tmpData = this.localStorage.get(this.storageKey);
      if (tmpData == null) {
        if (!environment.production)
          console.log(
            this.storageKey +
              " not found localy, retrieve from base configuration"
          );
        this.values = this.loadBaseData();
        this.storeData();
      } else {
        if (!environment.production)
          console.log(this.storageKey + " retrieved");
        this.values = tmpData;
      }
    } else {
      if (!environment.production)
        console.log(
          this.storageKey + " from base configuration (no local persistance)"
        );
      this.values = this.loadBaseData().map((d) => this.castJsonObject(d));
    }

    if (!environment.production) console.log(this.values);
    // on backup a chaque update
    this.data$.subscribe((res) => this.storeData());
  }

  private set values(values: T[]) {
    this._values = values.map((d) => this.castJsonObject(d));
    this.data$.next(this._values);
  }

  private get values(): T[] {
    return this._values;
  }

  protected abstract loadBaseData(): T[];

  private genId(): number {
    return this.values.length > 0
      ? Math.max(...this.values.map((w) => w.id)) + 1
      : this.minId;
  }

  protected abstract get minId(): number;

  public get collection(): Subject<T[]> {
    return this.data$;
  }

  public get(id: number, defaultValue: T = null): Observable<T> {
    return new Observable<T>((obs) => {
      if (id != null) {
        obs.next(this.values.find((w) => w.id == id));
      } else {
        obs.next(defaultValue);
      }
      obs.complete();
    });
  }

  public save(value: T): void {
    if (value.id) {
      this.get(value.id).subscribe((found) => {
        let vals = this.values;
        if (found) {
          Object.assign(found, value);
        } else {
          vals.push(value);
        }
        this.values = vals;
      });
    } else {
      value.id = this.genId();
      let vals = this.values;
      vals.push(value);
      this.values = vals;
    }
  }

  public remove(value: T): void {
    this.values = this.values.filter((d) => d.id != value.id);
  }

  public storeData(): void {
    if (this.isLocalStorageSupported) {
      this.localStorage.set(this.storageKey, this.values);
      if (!environment.production) console.log(this.storageKey + " stored");
    }
  }

  public resetData(): void {
    if (this.isLocalStorageSupported) {
      if (!environment.production) console.log("Reset " + this.storageKey);
      this.localStorage.remove(this.storageKey);
      if (!environment.production)
        console.log(this.storageKey + "from base configuration");
      this.values = this.loadBaseData();
    }
  }

  public get isLocalStorageSupported(): boolean {
    return this.localStorage.isLocalStorageSupported;
  }

  public get exportableData(): T[] {
    return this.storedData;
  }

  protected get storedData(): T[] {
    return this.values;
  }

  public importData(data: any): void {
    if (!environment.production) {
      console.log("try import:");
      console.log(data);
    }
    let imported = this.convertData(data);
    if (!environment.production) {
      console.log("imported:");
      console.log(imported);
    }
    imported.forEach((e) => {
      e.id = this.genId();
      this.save(e);
    });
    this.storeData();
  }

  protected abstract convertData(data: any): T[];

  protected abstract castJsonObject(obj: T): T;
}
