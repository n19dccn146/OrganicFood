import { IconX } from '@tabler/icons';
import React from 'react';
import { MODAL_KEYS } from '~/constants/modal.constants';
import { closeModalOrDrawer } from '~/helpers/modal.helper';
import Flex from '../flex';

type IModalProps = {
  modalKey: MODAL_KEYS;
  animation?: 'slideTopDown' | 'scale' | 'fade';
  className?: string;
  children: React.ReactNode;
  hideCloseIcon?: boolean;
};

const ModalContainer = ({
  modalKey,
  animation = 'slideTopDown',
  children,
  className = '',
  hideCloseIcon = false,
}: IModalProps) => {
  const modalRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const _overlay = document.querySelector('.modal_overlay');
    _overlay.addEventListener('click', function (e) {
      if (e.target !== this) return;
      _overlay.classList.remove('show');
    });
    document
      .querySelector('.modal_overlay_close')
      .addEventListener('click', function () {
        _overlay.classList.remove('show');
      });
  }, []);

  return (
    <div id={modalKey} className={`modal_overlay`} ref={modalRef}>
      <div className={`modal_box ${animation} ${className}`}>
        {!hideCloseIcon && (
          <Flex justifyContent="end">
            <IconX
              className="modal_overlay_close"
              style={{ cursor: 'pointer' }}
              onClick={() => closeModalOrDrawer(modalKey)}
            />
          </Flex>
        )}
        {children}
      </div>
    </div>
  );
};

export default ModalContainer;
