interface Props {
    message?: string;
}

const InputError: React.FC<Props> = ({ message = null }) => {
    return message && <div className="text-destructive text-sm">{message}</div>;
};

export default InputError;
