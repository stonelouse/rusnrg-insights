import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Co2EmissionPrognosisRecord } from './co2-emission-prognosis-record';

// see https://www.energidataservice.dk/tso-electricity/co2emisprog DATA API dialog

const url = 'https://api.energidataservice.dk/datastore_search_sql';
// https://api.energidataservice.dk/datastore_search_sql?sql=SELECT * from "co2emisprog" LIMIT 5

/*
    Represents a stateless services  
    ... we provided it in the root;
    ... we have one instance for the whole application;
    ... this is an internal service and therefore not provided in the public API file.
 */
@Injectable({
  providedIn: 'root',
})
export class Co2EmissionPrognosisHttp {
  get(): Observable<readonly Co2EmissionPrognosisRecord[]> {
    return of([]);
  }
}

