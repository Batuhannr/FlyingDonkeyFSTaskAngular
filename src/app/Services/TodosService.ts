import { HttpClient } from '@angular/common/http';
import { Type } from '@angular/compiler';
import { EnvironmentInjector, Injectable, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'
import { ReturnHelper } from '../Base/ReturnHelper';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Todos } from '../Models/Todos';
@Injectable({
  providedIn: 'root'
})
export class TodosSerice {
  public url = environment.publicUrl;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  datasources : any;
  

  constructor(
    private http: HttpClient
  ) { }
  public detail(id : number = 0): Observable<ReturnHelper<Todos>> {
    if(id != 0){
        return this.http.get<ReturnHelper<Todos>>(this.url + "todos/detail");
    }
    else{
        return this.http.get<ReturnHelper<Todos>>(this.url + "todos/detail?Id="+id);
    }
  }
  public getDeleted(){
    return this.http.get<ReturnHelper<Todos>>(this.url + "todos/detail?deleted=true");
  }
  public DetailByTag(idlist : number[]){
    return this.http.post<ReturnHelper<Todos>>(this.url + "todos/DetailByTag",idlist);
  }
}
