import { Button } from 'shanty-ui';

function DecoratorButton({
    decorator,
    textareaRef,
    children,
    onApply,
}: {
    textareaRef?: React.RefObject<HTMLTextAreaElement | null>;
    decorator: string;
    children: React.ReactNode;
    onApply: (newText: string) => void;
}) {
    const handleClick = () => {
        if (!textareaRef?.current) return;

        const ref = textareaRef.current;

        const cursorStart = ref.selectionStart;
        const cursorEnd = ref.selectionEnd;

        const textBefore = ref.value.substring(0, cursorStart);
        const textAfter = ref.value.substring(cursorEnd);
        const selectedText = ref.value.substring(cursorStart, cursorEnd);

        const newContent = `${textBefore}${decorator}${selectedText}${decorator}${textAfter}`;
        onApply?.(newContent);
        // textareaRef.current.value = newContent;
        // textareaRef.current.dispatchEvent(new Event('input', { bubbles: true }));

        textareaRef.current.selectionStart = cursorStart + decorator.length + selectedText.length;
        textareaRef.current.selectionEnd = cursorStart + selectedText.length + decorator.length;

        textareaRef.current.focus();
    };

    return (
        <Button variant="ghost" onClick={handleClick}>
            {children}
        </Button>
    );
}

export { DecoratorButton };
