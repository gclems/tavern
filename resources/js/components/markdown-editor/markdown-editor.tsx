import { ComponentProps, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { BoldIcon, ItalicIcon, QuoteIcon } from 'lucide-react';
import { Button, Separator, Textarea } from 'shanty-ui';
import { AddNoteReferenceButton } from './add-note-reference-button';

type TextMutation = {
    newText: string;
    newSelectionStart: number;
    newSelectionEnd: number;
};

const addTextAround = (text: string, decorator: string, selectionStart: number, selectionEnd: number): TextMutation => {
    const before = text.slice(0, selectionStart);
    const selected = text.slice(selectionStart, selectionEnd);
    const after = text.slice(selectionEnd);

    let start = selectionStart + decorator.length;
    let end = selectionEnd + decorator.length;
    // If no selection, place caret between the decorators
    if (selectionStart === selectionEnd) {
        start = end = selectionStart + decorator.length;
    }

    return {
        newText: before + decorator + selected + decorator + after,
        newSelectionStart: start,
        newSelectionEnd: end,
    };
};

const addTextBefore = (text: string, decorator: string, selectionStart: number, selectionEnd: number): TextMutation => {
    const before = text.slice(0, selectionStart);
    const selectedAndAfter = text.slice(selectionStart);

    // Decide where the selection should land after render
    let start = selectionStart + decorator.length;
    let end = selectionEnd + decorator.length;

    // If no selection, place caret between the decorator and the text
    if (selectionStart === selectionEnd) {
        start = end = selectionStart + decorator.length;
    }

    return {
        newText: before + decorator + selectedAndAfter,
        newSelectionStart: start,
        newSelectionEnd: end,
    };
};

const addTextAtLineStart = (text: string, decorator: string, selectionStart: number, selectionEnd: number): TextMutation => {
    const lineStart = text.lastIndexOf('\n', selectionStart - 1) + 1;
    const before = text.slice(0, lineStart);
    const selectedAndAfter = text.slice(lineStart);

    // Decide where the selection should land after render
    let start = lineStart + decorator.length;
    let end = lineStart + decorator.length;

    // If no selection, place caret between the decorator and the text
    if (selectionStart === selectionEnd) {
        start = end = selectionStart + decorator.length;
    }

    return {
        newText: before + decorator + selectedAndAfter,
        newSelectionStart: start,
        newSelectionEnd: end,
    };
};

const replaceSelection = (text: string, replacement: string, selectionStart: number, selectionEnd: number): TextMutation => {
    const before = text.slice(0, selectionStart);
    const after = text.slice(selectionEnd);

    return {
        newText: before + replacement + after,
        newSelectionStart: selectionStart + replacement.length,
        newSelectionEnd: selectionStart + replacement.length,
    };
};

function MarkdownEditor({ value, defaultValue, onChange, ...textareaProps }: ComponentProps<'textarea'>) {
    const [markdown, setMarkdown] = useState<string>(String(value ?? defaultValue ?? ''));

    const textarea = useRef<HTMLTextAreaElement | null>(null);

    // Where we want the selection to be AFTER React renders the new text
    const pendingSelection = useRef<{ start: number; end: number } | null>(null);

    // If `value` prop changes from above, sync it into local state
    useEffect(() => {
        if (value != null) setMarkdown(String(value));
    }, [value]);

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMarkdown(e.target.value);
        onChange?.(e);
    };

    const decorateSelection = (decorator: string, position: 'before' | 'around' | 'line-start' | 'replace') => {
        const el = textarea.current;
        if (!el) return;

        const { selectionStart, selectionEnd } = el;
        const cur = el.value;

        let func = null;
        switch (position) {
            case 'around':
                func = addTextAround;
                break;
            case 'line-start':
                func = addTextAtLineStart;
                break;
            case 'replace':
                func = replaceSelection;
            case 'before':
            default:
                func = addTextBefore;
                break;
        }

        const mutation = func(cur, decorator, selectionStart, selectionEnd);

        pendingSelection.current = { start: mutation.newSelectionStart, end: mutation.newSelectionEnd };

        // Trigger React render (textarea value + your preview will update)
        setMarkdown(mutation.newText);
        onChange?.({
            target: { value: mutation.newText },
            currentTarget: { value: mutation.newText },
        } as React.ChangeEvent<HTMLTextAreaElement>);
    };

    // Restore selection AFTER React has committed the new value
    useLayoutEffect(() => {
        const el = textarea.current;
        const sel = pendingSelection.current;
        if (el && sel) {
            el.setSelectionRange(sel.start, sel.end);
            el.focus();

            pendingSelection.current = null;
        }
    }, [markdown]);

    return (
        <>
            <div className="bg-input-background border-input-border flex items-center gap-1 rounded-sm border">
                <Button variant="ghost" onClick={() => decorateSelection('**', 'around')}>
                    <BoldIcon />
                </Button>

                <Button variant="ghost" onClick={() => decorateSelection('_', 'around')}>
                    <ItalicIcon />
                </Button>
                <Separator orientation="vertical" className="bg-dnd-primary/20 mx-2 h-[80%] w-px" />
                <Button variant="ghost" onClick={() => decorateSelection('> ', 'line-start')}>
                    <QuoteIcon />
                </Button>
                <Separator orientation="vertical" className="bg-dnd-primary/20 mx-2 h-[80%] w-px" />
                <AddNoteReferenceButton onSelectNote={(text) => decorateSelection(text, 'replace')} />
            </div>
            <Textarea ref={textarea} {...textareaProps} value={markdown as string} onChange={handleTextareaChange} />
        </>
    );
}

export { MarkdownEditor };
