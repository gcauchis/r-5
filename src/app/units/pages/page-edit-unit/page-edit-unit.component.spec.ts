import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEditUnitComponent } from './page-edit-unit.component';

describe('PageEditUnitComponent', () => {
  let component: PageEditUnitComponent;
  let fixture: ComponentFixture<PageEditUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageEditUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageEditUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
