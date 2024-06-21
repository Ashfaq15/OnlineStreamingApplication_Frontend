import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosDataComponent } from './videos-data.component';

describe('VideosDataComponent', () => {
  let component: VideosDataComponent;
  let fixture: ComponentFixture<VideosDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideosDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideosDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
