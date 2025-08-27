import { useCallback, useMemo, useState } from 'react';

import { cn, Input, ScrollArea } from 'shanty-ui';

import { useCampaign } from '@/pages/campaigns/show/campaign-provider';
import { HeadlessTreeItem } from '@/types/headless-tree-item';
import { Note } from '@/types/models/note';
import { NoteCategory } from '@/types/models/noteCategory';

function SearchNote({ onSelectNote, onDoubleClick }: { onSelectNote: (note: Note) => void; onDoubleClick: (note: Note) => void }) {
    const { treeItems, treeColumns } = useCampaign();

    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [search, setSearch] = useState<string>('');

    const itemsMatchingSearch: HeadlessTreeItem[] = useMemo(() => {
        const items: HeadlessTreeItem[] = [];
        if (search === '') return items;

        for (const item of Object.values<HeadlessTreeItem>(treeItems)) {
            if (treeColumns.includes(item)) continue;

            if (item.name.toLowerCase().normalize('NFD').includes(search.toLowerCase().normalize('NFD'))) {
                items.push(item);
            }
        }

        return items;
    }, [search, treeItems, treeColumns]);

    const categoriesById = useMemo(() => {
        const map: Record<number, NoteCategory> = {};
        for (const col of treeColumns) {
            map[col.data.id] = col.data;
        }
        return map;
    }, [treeColumns]);

    const selectIndex = useCallback(
        (index: number) => {
            const item = itemsMatchingSearch[index];
            setSelectedIndex(index);
            onSelectNote?.(item.data);
        },
        [itemsMatchingSearch, onSelectNote],
    );

    return (
        <div className="overflow-hidden">
            <div>
                <Input
                    id="search"
                    name="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Rechercher une note..."
                    className="mb-2"
                    autoFocus
                />
            </div>

            <ScrollArea.Root className="max-h-[400px] overflow-auto">
                <ScrollArea.Viewport className="max-h-full min-h-full overscroll-contain">
                    <ul>
                        {itemsMatchingSearch.map((item, index) => {
                            const category = categoriesById[item.data.note_category_id];

                            return (
                                <li key={item.id}>
                                    <button
                                        type="button"
                                        onClick={() => selectIndex(index)}
                                        onDoubleClick={() => onDoubleClick?.(item.data)}
                                        className={cn('w-full border-2 border-transparent px-2 text-left', {
                                            'border-dnd-primary bg-dnd-background text-dnd-foreground': selectedIndex === index,
                                        })}
                                    >
                                        <span className="text-xs">({category?.name})</span> {item.name}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar className="bg-scrollbar-background flex w-1 justify-center rounded opacity-0 transition-opacity delay-300 data-[hovering]:opacity-100 data-[hovering]:delay-0 data-[hovering]:duration-75 data-[scrolling]:opacity-100 data-[scrolling]:delay-0 data-[scrolling]:duration-75">
                    <ScrollArea.Thumb className="bg-scrollbar-thumb w-full rounded" />
                </ScrollArea.Scrollbar>
            </ScrollArea.Root>
        </div>
    );
}

export { SearchNote };
