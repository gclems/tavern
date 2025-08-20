import { useCampaign } from './campaign-provider';
import { NoteColumn } from './note-column';

function NoteColumns() {
    const { treeColumns } = useCampaign();

    return (
        <>
            {treeColumns.map((column, index) => (
                <NoteColumn key={index} categoryTreeItem={column} />
            ))}
        </>
    );
}

export { NoteColumns };
