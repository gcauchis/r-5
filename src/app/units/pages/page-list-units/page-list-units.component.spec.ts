import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageListUnitsComponent } from './page-list-units.component';

describe('PageListUnitsComponent', () => {
  let component: PageListUnitsComponent;
  let fixture: ComponentFixture<PageListUnitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageListUnitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageListUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
