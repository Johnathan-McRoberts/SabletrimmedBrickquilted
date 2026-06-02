import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { LoggedInService } from './shared/services/logged-in-service';

export const loggedInGuard: CanActivateFn = (route, state) => {
  const loggedInService = inject(LoggedInService);
  return loggedInService.isLoggedIn;
};
