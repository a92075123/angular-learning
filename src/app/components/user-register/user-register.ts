import {Component, inject} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {catchError, map, of} from "rxjs";
import {HttpClient} from "@angular/common/http";


//自訂驗證規則 return null 驗證通過 反之不通過
function mustIncludesQuestionMark(control: AbstractControl) {
  if (control.value.includes("?")) {
    return null;
  }
  return {doesNotIncludesQuestionMark: true}
}


@Component({
  selector: 'app-user-register',
  imports: [ReactiveFormsModule],
  templateUrl: './user-register.html',
  styleUrl: './user-register.css',
})
export class UserRegister {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/';

  //自訂規則 asyncValidators 請求到後端檢測是否有這筆mail
  emailIsUnique = (control: AbstractControl) => {
    const email = control.value;
    if (!email) return of(null);

    return this.http.get<{ exists: boolean }>(this.apiUrl + `checkEmail?email=${email}`).pipe(
        map(res => res.exists ?
            {emailExists: true} : null),
        catchError(() => of(null))
    );
  };

  form = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required]
    }),
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
      asyncValidators: [this.emailIsUnique],
    }),
    password: new FormControl('', {
      validators: [Validators.minLength(6), Validators.required, mustIncludesQuestionMark]
    }),
    confirmPassword: new FormControl(''),
  });

  onSubmit() {
    console.log(this.form);
    console.log(this.form.value.email);
  }

  get emailIsInvalid() {
    return (
        this.form.controls.email.touched &&
        this.form.controls.email.dirty &&
        this.form.controls.email.invalid
    );
  }

  get passwordIsInvalid() {
    return (
        this.form.controls.password.touched &&
        this.form.controls.password.dirty &&
        this.form.controls.password.invalid
    );
  }

}
