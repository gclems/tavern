import { ComponentProps } from 'react';

import { ExtraProps } from 'react-markdown';

function Img(props: ComponentProps<'img'> & ExtraProps) {
    return <img {...props} className="mx-auto my-2 max-h-[300px]" />;
}

export { Img };
