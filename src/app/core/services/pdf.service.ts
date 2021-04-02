import { Injectable } from "@angular/core";
import { Army } from "../models/army";
import { VehicleType } from "./../enums/vehicle-type.enum";
import { WeaponType } from "./../enums/weapon-type.enum";
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
    console.log(context);

    this.appendArmy(context, army);
    this.savePDF(await context.save(), `${army.name}.pdf`);
  }

  private async appendArmy(context: PdfDrawContext, army: Army) {
    context.fontSize = 20;
    context.drawText(army.name, true);
    context.lineBreak();
    context.fontSize = 12;
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
    context.drawText(
      `${unit.name} / ${this.enumUtils.tacticalRoleToString(
        unit.tacticalRole
      )}`,
      true
    );
    if (unit.faction) {
      context.drawText(` (${unit.faction})`, true);
    }
    if (nb) {
      context.addHorizontalGap(40);
      context.drawText("Nbr : ", true);
      context.drawText(`${nb}`);
    }
    context.lineBreak();

    context.drawText("Prix : ", true);
    context.drawText(`${this.priceService.compute(unit)}`);
    context.lineBreak();
    if (unit.desc) {
      context.drawText("Description : ", true);
      context.drawText(`${unit.desc}`);
      context.lineBreak();
    }

    context.drawText("Mouvement : ", true);
    context.drawText(
      `${unit.tacticalMove}’’/${this.unitService.getRunMove(unit)}’’ +1D4’’`
    );
    context.lineBreak();

    context.drawText("DQM : ", true);
    context.drawText(`${this.enumUtils.diceToString(unit.dqm)}`);
    context.lineBreak();

    context.drawText("Sauvegarde : ", true);

    if (unit.armor) {
      context.drawText(unit.armor.protection);
    } else {
      context.drawText("Aucune sauvegarde");
    }
    context.drawText(" / PV : ", true);
    context.drawText(`${unit.pv}`);
    context.lineBreak();

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
    context.drawText(
      `${vehicle.name} / ${this.enumUtils.vehicleTypeToString(vehicle.type)}`,
      true
    );
    if (vehicle.faction) {
      context.drawText(` (${vehicle.faction})`, true);
    }
    if (nb) {
      context.addHorizontalGap(40);
      context.drawText("Nbr : ", true);
      context.drawText(`${nb}`);
    }
    context.lineBreak();

    context.drawText("Prix : ", true);
    context.drawText(`${this.priceService.compute(vehicle)}`);
    context.lineBreak();

    context.drawText("Type de mouvement : ", true);
    context.drawText(`${this.enumUtils.moveTypeToString(vehicle.moveType)}`);
    context.lineBreak();

    context.drawText("Mouvement : ", true);
    context.drawText(
      `${vehicle.tacticalMove}’’/${this.vehicleService.getRunMove(vehicle)}’’`
    );
    context.lineBreak();

    if (vehicle.type == VehicleType.TroopTransport) {
      context.drawText("Place disponible pour le transport : ", true);
      context.drawText(`${vehicle.transportSpace}`);
      context.lineBreak();
    }

    context.drawText("Blindage : ", true);
    context.drawText(`${this.enumUtils.diceToString(vehicle.armor)}`);
    context.drawText(" / PS :  : ", true);
    context.drawText(`${vehicle.structure}`);
    context.lineBreak();

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
    if (unit.weapons) {
      let meleeWeapons = unit.weapons.filter(
        (w) => w.weaponType == WeaponType.Melee
      );
      if (meleeWeapons.length > 0) {
        context.addVerticalGap(5);
        context.basicDrawTestLine("Mélée :", true);
        for (let weapon of meleeWeapons) {
          this.appendWeapon(context, weapon, unit);
        }
      }

      let shootWeapons = unit.weapons.filter(
        (w) => w.weaponType == WeaponType.Shoot
      );
      if (shootWeapons.length > 0) {
        context.addVerticalGap(5);
        context.basicDrawTestLine("Tir :", true);
        for (let weapon of shootWeapons) {
          this.appendWeapon(context, weapon, unit);
        }
      }

      let explosiveWeapons = unit.weapons.filter(
        (w) => w.weaponType == WeaponType.Explosive
      );
      if (explosiveWeapons.length > 0) {
        context.addVerticalGap(5);
        context.basicDrawTestLine("Explosif :", true);
        for (let weapon of explosiveWeapons) {
          this.appendWeapon(context, weapon, unit);
        }
      }

      let grenadeWeapons = unit.weapons.filter(
        (w) => w.weaponType == WeaponType.Grenade
      );
      if (grenadeWeapons.length > 0) {
        context.addVerticalGap(5);
        context.basicDrawTestLine("Grenade :", true);
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
