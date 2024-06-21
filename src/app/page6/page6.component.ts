import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { user } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page6',
  templateUrl: './page6.component.html',
  styleUrl: './page6.component.css'
})
export class Page6Component {

  commentName :any;
  
  videoComments : any=[];

  videoId = history.state['id'];
  videoUrl = history.state['url'];
  videoName = history.state['name'];
  userId = history.state['userId'];
  userName = history.state['userName'];

  currentRating: number = 0;
  currentVideos : any;
  
  constructor(private route: Router, private http : HttpClient, private snackBar : MatSnackBar){}

  ngOnInit(): void{
    this.getComments();
    
  }

  // like Function

  likeButton(){

    this.http.get(`http://localhost:7040/api/like/checking?userid=${this.userId}&videoid=${this.videoId}`).subscribe((res : any) =>{
      if(res.length == 0){

        const userData = {
          videoName : this.videoName,
          videoUrl : this.videoUrl,
          videoId : this.videoId,
          userId : this.userId,
          userName : this.userName
        }
    
        this.http.post("http://localhost:7040/api/like",userData).subscribe(()=>{
          // alert("Video Liked Successfully");
    
          this.snackBar.open("Liked",undefined,{
            duration : 1000,
            verticalPosition : 'top'
          })
    
        });

      }
      else{
        this.snackBar.open("Already Liked",undefined,{
          duration : 2000,
          verticalPosition : 'top'
        })
      }
    })
    
  }

  // Favourite Function

  favouriteButton(){

    this.http.get(`http://localhost:7040/api/favourite/checking?userid=${this.userId}&videoid=${this.videoId}`).subscribe((res:any)=>{
      if(res.length == 0){
        const newData ={
          videoName : this.videoName,
          videoUrl : this.videoUrl,
          videoId : this.videoId,
          userId : this.userId,
          userName : this.userName
        }
        this.http.post("http://localhost:7040/api/favourite",newData).subscribe((res)=>{
          // alert("Added to the Favourite Section Successfully");
    
          this.snackBar.open("Added to Favourite",undefined,{
            duration : 1000,
            verticalPosition : 'top'
          })
    
        });
      }
      else{
        this.snackBar.open("Already In the Favourite List", undefined,{
          duration : 2000,
          verticalPosition : 'top'
        })
      }
    })
    
  }


  // Comment Function

  commentButton(){

    const newData = {
      commentName : this.commentName,
      videoId : this.videoId,
      videoUrl : this.videoUrl,
      userId : this.userId,
      userName : this.userName
    }

    this.http.post("http://localhost:7040/api/comment",newData).subscribe(()=>{
      this.getComments();
      this.commentName = '';
    });
  }

  // Retrieve Comments

  getComments(){
    this.http.get(`http://localhost:7040/api/comment/${this.videoId}`).subscribe((res)=>{
      this.videoComments = res;
    })
  }


  // logout Function

  logout(){
    this.route.navigate(['']);
  }


  // Delete Function

  deleteComment(commentid : any,usercommentid :any){
    // this.http.delete(`http://localhost:7040/api/comment/${id}`).subscribe(()=>{
    //   this.getComments();
    // })

    this.http.delete(`http://localhost:7040/api/comment/deleteVideo?id=${commentid}&userId=${this.userId}&userCommentId=${usercommentid}`).subscribe(()=>{
      
      this.getComments();
    })
  }


  // Home Button Function

  goToHome(){
    this.route.navigate(['/page5'],{state: {
      userName : this.userName,
      userId : this.userId,
      // videoId : this.videoId
    }});
  }

  
  // Ratings Function
  rateVideo(rating: number) {

    this.http.get(`http://localhost:7040/api/Rating/searchingById?userid=${this.userId}&videoid=${this.videoId}`).subscribe((res: any)=>{
      if(res.length ==0){
        this.currentRating = rating;
    
    this.snackBar.open(`Rated : ${rating}`, undefined,{
      duration : 2000,
      verticalPosition : 'top'
        })

        const newRating = {
      
          ratingNumber : rating,
          videoId : this.videoId,
          videoUrl : this.videoUrl,
          videoName : this.videoName,
          userId : this.userId,
          userName: this.userName
        }
    
        this.http.post("http://localhost:7040/api/Rating",newRating).subscribe((res)=>{});

      }
      else{
        
        this.currentVideos = res[0]; 
        console.log(this.currentVideos);

        this.currentRating = this.currentVideos.ratingNumber;
        this.snackBar.open("Already Rated ", undefined,{
          duration : 2000,
          verticalPosition : 'top'
        })
      }

    })
    

    
  }
}
