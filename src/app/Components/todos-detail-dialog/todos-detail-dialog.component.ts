import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Todos } from 'src/app/Models/Todos';

@Component({
  selector: 'app-todos-detail-dialog',
  templateUrl: './todos-detail-dialog.component.html',
  styleUrls: ['./todos-detail-dialog.component.css']
})
export class TodosDetailDialogComponent {

  DialogHeader: string = "";
  newData : Todos = new Todos();
  operation : string = "";
  frm !: FormGroup ;
  constructor(
    public dialogRef : MatDialogRef<TodosDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frmBuild : FormBuilder,
  ) {

    this.operation = data.operation;
    this.newData = data.data;
    if (this.operation == 'add') {
      this.DialogHeader = 'Add new Category'
    }
    else if (this.operation == 'update'){
      this.DialogHeader ='Update Category' 
    }
    console.log(this.newData)
  } 

  ngOnInit(): void {
  }
}