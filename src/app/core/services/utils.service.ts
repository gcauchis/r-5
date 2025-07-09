import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

/**
 * Utility service providing helper methods for enum and translation handling.
 */
@Injectable({
  providedIn: "root",
})
export class UtilsService {
  /**
   * Converts an enum to an array of key-value pairs using a naming function.
   * @param stringEnum The enum to convert.
   * @param nameFunction Function to get the display name for each enum value.
   * @returns An array of objects with 'key' and 'value' properties.
   */
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

  /**
   * Converts an enum to an array of key-value pairs with translated keys.
   * @param translate The translation service.
   * @param stringEnum The enum to convert.
   * @param keyFunction Function to get the translation key for each enum value.
   * @returns A promise resolving to an array of objects with translated 'key' and 'value' properties.
   */
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
    return Promise.resolve(keyValue);
  }
}
