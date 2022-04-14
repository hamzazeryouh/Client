import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { memo } from '../Models/memo';

@Injectable({
  providedIn: 'root'
})
export class MemoService {
  readonly mySIRHAPIUrl = 'https://localhost:7019/api';

  constructor(private http: HttpClient) { }

  getMemos(): Observable<memo[]> {
    return this.http.get<memo[]>(this.mySIRHAPIUrl + '/Memos');
  }

  getMemoById(id: number): Observable<memo> {
    return this.http.get<memo>(this.mySIRHAPIUrl + `/Memos/${id}`);
  }

  addMemo(memoToAdd: any){
    return this.http.post(this.mySIRHAPIUrl + '/Memos', memoToAdd);
  }

  updateMemo(id: number, data: any){
    return this.http.put(this.mySIRHAPIUrl + `/Memos/${data.id}`, data);
  }

  deleteMemo(id: number|string){
    return this.http.delete(this.mySIRHAPIUrl + `/Memos/${id}`);
  }
}
