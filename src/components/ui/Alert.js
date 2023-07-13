'use client';
import styles from "@/styles/ui/Alert.module.css";

const PromptIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="#0288d1"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
    );
};

const DangerIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="#5f2120"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>
    );
};

const SuccessIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="#2e7d32"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
    );
};

const WarningIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="#ed6c02"><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>
    );
};

export default function Alert({ open, setOpen, type = 'prompt', message }) {

    let style;
    let icon;
    switch(type) {
        case 'success':
            style = styles['success'];
            icon = <SuccessIcon />;
            break;
        case 'danger':
            style = styles['danger'];
            icon = <DangerIcon />;
            break;
        case 'warning':
            style = styles['warning'];
            icon = <WarningIcon />;
            break;
        default:
            style = styles['prompt'];
            icon = <PromptIcon />;
    }

    return (
        <div className={`${style} shadow-2xl ${styles['alert']} ` + (open && styles['alert--show'])}>
            <div className="flex items-center gap-3">
                {icon}
                <span>
                    {message}
                </span>
            </div>
            <button onClick={ () => setOpen(false) }>
                &#10005;
            </button>
        </div>
    );
};