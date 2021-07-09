import { Injectable } from '@angular/core'; // Injectable decorator FACTORY
import { ComponentStore } from '@ngrx/component-store';
import { Co2EmissionPrognosisRecords } from './co2-emission-prognosis-record';

export interface Co2ForecastState {
    readonly records: Co2EmissionPrognosisRecords;
}

/* TODO: we have to find out the appropriate store eventually */
@Injectable()  // we provide a parameter to the factory and then it returns an decorator.
export class Co2ForecastStore extends ComponentStore<Co2ForecastState>{
    constructor() {
        // Its important to initialize store's state!  */
        super(initialState);
    }
}

const initialState: Co2ForecastState = {
    records: [],
}