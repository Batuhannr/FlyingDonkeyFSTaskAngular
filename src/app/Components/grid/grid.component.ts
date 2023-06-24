import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReturnHelper } from 'src/app/Base/ReturnHelper';
import { GenericService } from 'src/app/Services/GenericService';
import { TodosDetailDialogComponent } from '../todos-detail-dialog/todos-detail-dialog.component';
import { Todos } from 'src/app/Models/Todos';
import { TodosSerice } from 'src/app/Services/TodosService';
import { TodosAddComponent } from '../todos-add/todos-add.component';
import { FormControl } from '@angular/forms';
import { Tag } from 'src/app/Models/Tag';
import { TagService } from 'src/app/Services/TagService';
import { TopTag } from 'src/app/Models/TopTag';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent<T> {
  @Input() kolon : any[] = [];
  dialogRef: any = MatDialogRef<TodosDetailDialogComponent>;
  dialogRefAdd: any = MatDialogRef<TodosAddComponent>;
  @Input() islemvarmi : boolean = false;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @Input() classname : string ="";
  opstring = "operations"
  @Input() dataSource: any ;
  @Input() class : T[] =[];
  @Input() tags : Tag[] =[];
  classTodo: Todos[]=[];
  dataSource1: any ;
  displayedColumns = this.kolon;
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @Output() newItemEvent = new EventEmitter<string>();
  hide : boolean = true;
  TopTags : TopTag[] =[];
  toppings = new FormControl();
  toppingList: Tag[] = [];
  filterTags: number[] =[];
  constructor(
    public apiServis : GenericService,
    public matDialog : MatDialog,
    public apiServisTodo : TodosSerice,
    public tagService : TagService,


    ){
  }
  ngAfterViewInit() {
  }
   ngOnInit() {
    if(this.islemvarmi){
      this.kolon.push("operations");
    }
    this.getDataDetail();
    this.getTag();
    this.getTopTags();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  tagFilter(idList : number[]){
    if(idList.length >0){
      this.apiServisTodo.DetailByTag(idList).subscribe((result: ReturnHelper<Todos>) => {(this.class as Todos[]) = result.data; 
        this.dataSource = new MatTableDataSource( this.class);
        this.dataSource.paginator = this.paginator;})
    }
    else{
      this.getDataDetail();
    }
   
  }
  getTopTags(count: number = 0){
    this.tagService.top(count).subscribe((result: ReturnHelper<TopTag>) => {this.TopTags = result.data; 
    
})
  }
  getTag(){
    this.apiServis.get<Tag>("tag").subscribe((result: ReturnHelper<Tag>) => {this.tags = result.data; 
      result.data.forEach(element => {
        this.toppingList.push(element)
      });
      })
  }
  getData(){
    this.apiServis.get<T>(this.classname).subscribe((result: ReturnHelper<T>) => {this.class = result.data; 
      this.dataSource = new MatTableDataSource( this.class);
      this.dataSource.paginator = this.paginator;})
  }
  getDataDeleted(){
    this.hide = false;
    this.apiServisTodo.getDeleted().subscribe((result: ReturnHelper<Todos>) => {(this.class as Todos[])  = result.data; 
      this.dataSource = new MatTableDataSource( this.class);
      this.dataSource.paginator = this.paginator;})
  }
  getDataDetail(){
    this.hide = true;
    this.apiServisTodo.detail().subscribe((result: ReturnHelper<Todos>) => {this.classTodo = result.data; 
      this.dataSource = new MatTableDataSource( this.classTodo);
      this.dataSource.paginator = this.paginator;})
  }
  remove(data : T){
    // console.log(data)
    this.removeGeneric<T>(this.classname,data);
  }
  detail(data : T){
    this.dialogRef= this.matDialog.open(TodosDetailDialogComponent,{
      width : '400px',
      data:{
        data:data,
      }
    });
  }
  removeGeneric<T>(bilgi :string ,data :T){
    this.apiServis.delete<T>(bilgi,data).subscribe((result : ReturnHelper<T>)=> {
      alert(result.messages[0])
      this.getData();
    })
  }
  updateData(data: Todos){
    this.dialogRefAdd= this.matDialog.open(TodosAddComponent,{
      width : '260px',
      height: '450px',
      data:{
        newData:data,
        data:this.TopTags,
        operation: 'update'
      }
    });

  }
  }
