import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Evaluation } from '../Models/Evaluation';
import { MDM } from '../Models/MDM';
import { BaseService } from './Base/base.service';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService extends BaseService<Evaluation,number> {
  static endPoint: string = `${environment.URL}api/Evaluation`;
  constructor(protected override http: HttpClient) {
    super(http,EvaluationService.endPoint);
  }
  GetEvaluationByCandidat(id:number): Observable<any>{
      return this.http.get<any>(`${this.baseUrl}/ByCandidat/${id}`);
  }
}
