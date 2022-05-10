import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MDM } from '../Models/MDM';
import { Template } from '../Models/Template';
import { BaseService } from './Base/base.service';

@Injectable({
  providedIn: 'root'
})
export class TemplateService extends BaseService<Template,number> {
  static endPoint: string = `${environment.URL}api/Template`;
  constructor(protected override http: HttpClient) {
    super(http,TemplateService.endPoint);
  }
}
