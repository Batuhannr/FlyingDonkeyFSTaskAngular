import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ReturnHelper } from 'src/app/Base/ReturnHelper';
import { GridComponent } from 'src/app/Components/grid/grid.component';
import { TodosAddComponent } from 'src/app/Components/todos-add/todos-add.component';
import { Todos } from 'src/app/Models/Todos';
import { TopTag } from 'src/app/Models/TopTag';
import { GenericService } from 'src/app/Services/GenericService';
import { TagService } from 'src/app/Services/TagService';
import { TodosSerice } from 'src/app/Services/TodosService';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  public form!: FormGroup ;

  Todos : Todos[] =[];
  TopTags : TopTag[] =[];
  dataSource: any;
  displayedColumns =['name'];
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(GridComponent) grid: GridComponent<Todos> = new GridComponent<Todos>(this.apiServis,this.matDialog,this.apiServisTodo,this.tagService)
  unsubcribe: any
  dialogRef: any = MatDialogRef<TodosAddComponent>;
activebutton : boolean = false;
  constructor(
    public apiServis : GenericService,
    public apiServisTodo : TodosSerice,
    public matDialog : MatDialog,
    public tagService : TagService,

    
    ){
  }
  ngOnInit(): void {this.getTopTags();
  }
  addGeneric<T>(bilgi :string, data :T){
    this.apiServis.add<T>(bilgi,data).subscribe((result : ReturnHelper<T>) => {alert(result.data + result.messages[0])})
  }
  addNewTodo(){
    this.dialogRef= this.matDialog.open(TodosAddComponent,{
      width : '260px',
      height: '450px',
      data:{
        data:this.TopTags,
        newData: new Todos(),
        operation:'add',

      }
    });
  }
  getTopTags(count: number = 0){
    this.tagService.top(count).subscribe((result: ReturnHelper<TopTag>) => {this.TopTags = result.data; 
    
})
  }
  getdeletedTodos(){
    this.activebutton = true;
    this.grid.getDataDeleted();

  }
  activeTodos(){
    this.activebutton = false;
    this.grid.getDataDetail();
  }

}
