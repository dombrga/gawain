import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonButtons, IonFooter, IonIcon, IonItem, IonLabel, IonList, IonModal, IonTextarea, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-add-note-dialog',
  templateUrl: './add-note-dialog.component.html',
  styleUrls: ['./add-note-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonButton, IonModal, IonList, IonItem, IonIcon, IonLabel,
    IonTextarea, IonToolbar, IonTitle, IonButtons, IonFooter
  ]
})
export class AddNoteDialogComponent  implements OnInit {
  addModal!: IonModal;
  note = '';

  @Output() addNote = new EventEmitter<Object>();

  @ViewChild('modal')
  set modal(m: IonModal) {
    this.addModal = m;
  }
  
  
  constructor() { }

  ngOnInit() {
    
  }

  handleSubmit() {
    this.addNote.emit({
      note: this.note,
    });
    this.addModal.dismiss();
  }

}
