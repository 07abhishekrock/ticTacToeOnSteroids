import React, { ReactEventHandler } from 'react'

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
          <button type='button' className={`game-button ${className}`} onClick={onClick}>
               <span className="button-shadow"></span>
               <span className="text">{text}</span>
          </button>
     )
}

export default GameButton
