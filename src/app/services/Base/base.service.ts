import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface IBaseService<T, Key> {
  GetResult(): Observable<T[]>;
  Delete(id: Key): Observable<T>;
  Get(id: Key): Observable<T>;
  Update(id: string, body: T): Observable<T>;
  Add(body: T): Observable<T>;
}

export abstract class  BaseService<T,Key>implements IBaseService<T, Key> {

  constructor(
    protected http: HttpClient,
    protected baseUrl:string
) { }

/**
 * get the list of T as paged results
 * @param filterOptions the filter option to filter with it to get the paged result
 */
 GetResult(): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl);
}

/**
 * delete information of T
 * @param id the id of T
 */
Delete(id: Key): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${id}`);
}
ExportExcel(): Observable<any>{

    return this.http.get<any>(`${this.baseUrl}/ExportExcel`);
}

ImportExcel(file:FormData){
    return this.http.post(`${this.baseUrl}/ImportExcel`,file);
}
/**
 * display information of T
 * @param id id of T
 */
Get(id: Key): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`);
}




/**
 * update information of T
 */
Update(id: string, body: T): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${id}`, body);
}

/**
 * Create T
 * @param body TCreateModel
 */
Add(body: T): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}`, body);
}
GetFile(id: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/GetFile/${id}`);
}

}
