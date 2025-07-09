import { Injectable } from "@angular/core";
import { FactionableInterface } from "./../interfaces/factionable-interface";

/**
 * Service for managing factions.
 * Provides utility methods to extract and sort unique faction names from a list of factionable objects.
 */
@Injectable({
  providedIn: "root",
})
export class FactionService {
  /**
   * Returns a sorted array of unique faction names from the given list of factionable objects.
   * @param factionable The array of objects implementing FactionableInterface.
   * @returns A sorted array of unique, non-empty faction names.
   */
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
