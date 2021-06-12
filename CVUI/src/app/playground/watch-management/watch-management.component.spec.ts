import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchManagementComponent } from './watch-management.component';

describe('WatchManagementComponent', () => {
  let component: WatchManagementComponent;
  let fixture: ComponentFixture<WatchManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
