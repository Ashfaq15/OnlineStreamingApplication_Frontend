import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TotalCountService } from '../shared/total-count.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {

  totalUsers: any;
  totalVideos: any;

  constructor(private http : HttpClient, private route : Router, private totalcount : TotalCountService){}

  ngOnInit(): void{
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



  //overview Data

  overview(){
    this.route.navigate(['/adminPage']);
  }
  // users Data
  usersData(){
    this.route.navigate(['/usersData']);
  }


  // videos Data
  videosData(){
    this.route.navigate(['/videosData']);
  }

  // comments Data
  commentsData(){
    this.route.navigate(['/commentsData'])
  }

  // Likes Data
  likesData(){
    this.route.navigate(['/likesData'])
  }
}
