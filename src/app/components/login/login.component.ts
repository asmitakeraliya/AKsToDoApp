import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  typePassOrText: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usrService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  hideShowPassword() {
    this.isText = !this.isText;

    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText
      ? (this.typePassOrText = 'Text')
      : (this.typePassOrText = 'Password');
  }
  onSubmit() {
    console.log('Login clicked');

    if (this.loginForm.valid) {
      this.usrService.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.loginForm.reset();

          this.usrService.storeKeyValue('userId', res.id);
          this.usrService.storeKeyValue('username', res.username);
          this.usrService.storeKeyValue('role', res.role);
          this.usrService.storeKeyValue(
            'fullname',
            res.firstName + ' ' + res.lastName
          );
          console.log('Login success');
          this.router.navigate(['todo']);
        },
        error: (err) => {
          alert(err?.error.message);
        },
      });
    } else {
      this.ValudateAllFormField(this.loginForm);
      alert('your form is invalid');
    }
  }
  private ValudateAllFormField(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);

      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.ValudateAllFormField(control);
      }
    });
  }
}
