import { IconX } from '@tabler/icons';
import React from 'react';
import { DRAWER_KEYS } from '~/constants/modal.constants';
import Flex from '../flex';

type IModalProps = {
  drawerKey: DRAWER_KEYS;
  position?: 'right' | 'left';
  className?: string;
  children: React.ReactNode;
  hideCloseIcon?: boolean;
};

const DrawerContainer = ({
  drawerKey,
  position = 'right',
  children,
  className = '',
  hideCloseIcon = false,
}: IModalProps) => {
  const drawerRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const _overlay = document.querySelector('.drawer_overlay');
    _overlay.addEventListener('click', function (e) {
      if (e.target !== this) return;
      _overlay.classList.remove('show');
    });
    document
      .querySelector('.drawer_overlay_close')
      .addEventListener('click', function () {
        _overlay.classList.remove('show');
      });
  }, []);

  return (
    <div id={drawerKey} className={`drawer_overlay`} ref={drawerRef}>
      <div className={`drawer_box ${position} ${className}`}>
        {!hideCloseIcon && (
          <Flex className="drawer_header">
            <IconX
              className="drawer_overlay_close"
              style={{ cursor: 'pointer' }}
            />
          </Flex>
        )}
        {children}
      </div>
    </div>
  );
};

export default DrawerContainer;
