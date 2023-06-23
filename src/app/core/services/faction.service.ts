import { Injectable } from "@angular/core";
import { FactionableInterface } from "./../interfaces/factionable-interface";

@Injectable({
  providedIn: "root",
})
export class FactionService {
  public getFactions(factionable: FactionableInterface[]): string[] {
    return factionable
      .map((u) => u.faction)
      .filter(
        (value, index, self) =>
          value && value != "" && self.indexOf(value) === index
      )
      .sort((a, b) => a.localeCompare(b));
  }
}
