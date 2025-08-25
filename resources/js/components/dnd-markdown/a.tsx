import { ComponentProps } from 'react';

import { ExtraProps } from 'react-markdown';

function A(props: ComponentProps<'a'> & ExtraProps) {
    return <a {...props} target="_blank" rel="noreferrer" />;
}

export { A };
