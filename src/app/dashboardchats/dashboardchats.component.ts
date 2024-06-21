import { Component, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboardchats',
  templateUrl: './dashboardchats.component.html',
  styleUrl: './dashboardchats.component.css'
})
export class DashboardchatsComponent implements AfterViewInit {

  @ViewChild('barCanvas') private barCanvas!: ElementRef<HTMLCanvasElement>;
  lineChart: any;

  likesData = [
    { userName: 'Ashfaq', videoName: 'Jungle' },
    { userName: 'Ashfaq', videoName: 'Nature' },
    { userName: 'Ashfaq', videoName: 'Jungle' },
    { userName: 'Ashfaq', videoName: 'Jungle' },
    { userName: 'Manisha', videoName: 'Sea' },
    { userName: 'Kamal', videoName: 'Relaxation' },
    { userName: 'Manisha', videoName: 'Jungle' },
    { userName: 'Manisha', videoName: 'Nature' },
    { userName: 'Kamal', videoName: 'Nature' }
  ];

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.createLineChart();
  }

  private createLineChart(): void {
    // Count occurrences of each videoName
    const videoNameCounts = this.countVideoNames();

    // Extract labels (video names) and data (counts)
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
          fill: false, // No fill under the line
          tension: 0 // No curve, straight lines
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

    this.likesData.forEach(like => {
      if (videoNameCounts[like.videoName]) {
        videoNameCounts[like.videoName]++;
      } else {
        videoNameCounts[like.videoName] = 1;
      }
    });

    return videoNameCounts;
  }
}
