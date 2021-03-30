import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageViewWeaponComponent } from './page-view-weapon.component';

describe('PageViewWeaponComponent', () => {
  let component: PageViewWeaponComponent;
  let fixture: ComponentFixture<PageViewWeaponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageViewWeaponComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageViewWeaponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
