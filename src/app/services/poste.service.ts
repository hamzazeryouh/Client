import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MDM } from '../Models/MDM';
import { BaseService } from './Base/base.service';

@Injectable({
  providedIn: 'root'
})
export class PosteService extends BaseService<MDM,number> {
  static endPoint: string = `${environment.URL}api/Poste`;
  constructor(protected override http: HttpClient) {
    super(http,PosteService.endPoint);
  }
}
