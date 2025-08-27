import { ScrollArea, TooltipPrimitive } from 'shanty-ui';

import { useCampaign } from '@/pages/campaigns/show/campaign-provider';

import { DndMarkdown } from './dnd-markdown';

function NoteLink({ noteId, children, allowTooltips = true }: { noteId: number; children: React.ReactNode; allowTooltips?: boolean }) {
    const { findNoteById, handleSelectNote } = useCampaign();

    const note = findNoteById(noteId);

    const button = (
        <button type="button" className="text-dnd-primary cursor-pointer hover:underline" onClick={note ? () => handleSelectNote(note) : undefined}>
            {children ?? note?.name}
        </button>
    );

    if (!allowTooltips) {
        return button;
    }

    return (
        <TooltipPrimitive.Root>
            <TooltipPrimitive.Trigger disabled={!allowTooltips || !note} render={button} />

            <TooltipPrimitive.Portal>
                <TooltipPrimitive.Positioner sideOffset={10}>
                    <TooltipPrimitive.Popup className="shadow-tooltip-background border-dnd-primary bg-dnd-background outline-tooltip-background flex origin-[var(--transform-origin)] flex-col rounded-md border-2 px-2 py-1 text-sm shadow-lg outline-1 transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[instant]:duration-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0">
                        <TooltipPrimitive.Arrow className="data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180">
                            <ArrowSvg />
                        </TooltipPrimitive.Arrow>
                        <ScrollArea.Root className="text-dnd-foreground max-h-[300px] max-w-[300px] overflow-y-auto">
                            <ScrollArea.Viewport className="max-h-full min-h-full overscroll-contain">
                                <div className="text-dnd-primary text-2xl font-bold">{note?.name}</div>
                                <DndMarkdown markdown={note?.content ?? ''} allowTooltips={false} />
                            </ScrollArea.Viewport>
                            <ScrollArea.Scrollbar className="bg-scrollbar-background flex w-1 justify-center rounded opacity-0 transition-opacity delay-300 data-[hovering]:opacity-100 data-[hovering]:delay-0 data-[hovering]:duration-75 data-[scrolling]:opacity-100 data-[scrolling]:delay-0 data-[scrolling]:duration-75">
                                <ScrollArea.Thumb className="bg-scrollbar-thumb w-full rounded" />
                            </ScrollArea.Scrollbar>
                        </ScrollArea.Root>
                    </TooltipPrimitive.Popup>
                </TooltipPrimitive.Positioner>
            </TooltipPrimitive.Portal>
        </TooltipPrimitive.Root>
    );
}

function ArrowSvg(props: React.ComponentProps<'svg'>) {
    return (
        <svg width="20" height="10" viewBox="0 0 20 10" fill="none" {...props}>
            <path
                d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
                className="fill-dnd-primary"
            />
            <path
                d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
                className="fill-dnd-primary"
            />
        </svg>
    );
}

export { NoteLink };
