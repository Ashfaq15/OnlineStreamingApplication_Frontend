import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TotalCountService } from '../shared/total-count.service';

@Component({
  selector: 'app-videos-data',
  templateUrl: './videos-data.component.html',
  styleUrl: './videos-data.component.css'
})
export class VideosDataComponent {

  video: any=[];
  totalVideos: any;
  totalUsers: any;
  constructor(private http : HttpClient, private route : Router,private totalcount: TotalCountService){}

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


  // getvideosdata
  getData(){
    this.http.get('http://localhost:7040/api/bobvideo').subscribe(( res )=>{
      this.video = res;
    })
  }


  //deletevideo
  deleteVideo(id : any){
    this.http.delete(`http://localhost:7040/api/bobvideo/${id}`).subscribe(()=>{
      this.getData();
    })
  }


  //addvideo
  addVideo(){
    this.route.navigate(['/addUser']);
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
