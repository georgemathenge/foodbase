import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { APIEndPoints } from '../constants/ApiEndPoints';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment.development';
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent implements OnInit {
  ngOnInit(): void {
    this.getFoodShops();
  }
  title = 'Welcome';
  BASE_URL = 'http://localhost:4007/';
  foodShops: any;

  constructor(private httpService: HttpService, private router: Router) {}

  locationSearch: string = '';
  dateStart: string = '';
  dateEnd: string = '';
  filteredResults: any[] = [];
  showResults: boolean = false;
  isLoading: boolean = false;
  isProcessing: boolean = false;

  // Example places list
  places = [
    {
      name: 'Nairobi Safari Hotel',
      imageUrl: 'assets/images/hotel_feture_1.jpg',
      rating: 4,
      reviews: 120,
    },
    {
      name: 'Nairobi Safari Hotel',
      imageUrl: 'assets/images/hotel_feture_1.jpg',
      rating: 4,
      reviews: 120,
    },
    {
      name: 'Mombasa Beach Resort',
      imageUrl: 'https://via.placeholder.com/50',
      rating: 5,
      reviews: 250,
    },
    {
      name: 'Kisumu Lake View',
      imageUrl: 'https://via.placeholder.com/50',
      rating: 3,
      reviews: 80,
    },
  ];

  onSearchChange() {
    if (this.locationSearch.trim() === '') {
      this.filteredResults = [];
      return;
    }
    this.getUserSearch(this.locationSearch.toLowerCase());
  }
  selectPlace(place: any) {
    this.locationSearch = place.name;
    this.filteredResults = [];
    this.showResults = false;
    this.checkAvailability(place);
  }

  checkAvailability(place: any) {
    console.log('Checking availability for:', place.name);
  }
  getStarsArray(rating: number): number[] {
    return Array(rating).fill(0);
  }

  useMyLocation() {
    this.isProcessing = true
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          // For now, we simply alert
          this.getPlacesNearby(lat, lon);

        },
        (error) => {
          alert('Unable to retrieve your location');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  onSearch() {
    console.log(
      'Searching with:',
      this.locationSearch,
      this.dateStart,
      this.dateEnd
    );
    // You can now send this data to your backend or use it to filter places
  }

  getFoodShops() {
    this.httpService
      .get(environment.BASE_URL + APIEndPoints.GET_FOOD_SHOPS)
      .subscribe((res: any) => {
        this.foodShops = res.data;
      });
  }

  getUserSearch(query: string) {
    this.isLoading = true;
    this.httpService
      .get(`${environment.BASE_URL+ APIEndPoints.FIND_SHOPS}?shop_name=${query}`)
      .subscribe((res: any) => {
        this.isLoading = false;

        this.filteredResults = res.data;
      });
  }
  navigate(id: any) {
    this.router.navigate(['/view', id]);
  }


  getPlacesNearby(latitude: number, longitude: number) {
    // Example of making a GET request to your backend
    this.httpService
      .get(`${environment.BASE_URL+APIEndPoints.NEARBY_SHOPS}?lat=${latitude}&lng=${longitude}`)
      .subscribe((res: any) => {
        this.showResults = true
        this.isProcessing = false
        this.filteredResults = res.data;
      });
  }
}
