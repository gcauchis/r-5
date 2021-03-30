import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEditArmyComponent } from './page-edit-army.component';

describe('PageEditArmyComponent', () => {
  let component: PageEditArmyComponent;
  let fixture: ComponentFixture<PageEditArmyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageEditArmyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageEditArmyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
