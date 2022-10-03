import {Injectable, OnDestroy} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {asyncScheduler, BehaviorSubject, Observable, observeOn, Subject, takeUntil, tap, zip} from "rxjs";
import {Address} from "../models/address";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../auth/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AddressService implements OnDestroy{
  private destroy$ = new Subject<void>();
  private listSource$ = new Subject<Address[]>();
  private selectedItemSource$ = new BehaviorSubject<Address | null>(null);
  private loadingSource$ = new Subject<boolean>();
  private _isFavorite: boolean = false;

  public list$ = this.listSource$.asObservable();
  public selectedItem$ = this.selectedItemSource$.asObservable();
  public loading$ = this.loadingSource$.pipe(observeOn(asyncScheduler));

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.listSource$.complete();
    this.loadingSource$.complete();
    this.selectedItemSource$.complete();
  }

  get isFavorite(): boolean {
    return this._isFavorite;
  }

  set isFavorite(value: boolean) {
    this._isFavorite = value;
  }

  async getAll(): Promise<void> {
    this.loadingSource$.next(true);
    const request$ = this.http.get<Address[]>(`/api/${this.getApiPath()}`)
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
    return this.http.get<Address>(`/api/${this.getApiPath()}/${id}`);
  }

  setSelectedItem(item: Address | null): void {
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
    let user = {};
    if (this.isFavorite){
      user = {userId: this.authService.getUserId()};
    }
    return this.http.put<Address>(`/api/${this.getApiPath()}/${entry.id}`, {...entry, ...user});
  }
  private insert(entry: Address): Observable<Address>{
    let user = {};
    if (this.isFavorite){
      user = {userId: this.authService.getUserId()};
    }
    return this.http.post<Address>(`/api/${this.getApiPath()}`, {...entry, ...user});
  }

  private afterUpdatingData(item?: Address){
    !!item && this.setSelectedItem(item);
    this.getAll();
    this.snackBar.open('Changes has been applied.', 'ok');
  }

  delete(id: number): Observable<void> {
    this.selectedItemSource$.next(null);
    return this.http.delete<void>(`/api/${this.getApiPath()}/${id}`)
      .pipe(tap(_ => this.afterUpdatingData()));
  }

  private getApiPath(): string{
    return this.isFavorite ? 'favorite-addresses' : 'public-addresses';
  }
}
