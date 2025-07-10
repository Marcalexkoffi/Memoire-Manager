import { TutorListComponent } from './tutor-list/tutor-list.component';
import { StudentSubmitComponent } from './student-submit/student-submit.component';
import { StudentDashboadComponent } from './student-dashboad/student-dashboad.component';
import { ProfessorDashboadComponent } from './professor-dashboad/professor-dashboad.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './layout/main/main.component';
import { Main_Component } from './layout2/main/main.component';
import { TutorComponent } from './tutor/tutor.component';
import { RegisterComponent } from './register/register.component';
import { ThemesValidesComponent } from './themes-valides/themes-valides.component';
import { PropositionsComponent } from './propositions/propositions.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'professor-dashboard',
    component: ProfessorDashboadComponent,
  },
  {
    path: 'tutor',
    component: TutorComponent,
  },
  {
    path: 'workbench',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'student-dashboard',
        component: StudentDashboadComponent,
      },
      {
        path: 'student-submit',
        component: StudentSubmitComponent,
      },
      {
        path: 'proposal-list',
        component: PropositionsComponent,
      },
    ],
  },
  {
    path: 'teacher',
    component: Main_Component,
    children: [
      {
        path: 'professor-dashboard',
        component: ProfessorDashboadComponent,
      },
      {
        path: 'tutor-list',
        component: TutorListComponent,
      },
      {
        path: 'themeList',
        component: ThemesValidesComponent,
      },
    ],
  },
];
