import { Privacy } from '../enums/privacy';

export interface Note {
    id: number;
    created_at: string;
    updated_at: string;
    campaign_id: number;
    note_category_id: number;
    note_id?: number;
    name: string;
    content: string;
    sort_order: number;
    privacy: Privacy;

    campaign?: Campaign;
    note?: Note;
    noteCategory?: NoteCategory;
    notes?: Note[];
}
