import {PublicAddressService} from "./public-address.service";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {TestBed} from "@angular/core/testing";
import {Address} from "../models/address";
import {lastValueFrom, of} from "rxjs";

describe('Public Address Service', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: PublicAddressService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        { provide: MatSnackBar, useValue: {} },
        {provide: HttpClient, useValue: httpClientSpy}
      ],
      imports: [MatSnackBarModule]
    });
    service = TestBed.inject(PublicAddressService);
  });

  it('should use ValueService', async () => {
    const stubValue = {
      "id": 1,
      "name": "Home",
      "address": "No. 49, Valiasrt St., Tehran",
      "latitude": 35.720179,
      "longitude": 51.549634
    } as Address;
    httpClientSpy.get.and.returnValue(of(stubValue));
    const req$ = await service.get(1);
    const res = await lastValueFrom(req$);
    expect(res.id)
      .withContext('service returned stub value')
      .toBe(stubValue.id);
  });
});
