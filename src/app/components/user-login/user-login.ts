import {afterNextRender, Component, DestroyRef, inject, viewChild} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {debounceTime} from 'rxjs';

@Component({
  selector: 'app-user-login',
  imports: [
    FormsModule
  ],
  templateUrl: './user-login.html',
  styleUrl: './user-login.css',
})
export class UserLogin {

  //viewChild 取得模板的元素 #form
  private form = viewChild.required<NgForm>('form');
  //關閉subscribe
  private destroyRef = inject(DestroyRef);

  constructor() {
    /*
      afterNextRender 等畫面渲染完成後才執行（確保 form 已存在)
      valueChange 表單值變化觸發
     */
    afterNextRender(()=>{
      const saveForm = window.localStorage.getItem('saved-login-form');

      if (saveForm) {
        const loadedFormData = JSON.parse(saveForm);
        const saveEmail = loadedFormData.username;
        setTimeout(()=>{
          this.form().controls['username'].setValue(saveEmail);
        },1)
      }

      var subscribe = this.form().valueChanges?.pipe(debounceTime(500)).subscribe({
        next:(value) => {
          window.localStorage.setItem(
            'saved-login-form',
            JSON.stringify({username:value.username})
          )
        }
      });
      //關掉訂閱
      this.destroyRef.onDestroy(()=> subscribe?.unsubscribe());
    })
  }


  //發送
  onSubmit(form: NgForm) {
    if(!form.form.valid) return;
    form.form.reset();
  }
}
