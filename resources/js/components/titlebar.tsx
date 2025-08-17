interface Props {
    title?: string;
}

const Titlebar: React.FC<Props> = ({ title }) => {
    return (
        <div className="flex items-center gap-x-2 border-b py-2 pr-4">
            <h1 className="text-2xl">{title}</h1>
        </div>
    );
};

export default Titlebar;
