import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ProductoService } from 'src/app/producto/services/producto.service';


export const permissionProductGuard: CanActivateFn = (route, state) => {
  const loginService = inject(ProductoService)

  return loginService.isAdmin();
};
