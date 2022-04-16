import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login1',
  templateUrl: './login1.component.html',
  styleUrls: ['./login1.component.scss']
})
export class Login1Component implements OnInit, OnDestroy {
    // KeenThemes mock, change it to:
    defaultAuth: any = {
      mobile: '',
      password: '',
    };
    loginForm: FormGroup;
    hasError: boolean;
    returnUrl: string;
    isLoading$: Observable<boolean>;
    passwrd: any;
    mobile: any
    loginMessage: string;

  
    // private fields
    private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  
    constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private route: ActivatedRoute,
      private router: Router
    ) {
      this.isLoading$ = this.authService.isLoading$;
      // redirect to home if already logged in
      // if (this.authService.currentUserValue) {
      //   this.router.navigate(['/']);
      // }
    }
  
    ngOnInit(): void {
      this.initForm();
      // get return url from route parameters or default to '/'
      this.returnUrl =
        this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
    }
  
    // convenience getter for easy access to form fields
    get f() {
      return this.loginForm.controls;
    }
  
    initForm() {
      this.loginForm = this.fb.group({
        mobile: [
          this.defaultAuth.mobile,
          Validators.compose([
            Validators.required,
            Validators.minLength(10),
            // Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
          ]),
        ],
        password: [
          this.defaultAuth.password,
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
      });
    }
  
    submit() {
      this.hasError = false;
      const loginSubscr = this.authService.loginUser(this.f.mobile.value, this.f.password.value)

      // this.unsubscribe.push(loginSubscr);

      this.authService.loginMessage$.subscribe(msg => {
        this.loginMessage = msg;
        setTimeout(() => {
          this.loginMessage = '';
        }, 2000);
      });
    }
  
    ngOnDestroy() {
      this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }
  }
  
