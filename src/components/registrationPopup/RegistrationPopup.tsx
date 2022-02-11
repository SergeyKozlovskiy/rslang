import React from 'react';
import { IPopupProps } from '../../types/types';
import './registrationPopup.css';

export const RegistrationPopup = (props: IPopupProps) => {
  return (
    <div className={`${props.className}-popup`}>
      <p className="popup-text">{props.text}</p>
    </div>
  );
}