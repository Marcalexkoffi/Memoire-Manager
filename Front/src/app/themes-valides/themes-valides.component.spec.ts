import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemesValidesComponent } from './themes-valides.component';

describe('ThemesValidesComponent', () => {
  let component: ThemesValidesComponent;
  let fixture: ComponentFixture<ThemesValidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemesValidesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemesValidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
