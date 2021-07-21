import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRulesSelectorComponent } from './dialog-rules-selector.component';

describe('DialogRulesSelectorComponent', () => {
  let component: DialogRulesSelectorComponent;
  let fixture: ComponentFixture<DialogRulesSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRulesSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRulesSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
