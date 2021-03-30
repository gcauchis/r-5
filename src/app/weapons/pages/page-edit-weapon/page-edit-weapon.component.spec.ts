import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEditWeaponComponent } from './page-edit-weapon.component';

describe('PageEditWeaponComponent', () => {
  let component: PageEditWeaponComponent;
  let fixture: ComponentFixture<PageEditWeaponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageEditWeaponComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageEditWeaponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
