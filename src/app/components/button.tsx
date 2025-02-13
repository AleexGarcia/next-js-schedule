
type ButtonProps = {
    label: string;
    type: 'primary' | 'secundary';
    onClick: () => void;
}

export default function Button({ label, type, onClick }: ButtonProps) {
    return (
        <button className={`px-4 py-2 rounded-md font-medium ${type === 'primary' ? "bg-white text-slate-900" : "border-2 border-white bg-transparent"} `} onClick={() => onClick()} >
            {label}
        </button>
    )
}