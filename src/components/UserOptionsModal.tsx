import React, { PropsWithChildren } from 'react'
import GameButton from './GameButton';

interface UserOptionsModalHeading{
     heading : string,
     view : boolean,
     closeModal : ()=>void
}

type UserOptionsModalProps = PropsWithChildren<UserOptionsModalHeading>



function UserOptionsModal({heading , children , view , closeModal} : UserOptionsModalProps) {
     return (
          <div className={`add-player-form-user-preview__modal ${view ? "add-player-form-user-preview__modal--visible" : ""}`}>
               <h3 className="add-player-form-user-preview__modal__heading">{heading}</h3>
               <ul className="add-player-form-user-preview__modal__options-list">
                   {children} 
               </ul>
               <GameButton 
                    className="add-player-form__options-back-button"
                    text="Back"
                    type="button"
                    onClick={closeModal}
               />
          </div>
     )
}

export default UserOptionsModal
