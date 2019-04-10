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
      role: ['user', Validators.required],
    });
  }

  onSubmit(){
    if(this.authorizeForm.valid){
      this.authService.authorize(this.authorizeForm.value.role)
      .subscribe( data => {
        console.log(data);
        const token = data['token'];
        this.authService.setSession(token)
        this.router.navigate(['']);
      });
    }
  }

}
