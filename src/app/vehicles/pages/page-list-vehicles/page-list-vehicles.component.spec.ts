import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageListVehiclesComponent } from './page-list-vehicles.component';

describe('PageListVehiclesComponent', () => {
  let component: PageListVehiclesComponent;
  let fixture: ComponentFixture<PageListVehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageListVehiclesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageListVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
