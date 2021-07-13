import { Injectable } from '@angular/core'; // Injectable decorator FACTORY
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import {
  Co2EmissionPrognosisRecord,
  Co2EmissionPrognosisRecords,
} from './co2-emission-prognosis-record';
import { Observable, timer, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Co2EmissionPrognosisHttp } from './co2-emission-prognosis-http.service';

export interface Co2ForecastState {
  readonly records: Co2EmissionPrognosisRecords;
}

interface QueryFilter {
  readonly from: Date;
  readonly to: Date;
}

/* TODO: we have to find out the appropriate store eventually */
@Injectable() // we provide a parameter to the factory and then it returns an decorator.
export class Co2ForecastStore extends ComponentStore<Co2ForecastState> {
  // ngrx's `select` method creates an 'selector'
  records: Observable<Co2EmissionPrognosisRecords> = this.select(
    state => state.records,
    {
      // changes the behavior of selector, including the debouncing of the values 
      // ... until the state is settled.
      // ... Lars add the option usually by default.
      debounce: true
    },
  );

  constructor(private http: Co2EmissionPrognosisHttp) {
    // Its important to initialize store's state!  */
    super(initialState);
    // to kick-off our 'effect'
    this.loadRecordsEveryMinute({
      from: new Date(),
      to: new Date(),
    });
  }

  // ngrx's `updater` method creates an 'updater'
  // ... returns a method
  // ... only 'effects' should be able to update the store; therefore this method is private
  private updateRecords = this.updater<Co2EmissionPrognosisRecords>(
    (state, records): Co2ForecastState => ({
      ...state,
      records,
    })
  );

  // ngrx's `effect` method creates an 'effect'
  // ... returns a method
  private loadRecordsEveryMinute = this.effect<QueryFilter>(queryFilter$ =>
    // our effect will be triggered initially and every minute
    combineLatest([queryFilter$, timer(0, 60 * 1000)]).pipe(
      // cancel ongoing previous requests and instead send a new one ...
      switchMap(([queryFilter, timerValue]) =>
        this.http.get().pipe(
          // we have to handle both cases, otherwise the observable chain is broken!
          tapResponse(
            // Alt. 1 ... preferred approach
            // ... provides a central place for update logic
            records => this.updateRecords(records),
            // Alt. 2 ...
            // records => this.patchState(records),
            () => this.updateRecords([]) // only for now
          )
        )
      )
    )
  );
}

const initialState: Co2ForecastState = {
  records: [
    // To check if we test the right thing ...
    // {co2Emission: 180, minutes5UTC: new Date('2021-05-19T22:15:00+02:00'), priceArea:'DK1'}
  ],
};
