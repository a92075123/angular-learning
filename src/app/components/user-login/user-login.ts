import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {debounceTime} from "rxjs";


let initialEmailVal = '';
const savedForm = window.localStorage.getItem('saved-login-form');
if (savedForm) {
  const loadedForm = JSON.parse(savedForm);
  initialEmailVal = loadedForm.username;
}

@Component({
  selector: 'app-user-login',
  imports: [ReactiveFormsModule],
  templateUrl: './user-login.html',
  styleUrl: './user-login.css',
})
export class UserLogin implements OnInit {

  //關閉subscribe
  private destroyRef = inject(DestroyRef);

  form = new FormGroup({
    username: new FormControl(initialEmailVal, {
      validators: [Validators.required]
    }),
    password: new FormControl('', {
      validators: [Validators.minLength(6), Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)]
    }),
  });

  ngOnInit(): void {
    const subscription = this.form.valueChanges
    .pipe(debounceTime(500))
    .subscribe({
      next: (value) => {
        window.localStorage.setItem('saved-login-form', JSON.stringify({username: value.username}));
      }
    });
    //設定好localStorage 並關閉訂閱
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  //發送
  onSubmit() {
    if (this.form.invalid) return;
    this.form.reset();
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
