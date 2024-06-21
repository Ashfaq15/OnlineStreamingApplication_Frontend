import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { MatSnackBar } from '@angular/material/snack-bar';
import {  Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth : AngularFireAuth,private route: Router, private snackBar : MatSnackBar) { }

  // login method

  login(email : string, password : string) {
    this.fireauth.signInWithEmailAndPassword(email,password).then( res => {
        localStorage.setItem('token','true');
        if(res.user?.emailVerified == true) {
          // this.route.navigate(['/page5']);
        } else {
          this.route.navigate(['/varify-email']);
        }

    }, err => {
        // alert(err.message);

        this.snackBar.open(err.message,undefined,{
          duration : 3000,
          verticalPosition : 'top'
        })

        this.route.navigate(['/login']);
    })
  }


  // register method

  register(email : string, password : string){
    this.fireauth.createUserWithEmailAndPassword(email,password).then((res )=>{
      // alert("registration successfull");

      this.snackBar.open("Registration Successfull",undefined,{
        duration : 1000,
        verticalPosition : 'top'
      })

      this.sendEmailForVarification(res.user);

      // this.route.navigate(['/login']);
    },err =>{
      // alert(err.message);
      this.snackBar.open(err.message,undefined,{
        duration : 3000,
        verticalPosition : 'top'
      })
      this.route.navigate(['/register']);
    })
  }


  // sign out

  logout(){
    this.fireauth.signOut().then(()=>{
      localStorage.removeItem('token');
      this.route.navigate(['/login']);
    },err =>{
      // alert("err.message");

      this.snackBar.open(err.message,undefined,{
        duration : 3000,
        verticalPosition : 'top'
      })
      
    })
  }


  

// send email for verification

sendEmailForVarification(user : any) {
  console.log(user);
  user.sendEmailVerification().then((res : any) => {
    this.route.navigate(['/varify-email']);
  }, (err : any) => {
    // alert('Something went wrong. Not able to send mail to your email.')
    this.snackBar.open('Something went wrong. Not able to send mail to your email',undefined,{
      duration : 3000,
      verticalPosition : 'top'
    })
  })
}

  
}
