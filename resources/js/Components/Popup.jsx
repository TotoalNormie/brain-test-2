import { useEffect, useState } from "react";

export const Popup = ({ children, isSeen, name, closeOnClick = false }) => {
    const [isScreenHidden, setIsScreenHidden] = useState(true);

    useEffect(() => {
        if (isSeen) {
            setIsScreenHidden(false);
        } else {
            setTimeout(() => setIsScreenHidden(true), 300);
        }
    }, [isSeen]);

    return (
        <div
            id={`${name}-screen`}
            className={`fixed inset-0 isolate flex items-center justify-center ${
                isScreenHidden ? "hidden" : "block"
            } ${
                isSeen ? "animate-appear" : "animate-disappear"
            } z-40 bg-zinc-800/80`}
        >
            <div className="fixed inset-0" onClick={closeOnClick} />
            <div
                className={`${
                    isSeen ? "animate-expand" : "animate-shrink"
                } h-[10rem] flex justify-between align-start flex-col`}
            >
                {children}
            </div>
        </div>
    );
};
