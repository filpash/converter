import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Credentials } from '@app/models/authentication/credentials';

const credentialsKey = 'credentials';
const credential = 'admin';

/**
 * Provides storage for authentication credentials.ts.
 * The Credentials interface should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class CredentialsService {
  public credential = credential;
  private _credentials: Credentials | null = null;

  constructor(private _snackBar: MatSnackBar) {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Gets the user credentials.ts.
   * @return The user credentials.ts or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  /**
   * Gets the username credentials.ts.
   * @return The username credentials.ts or null if the user is not authenticated.
   */
  get username(): string | null {
    const credentials = this.credentials;
    return credentials ? credentials.username : null;
  }

  /**
   * Sets the user credentials.ts.
   * The credentials.ts may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials.ts are only persisted for the current session.
   * @param credentials The user credentials.ts.
   * @param remember True to remember credentials.ts across sessions.
   */
  setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }

  /**
   * Show notification message after trying Login
   * @param notificationText Entered future message text
   */
  openNotifySnackBar(notificationText: string) {
    const userName = this.credentials ? this.credentials.username : '';
    this._snackBar.open(`${notificationText} ${userName.toUpperCase()}`, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
    });
  }
}
