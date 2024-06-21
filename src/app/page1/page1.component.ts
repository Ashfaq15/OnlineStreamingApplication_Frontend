import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrl: './page1.component.css'
})
export class Page1Component {

  constructor(private route : Router){}

  ngOnInit(): void{}

  goToPage2(){
    this.route.navigate(['/login']);
  }
}
