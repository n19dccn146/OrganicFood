import { IconChevronDown } from '@tabler/icons';
import React from 'react';
import styles from './style.module.css';

type Props = {
  nameFilter: string;
  icon?: React.ReactNode;
  showDropdown?: boolean;
  dropdownContent?: React.ReactNode;
};

const FilterDropdown = (props: Props) => {
  debugger
  const {
    icon = <></>,
    nameFilter,
    showDropdown = false,
    dropdownContent,
  } = props;

  const dropdownToggleRef = React.useRef<HTMLDivElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const dropdownOverlayRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (
      dropdownToggleRef &&
      dropdownRef.current &&
      dropdownOverlayRef.current
    ) {
      dropdownToggleRef.current.addEventListener('click', function () {
        dropdownRef.current.classList.add(styles.active);
        dropdownToggleRef.current.classList.add(styles.active);
      });

      dropdownOverlayRef.current.addEventListener('click', function (e) {
        e.stopPropagation();
        if (e.target === this)
          dropdownRef.current.classList.remove(styles.active);
        dropdownToggleRef.current.classList.remove(styles.active);
      });
    }
  }, []);

  return (
    <div className={styles.filterDropdownContainer}>
      <div
        className={[
          'flex items-center gap-1 p-2 h-full px-2 border-gray_D9 border hover:border-black cursor-pointer rounded-md',
          styles.filterDropdownToggle,
        ].join(' ')}
        ref={dropdownToggleRef}
      >
        <span>{icon}</span>
        <span className="leading-[24px] text-[18px]">{nameFilter}</span>
        {showDropdown && (
          <span>
            <IconChevronDown stroke={2} color="#000" size={20} />
          </span>
        )}
      </div>

      <div className={`${styles.dropdownLayout}`} ref={dropdownRef}>
        <div className="flex flex-wrap items-center gap-2 z-10">
          {typeof dropdownContent !== undefined ? (
            dropdownContent
          ) : (
            <span className="text-center italic font-light text-gray_B9 w-full inline-block">
              Bộ lọc không có sẵn
            </span>
          )}
        </div>
      </div>
      <div className={styles.dropdownOverlay} ref={dropdownOverlayRef}></div>
    </div>
  );
};

export default FilterDropdown;
