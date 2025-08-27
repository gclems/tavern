import { h } from 'hastscript';
import { Root } from 'mdast';
import Markdown from 'react-markdown';
import remarkDirective from 'remark-directive';
import { visit } from 'unist-util-visit';

import { A } from './a';
import { Blockquote } from './blockquote';
import { H2 } from './h2';
import { H3 } from './h3';
import { H4 } from './h4';
import { Img } from './img';
import { NoteLink } from './note-link';
import { P } from './p';
import { Ul } from './ul';

function customDirectives() {
    return (tree: Root) => {
        visit(tree, (node) => {
            if (node.type === 'containerDirective' || node.type === 'leafDirective' || node.type === 'textDirective') {
                switch (node.name) {
                    case 'note': {
                        const data = node.data || (node.data = {});
                        const hast = h(node.name, node.attributes || {});

                        data.hName = hast?.tagName;
                        data.hProperties = hast?.properties;
                        break;
                    }
                    default:
                        return;
                }
            }
        });
    };
}

function DndMarkdown({ markdown, allowTooltips = true }: { markdown: string; allowTooltips?: boolean }) {
    return (
        <div className="dnd_markdown">
            <Markdown
                remarkPlugins={[remarkDirective, customDirectives]}
                components={{
                    h1: H2,
                    h2: H2,
                    h3: H3,
                    h4: H4,
                    p: P,
                    a: A,
                    img: Img,
                    ul: Ul,
                    blockquote: Blockquote,
                    // custom tags
                    note: ({ node, children }) => (
                        <NoteLink noteId={node.properties?.id} allowTooltips={allowTooltips}>
                            {children}
                        </NoteLink>
                    ),
                }}
            >
                {markdown}
            </Markdown>
        </div>
    );
}

export { DndMarkdown };
