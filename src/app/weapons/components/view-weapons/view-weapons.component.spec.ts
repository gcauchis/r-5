import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWeaponsComponent } from './view-weapons.component';

describe('ViewWeaponsComponent', () => {
  let component: ViewWeaponsComponent;
  let fixture: ComponentFixture<ViewWeaponsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewWeaponsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewWeaponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
