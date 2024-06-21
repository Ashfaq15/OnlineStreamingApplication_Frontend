import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardchatsComponent } from './dashboardchats.component';

describe('DashboardchatsComponent', () => {
  let component: DashboardchatsComponent;
  let fixture: ComponentFixture<DashboardchatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardchatsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardchatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
