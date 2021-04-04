import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewArmyComponent } from './view-army.component';

describe('ViewArmyComponent', () => {
  let component: ViewArmyComponent;
  let fixture: ComponentFixture<ViewArmyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewArmyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewArmyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
