import React, { useState } from "react";
import Input from "./Input";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

interface PwdEyeProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    error?: string;
    placeholder?: string;
}

const PwdEye: React.FC<PwdEyeProps> = ({
    value,
    onChange,
    onBlur,
    error,
    placeholder = "Contraseña",
}) => {
    const [show, setShow] = useState(false);
    const type = show ? "text" : "password";

    return (
        // Sólo la altura del input (h-12 = 3rem = 48px)
        <div className="relative w-full h-12">
            <Input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={error}
                required
                // Le damos altura fija para que el wrapper la siga
                className="h-12 pr-10"
            />
            <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="absolute right-3 top-1/2 transform -trangray-y-1/2 text-gray-400"
            >
                {show ? (
                    <EyeSlashIcon className="w-5 h-5" />
                ) : (
                    <EyeIcon className="w-5 h-5" />
                )}
            </button>
        </div>
    );
};

export default PwdEye;
