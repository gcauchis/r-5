import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

const KEY_PREFIX: string = "R-5.storage.";

@Injectable({
  providedIn: "root"
})
export class LocalStorageService {
  localStorage: Storage;
  changes$ = new Subject();

  constructor() {
    this.localStorage = window.localStorage;
    //this.clear();
  }

  get(key: string): any {
    if (this.isLocalStorageSupported) {
      return JSON.parse(this.localStorage.getItem(KEY_PREFIX + key));
    }
    return null;
  }

  set(key: string, value: any): boolean {
    if (this.isLocalStorageSupported) {
      let usedKey = KEY_PREFIX + key;
      this.localStorage.setItem(usedKey, JSON.stringify(value));
      this.changes$.next({
        type: "set",
        usedKey,
        value
      });
      return true;
    }
    return false;
  }

  remove(key: string): boolean {
    if (this.isLocalStorageSupported) {
      let usedKey = KEY_PREFIX + key;
      this.localStorage.removeItem(usedKey);
      this.changes$.next({
        type: "remove",
        usedKey
      });
      return true;
    }
    return false;
  }

  get isLocalStorageSupported(): boolean {
    return !!this.localStorage;
  }

  clear(): void {
    if (this.isLocalStorageSupported) {
      this.localStorage.clear();
      console.log("clear local storage");
    }
  }
}
