import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TotalCountService } from '../shared/total-count.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-user-admin',
  templateUrl: './add-user-admin.component.html',
  styleUrl: './add-user-admin.component.css'
})
export class AddUserAdminComponent {
  video: any = [];
  totalVideos: number = 0;
  totalUsers: number = 0;
  videoname: string = '';
  videourl: string = '';

  constructor(private http: HttpClient, private route: Router, private totalcount: TotalCountService, private snackbar: MatSnackBar) {}

  ngOnInit(): void {
    this.getData();
    this.fetchTotalUsers();
    this.fetchTotalVideos();
  }

  // Fetch total users
  fetchTotalUsers() {
    this.totalcount.getTotalUsers().subscribe((res) => {
      this.totalUsers = res;
    });
  }

  // Fetch total videos
  fetchTotalVideos() {
    this.totalcount.getTotalVideos().subscribe((res) => {
      this.totalVideos = res;
    });
  }

  // Get videos data
  getData() {
    this.http.get('http://localhost:7040/api/bobvideo').subscribe((res) => {
      this.video = res;
    });
  }

  // Delete video
  deleteVideo(id: any) {
    this.http.delete(`http://localhost:7040/api/bobvideo/${id}`).subscribe(() => {
      this.getData();
    });
  }

  // Add video
  addVideo() {
    if (this.videoname === '' || this.videourl === '') {
      this.snackbar.open("Video name and URL cannot be empty", undefined, {
        duration: 2000,
        verticalPosition: 'top'
      });
      return;
    }

    const userData = {
      videoName: this.videoname,
      videoUrl: this.videourl
    };

    this.http.post("http://localhost:7040/api/bobvideo", userData).subscribe(() => {
      this.snackbar.open("Video added successfully", undefined, {
        duration: 2000,
        verticalPosition: 'top'
      });
      this.getData();
    });

    this.route.navigate(['/videosData']);
  }

  // Navigation functions
  users() {
    this.route.navigate(['/usersData']);
  }

  videos() {
    this.route.navigate(['/videosData']);
  }

  comments() {
    this.route.navigate(['/commentsData']);
  }

  likes() {
    this.route.navigate(['/likesData']);
  }

  overview() {
    this.route.navigate(['/adminPage']);
  }
}
