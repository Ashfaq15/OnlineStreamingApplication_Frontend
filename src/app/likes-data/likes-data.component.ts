import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { TotalCountService } from '../shared/total-count.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-likes-data',
  templateUrl: './likes-data.component.html',
  styleUrl: './likes-data.component.css'
})
export class LikesDataComponent implements AfterViewInit {
  @ViewChild('barCanvas') private barCanvas!: ElementRef<HTMLCanvasElement>;
  lineChart: any;

  like: any[] = [];
  totalUsers: number = 0;
  totalVideos: number = 0;

  constructor(private http: HttpClient, private route: Router, private totalcount: TotalCountService, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.fetchTotalUsers();
    this.fetchTotalVideos();
  }

  ngAfterViewInit(): void {
    this.getLikes(); 
  }

  // Fetch total users
  fetchTotalUsers() {
    this.totalcount.getTotalUsers().subscribe((res: number) => {
      this.totalUsers = res;
    });
  }

  // Fetch total videos
  fetchTotalVideos() {
    this.totalcount.getTotalVideos().subscribe((res: number) => {
      this.totalVideos = res;
    });
  }

  // Get likes data
  getLikes() {
    this.http.get<any[]>("http://localhost:7040/api/like").subscribe((res: any[]) => {
      this.like = res;
      this.createLineChart(); 
    });
  }

  private createLineChart(): void {
    const videoNameCounts = this.countVideoNames();

    const labels = Object.keys(videoNameCounts);
    const data = Object.values(videoNameCounts);

    const ctx = this.barCanvas.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Failed to get the context from canvas element');
      return;
    }

    this.lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Video Likes Counts',
          data: data,
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2,
          fill: false, 
          tension: 0.5 
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        }
      }
    });
  }

  private countVideoNames(): { [key: string]: number } {
    const videoNameCounts: { [key: string]: number } = {};

    this.like.forEach(like => {
      const videoName = like.videoName;
      if (videoNameCounts[videoName]) {
        videoNameCounts[videoName]++;
      } else {
        videoNameCounts[videoName] = 1;
      }
    });

    return videoNameCounts;
  }


  
  // All dashboard functions
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
