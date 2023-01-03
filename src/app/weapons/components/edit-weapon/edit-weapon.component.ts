import { COMMA, ENTER } from "@angular/cdk/keycodes";
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { ExposiveWeaponSize } from "./../../../core/enums/exposive-weapon-size.enum";
import { WeaponType } from "./../../../core/enums/weapon-type.enum";
import { Weapon } from "./../../../core/models/weapon";
import { EnumUtilsService } from "./../../../core/services/enum-utils.service";
import { UtilsService } from "./../../../core/services/utils.service";
import { WeaponService } from "./../../../core/services/weapon.service";

@Component({
  selector: "app-edit-weapon",
  templateUrl: "./edit-weapon.component.html",
  styleUrls: ["./edit-weapon.component.css"],
})
export class EditWeaponComponent implements OnInit {
  WeaponType = WeaponType;

  weaponTypes: Promise<any[]>;
  weaponSizes: Promise<any[]>;
  possibleRules: string[];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  rulesControl = new FormControl();
  rulesFilteredOptions: Observable<string[]>;

  @ViewChild("ruleInput") ruleInput: ElementRef;
  @ViewChild("autoRules") matAutocomplete: MatAutocomplete;

  @Output() submited: EventEmitter<Weapon> = new EventEmitter<Weapon>();
  @Output() canceled: EventEmitter<any> = new EventEmitter<any>();

  @Input() weapon: Weapon;
  public form: FormGroup;

  constructor(
    private weaponService: WeaponService,
    private utils: UtilsService,
    private enumUtils: EnumUtilsService,
    private fb: FormBuilder,
    public translate: TranslateService
  ) {
    this.weaponTypes = this.utils.enumToKeyValueTranslate(
      this.translate,
      WeaponType,
      this.enumUtils.weaponTypeToBunbleString
    );
    this.weaponSizes = this.utils.enumToKeyValueTranslate(
      this.translate,
      ExposiveWeaponSize,
      this.enumUtils.exposiveWeaponSizeToBunbleString
    );
  }

  ngOnInit(): void {
    this.weaponService.rules.subscribe((res) => (this.possibleRules = res));
    this.rulesFilteredOptions = this.rulesControl.valueChanges.pipe(
      startWith(null),
      map((rule: string | null) =>
        rule ? this._filter(rule) : this.possibleRules.slice()
      )
    );
    this.form = this.fb.group({
      id: [this.weapon.id],
      weaponType: [this.weapon.weaponType],
      editable: [this.weapon.editable],
      name: [this.weapon.name, [Validators.required, Validators.minLength(2)]],
      power: [this.weapon.power],
      superPower: [this.weapon.superPower],
      rule: [this.weapon.rule.filter((r) => r != null)],
      superSuperPower: [this.weapon.superSuperPower],
      rangeMin: [this.weapon.rangeMin],
      range: [this.weapon.range],
      assault: [this.weapon.assault],
      heavy: [this.weapon.heavy],
      cover: [this.weapon.cover],
      size: [this.weapon.size],
      nonLethal: [this.weapon.nonLethal],
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.possibleRules.filter((rule) =>
      rule.toLowerCase().includes(filterValue)
    );
  }

  addRule(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our rule
    if ((value || "").trim()) {
      this.form.controls.rule.value.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }

    this.rulesControl.setValue("");
  }

  removeRule(rule: string): void {
    this.form.controls.rule.setValue(
      this.form.controls.rule.value.filter((r) => r != rule)
    );
  }

  selectedRule(event: MatAutocompleteSelectedEvent): void {
    this.form.controls.rule.value.push(event.option.viewValue);
    this.ruleInput.nativeElement.value = "";
    this.rulesControl.setValue(null);
  }

  submit(): void {
    let result = new Weapon(this.form.value);
    if (!result.nonLethal) {
      delete result.nonLethal;
    }
    if (result.weaponType == WeaponType.Melee) {
      delete result.range;
      delete result.rangeMin;
      delete result.assault;
      delete result.heavy;
      delete result.cover;
    }
    if (
      !(
        result.weaponType == WeaponType.Explosive ||
        result.weaponType == WeaponType.Grenade
      )
    ) {
      delete result.size;
    }
    this.submited.emit(result);
  }

  cancel(): void {
    this.canceled.emit();
  }
}
