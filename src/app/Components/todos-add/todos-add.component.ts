import { Component, Inject, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Todos } from 'src/app/Models/Todos';
import { TodosDetailDialogComponent } from '../todos-detail-dialog/todos-detail-dialog.component';
import { TagService } from 'src/app/Services/TagService';
import { TopTag } from 'src/app/Models/TopTag';
import { MatTableDataSource } from '@angular/material/table';
import { ReturnHelper } from 'src/app/Base/ReturnHelper';
import { TodosTags } from 'src/app/Models/TodosTags';
import { Tag } from 'src/app/Models/Tag';
import { GenericService } from 'src/app/Services/GenericService';

@Component({
  selector: 'app-todos-add',
  templateUrl: './todos-add.component.html',
  styleUrls: ['./todos-add.component.css']
})
export class TodosAddComponent {
test : any;

  DialogHeader: string = "";
  newData : Todos = new Todos();
  operation : string = "";
  frm !: FormGroup ;
  @Input() class : TopTag[]=[]
  taginfo: string = "";
  tagss: string = "";
  
form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, public dialogRef : MatDialogRef<TodosAddComponent>,
         @Inject(MAT_DIALOG_DATA) public data: any,
         public frmBuild : FormBuilder,
         public tagService : TagService,
         public apiService : GenericService) {
          this.operation = data.operation;
    this.newData = data.newData;
     this.class = data.data;
     if (this.operation == 'add') {
       this.DialogHeader = 'Add New Todo'
     }
     else if (this.operation == 'update'){
       this.DialogHeader ='Update Category' 
     } 
          }
  ngOnInit(): void {
     this.newData.todosTags.forEach(element => {
      this.tagss += element.tag.name +',';
    });
    this.form = this.fb.group({
      
      name: [this.newData.name, [Validators.required, Validators.minLength(5)]],
      explanation: [this.newData.explanation],
      tag: [ this.tagss],
      color:[this.newData.bgColour],
    });
    // if(this.newData.bgColour != ""){
    //   (<HTMLInputElement>document.getElementById("colorpicker")).value = this.newData.bgColour;
    // }
    // else{
    //   (<HTMLInputElement>document.getElementById("colorpicker")).value = '#d10000';
    // }
    this.class.forEach(x => {
      this.taginfo += x.tag.name + "";
    });
  }
changeColor(a : any){
console.log(a);
}

  saveDetails(form: any) {
    console.log(form.value)
    const todo =new Todos ;
      todo.bgColour = form.value.color.toString();
      todo.explanation = form.value.explanation.toString();
      todo.name = form.value.name.toString();
      const tags : string[] = form.value.tag.toString().split(",");
  
      tags.forEach(element => {
        if(element != ""){
          const todostags : TodosTags = new TodosTags();
          todostags.tag = new Tag();
          todostags.tag.name = element.toString();
    
          todo.todosTags.push(todostags);
        }
      
      });
      if(this.DialogHeader == 'add'){
        this.apiService.add("todos",todo).subscribe((result : ReturnHelper<Todos>) => {alert(result.data + result.messages[0])})
      }
      else{
        console.log("girdi");
        todo.id = this.newData.id
        this.apiService.update("todos",todo).subscribe((result : ReturnHelper<Todos>) => {alert(result.data + result.messages[0])})

      }
    
  }
}
