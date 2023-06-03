import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { LoginContext } from '@app/models/authentication/login-context';
import { Credentials } from '@app/models/authentication/credentials';
import { CredentialsService } from './credentials.service';

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private credentialsService: CredentialsService) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.ts.
   */
  login(context: LoginContext): Observable<Credentials> {
    const data = {
      username: context.username,
      token: '123456',
    };
    this.credentialsService.setCredentials(data, context.remember);
    return of(data);
  }

  /**
   * Logs out the user and clear credentials.ts.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    this.credentialsService.setCredentials();
    return of(true);
  }
}
