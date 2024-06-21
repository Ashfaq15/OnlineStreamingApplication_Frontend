import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email : string = '';
  password : string = '';
  fullName : string ='';
  constructor(private auth : AuthService, private http: HttpClient,private route: Router, private snackBar : MatSnackBar) { }

  ngOnInit(): void {
  }

  register() {

    if(this.email == '') {
      // alert('Please enter email');
      this.snackBar.open("Please Enter Email",undefined,{
        duration : 1000,
        verticalPosition : 'top'
      })
      return;
    }

    if(this.password == '') {
      // alert('Please enter password');

      this.snackBar.open("Please Enter Password",undefined,{
        duration : 1000,
        verticalPosition : 'top'
      })

      return;
    }

    this.auth.register(this.email,this.password);
    
    const userData = {
      userName: this.fullName,
      userEmail: this.email,
      userPassword: this.password
    };

    this.http.post('http://localhost:7040/api/UserData',userData).subscribe(response=>{
      console.log('User added successfully', response);
    });

  

    this.fullName = '';
    this.email = '';
    this.password = '';

  }
}
