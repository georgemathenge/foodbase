import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpService } from './services/http.service';
// import { environment } from '../environments/environment';
import { APIEndPoints } from './constants/ApiEndPoints';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent  {

}
