import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {OpenWeatherService} from '../../services/open-weather.service';
import {CurrentWeather} from '../../types/current-weather.type';
import {LoadingController} from '@ionic/angular';
import {Geoposition} from '@ionic-native/geolocation';

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnChanges {

    @Input()
    private location: string | Geoposition;

    private currentWeather?: CurrentWeather = null;


    constructor(private openWeatherService: OpenWeatherService, private loadingController: LoadingController) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('location' in changes) {
            console.log(changes, this.location)
            this.fetchWeather(changes['location'].currentValue);
        }
    }

    private async fetchWeather(location: Geoposition | string) {
        const loadingIndicator = await this.loadingController.create({message: 'Please wait...'});
        await loadingIndicator.present();
        this.openWeatherService.getWeather(location).subscribe({
            next: (weather) => {
                console.log('Weather result ', weather);
                this.currentWeather = weather;
            },
            complete: () => {
                loadingIndicator.dismiss();
            },
            error: err => {
                console.log('======>  Failed' ,  {err});
                this.currentWeather = null;
            }
        });
    }
}
