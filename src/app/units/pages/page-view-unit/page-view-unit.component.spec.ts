import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageViewUnitComponent } from './page-view-unit.component';

describe('PageViewUnitComponent', () => {
  let component: PageViewUnitComponent;
  let fixture: ComponentFixture<PageViewUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageViewUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageViewUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
