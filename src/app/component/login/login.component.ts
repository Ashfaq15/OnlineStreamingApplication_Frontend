import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email : string = '';
  password : string = '';
  private apiUrl = 'http://localhost:7040/api/UserData/login';
  userId: number | undefined;
  userName: string | undefined; 

  constructor(private auth : AuthService, private route: Router,private http: HttpClient,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  login() {

    if(this.email == '') {
      // alert('Please enter email');
      this.snackBar.open('Please Enter Email',undefined,{
        duration: 1000,
        verticalPosition : 'top',
      });
      return;
    }
 
    if(this.password == '') {
      // alert('Please enter password');
      this.snackBar.open('Please Enter Password', undefined,{
        duration : 1000,
        verticalPosition: 'top'
      })
      return;
    }

    this.auth.login(this.email,this.password);

    
    
    const url = `${this.apiUrl}?email=${encodeURIComponent(this.email)}&password=${encodeURIComponent(this.password)}`;

    this.http.get(url)
      .subscribe(
        (response: any) => {
          console.log('User found:', response);

          this.userId = response.userId;
          this.userName = response.userName;
          

          this.route.navigate(['/page5'],{state : {
            userId : this.userId,
            userName : this.userName
          }});

        },
        (error) => {
          console.error('Invalid user:', error);
          // alert('Invalid user credentials');
        }
      );

    this.email = '';
    this.password = '';

  }

 
 
}
