export interface Campaign {
    id: number;
    created_at: string;
    updated_at: string;
    name: string;

    noteCategories?: NoteCategory[];
    notes?: Note[];
}
