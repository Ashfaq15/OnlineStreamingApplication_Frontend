import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { user } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-page5allvideos',
  templateUrl: './page5allvideos.component.html',
  styleUrl: './page5allvideos.component.css'
})
export class Page5allvideosComponent {

  videosData : any=[];
  searchingFor = '';
  userId = history.state['userId'];
  userName = history.state['userName'];
  

  constructor(private snackBar : MatSnackBar ,private http : HttpClient, private route : Router, private activateroute : ActivatedRoute){}

  ngOnInit(): void{
    
  
    this.getData();
  }

  getData(){
    this.http.get('http://localhost:7040/api/bobvideo').subscribe( (res) =>{
      console.log(res);
      this.videosData = res;
      console.log('data recieved successfully');
      
    })
  }

  searchVideos(){
    this.http.get(`http://localhost:7040/api/bobvideo/${this.searchingFor}`).subscribe((res : any) =>{
      if(res.length == 0){
        this.snackBar.open(`No Video found for "${this.searchingFor}"`,undefined,{
          duration : 2000,
          verticalPosition : 'top'
        })
        this.searchingFor = '';
      }
      else{
        this.videosData = res;
        this.searchingFor = '';
      }
      
    })
  }



  goToPage6(url: any, name : any, id: any){

    const newData = {
      videoName : name,
      videoUrl : url,
      videoId : id,
      userId : this.userId,
      userName : this.userName
    }

    this.http.post('http://localhost:7040/api/history',newData).subscribe();

    this.route.navigate(['/page6'],{state : {
      id,name,url,
      userId : this.userId,
      userName : this.userName
    }});
  }


  // home function

  homeButton(){
    this.http.get('http://localhost:7040/api/bobvideo').subscribe( (res) =>{
      console.log(res);
      this.videosData = res;
      console.log('data recieved successfully');
      
    })
  }

  // history function

  historyButton(){
    // alert("history button is clicked");
    this.http.get(`http://localhost:7040/api/history/${this.userId}`).subscribe((res: any) =>{
      if(res.length == 0){
        this.snackBar.open("Your viewing history is empty.",undefined,{
          duration : 2000,
          verticalPosition : 'top'
        })
      }
      else{
        this.videosData = res;
      }
      
    })
  }


  // Like Function

  likeButton(){
    this.http.get(`http://localhost:7040/api/like/${this.userId}`).subscribe((res: any)=>{
      if(res.length == 0){
        this.snackBar.open("You have not liked any videos yet.",undefined,{
          duration : 2000,
          verticalPosition : 'top'
        })
      }
      else{
        this.videosData = res;
      }
      
    })
  }


  // Favourite Function

  favouriteButton(){
    this.http.get(`http://localhost:7040/api/favourite/${this.userId}`).subscribe((res: any) =>{
      if (res.length === 0) {
        this.snackBar.open("No videos found in your favorites.", undefined,{
          duration : 2000,
          verticalPosition : 'top'
        })
      } else {
        this.videosData = res;
      }
      
    })
  }


  // logout Function

  logout(){
    this.route.navigate([' ']);
  }




  // voice recognition

  startVoiceRecognition() {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.start();

      recognition.onresult = (event: any) => {
        this.searchingFor = event.results[0][0].transcript;
        console.log('Voice recognized:', this.searchingFor);
      };

      recognition.onerror = (event: any) => {
        console.error('Voice recognition error:', event.error);
      };
    } else {
      this.snackBar.open("Speech recognition not supported in this browser.",undefined,{
        duration : 2000,
        verticalPosition : 'top'
      })

    }
  }
}
