import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDashboadComponent } from './student-dashboad.component';

describe('StudentDashboadComponent', () => {
  let component: StudentDashboadComponent;
  let fixture: ComponentFixture<StudentDashboadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentDashboadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentDashboadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
