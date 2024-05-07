import { AddNoteDialogComponent } from '@/app/components/dialogs/add-note-dialog/add-note-dialog.component';
import { AuthService } from '@/app/services/supabase/auth/auth.service';
import { PostgresService } from '@/app/services/supabase/postgres/postgres.service';
import { NoteResponse } from '@/app/types/note';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonButton, IonCol, IonGrid, IonItem, IonLabel, IonList, IonRow } from '@ionic/angular/standalone';
import { concatMap, of } from 'rxjs';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  imports: [
    CommonModule, AddNoteDialogComponent,
    IonGrid, IonRow, IonCol,
    IonList, IonItem, IonLabel,
    IonButton,
  ],
})
export class TasksComponent  implements OnInit {
  notes: NoteResponse[] = []

  constructor(
    private pgService: PostgresService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.getNotes()
  }

  getNotes() {
    return this.pgService.getNotes(this.authService.userDetails?.id)
      .subscribe({
        next: (v) => {
          console.log("got note", v)
          this.notes = (v.data as NoteResponse[])
        },
        error: (e) => {
          console.log('error got', e)
        }
      })
  }

  handleAddNote(e: any) {
    console.log('adding note', e);
    this.pgService.createNote({ content: e.note, userID: this.authService.userDetails?.id})
      .subscribe({
        next: (e) => {
          console.log('added note', e)
          if(e.error) {

          }
        },
        error: (e) => {

        }
      })
    // this.authService.user$
    //   .pipe(
    //     concatMap(u => {
    //       console.log("concatmap adding", u)
    //       if(u) {
    //         return this.pgService.createNote({ content: e.note, userID: u?.id})
    //       }
    //       return of(u)
    //     })
    //   )
    //   .subscribe({
    //     next: (e) => {
    //       console.log('added note', e)
    //       if(e?.error) {

    //       }
    //     },
    //     error: (e) => {

    //     }
    //   })
  }
}
