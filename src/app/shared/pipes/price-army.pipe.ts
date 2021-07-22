import { Pipe, PipeTransform } from "@angular/core";
import { Army } from "./../../core/models/army";
import { PriceService } from "./../../core/services/price.service";

@Pipe({
  name: "priceArmy",
})
export class PriceArmyPipe implements PipeTransform {
  constructor(private priceService: PriceService) {}
  async transform(army: Army): Promise<number> {
    return await this.priceService.computeArmy(army);
  }
}
