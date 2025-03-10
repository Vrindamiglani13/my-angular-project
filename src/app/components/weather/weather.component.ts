import { Component } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
  weatherData: any;
  cities = ['New York', 'London', 'Tokyo', 'Paris', 'Berlin'];
  city = 'New York'; 
  selectedCity: string = 'New York';
  loading: boolean = false;
  errorMessage: string = '';


  constructor(private weatherService: WeatherService,
    private router: Router
  ) {
    this.getWeather();
  }

  getWeather() {
    if (!this.selectedCity) return;
    this.loading = true;
    this.errorMessage = '';

    this.weatherService.getCurrentWeather(this.selectedCity).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch weather. Please try again.';
        console.error(err);
        this.loading = false;
      }
    });
  }

  goToForecast() {
    this.router.navigate(['/forecast', this.selectedCity]); 
  }
}

