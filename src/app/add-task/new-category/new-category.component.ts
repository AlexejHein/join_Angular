import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CategoryResetService } from "../../services/category-reset.service";

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent {
  newCategoryName = '';
  newCategoryColor = '#ffffff'; // Default color

  constructor(
    public dialogRef: MatDialogRef<NewCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryResetService: CategoryResetService
  ) {}

  onNoClick(): void {
    this.newCategoryName = '';
    this.dialogRef.close();
    this.categoryResetService.resetCategory();
  }

  onSaveClick(): void {
    this.dialogRef.close({ name: this.newCategoryName, color: this.newCategoryColor });
    this.categoryResetService.resetCategory();
  }


}
