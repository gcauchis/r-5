import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UtilsService {
  public enumToKeyValue(
    stringEnum,
    nameFunction: (enumValue: any) => string
  ): any[] {
    const keyValue = [];
    const keys = Object.keys(stringEnum);

    for (const k of keys) {
      let enumVal = stringEnum[k];
      let key = nameFunction(enumVal);
      if (key != null) keyValue.push({ key: key, value: enumVal });
    }
    return keyValue;
  }
}
