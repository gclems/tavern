import { ComponentProps } from 'react';

import { ExtraProps } from 'react-markdown';

function H3(props: ComponentProps<'h3'> & ExtraProps) {
    return <h3 {...props} className="my-2 text-lg font-semibold" />;
}

export { H3 };
