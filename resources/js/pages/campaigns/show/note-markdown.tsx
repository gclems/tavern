import Markdown from 'react-markdown';

function NoteMarkdown({ markdown }: { markdown: string }) {
    return <Markdown>{markdown}</Markdown>;
}

export { NoteMarkdown };
