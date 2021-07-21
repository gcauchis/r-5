import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWeaponComponent } from './edit-weapon.component';

describe('EditWeaponComponent', () => {
  let component: EditWeaponComponent;
  let fixture: ComponentFixture<EditWeaponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWeaponComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWeaponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
