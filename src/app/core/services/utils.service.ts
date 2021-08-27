import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

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

  public async enumToKeyValueTranslate(
    translate: TranslateService,
    stringEnum,
    keyFunction: (enumValue: any) => string
  ): Promise<any[]> {
    const keyValue = [];
    const keys = Object.keys(stringEnum);

    for (const k of keys) {
      let enumVal = stringEnum[k];
      let key = keyFunction(enumVal);
      if (key != null)
        keyValue.push({
          key: await translate.get(key).toPromise(),
          value: enumVal,
        });
    }
    return new Promise((resole) => resole(keyValue));
  }
}
