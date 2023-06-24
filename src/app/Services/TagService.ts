import { HttpClient } from '@angular/common/http';
import {  Injectable, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'
import { ReturnHelper } from '../Base/ReturnHelper';
import { MatPaginator } from '@angular/material/paginator';
import { Todos } from '../Models/Todos';
import { TodosTags } from '../Models/TodosTags';
import { TopTag } from '../Models/TopTag';
@Injectable({
  providedIn: 'root'
})
export class TagService {
  public url = environment.publicUrl;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  datasources : any;
  

  constructor(
    private http: HttpClient
  ) { }
  public top(count : number = 0): Observable<ReturnHelper<TopTag>> {
    if(count != 0){
        return this.http.get<ReturnHelper<TopTag>>(this.url + "tag/top");
    }
    else{
        return this.http.get<ReturnHelper<TopTag>>(this.url + "tag/top?count="+count);
    }
  }
}
