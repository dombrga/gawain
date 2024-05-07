import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { Observable, catchError, concatMap, defer, from, of, pipe } from 'rxjs';
import { NoteRepository, Note, NotePayload } from '@/app/types/note';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
// export class PostgresService implements NoteRepository {
export class PostgresService {

  constructor(
    private supabase: SupabaseService,
    private authService: AuthService,
  ) {

  }

  private getUser$() {
    return this.authService.user$
  }

  getNotes(userID: string | undefined) {
    return defer(() => {
      return this.supabase.supabase
        .from('note')
        .select()
        .eq('user_id', userID);
    })
    // return this.getUser$()
    //   .pipe(
    //     concatMap(u => defer(() => {
    //         console.log('concatmap get notes');
    //         return this.supabase.supabase
    //           .from('note')
    //           .select()
    //           .eq('user_id', u?.id);
    //       })
    //     ),
    //     catchError((u) => {
    //       console.log('catching')
    //       throw new Error(u);
    //     })
    //   )
  }
  

  getNoteByID(id: string): Observable<Note> {
    const note: Note = {
      content: '',
      user_id: '',
      // hrs: 0,
    }
    return of(note)
  }
  
  createNote({ content, userID }: NotePayload) {
    const note: Note = {
      content,
      user_id: userID,
    }
    const insert = this.supabase.supabase
      .from('note')
      .insert(note)

    return defer(()=> insert)
    // return of(note)
  }
}
