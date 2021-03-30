import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageViewArmyComponent } from './page-view-army.component';

describe('PageViewArmyComponent', () => {
  let component: PageViewArmyComponent;
  let fixture: ComponentFixture<PageViewArmyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageViewArmyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageViewArmyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
