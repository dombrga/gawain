import { Observable } from "rxjs"

export interface NoteRepository {
  createNote(data: any): Observable<Note>
  getNoteByID(id: string): Observable<Note>
}

// id, type(task or note), hours, task, tags[], isDone, createdDate(isostring), updatedDate(isostring), comments[]?
export interface Note {
  user_id: string | undefined
  content: string
  hrs?: number
  // tags: string[]
  // comments: string[]
  // iso string
  // createdDate: string
  // iso string
  // updatedDate: string
}

export interface NoteResponse {
  id: string
  user_id: string
  content: string
  hrs: number
  // tags: string[]
  // comments: string[]
  // iso string
  createdDate: string
  // iso string
  updatedDate: string
}

export interface NotePayload {
  content: string
  userID: string | undefined
}