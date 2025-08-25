import { ComponentProps } from 'react';

import { QuoteIcon } from 'lucide-react';
import { ExtraProps } from 'react-markdown';

function Blockquote(props: ComponentProps<'blockquote'> & ExtraProps) {
    return (
        <div className="flex bg-black/5">
            <div className="text-dnd-primary text-3xl">
                <QuoteIcon className="rotate-180" />
            </div>
            <blockquote {...props} className="px-4 text-sm italic" />
            <div className="text-dnd-primary self-end text-3xl">
                <QuoteIcon />
            </div>
        </div>
    );
}

export { Blockquote };
