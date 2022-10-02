import {Injectable, OnDestroy} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {asyncScheduler, BehaviorSubject, Observable, observeOn, Subject, takeUntil, tap, zip} from "rxjs";
import {Address} from "../models/address";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class PublicAddressService implements OnDestroy{
  private destroy$ = new Subject<void>();
  private listSource$ = new Subject<Address[]>();
  private selectedItemSource$ = new BehaviorSubject<Address | null>(null);
  private loadingSource$ = new Subject<boolean>();

  public list$ = this.listSource$.asObservable();
  public selectedItem$ = this.selectedItemSource$.asObservable();
  public loading$ = this.loadingSource$.pipe(observeOn(asyncScheduler));

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.listSource$.complete();
    this.loadingSource$.complete();
    this.selectedItemSource$.complete();
  }

  async getAll(): Promise<void> {
    this.loadingSource$.next(true);
    const request$ = this.http.get<Address[]>('/api/public-addresses')
    await zip(request$, this.selectedItem$)
      .pipe(takeUntil(this.destroy$))
      .subscribe(([list, selectedItem]) => {
      this.listSource$.next(list);
      if (list?.length > 0 && !selectedItem){
        this.selectedItemSource$.next(list[0]);
      }
      this.loadingSource$.next(false);
    }, err => this.loadingSource$.next(false));
  }

  get(id: number): Observable<Address> {
    return this.http.get<Address>(`/api/public-addresses/${id}`);
  }

  setSelectedItem(item: Address): void {
    this.selectedItemSource$.next(item);
  }

  save(entry: Address): Observable<Address> {
    let request$ = this.insert(entry);
    if(entry.id) {
      request$ = this.update(entry);
    }
    return request$.pipe(tap(res => this.afterUpdatingData(res)));
  }

  private update(entry: Address): Observable<Address>{
    return this.http.put<Address>(`/api/public-addresses/${entry.id}`, entry);
  }
  private insert(entry: Address): Observable<Address>{
    return this.http.post<Address>('/api/public-addresses', entry);
  }

  private afterUpdatingData(item?: Address){
    !!item && this.setSelectedItem(item);
    this.getAll();
    this.snackBar.open('Changes has been applied.', 'ok');
  }

  delete(id: number): Observable<void> {
    this.selectedItemSource$.next(null);
    return this.http.delete<void>(`/api/public-addresses/${id}`)
      .pipe(tap(_ => this.afterUpdatingData()));
  }
}
