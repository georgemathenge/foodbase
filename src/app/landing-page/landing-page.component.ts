import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { APIEndPoints } from '../constants/ApiEndPoints';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule ],
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

  locationSearch: string = '';
  dateStart: string = '';
  dateEnd: string = '';
  filteredResults: any[] = [];
  showResults: boolean = false;
  
  // Example places list
  places = [
    { 
      name: 'Nairobi Safari Hotel', 
      imageUrl: 'assets/images/hotel_feture_1.jpg', 
      rating: 4, 
      reviews: 120 
    },
    { 
      name: 'Mombasa Beach Resort', 
      imageUrl: 'https://via.placeholder.com/50', 
      rating: 5, 
      reviews: 250 
    },
    { 
      name: 'Kisumu Lake View', 
      imageUrl: 'https://via.placeholder.com/50', 
      rating: 3, 
      reviews: 80 
    }
  ];
  
  onSearchChange() {
    if (this.locationSearch.trim() === '') {
      this.filteredResults = [];
      return;
    }
    this.filteredResults = this.places.filter(place =>
      place.name.toLowerCase().includes(this.locationSearch.toLowerCase())
    );
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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          // For now, we simply alert
          alert(`Latitude: ${lat}, Longitude: ${lon}`);

          // (Optional) You could call a service here to reverse geocode
          // and fill locationSearch automatically
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
    console.log('Searching with:', this.locationSearch, this.dateStart, this.dateEnd);
    // You can now send this data to your backend or use it to filter places
  }



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
