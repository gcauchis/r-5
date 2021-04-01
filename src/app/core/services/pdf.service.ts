import { Injectable } from "@angular/core";
import { VehicleType } from "../enums/vehicle-type.enum";
import { WeaponType } from "../enums/weapon-type.enum";
import { Army } from "../models/army";
import { CombatUnitInterface } from "./../interfaces/combat-unit-interface";
import { PdfDrawContext } from "./../models/pdf-draw-context";
import { Unit } from "./../models/unit";
import { Vehicle } from "./../models/vehicle";
import { Weapon } from "./../models/weapon";
import { EnumUtilsService } from "./enum-utils.service";
import { PriceService } from "./price.service";
import { UnitService } from "./unit.service";
import { VehicleService } from "./vehicle.service";

const PAGE_MARGIN = 40;

@Injectable({
  providedIn: "root",
})
export class PdfService {
  constructor(
    private unitService: UnitService,
    private vehicleService: VehicleService,
    private enumUtils: EnumUtilsService,
    public priceService: PriceService
  ) {}

  public async printArmy(army: Army) {
    const context = await PdfDrawContext.create();
    this.appendArmy(context, army);
    this.savePDF(await context.save(), `${army.name}.pdf`);
  }

  private async appendArmy(context: PdfDrawContext, army: Army) {
    context.basicDrawTestLine(army.name);
    if (army.desc) {
      context.basicDrawTestLine(army.desc);
    }
    for (let unit of army.units) {
      context.addVerticalGap(10);
      await this.appendUnit(context, this.unitService.get(unit.id), unit.count);
    }

    for (let vehicle of army.vehicles) {
      context.addVerticalGap(10);
      await this.appendVehicle(
        context,
        this.vehicleService.get(vehicle.id),
        vehicle.count
      );
    }
  }

  private async appendUnit(context: PdfDrawContext, unit: Unit, nb?: number) {
    let title = `${unit.name} / ${this.enumUtils.tacticalRoleToString(
      unit.tacticalRole
    )}`;
    if (unit.faction) {
      title += ` (${unit.faction})`;
    }
    if (nb) {
      title += `\tNbr : ${nb}`;
    }
    context.basicDrawTestLine(title);
    context.basicDrawTestLine(`Prix : ${this.priceService.compute(unit)}`);
    if (unit.desc) {
      context.basicDrawTestLine(`Description : ${unit.desc}`);
    }
    context.basicDrawTestLine(
      `Mouvement : ${unit.tacticalMove}’’/${this.unitService.getRunMove(
        unit
      )}’’ +1D4’’`
    );
    context.basicDrawTestLine(`DQM : ${this.enumUtils.diceToString(unit.dqm)}`);

    let protection = "Sauvegarde : ";
    if (unit.armor) {
      protection += unit.armor.protection;
    } else {
      protection += "Aucune sauvegarde";
    }
    protection += ` / PV : ${unit.pv}`;
    context.basicDrawTestLine(protection);

    this.appendWeapons(context, unit);
    //TODO IMAGE

    // if (unit.imgBase64) {
    //   const image = await fetch(unit.imgBase64);
    //   const pdfImage = await context.document.embedJpg(image.arrayBuffer);
    //   context.currentPage.drawImage(pdfImage);
    // }
  }

  private async appendVehicle(
    context: PdfDrawContext,
    vehicle: Vehicle,
    nb?: number
  ) {
    let title = `${vehicle.name} / ${this.enumUtils.vehicleTypeToString(
      vehicle.type
    )}`;
    if (vehicle.faction) {
      title += ` (${vehicle.faction})`;
    }
    if (nb) {
      title += `\tNbr : ${nb}`;
    }
    context.basicDrawTestLine(title);
    context.basicDrawTestLine(`Prix : ${this.priceService.compute(vehicle)}`);
    context.basicDrawTestLine(
      `Type de mouvement : ${this.enumUtils.moveTypeToString(vehicle.moveType)}`
    );
    context.basicDrawTestLine(
      `Mouvement : ${vehicle.tacticalMove}’’/${this.vehicleService.getRunMove(
        vehicle
      )}’’`
    );
    if (vehicle.type == VehicleType.TroopTransport) {
      context.basicDrawTestLine(
        `Place disponible pour le transport : ${vehicle.transportSpace}`
      );
    }
    context.basicDrawTestLine(
      `Blindage : ${this.enumUtils.diceToString(vehicle.armor)} / PS : ${
        vehicle.structure
      }`
    );
    this.appendWeapons(context, vehicle);

    //TODO IMAGE

    // if (unit.imgBase64) {
    //   const image = await fetch(unit.imgBase64);
    //   const pdfImage = await context.document.embedJpg(image.arrayBuffer);
    //   context.currentPage.drawImage(pdfImage);
    // }
  }

  private appendWeapons(
    context: PdfDrawContext,
    unit: CombatUnitInterface
  ): void {
    console.log(unit.weapons);
    if (unit.weapons) {
      let meleeWeapons = unit.weapons.filter(
        (w) => w.weaponType == WeaponType.Melee
      );
      if (meleeWeapons.length > 0) {
        context.addVerticalGap(5);
        context.basicDrawTestLine("Mélée :");
        for (let weapon of meleeWeapons) {
          this.appendWeapon(context, weapon, unit);
        }
      }

      let shootWeapons = unit.weapons.filter(
        (w) => w.weaponType == WeaponType.Shoot
      );
      if (shootWeapons.length > 0) {
        context.addVerticalGap(5);
        context.basicDrawTestLine("Tir :");
        for (let weapon of shootWeapons) {
          this.appendWeapon(context, weapon, unit);
        }
      }

      let explosiveWeapons = unit.weapons.filter(
        (w) => w.weaponType == WeaponType.Explosive
      );
      if (explosiveWeapons.length > 0) {
        context.addVerticalGap(5);
        context.basicDrawTestLine("Explosif :");
        for (let weapon of explosiveWeapons) {
          this.appendWeapon(context, weapon, unit);
        }
      }

      let grenadeWeapons = unit.weapons.filter(
        (w) => w.weaponType == WeaponType.Grenade
      );
      if (grenadeWeapons.length > 0) {
        context.addVerticalGap(5);
        context.basicDrawTestLine("Grenade :");
        for (let weapon of grenadeWeapons) {
          this.appendWeapon(context, weapon, unit);
        }
      }
    }
  }

  private appendWeapon(
    context: PdfDrawContext,
    weapon: Weapon,
    unit: CombatUnitInterface
  ): void {
    let weaponStr = weapon.name;
    if (
      weapon.range &&
      weapon.range > 0 &&
      weapon.weaponType != WeaponType.Melee
    ) {
      if (weapon.rangeMin) {
        weaponStr += `+${weapon.rangeMin}'' à `;
      }
      weaponStr += `${weapon.range}''`;
    }
    weaponStr += `${weapon.power}''${this.enumUtils.diceToString(unit.dc)}`;
    if (weapon.superPower) {
      weaponStr += "++";
      if (weapon.superSuperPower) {
        weaponStr += "[++";
      }
    }
    if (weapon.rule && weapon.rule.length > 0) {
      weaponStr += ` (${weapon.rule.join(", ")})`;
    }
    context.basicDrawTestLine(weaponStr);
  }

  private savePDF(content: Uint8Array, name: string) {
    var blob = new Blob([content], { type: "application/json" });
    var FileSaver = require("file-saver");
    FileSaver.saveAs(blob, name);
  }
}
