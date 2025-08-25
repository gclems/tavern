import { ComponentProps } from 'react';

import { ExtraProps } from 'react-markdown';

function H4(props: ComponentProps<'h4'> & ExtraProps) {
    return <h4 {...props} className="my-2 text-base font-semibold" />;
}

export { H4 };
