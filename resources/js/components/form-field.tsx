import { cn } from 'shanty-ui';

interface Props extends React.PropsWithChildren {
    className?: string;
}

const FormField: React.FC<Props> = ({ children, className }) => {
    return <div className={cn('space-y-2', className)}>{children}</div>;
};

export default FormField;
