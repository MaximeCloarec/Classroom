import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAd } from './dashboard-ad';

describe('DashboardAd', () => {
  let component: DashboardAd;
  let fixture: ComponentFixture<DashboardAd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
