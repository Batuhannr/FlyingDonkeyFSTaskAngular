import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Type } from '@angular/compiler';
import { EnvironmentInjector, Injectable, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'
import { ReturnHelper } from '../Base/ReturnHelper';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Injectable({
  providedIn: 'root'
})
export class GenericService {
  public url = environment.publicUrl;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  datasources : any;
  

  constructor(
    private http: HttpClient
  ) { }
  public get<T>(controllerName: string): Observable<ReturnHelper<T>> {
    return this.http.get<ReturnHelper<T>>(this.url + controllerName);
  }
  public add<T>(controllerName: string, data : T): Observable<ReturnHelper<T>> {
    return this.http.post<ReturnHelper<T>>(this.url + controllerName , data);
  }
  public update<T>(controllerName: string, data: T) {
    return this.http.put<ReturnHelper<T>>(this.url + controllerName  , data);
  }
  public delete<T>(controllerName: string, data: T) {
    return this.http.put<ReturnHelper<T>>(this.url + controllerName+"/delete"  ,data);
  }
  public datsource(datasource:any) {
    this.datasources = datasource;
    this.datasources = this.paginator;
    return this.datasources;
  } 
}
