import { BehaviorSubject, Observable, Subject } from "rxjs";
import { IdentitfiableInterface } from "../interfaces/identitfiable-interface";
import { environment } from "./../../../environments/environment";
import { LocalStorageService } from "./local-storage.service";

/**
 * Abstract CRUD service for managing collections of identifiable objects with local storage support.
 * Provides basic create, read, update, and delete operations, as well as import/export and reset functionality.
 *
 * @template T Type of objects managed by the service, must implement IdentitfiableInterface.
 */
export abstract class AbstractCrudService<T extends IdentitfiableInterface> {
  private _values: T[] = [];
  private data$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>(this._values);

  /**
   * Creates an instance of AbstractCrudService.
   * Loads data from local storage if available, otherwise loads base data.
   * Subscribes to changes for automatic persistence.
   *
   * @param localStorage The local storage service used for persistence.
   * @param storageKey The key used to store and retrieve data from local storage.
   */
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

  /**
   * Sets the internal values array and notifies subscribers.
   * @param values The new array of values.
   */
  private set values(values: T[]) {
    this._values = values.map((d) => this.castJsonObject(d));
    this.data$.next(this._values);
  }

  /**
   * Gets the current array of values.
   * @returns The array of values.
   */
  private get values(): T[] {
    return this._values;
  }

  /**
   * Loads the base data for the collection.
   * Must be implemented by subclasses.
   * @returns The base data array.
   */
  protected abstract loadBaseData(): T[];

  /**
   * Generates a new unique ID for an item.
   * @returns The generated ID.
   */
  private genId(): number {
    return this.values.length > 0
      ? Math.max(...this.values.map((w) => w.id)) + 1
      : this.minId;
  }

  /**
   * Gets the minimum allowed ID.
   * Must be implemented by subclasses.
   * @returns The minimum ID.
   */
  protected abstract get minId(): number;

  /**
   * Gets the observable collection of items.
   * @returns The subject emitting the collection.
   */
  public get collection(): Subject<T[]> {
    return this.data$;
  }

  /**
   * Retrieves an item by its ID.
   * @param id The ID of the item.
   * @param defaultValue The default value to return if not found.
   * @returns An observable emitting the found item or the default value.
   */
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

  /**
   * Saves an item to the collection. If the item has an ID, it updates the existing item; otherwise, it creates a new one.
   * @param value The item to save.
   */
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

  /**
   * Removes an item from the collection.
   * @param value The item to remove.
   */
  public remove(value: T): void {
    this.values = this.values.filter((d) => d.id != value.id);
  }

  /**
   * Persists the current collection to local storage.
   */
  public storeData(): void {
    if (this.isLocalStorageSupported) {
      this.localStorage.set(this.storageKey, this.values);
      if (!environment.production) console.log(this.storageKey + " stored");
    }
  }

  /**
   * Resets the collection to its base data and clears local storage.
   */
  public resetData(): void {
    if (this.isLocalStorageSupported) {
      if (!environment.production) console.log("Reset " + this.storageKey);
      this.localStorage.remove(this.storageKey);
      if (!environment.production)
        console.log(this.storageKey + "from base configuration");
      this.values = this.loadBaseData();
    }
  }

  /**
   * Checks if local storage is supported.
   * @returns True if local storage is supported, false otherwise.
   */
  public get isLocalStorageSupported(): boolean {
    return this.localStorage.isLocalStorageSupported;
  }

  /**
   * Gets the data that can be exported.
   * @returns The exportable data array.
   */
  public get exportableData(): T[] {
    return this.storedData;
  }

  /**
   * Gets the stored data.
   * @returns The stored data array.
   */
  protected get storedData(): T[] {
    return this.values;
  }

  /**
   * Imports data into the collection.
   * @param data The data to import.
   */
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

  /**
   * Converts imported data to the correct type.
   * Must be implemented by subclasses.
   * @param data The data to convert.
   * @returns The converted data array.
   */
  protected abstract convertData(data: any): T[];

  /**
   * Casts a JSON object to the correct type.
   * Must be implemented by subclasses.
   * @param obj The object to cast.
   * @returns The cast object.
   */
  protected abstract castJsonObject(obj: T): T;
}
