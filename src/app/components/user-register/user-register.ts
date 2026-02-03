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


//自訂規則 檢查密碼與確認密碼是否一致
function equalValues(val1: string, val2: string) {
  return (control: AbstractControl) => {
    const password = control.get(val1)?.value;
    const confirmPassword = control.get(val2)?.value;
    if (password === confirmPassword) return null;
    return {notEqual: true}
  }
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
            {emailExists: '此 Email 已被使用'} : null),
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
    // role: new FormControl('user', {
    //   validators: [Validators.required]
    // }),
    // //多選框 - 興趣（FormArray 用索引對應 interestLabels）
    // interests: new FormArray([
    //   new FormControl(false),
    //   new FormControl(false),
    //   new FormControl(false),
    //   new FormControl(false),
    //   new FormControl(false),
    // ]),
    agreeTerms: new FormControl(false, {
      validators: [Validators.requiredTrue]
    }),
    passwords: new FormGroup({
      password: new FormControl('', {
        validators: [Validators.minLength(6), Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)]
      }),
      confirmPassword: new FormControl('', {
        validators: [Validators.minLength(6), Validators.required]
      })
    }, {
      //共用驗證規則
      validators: [equalValues('password', 'confirmPassword')]
    }),
  });

  onSubmit() {

    if (this.form.invalid) return;

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
        this.form.controls.passwords.touched &&
        this.form.controls.passwords.dirty &&
        this.form.controls.passwords.invalid
    );
  }

}
