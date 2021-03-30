import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageListArmiesComponent } from './page-list-armies.component';

describe('PageListArmiesComponent', () => {
  let component: PageListArmiesComponent;
  let fixture: ComponentFixture<PageListArmiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageListArmiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageListArmiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
