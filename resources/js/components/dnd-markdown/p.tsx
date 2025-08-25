import { ComponentProps } from 'react';

import { ExtraProps } from 'react-markdown';

function P(props: ComponentProps<'p'> & ExtraProps) {
    return <div {...props} className="my-2" />;
}

export { P };
