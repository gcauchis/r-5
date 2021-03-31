import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UtilsService {
  constructor() {}

  public stringEnumToKeyValueold(
    stringEnum,
    callbackfn: (value: string, index: number, array: string[]) => unknown = (
      value,
      index
    ) => {
      return true;
    }
  ): any[] {
    const keyValue = [];
    const keys = Object.keys(stringEnum).filter(callbackfn);

    for (const k of keys) {
      keyValue.push({ key: k, value: stringEnum[k] });
    }

    return keyValue;
  }

  public enumToKeyValue(
    stringEnum,
    nameFunction: (enumValue: any) => string ): any[] {
    const keyValue = [];
    const keys = Object.keys(stringEnum)

    for (const k of keys) {
      let enumVal = stringEnum[k];
      let key = nameFunction(enumVal);
      if (key != null)
        keyValue.push({ key: key, value: enumVal });
    }
    return keyValue;
  }
}
