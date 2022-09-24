import {Injectable, OnDestroy} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {asyncScheduler, lastValueFrom, Observable, observeOn, Subject, tap} from "rxjs";
import {Address} from "../models/address";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class PublicAddressService implements OnDestroy{
  private listSource$ = new Subject<Address[]>();
  private selectedItemSource$ = new Subject<Address>();
  private loadingSource$ = new Subject<boolean>();

  public list$ = this.listSource$.asObservable();
  public selectedItem$ = this.selectedItemSource$.asObservable();
  public loading$ = this.loadingSource$.pipe(observeOn(asyncScheduler));
  private hasSelectItem: boolean = false;

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  ngOnDestroy() {
    this.listSource$.complete();
    this.loadingSource$.complete();
    this.selectedItemSource$.complete();
  }

  async getAll(): Promise<void> {
    this.loadingSource$.next(true);
    try {
      const request$ = this.http.get<Address[]>('/api/public-addresses');
      const res = await lastValueFrom(request$);
      this.listSource$.next(res);
      /**
       * select first item for the first time
       */
      if (res?.length > 0 && !this.hasSelectItem){
        this.hasSelectItem = true;
        this.selectedItemSource$.next(res[0]);
      }
    } finally {
      this.loadingSource$.next(false);
    }
  }

  get(id: number): Observable<Address> {
    return this.http.get<Address>(`/api/public-addresses/${id}`);
  }

  setSelectedItem(item: Address): void {
    this.selectedItemSource$.next(item);
  }

  save(entry: Address): Observable<Address> {
    if(entry.id) {
      return this.update(entry);
    }
    return this.insert(entry);
  }

  private update(entry: Address): Observable<Address>{
    return this.http.put<Address>(`/api/public-addresses/${entry.id}`, entry)
      .pipe(tap(res => {
        this.afterUpdatingData();
        this.setSelectedItem(res);
      }));
  }
  private insert(entry: Address): Observable<Address>{
    return this.http.post<Address>('/api/public-addresses', entry)
      .pipe(tap(_ => this.afterUpdatingData()));
  }

  private afterUpdatingData(){
    this.getAll();
    this.snackBar.open('Changes has been applied.', 'ok');
  }

  delete(id: number): Observable<void> {
    this.hasSelectItem = false;
    return this.http.delete<void>(`/api/public-addresses/${id}`)
      .pipe(tap(_ => this.afterUpdatingData()));
  }
}
