import {Component, inject} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {catchError, map, of} from "rxjs";
import {UserService} from '../../services/user-service';
import {User} from '../../interface/global';
import {Router} from '@angular/router';


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

  private router = inject(Router);

  private userService = inject(UserService);

  clickButtonStatus = false;

  //自訂規則 asyncValidators 請求到後端檢測是否有這筆mail
  emailIsUnique = (control: AbstractControl) => {
    const email = control.value;
    if (!email) return of(null);
    return this.userService.checkEmail(email).pipe(
        map(res => res.exists ? {emailExists: '此 Email 已被使用'} : null),
        catchError(() => of(null))
    );
  };

  form = new FormGroup({
    account: new FormControl('', {
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
    this.clickButtonStatus = true;
    if (this.form.invalid) return;

    const data: User = {
      email: this.form.controls.email.value!,
      password: this.form.controls.passwords.controls.password.value!,
      account: this.form.controls.account.value!
    }

    this.userService.create(data).subscribe({
      error: (res) => {
        alert(res.error.message)
      },
      complete: () => {
        alert("註冊成功!!")
        this.router.navigate(['/login']);
      }
    });
  }

  get agreeTermsIsInvalid() {
    if (!this.clickButtonStatus) return;
    return (
        this.form.controls.agreeTerms.invalid
    );
  }

  get accountIsInvalid() {
    if (!this.clickButtonStatus) return;
    return (
        this.form.controls.account.invalid
    );
  }

  get emailIsInvalid() {
    if (!this.clickButtonStatus && this.form.controls.email != null) return;
    return (
        this.form.controls.email.invalid
    );
  }

  get passwordIsInvalid() {
    if (!this.clickButtonStatus) return;
    return (
        this.form.controls.passwords.invalid
    );
  }

}
