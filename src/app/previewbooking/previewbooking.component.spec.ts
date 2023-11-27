import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewbookingComponent } from './previewbooking.component';

describe('PreviewbookingComponent', () => {
  let component: PreviewbookingComponent;
  let fixture: ComponentFixture<PreviewbookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreviewbookingComponent]
    });
    fixture = TestBed.createComponent(PreviewbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
