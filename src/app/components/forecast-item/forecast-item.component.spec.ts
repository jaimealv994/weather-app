import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {ForecastItemComponent} from './forecast-item.component';

describe('ForecastItemComponent', () => {
    let component: ForecastItemComponent;
    let fixture: ComponentFixture<ForecastItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ForecastItemComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(ForecastItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
