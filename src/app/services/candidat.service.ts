import { DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, PipeTransform } from '@angular/core';
import { BehaviorSubject, debounceTime, delay, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Candidat, ICandidat } from '../Models/Candidat.model';


import { BaseService } from './Base/base.service';
interface SearchResult {
  Candidat: ICandidat[];
  total: number;
}
export type SortColumn = keyof ICandidat | '';
export type SortDirection = 'asc' | 'desc' | '';

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(Candidat: ICandidat[], column: SortColumn, direction: string): ICandidat[] {
  if (direction === '' || column === '') {
    return Candidat;
  } else {
    return [...Candidat].sort((a, b) => {

        const res = compare(a[column]??0, b[column]??0);
        return direction === 'asc' ? res : -res;
      
  
    });
  }
}

function matches(ICandidat: ICandidat, term: string, pipe: PipeTransform) {
  return ICandidat.nom?.toLowerCase().includes(term.toLowerCase())
    || pipe.transform(ICandidat.prenom).includes(term)
    || pipe.transform(ICandidat.civilite).includes(term)
    || pipe.transform(ICandidat.email).includes(term)
    || pipe.transform(ICandidat.niveau).includes(term)  
    || pipe.transform(ICandidat.emploiEncore).includes(term)
    || pipe.transform(ICandidat.propositionSalariale).includes(term)
    || pipe.transform(ICandidat.residenceActuelle).includes(term)
    || pipe.transform(ICandidat.telephone).includes(term)
}
@Injectable({
  providedIn: 'root'
})

export class CandidatService  extends BaseService<ICandidat,number>  implements OnInit {

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _Candidat$ = new BehaviorSubject<ICandidat[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private CANDIDATS:Candidat[]=[];

  static endPoint: string = `${environment.URL}api/Candidat`;
  constructor(protected override http: HttpClient,private pipe: DecimalPipe) {

    super(http,CandidatService.endPoint);
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._Candidat$.next(result.Candidat);
      this._total$.next(result.total);
    });

   this.GetResult().subscribe(data=>{
     this.CANDIDATS=data;
     this._Candidat$.next(this.CANDIDATS);
     this._total$.next(this.CANDIDATS.length);

   })
   
  }
  ngOnInit(): void {
  }
  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  get Candidat$() { return this._Candidat$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }


  private _search(): Observable<SearchResult> {
   
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;
    // 1. sort
    let Candidat = sort(this.CANDIDATS, sortColumn, sortDirection);

    // 2. filter
    Candidat = Candidat.filter(country => matches(country, searchTerm, this.pipe));
    const total = Candidat.length;

    // 3. paginate
    Candidat = Candidat.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({Candidat, total});
  }



 



}
