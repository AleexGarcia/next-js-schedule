
type ButtonProps = {
    label: string;
    custom: 'primary' | 'secundary';
    onClick?: () => void;
}

export default function Button({ label, custom, onClick }: ButtonProps) {
    return (
        onClick
            ?
            <button onClick={() => onClick()} className={`px-4 py-2 rounded-md font-medium ${custom === 'primary' ? "bg-white text-slate-900" : "border-2 border-white bg-transparent"} `}  >
                {label}
            </button>
            :
            <button className={`px-4 py-2 rounded-md font-medium ${custom === 'primary' ? "bg-white text-slate-900" : "border-2 border-white bg-transparent"} `}  >
                {label}
            </button>
    )
}