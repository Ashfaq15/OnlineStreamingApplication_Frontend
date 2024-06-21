import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikesDataComponent } from './likes-data.component';

describe('LikesDataComponent', () => {
  let component: LikesDataComponent;
  let fixture: ComponentFixture<LikesDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LikesDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LikesDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
