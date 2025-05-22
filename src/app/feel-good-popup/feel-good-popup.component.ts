import { Component, Inject } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-feel-good-popup',
  standalone: true,
  imports: [MatDialogModule, MatButton, NgForOf],
  templateUrl: './feel-good-popup.component.html',
  styleUrl: './feel-good-popup.component.scss'
})
export class FeelGoodPopupComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string; options: string[] },
    private dialogRef: MatDialogRef<FeelGoodPopupComponent>
  ) {
    console.log(data.options);
  }


  selectOption(option: string) {
    this.dialogRef.close(option);
  }
}
