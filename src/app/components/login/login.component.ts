import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private authService : AuthService
  ) {}

  ngOnInit(): void {
    this.buildForm()
  }

  buildForm(): void {
    this.loginForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^([a-zA-Z0-9]+)$'),
      ],],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16)
      ],],
    });
  }

  login() {
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value).subscribe(res=>{
        if(res != null){
          if(res.data != null){
            this.authService.setUsername(res.data.username)
            this.authService.setEmail(res.data.email)

            this.navigateHome()
            this.toastr.success(this.authService.getUsername(), res.message)
          }else{
            this.toastr.error(res.message,"Login Error")
          }
        }
      })
    }else{
      this.getFormValidationErrors()
    }
  }
  
  navigateHome(): void {
    const route = '/'
    this.router.navigate([route])
  }

  getFormValidationErrors() {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      const controlErrors: ValidationErrors | null = control ? control.errors : null;
      
      if (controlErrors) {
        Object.keys(controlErrors).forEach(keyError => {
          this.toastr.error(keyError, key)
        });
      }
    });
  }
}
