import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICandidat } from '../Models/Candidat.model';

import { BaseService } from './Base/base.service';

@Injectable({
  providedIn: 'root'
})
export class CandidatService  extends BaseService<ICandidat,number> {
  static endPoint: string = `${environment.URL}api/Candidat`;
  constructor(protected override http: HttpClient) {
    super(http,CandidatService.endPoint);
  }
}
