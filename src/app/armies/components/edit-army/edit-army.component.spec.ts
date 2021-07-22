import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditArmyComponent } from './edit-army.component';

describe('EditArmyComponent', () => {
  let component: EditArmyComponent;
  let fixture: ComponentFixture<EditArmyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditArmyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditArmyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
