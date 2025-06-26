import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorDashboadComponent } from './professor-dashboad.component';

describe('ProfessorDashboadComponent', () => {
  let component: ProfessorDashboadComponent;
  let fixture: ComponentFixture<ProfessorDashboadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessorDashboadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessorDashboadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
