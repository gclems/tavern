import { CreateHandler, NodeApi, Tree } from 'react-arborist';
import { cn, ScrollArea } from 'shanty-ui';

import { NoteTreeItem } from '@/types/note-tree-item';

import { useCampaign } from './campaign-provider';
import { CreateNoteButton } from './create-note-button';
import { NoteNode } from './note-node';

function NoteColumnsTrees() {
    const { campaign, treeColumns, handleSelectNote, handleNoteTreeItemMove } = useCampaign();

    const handleCreate: CreateHandler<NoteTreeItem> = ({ parentId, parentNode, index, type }) => {
        console.log('create', { parentId, parentNode, index, type });
        return null;
    };

    return (
        <>
            {treeColumns.map((column, index) => (
                <div
                    key={index}
                    className={cn('flex h-full min-w-[150px] flex-col', {
                        'border-l': index > 0,
                    })}
                    style={{ width: `${50 / treeColumns.length}%`, flexGrow: 1 }}
                >
                    <div className="flex items-center justify-between border-b px-1">
                        {column.name}
                        <CreateNoteButton campaignId={campaign.id} noteCategoryId={column.data.id} />
                    </div>
                    <ScrollArea.Root className="max-h-full min-h-full">
                        <ScrollArea.Viewport className="max-h-full min-h-full overscroll-contain">
                            <Tree
                                width="100%"
                                openByDefault={false}
                                disableMultiSelection
                                selectionFollowsFocus
                                data={column.children}
                                onSelect={(node: NodeApi<NoteTreeItem>[]) => {
                                    const selected = node[0]?.data;
                                    handleSelectNote?.(selected?.data ?? null);
                                }}
                                onCreate={handleCreate}
                                onMove={handleNoteTreeItemMove}
                                onDelete={({ ids }) => {
                                    console.log('delete', { ids });
                                }}
                            >
                                {NoteNode}
                            </Tree>
                        </ScrollArea.Viewport>
                        <ScrollArea.Scrollbar className="bg-scrollbar-background flex w-1 justify-center rounded opacity-0 transition-opacity delay-300 data-[hovering]:opacity-100 data-[hovering]:delay-0 data-[hovering]:duration-75 data-[scrolling]:opacity-100 data-[scrolling]:delay-0 data-[scrolling]:duration-75">
                            <ScrollArea.Thumb className="bg-scrollbar-thumb w-full rounded" />
                        </ScrollArea.Scrollbar>
                    </ScrollArea.Root>
                </div>
            ))}
        </>
    );
}

export { NoteColumnsTrees };
