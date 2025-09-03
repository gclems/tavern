import { useMemo, useState } from 'react';

import { cn, Input, RadioGroup, RadioPrimitive, ScrollArea } from 'shanty-ui';

import { useCampaign } from '@/pages/campaigns/show/campaign-provider';
import { HeadlessTreeItem } from '@/types/headless-tree-item';
import { Note } from '@/types/models/note';
import { NoteCategory } from '@/types/models/noteCategory';

function SearchNote({ onSelectNote, onSubmit }: { onSelectNote: (note: Note) => void; onSubmit: (note: Note) => void }) {
    const { treeItems, treeColumns } = useCampaign();

    const [selectedValue, setSelectedValue] = useState<string | null>(null);
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

    const selectedNote = itemsMatchingSearch.find((item) => item.id === selectedValue)?.data;

    const handleRadioDoubleClick = (note: Note) => {
        onSubmit?.(note);
    };

    const handlePressEnter = () => {
        onSubmit?.(selectedNote);
    };

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
                    tabIndex={1}
                />
            </div>

            <ScrollArea.Root className="max-h-[400px] overflow-auto">
                <ScrollArea.Viewport className="max-h-full min-h-full overscroll-contain">
                    <RadioGroup.Root
                        tabIndex={2}
                        value={selectedValue}
                        onValueChange={(val) => {
                            setSelectedValue(val as string | null);
                            onSelectNote?.(selectedNote);
                        }}
                    >
                        {itemsMatchingSearch.map((item, index) => {
                            const category = categoriesById[item.data.note_category_id];

                            return (
                                <RadioPrimitive.Root
                                    key={index}
                                    value={item.id}
                                    className={cn(
                                        'block w-full rounded-sm px-3 text-left',
                                        'focus:outline-checkbox-background/50 focus:outline-3',
                                        'data-[checked]:bg-checkbox-checked-background data-[checked]:text-checkbox-checked-foreground data-[checked]:border-checkbox-checked-border',
                                    )}
                                    onDoubleClick={() => handleRadioDoubleClick(item.data)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handlePressEnter();
                                        }
                                    }}
                                >
                                    <span className="text-xs">({category?.name})</span> {item.name}
                                </RadioPrimitive.Root>
                            );
                        })}
                    </RadioGroup.Root>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar className="bg-scrollbar-background flex w-1 justify-center rounded opacity-0 transition-opacity delay-300 data-[hovering]:opacity-100 data-[hovering]:delay-0 data-[hovering]:duration-75 data-[scrolling]:opacity-100 data-[scrolling]:delay-0 data-[scrolling]:duration-75">
                    <ScrollArea.Thumb className="bg-scrollbar-thumb w-full rounded" />
                </ScrollArea.Scrollbar>
            </ScrollArea.Root>
        </div>
    );
}

export { SearchNote };
