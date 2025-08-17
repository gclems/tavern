import { CircleIcon, MinusIcon, PlusIcon } from 'lucide-react';
import { NodeRendererProps } from 'react-arborist';
import { Button, cn } from 'shanty-ui';

import { NoteTreeItem } from '@/types/note-tree-item';

function NoteNode({ style, node, dragHandle }: NodeRendererProps<NoteTreeItem>) {
    return (
        <div style={style}>
            <div className="flex items-center gap-x-2">
                <Button
                    disabled={!node.data.children?.length}
                    className={cn({
                        'opacity-20': !node.data.children?.length,
                    })}
                    onClick={(e) => {
                        e.stopPropagation();
                        node.toggle();
                    }}
                    variant="link"
                >
                    {!node.data.children?.length ? <CircleIcon /> : node.isOpen ? <MinusIcon size={10} /> : <PlusIcon size={10} />}
                </Button>
                <div ref={dragHandle}>{node.data.name}</div>
            </div>
        </div>
    );
}

export { NoteNode };
