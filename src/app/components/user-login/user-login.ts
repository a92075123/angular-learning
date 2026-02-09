import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {debounceTime} from "rxjs";
import {Router} from "@angular/router";
import {UserService} from "../../services/user-service";
import {User} from "../../interface/global";


let initialEmailVal = '';
const savedForm = window.localStorage.getItem('saved-login-form');
if (savedForm) {
  const loadedForm = JSON.parse(savedForm);
  initialEmailVal = loadedForm.account;
}

@Component({
  selector: 'app-user-login',
  imports: [ReactiveFormsModule],
  templateUrl: './user-login.html',
  styleUrl: './user-login.css',
})
export class UserLogin implements OnInit {

  private router = inject(Router);

  private userService = inject(UserService);

  //關閉subscribe
  private destroyRef = inject(DestroyRef);


  form = new FormGroup({
    account: new FormControl(initialEmailVal, {
      validators: [Validators.required]
    }),
    password: new FormControl('', {
      validators: [Validators.minLength(6), Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)]
    }),
  });

  ngOnInit(): void {

    //設定表單的值一變動立即更新localStorage的saved-login-form
    const subscription = this.form.valueChanges
    .pipe(debounceTime(500))
    .subscribe({
      next: (value) => {
        window.localStorage.setItem('saved-login-form', JSON.stringify({account: value.account}));
      }
    });
    //元件消失後，取消訂閱
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  //發送
  onSubmit() {
    if (this.form.invalid) return;
    const userData: User = {
      account: this.form.controls.account.value!,
      password: this.form.controls.password.value!
    }
    this.userService.login(userData).subscribe({
      next: (res) => {
        window.localStorage.setItem("user-token", res.data.token);
      },
      error: (res) => {
        alert(res.error.message);
        this.form.controls.password.reset();
      },
      complete: () => {
        alert("登入成功");
        this.userService.setLoggedIn(this.form.controls.account.value!);
        this.router.navigate(['/todo']);
      },
    });
  }

  // get usernameIsInvalid() {
  //   return (
  //       this.form.controls.username.touched &&
  //       this.form.controls.username.dirty &&
  //       this.form.controls.username.invalid
  //   );
  // }

  get passwordIsInvalid() {
    return (
        this.form.controls.password.touched &&
        this.form.controls.password.dirty &&
        this.form.controls.password.invalid
    );
  }
}
