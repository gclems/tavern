import { Note } from './models/note';

export interface NoteTreeItem {
    id: string;
    name: string;
    children: NoteTreeItem[];
    data: Note;
}
