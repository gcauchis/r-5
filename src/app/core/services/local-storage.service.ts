import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

const KEY_PREFIX: string = "R-5.storage.";

/**
 * Service for managing local storage operations.
 * Provides methods to get, set, remove, and clear items in local storage.
 * Emits changes through a Subject for reactive updates.
 */
@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  localStorage: Storage;
  changes$ = new Subject();

  /**
   * Creates an instance of LocalStorageService.
   * Initializes the localStorage property.
   */
  constructor() {
    this.localStorage = window.localStorage;
  }

  /**
   * Retrieves a value from local storage by key.
   * @param key The key to retrieve.
   * @returns The parsed value from local storage, or null if not found or unsupported.
   */
  get(key: string): any {
    if (this.isLocalStorageSupported) {
      let stored = this.localStorage.getItem(KEY_PREFIX + key);
      if (stored && stored != "undefined")
        return JSON.parse(this.localStorage.getItem(KEY_PREFIX + key));
      else return null;
    }
    return null;
  }

  /**
   * Stores a value in local storage under the specified key.
   * @param key The key to use.
   * @param value The value to store.
   * @returns True if the value was stored, false otherwise.
   */
  set(key: string, value: any): boolean {
    if (this.isLocalStorageSupported) {
      let usedKey = KEY_PREFIX + key;
      this.localStorage.setItem(usedKey, JSON.stringify(value));
      this.changes$.next({
        type: "set",
        usedKey,
        value,
      });
      return true;
    }
    return false;
  }

  /**
   * Removes a value from local storage by key.
   * @param key The key to remove.
   * @returns True if the value was removed, false otherwise.
   */
  remove(key: string): boolean {
    if (this.isLocalStorageSupported) {
      let usedKey = KEY_PREFIX + key;
      this.localStorage.removeItem(usedKey);
      this.changes$.next({
        type: "remove",
        usedKey,
      });
      return true;
    }
    return false;
  }

  /**
   * Checks if local storage is supported.
   * @returns True if local storage is supported, false otherwise.
   */
  get isLocalStorageSupported(): boolean {
    return !!this.localStorage;
  }

  /**
   * Clears all data from local storage.
   */
  clear(): void {
    if (this.isLocalStorageSupported) {
      this.localStorage.clear();
    }
  }
}
