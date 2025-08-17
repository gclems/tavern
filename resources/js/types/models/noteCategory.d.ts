export interface NoteCategory {
    id: number;
    created_at: string;
    updated_at: string;
    campaign_id: number;
    name: string;
    sort_order: number;

    Campaign?: Campaign;
    notes?: Note[];
}
