import React, { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import { useActives } from "../../hooks/useActives";
import { Active } from "../../types";

interface SearchAssetModalProps {
    onSelect: (activo: Active) => void;
    onClose: () => void;
}

export default function SearchAssetModal({
    onSelect,
    onClose,
}: SearchAssetModalProps) {
    const [search, setSearch] = useState("");
    const { activos, loading, error, refresh } = useActives();

    // Cada vez que cambie el search, refrescamos la lista filtrada
    useEffect(() => {
        const timeout = setTimeout(() => {
            refresh(search.trim());
        }, 300);
        return () => clearTimeout(timeout);
    }, [search, refresh]);

    return (
        <Modal>
            <div className="relative">
                {/* Cerrar */}
                <button
                    onClick={onClose}
                    className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                >
                    ✕
                </button>

                <h2 className="text-2xl font-semibold mb-4">Seleccionar criptomoneda</h2>

                <Input
                    type="text"
                    placeholder="Buscar..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="mb-4"
                />

                {loading && <p>Cargando activos…</p>}
                {error && <p className="text-red-500">{error}</p>}

                <ul className="max-h-60 overflow-y-auto">
                    {!loading && activos.length === 0 && (
                        <li className="py-2 text-white text-2xl">No se encontraron activos</li>
                    )}
                    {activos.map((a) => (
                        <li
                            key={a.id}
                            onClick={() => onSelect(a)}
                            className="flex justify-between py-2 px-4 hover:bg-gray-100 dark:hover:bg-amber-400 rounded cursor-pointer"
                        >
                            <span className="text-xl">{a.nombre}</span>
                            <span className="text-white text-xl uppercase">{a.simbolo}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </Modal>
    );
}
