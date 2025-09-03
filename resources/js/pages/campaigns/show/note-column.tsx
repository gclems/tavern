import { cn, ScrollArea } from 'shanty-ui';

import { NoteCategoryTreeItem } from '@/types/note-category-tree-item';

import { useCampaign } from './campaign-provider';
import { NoteColumnTitle } from './note-column-title';
import { NoteColumnTree } from './note-column-tree';

function NoteColumn({ categoryTreeItem }: { categoryTreeItem: NoteCategoryTreeItem }) {
    const { treeColumns } = useCampaign();

    const category = categoryTreeItem.data;

    return (
        <>
            <div
                className={cn('flex min-w-[150px] flex-1 flex-col', {
                    'border-l': category.sort_order > 0,
                })}
                style={{ width: `${50 / treeColumns.length}%`, flexGrow: 1 }}
            >
                <div className="group/category border-b">
                    <NoteColumnTitle category={category} />
                </div>

                <ScrollArea.Root className="flex-1 overflow-hidden">
                    <ScrollArea.Viewport className="max-h-full min-h-full overscroll-contain">
                        <NoteColumnTree categoryTreeItem={categoryTreeItem} />
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar className="bg-scrollbar-background flex w-1 justify-center rounded opacity-0 transition-opacity delay-300 data-[hovering]:opacity-100 data-[hovering]:delay-0 data-[hovering]:duration-75 data-[scrolling]:opacity-100 data-[scrolling]:delay-0 data-[scrolling]:duration-75">
                        <ScrollArea.Thumb className="bg-scrollbar-thumb w-full rounded" />
                    </ScrollArea.Scrollbar>
                </ScrollArea.Root>
            </div>
        </>
    );
}

export { NoteColumn };
