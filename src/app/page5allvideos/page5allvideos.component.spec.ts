import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page5allvideosComponent } from './page5allvideos.component';

describe('Page5allvideosComponent', () => {
  let component: Page5allvideosComponent;
  let fixture: ComponentFixture<Page5allvideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Page5allvideosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Page5allvideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
