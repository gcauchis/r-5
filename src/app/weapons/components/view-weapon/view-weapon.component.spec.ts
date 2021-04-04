import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWeaponComponent } from './view-weapon.component';

describe('ViewWeaponComponent', () => {
  let component: ViewWeaponComponent;
  let fixture: ComponentFixture<ViewWeaponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewWeaponComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewWeaponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
