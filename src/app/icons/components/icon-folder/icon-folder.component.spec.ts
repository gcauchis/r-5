import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconFolderComponent } from './icon-folder.component';

describe('IconFolderComponent', () => {
  let component: IconFolderComponent;
  let fixture: ComponentFixture<IconFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconFolderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
