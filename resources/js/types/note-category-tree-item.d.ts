import { NoteCategory } from './models/noteCategory';

export interface NoteCategoryTreeItem {
    id: string;
    name: string;
    children: string[];
    data: NoteCategory;
}
