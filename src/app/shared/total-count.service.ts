import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TotalCountService {

  constructor(private http : HttpClient) { }

  ngOnInit(): void{}


  // Total Users
  getTotalUsers(): Observable<any>{
    return this.http.get<any>("http://localhost:7040/api/UserData/totalUsers");
  }

  //Total Videos
  getTotalVideos(): Observable<any>{
    return this.http.get<any>("http://localhost:7040/api/bobvideo/totalVideos");
  }
}
