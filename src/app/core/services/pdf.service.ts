import { Injectable } from "@angular/core";
import { saveAs } from "file-saver";
import { PDFImage } from "pdf-lib";
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

  public async printArmy(army: Army): Promise<PdfDrawContext> {
    const context = await PdfDrawContext.create();
    this.appendArmy(context, army);
    return context;
  }

  public async printUnit(unit: Unit): Promise<PdfDrawContext> {
    const context = await PdfDrawContext.create();
    this.appendUnit(context, unit);
    return context;
  }

  public async printVehicle(vehicle: Vehicle): Promise<PdfDrawContext> {
    const context = await PdfDrawContext.create();
    this.appendVehicle(context, vehicle);
    return context;
  }

  private async appendArmy(context: PdfDrawContext, army: Army) {
    context.fontSize = 20;
    context.drawText(
      army.name +
        " (" +
        $localize`:@@Label.UnitPrice:Price` +
        $localize`:@@Label.DbDot::` +
        " " +
        (await this.priceService.computeArmy(army)) +
        ")",
      true
    );
    context.lineBreak();
    context.fontSize = 12;
    if (army.desc) {
      context.basicDrawTestLine(army.desc);
    }
    for (let unit of army.units) {
      context.addVerticalGap(10);
      await this.appendUnit(
        context,
        await this.unitService.get(unit.id).toPromise(),
        unit.count
      );
    }

    for (let vehicle of army.vehicles) {
      context.addVerticalGap(10);
      await this.appendVehicle(
        context,
        await this.vehicleService.get(vehicle.id).toPromise(),
        vehicle.count
      );
    }
  }

  private async appendUnit(context: PdfDrawContext, unit: Unit, nb?: number) {
    if (unit.imgBase64) {
      const image = await this.convertToEmbedecImage(context, unit.imgBase64);
      if (image != null) {
        let imgWidth = 100;
        let imgHeight = 100;
        if (image.width > image.height) {
          imgHeight = (image.height / image.width) * imgWidth;
        } else if (image.height > image.width) {
          imgWidth = (image.width / image.height) * imgHeight;
        }
        context.currentPage.drawImage(image, {
          x: context.pageWidth - context.pageMargin - imgWidth,
          y: context.currentY - imgHeight,
          width: imgWidth,
          height: imgHeight,
        });
      }
    }

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
      context.drawText(
        $localize`:@@Label.Nbr:Nbr` + $localize`:@@Label.DbDot::` + " ",
        true
      );
      context.drawText(`${nb}`);
    }
    context.lineBreak();

    context.drawText(
      $localize`:@@Label.UnitPrice:Price` + $localize`:@@Label.DbDot::` + " ",
      true
    );
    context.drawText(`${this.priceService.compute(unit)}`);
    context.lineBreak();
    if (unit.desc) {
      context.drawText(
        $localize`:@@Label.Description:Description` +
          $localize`:@@Label.DbDot::` +
          " ",
        true
      );
      context.drawText(`${unit.desc}`);
      context.lineBreak();
    }

    context.drawText(
      $localize`:@@Label.Move:Move` + $localize`:@@Label.DbDot::` + " ",
      true
    );
    context.drawText(
      `${unit.tacticalMove}’’/${this.unitService.getRunMove(unit)}’’ +1D4’’`
    );
    context.lineBreak();

    context.drawText(
      $localize`:@@Label.DQM:DQM` + $localize`:@@Label.DbDot::` + " ",
      true
    );
    context.drawText(`${this.enumUtils.diceToString(unit.dqm)}`);
    context.lineBreak();

    context.drawText(
      $localize`:@@Label.Protection:Protection` +
        $localize`:@@Label.DbDot::` +
        " ",
      true
    );

    if (unit.armor) {
      context.drawText(unit.armor.protection);
    } else {
      context.drawText($localize`:@@Label.NoProtection:No protection`);
    }
    context.drawText(
      " / " + $localize`:@@Label.HP:HP` + $localize`:@@Label.DbDot::` + " ",
      true
    );
    context.drawText(`${unit.pv}`);
    context.lineBreak();

    this.appendWeapons(context, unit);
  }

  private async appendVehicle(
    context: PdfDrawContext,
    vehicle: Vehicle,
    nb?: number
  ) {
    if (vehicle.imgBase64) {
      const image = await this.convertToEmbedecImage(
        context,
        vehicle.imgBase64
      );
      if (image != null) {
        let imgWidth = 100;
        let imgHeight = 100;
        if (image.width > image.height) {
          imgHeight = (image.height / image.width) * imgWidth;
        } else if (image.height > image.width) {
          imgWidth = (image.width / image.height) * imgHeight;
        }
        context.currentPage.drawImage(image, {
          x: context.pageWidth - context.pageMargin - imgWidth,
          y: context.currentY - imgHeight,
          width: imgWidth,
          height: imgHeight,
        });
      }
    }

    context.drawText(
      `${vehicle.name} / ${this.enumUtils.vehicleTypeToString(vehicle.type)}`,
      true
    );
    if (vehicle.faction) {
      context.drawText(` (${vehicle.faction})`, true);
    }
    if (nb) {
      context.addHorizontalGap(40);
      context.drawText(
        $localize`:@@Label.Nbr:Nbr` + $localize`:@@Label.DbDot::` + " ",
        true
      );
      context.drawText(`${nb}`);
    }
    context.lineBreak();

    context.drawText(
      $localize`:@@Label.UnitPrice:Price` + $localize`:@@Label.DbDot::` + " ",
      true
    );
    context.drawText(`${this.priceService.compute(vehicle)}`);
    context.lineBreak();

    context.drawText(
      $localize`:@@Label.MoveType:Move type` +
        $localize`:@@Label.DbDot::` +
        " ",
      true
    );
    context.drawText(`${this.enumUtils.moveTypeToString(vehicle.moveType)}`);
    context.lineBreak();

    context.drawText(
      $localize`:@@Label.Move:Move` + $localize`:@@Label.DbDot::` + " ",
      true
    );
    context.drawText(
      `${vehicle.tacticalMove}’’/${this.vehicleService.getRunMove(vehicle)}’’`
    );
    context.lineBreak();

    if (vehicle.type == VehicleType.TroopTransport) {
      context.drawText(
        $localize`:@@Label.TransportSpace:Transport space` +
          $localize`:@@Label.DbDot::` +
          " ",
        true
      );
      context.drawText(`${vehicle.transportSpace}`);
      context.lineBreak();
    }

    context.drawText(
      $localize`:@@Label.Armor:Armor` + $localize`:@@Label.DbDot::` + " ",
      true
    );
    context.drawText(`${this.enumUtils.diceToString(vehicle.armor)}`);
    context.drawText(
      " / " + $localize`:@@Label.SP:SP` + $localize`:@@Label.DbDot::` + " ",
      true
    );
    context.drawText(`${vehicle.structure}`);
    context.lineBreak();

    this.appendWeapons(context, vehicle);
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
        context.basicDrawTestLine(
          $localize`:@@Label.Melee:Melee` + $localize`:@@Label.DbDot::`,
          true
        );
        for (let weapon of meleeWeapons) {
          this.appendWeapon(context, weapon, unit);
        }
      }

      let shootWeapons = unit.weapons.filter(
        (w) => w.weaponType == WeaponType.Shoot
      );
      if (shootWeapons.length > 0) {
        context.addVerticalGap(5);
        context.basicDrawTestLine(
          $localize`:@@Label.Shoot:Shoot` + $localize`:@@Label.DbDot::`,
          true
        );
        for (let weapon of shootWeapons) {
          this.appendWeapon(context, weapon, unit);
        }
      }

      let explosiveWeapons = unit.weapons.filter(
        (w) => w.weaponType == WeaponType.Explosive
      );
      if (explosiveWeapons.length > 0) {
        context.addVerticalGap(5);
        context.basicDrawTestLine(
          $localize`:@@Label.Explosive:Explosive` + $localize`:@@Label.DbDot::`,
          true
        );
        for (let weapon of explosiveWeapons) {
          this.appendWeapon(context, weapon, unit);
        }
      }

      let grenadeWeapons = unit.weapons.filter(
        (w) => w.weaponType == WeaponType.Grenade
      );
      if (grenadeWeapons.length > 0) {
        context.addVerticalGap(5);
        context.basicDrawTestLine(
          $localize`:@@Label.Grenade:Grenade` + $localize`:@@Label.DbDot::`,
          true
        );
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
        weaponStr +=
          `+${weapon.rangeMin}'' ` + $localize`:@@Label.RangeTo:to` + " ";
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

  public savePDF(context: PdfDrawContext, name: string) {
    context.save().then((content) => {
      let blob = new Blob([content], { type: "application/json" });
      saveAs(blob, name);
    });
  }

  public saveAsBase64(context: PdfDrawContext): Promise<string> {
    return context.document.saveAsBase64({ dataUri: true });
  }

  private async convertToEmbedecImage(
    context: PdfDrawContext,
    imgBase64: any
  ): Promise<PDFImage> {
    let result: Promise<PDFImage> = null;
    if (imgBase64.includes("image/png"))
      result = context.document.embedPng(imgBase64);
    else if (
      imgBase64.includes("image/jpg") ||
      imgBase64.includes("image/jpeg")
    )
      result = context.document.embedJpg(imgBase64);
    else
      result = new Promise<PDFImage>((resolve, reject) =>
        reject("Unsuported image type")
      );

    return result;
  }
}
