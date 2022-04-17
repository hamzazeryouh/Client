import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MDM } from '../Models/MDM';
import { BaseService } from './Base/base.service';
import { SkillCenterService } from './skill-center.service';

@Injectable({
  providedIn: 'root'
})


export class PosteNiveauService extends BaseService<MDM,number> {
  static endPoint: string = `${environment.URL}api/PosteNiveau`;
  constructor(protected override http: HttpClient) {
    super(http,PosteNiveauService.endPoint);
  }
}
