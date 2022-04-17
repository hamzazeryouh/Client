import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MDM } from '../Models/MDM';
import { BaseService } from './Base/base.service';

@Injectable({
  providedIn: 'root'
})
export class TypeContratService extends BaseService<MDM,number> {
  static endPoint: string = `${environment.URL}api/TypeContrat`;
  constructor(protected override  http: HttpClient) {
    super(http,TypeContratService.endPoint);
  }

}
