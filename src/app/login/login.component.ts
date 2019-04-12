import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authorizeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authorizeForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(){
    if(this.authorizeForm.valid){
      this.authService.authorize(this.authorizeForm.value)
      .subscribe( data => {
        const token = data['token'];
        const role = data['role']
        this.authService.setSession(token)
        this.authService.setRole(role)
        this.router.navigate(['']);
      });
    }
  }

}
