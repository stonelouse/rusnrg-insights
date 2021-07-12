import { Injectable } from '@angular/core'; // Injectable decorator FACTORY
import { ComponentStore } from '@ngrx/component-store';
import { Co2EmissionPrognosisRecords } from './co2-emission-prognosis-record';
import { Observable } from 'rxjs'

export interface Co2ForecastState {
    readonly records: Co2EmissionPrognosisRecords;
}

/* TODO: we have to find out the appropriate store eventually */
@Injectable()  // we provide a parameter to the factory and then it returns an decorator.
export class Co2ForecastStore extends ComponentStore<Co2ForecastState>{

    // ngrx's 'select' method creates an selector
    records: Observable<Co2EmissionPrognosisRecords> = this.select(
        state => state.records
    )

    constructor() {
        // Its important to initialize store's state!  */
        super(initialState);
    }
}

const initialState: Co2ForecastState = {
    records: [
        // To check if we test the right thing ...
        // {co2Emission: 180, minutes5UTC: new Date('2021-05-19T22:15:00+02:00'), priceArea:'DK1'}
    ],
}