import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Commenter } from '../Models/Commenter';
import { MDM } from '../Models/MDM';
import { BaseService } from './Base/base.service';

@Injectable({
  providedIn: 'root'
})
export class commenterService extends BaseService<Commenter,number> {
  static endPoint: string = `${environment.URL}api/Commenter`;
  constructor(protected override http: HttpClient) {
    super(http,commenterService.endPoint);
  }
}
