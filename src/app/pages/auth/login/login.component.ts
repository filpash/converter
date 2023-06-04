import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { Logger, UntilDestroy, untilDestroyed } from '@app/core';
import { LoginValidationMessageEnum } from '@app/core/enums/login-validation-message.enum';
import { LoginRespMessageEnum } from '@app/core/enums/login-resp-message.enum';
import { AuthenticationService, CredentialsService } from '@app/pages/auth';

const log = new Logger('Login');

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  error: string | undefined;
  loginForm!: FormGroup;
  isLoading = false;
  loginErrors = LoginValidationMessageEnum;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  login() {
    this.isLoading = true;

    if (
      this.loginForm.get('username')?.value &&
      this.loginForm.get('password')?.value !== this.credentialsService.credential
    ) {
      this.isLoading = false;
      this.credentialsService.openNotifySnackBar(LoginRespMessageEnum.ERROR_MESSAGE);
      return;
    }

    const login$ = this.authenticationService.login(this.loginForm.value);
    login$
      .pipe(
        finalize(() => {
          this.loginForm.markAsPristine();
          this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe(
        (credentials) => {
          log.debug(`${credentials.username} successfully logged in`);
          this.router.navigate([this.route.snapshot.queryParams['redirect'] || '/'], { replaceUrl: true });
          this.credentialsService.openNotifySnackBar(LoginRespMessageEnum.SUCCESS_MESSAGE);
        },
        (error) => {
          log.debug(`Login error: ${error}`);
          this.error = error;
          this.credentialsService.openNotifySnackBar(LoginRespMessageEnum.ERROR_MESSAGE);
        }
      );
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
}
