import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {OpenWeatherService} from '../../services/open-weather.service';
import {CurrentWeather} from '../../types/current-weather.type';
import {LoadingController} from '@ionic/angular';

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnChanges {

    @Input()
    private location: string | Coordinates;
    private currentWeather?: CurrentWeather;


    constructor(private openWeatherService: OpenWeatherService, private loadingController: LoadingController) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('location' in changes && changes.location.currentValue) {
            this.fetchWeather(changes.location.currentValue);
        }
    }

    private async fetchWeather(location: Coordinates | string) {
        const loadingIndicator = await this.loadingController.create({message: 'Please wait...'});
        await loadingIndicator.present();

        this.openWeatherService.getWeather(location).subscribe({
            next: (weather) => {
                this.currentWeather = weather;
            },
            complete: () => {
                loadingIndicator.dismiss();
            },
            error: err => {
                this.currentWeather = null;
            }
        });
    }
}
