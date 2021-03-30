import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEditVehicleComponent } from './page-edit-vehicle.component';

describe('PageEditVehicleComponent', () => {
  let component: PageEditVehicleComponent;
  let fixture: ComponentFixture<PageEditVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageEditVehicleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageEditVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
