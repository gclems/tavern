import { ComponentProps } from 'react';

import { ExtraProps } from 'react-markdown';

function H2(props: ComponentProps<'h2'> & ExtraProps) {
    return <h2 {...props} className="text-dnd-primary my-2 text-2xl font-bold" />;
}

export { H2 };
