import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {

  email: any;
  password: any;
  constructor(private http : HttpClient, private route : Router, private snackBar: MatSnackBar){}

  ngOnInit(): void{}

  login(){

    const url = `http://localhost:7040/api/Admin?email=${this.email}&password=${this.password}`;

    this.http.get(url).subscribe((res)=>{
      this.route.navigate(['/adminPage']);
    }, err=>{
      
      // alert("Invalid Admin credentials");

      this.snackBar.open("Invalid Admin Credentials",undefined,{
        duration : 1000,
        verticalPosition : 'top'
      })
      
      this.email = '';
      this.password = '';
    })

    
  }
}
