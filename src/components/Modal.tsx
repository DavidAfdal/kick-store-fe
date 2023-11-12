import React from 'react';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  return (
    <div onClick={onClose} className={`fixed inset-0 flex justify-center items-center transition-colors ${open ? 'visible bg-black/20' : 'invisible'} z-50`}>
      <div className={`bg-white rounded-xl shadow p-6 transition-all ${open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}`} onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => event.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
