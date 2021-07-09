import { Co2EmissionPrognosisHttp } from './co2-emission-prognosis-http.service';
import { TestBed } from '@angular/core/testing'; // Configures and initializes environment for unit testing

describe(Co2EmissionPrognosisHttp.name, () => {
  let sut: Co2EmissionPrognosisHttp;

  beforeEach(() => {
    sut = TestBed.inject(Co2EmissionPrognosisHttp);
  });

  it('resolves an array', async () => {
    const result = await sut.get().toPromise(); // will be removed with RxJS 8
    expect(result).toEqual([]);
  });
});
