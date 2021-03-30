import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageViewVehicleComponent } from './page-view-vehicle.component';

describe('PageViewVehicleComponent', () => {
  let component: PageViewVehicleComponent;
  let fixture: ComponentFixture<PageViewVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageViewVehicleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageViewVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
