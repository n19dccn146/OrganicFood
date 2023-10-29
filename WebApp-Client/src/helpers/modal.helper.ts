import { DRAWER_KEYS, MODAL_KEYS } from '~/constants/modal.constants';

export const openModalOrDrawer = (popUpKey: DRAWER_KEYS | MODAL_KEYS) => {
  try {
    document.querySelector(`#${popUpKey}`).classList.add('show');
  } catch (error) {
    console.error(error.message);
  }
};

export const closeModalOrDrawer = (popUpKey: DRAWER_KEYS | MODAL_KEYS) => {
  try {
    document.querySelector(`#${popUpKey}`).classList.remove('show');
  } catch (error) {
    console.error(error.message);
  }
};
