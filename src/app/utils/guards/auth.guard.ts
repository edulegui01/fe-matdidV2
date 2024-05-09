import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginService } from 'src/app/login/services/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService)

  return loginService.isAuth();
};
