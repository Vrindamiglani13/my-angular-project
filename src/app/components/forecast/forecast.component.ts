import { Component } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent {
  forecastData: any = {}; 
  city: string = '';
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private weatherService: WeatherService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.city = params.get('city') || 'New York';
      this.getForecast();
    });
  }

  getForecast() {
    if (!this.city) return;
    this.loading = true;
    this.errorMessage = '';

    this.weatherService.getForecast(this.city).subscribe({
      next: (data) => {
        this.forecastData = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch forecast data.';
        console.error(err);
        this.loading = false;
      }
    });
  }
}


//The OpenWeatherMap 5-day forecast API provides weather data in every 3-hour intervals