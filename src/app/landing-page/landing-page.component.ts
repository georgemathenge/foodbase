import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { APIEndPoints } from '../constants/ApiEndPoints';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit{
  ngOnInit(): void {
    this.getFoodShops();
   
  }
  title = 'Welcome';
  BASE_URL = 'http://localhost:4007/';
  foodShops: any;

  constructor(private httpService: HttpService, private router:Router) {}

  getFoodShops() {
    this.httpService
      .get(this.BASE_URL + APIEndPoints.GET_FOOD_SHOPS)
      .subscribe((res: any) => {
        this.foodShops = res.data;
      });
  }
  navigate(id: any) {
    this.router.navigate(['/view', id]);
  }



}
