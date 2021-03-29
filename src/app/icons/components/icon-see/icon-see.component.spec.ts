import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconSeeComponent } from './icon-see.component';

describe('IconSeeComponent', () => {
  let component: IconSeeComponent;
  let fixture: ComponentFixture<IconSeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconSeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconSeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
