import { NoteCategory } from './models/noteCategory';
import { NoteTreeItem } from './note-tree-item';

export interface NoteCategoryTreeItem {
    id: string;
    name: string;
    children: NoteTreeItem[];
    data: NoteCategory;
}
