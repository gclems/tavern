import { ComponentProps } from 'react';

import { ExtraProps } from 'react-markdown';

function Ul(props: ComponentProps<'ul'> & ExtraProps) {
    return <ul {...props} className="list-inside list-disc" />;
}

export { Ul };
