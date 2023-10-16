import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { FormService } from 'src/app/shared/services/form.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [MessageService]
})
export class LoginPageComponent implements OnInit, OnDestroy {
  public loginForm?: FormGroup;

  private _unsubscribe$ = new Subject<boolean>();

  constructor(
    private _formService: FormService,
    private _authService: AuthService,
    private _router: Router,
    private _messageService: MessageService
  ) {}

  ngOnDestroy(): void {
    this._unsubscribe$.next(true), this._unsubscribe$.complete();
  }

  ngOnInit(): void {
    this._authService.logout()
    this.loginForm = this._formService.createLoginForm();
  }

  onLogin() {
    if (this.loginForm) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      if (this.loginForm.valid) {
        this._authService
          .login(email, password)
          .pipe(takeUntil(this._unsubscribe$))
          .subscribe(() => {
            this._router.navigate(['/movies/popular']);
            this._messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Login succesful',
            });
            
          });
      } else {
        this._messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'There was an error, please try again',
        });
      }
    }
  }
}
