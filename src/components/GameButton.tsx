import React, { ReactEventHandler } from 'react'
import pushAudioEvent from '../utils/soundPanel';
import {SoundLabels} from '../utils/sounds';

type GameButtonProps = {
     className ?: string,
     onClick ?: ReactEventHandler,
     type : 'submit' | 'button',
     text : string
}

function GameButton({
     type,className,onClick,text
} : GameButtonProps) {
     return (
          <button type={type} className={`game-button ${className}`} onClick={(e)=>{
               pushAudioEvent(SoundLabels.HIT_BUTTON);
               if(onClick) onClick(e);
          }}>
               <span className="button-shadow"></span>
               <span className="text">{text}</span>
          </button>
     )
}

export default GameButton
