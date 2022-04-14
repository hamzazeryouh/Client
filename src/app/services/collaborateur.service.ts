import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { collaborateur } from '../Models/collaborateur';


@Injectable({
    providedIn: 'root'
})
export class CollaborateurService {
    readonly mySIRHAPIUrl: string = `${environment.URL}api/Collaborateurs`;
    //paginatedResult: PaginatedResults<Collaborator[]> = new PaginatedResults<Collaborator[]>();

    constructor(private http: HttpClient) {}

    getCollaborateursList(): Observable<collaborateur[]> {
      console.log("getCollab");
      return this.http.get<any>(this.mySIRHAPIUrl);
    }

    getCollaborateurByMatricule(id:number|string): Observable<collaborateur> {
        return this.http.get<any>(this.mySIRHAPIUrl + "/" + id, {responseType: 'json'});
    }

    addCollaborateur(collabToAdd: any) {
        return this.http.post(this.mySIRHAPIUrl, collabToAdd);
    }

    updateCollaborateur(id: number|string, data: any) {
        return this.http.put(this.mySIRHAPIUrl + `/${id}`, data);
    }

    deleteCollaborateur(id: number|string) {
        return this.http.delete(this.mySIRHAPIUrl + `/${id}`);
    }
}
