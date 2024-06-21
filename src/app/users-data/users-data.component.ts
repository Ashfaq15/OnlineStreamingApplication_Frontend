import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TotalCountService } from '../shared/total-count.service';

@Component({
  selector: 'app-users-data',
  templateUrl: './users-data.component.html',
  styleUrl: './users-data.component.css'
})
export class UsersDataComponent {

  user :any=[];
  totalUsers: any;
  totalVideos: any;

  constructor(private http: HttpClient, private route: Router,private totalcount: TotalCountService){}

  ngOnInit(): void{
    this.getData();
    this.fetchTotalUsers();
    this.fetchTotalVideos();
  }

  //fetchtotalUsers 

  fetchTotalUsers(){
    this.totalcount.getTotalUsers().subscribe((res)=>{
      this.totalUsers = res;
    });
  }


  //fetchtotalvideos
  fetchTotalVideos(){
    this.totalcount.getTotalVideos().subscribe((res)=>{
      this.totalVideos = res;
    })
  }


  // getusersdata
  getData(){

    this.http.get('http://localhost:7040/api/UserData').subscribe((res) =>{
      this.user = res;
    })
  }

  // all dashboard functions

  users(){
    this.route.navigate(['/usersData']);
  }

  videos(){
    this.route.navigate(['/videosData']);
  }
  comments(){
    this.route.navigate(['/commentsData']);
  }

  likes(){
    this.route.navigate(['/likesData']);
  }

  overview(){
    this.route.navigate(['/adminPage']);
  }

  
}
