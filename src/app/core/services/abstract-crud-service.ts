import { BehaviorSubject, Observable, Subject } from "rxjs";
import { IdentitfiableInterface } from "../interfaces/identitfiable-interface";
import { LocalStorageService } from "./local-storage.service";

export abstract class AbstractCrudService<T extends IdentitfiableInterface> {
  private data$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

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
        this.data$.next(this.loadBaseData());
        this.storeData();
      } else {
        console.log(this.storageKey + " retrieved");
        this.data$.next(tmpData);
      }
    } else {
      console.log(
        this.storageKey + " from base configuration (no local persistance)"
      );
      this.data$.next(this.loadBaseData().map((d) => this.castJsonObject(d)));
    }

    console.log(this.data$.value);
    // TODO see if works
    this.data$.subscribe((res) => this.storeData());
    // or test
    // this.data$ = this.data$.pipe(tap((res) => this.storeData()));
  }

  protected abstract loadBaseData(): T[];

  private genId(): number {
    return this.data$.value.length > 0
      ? Math.max(...this.data$.value.map((w) => w.id)) + 1
      : this.minId;
  }

  protected abstract get minId(): number;

  public get collection(): Subject<T[]> {
    return this.data$;
  }

  public get(id: number): Observable<T> {
    return new Observable<T>((obs) => {
      if (id != null) {
        obs.next(this.data$.value.find((w) => w.id == id));
      } else {
        obs.next(null);
      }
      obs.complete();
    });
  }

  public save(value: T): void {
    if (value.id) {
      this.get(value.id).subscribe((found) => {
        if (found) {
          Object.assign(found, value);
        } else {
          this.data$.value.push(value);
        }
        this.data$.next(this.data$.value);
      });
    } else {
      value.id = this.genId();
      this.data$.value.push(value);
      this.data$.next(this.data$.value);
    }
  }

  public remove(value: T): void {
    this.data$.next(this.data$.value.filter((d) => d.id != value.id));
  }

  public storeData(): void {
    if (this.isLocalStorageSupported) {
      this.localStorage.set(this.storageKey, this.data$.value);
      console.log(this.storageKey + " stored");
    }
  }

  public resetData(): void {
    if (this.isLocalStorageSupported) {
      console.log("Reset " + this.storageKey);
      this.localStorage.remove(this.storageKey);
      console.log(this.storageKey + "from base configuration");
      this.data$.next(this.loadBaseData());
      this.storeData();
    }
  }

  public get isLocalStorageSupported(): boolean {
    return this.localStorage.isLocalStorageSupported;
  }

  public get exportableData(): T[] {
    return this.storedData;
  }

  protected get storedData(): T[] {
    return this.data$.value;
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
