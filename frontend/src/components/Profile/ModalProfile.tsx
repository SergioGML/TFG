import React from "react";
import Modal from "../Modal";

interface ModalProfileProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

// Componente para mostrar un modal de perfil
const ModalProfile: React.FC<ModalProfileProps> = ({
  show,
  onClose,
  children,
}) => {
  if (!show) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <Modal>{children}</Modal>
      </div>
    </div>
  );
};

export default ModalProfile;
