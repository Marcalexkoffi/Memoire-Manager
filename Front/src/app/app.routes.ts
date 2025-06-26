import { RegisterComponent } from './register/register.component';
import { StudentSubmitComponent } from './student-submit/student-submit.component';
import { StudentDashboadComponent } from './student-dashboad/student-dashboad.component';
import { ProfessorDashboadComponent } from './professor-dashboad/professor-dashboad.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './layout/main/main.component';
import { TutorComponent } from './tutor/tutor.component';

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
    path: 'about',
    component: AboutComponent,
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
    children: [
      {
        path: 'student-dashboard',
        component: StudentDashboadComponent,
      },
      {
        path: 'student-submit',
        component: StudentSubmitComponent,
      },
    ],
  },
];
