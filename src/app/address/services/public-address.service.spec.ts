import {PublicAddressService} from "./public-address.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {fakeAsync, TestBed, tick} from "@angular/core/testing";
import {Address} from "../models/address";
import {of} from "rxjs";

describe('Public Address Service', () => {
  let service: PublicAddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, HttpClientModule]
    });
    service = TestBed.inject(PublicAddressService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should call http.get when getAll method is called', () => {
    const http = TestBed.inject(HttpClient);
    const spy = jest.spyOn(http, 'get');

    service.getAll();

    expect(spy).toHaveBeenCalled();
  })

  it('should return addresses when getAll method is called',   fakeAsync((done: any) => {
    const addresses = [1, 2, 3];
    const http = TestBed.inject(HttpClient);
    jest.spyOn(http, 'get').mockImplementation(() => of(addresses));

    service.getAll();
    tick();

    service.list$.subscribe((res: any) => {
      expect(res).toBe(addresses);
      done();
    });
  }));

  it('should invoke http.post when save a new entry', () => {
    const http = TestBed.inject(HttpClient);
    const spy = jest.spyOn(http, 'post');

    service.save({} as Address);

    expect(spy).toHaveBeenCalled();
  })

  it('should invoke http.put when updating an address',  () => {
    const http = TestBed.inject(HttpClient);
    const updateSpy = jest.spyOn(http, 'put');

    service.save({id: 1} as Address);

    expect(updateSpy).toHaveBeenCalled();
  });

  it('should invoke http.delete when deleting an address',  () => {
    const http = TestBed.inject(HttpClient);
    const updateSpy = jest.spyOn(http, 'delete');

    service.delete(1);

    expect(updateSpy).toHaveBeenCalled();
  });

});
