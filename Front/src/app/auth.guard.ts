import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = new Router();
  const token = localStorage.getItem('token') !== null;
  
  if (!token)
    router.navigate(['login'])
  
  return token;
};
