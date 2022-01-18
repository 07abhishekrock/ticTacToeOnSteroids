import React from 'react'
import { GameSession, MoveStateType } from '../utils/types'

type CurrentPlayerBarType = {
     currentGameSession : GameSession
     currentMoveState : MoveStateType
}

type SinglePlayerCircleProps = {
     icon : string,
     color : string,
     playerIndex : number,
     isPlayingTurn : boolean
}

function SinglePlayerCircle({icon , color , playerIndex , isPlayingTurn} : SinglePlayerCircleProps){
     return <div 
          className={`single-player-circle ${isPlayingTurn ? 'single-player-circle--selected ' : ''} single-player-circle--${playerIndex}`} 
          style={{
               backgroundColor: 'white',
               outlineColor : color.split(' ')[1]
          }}
     >
          <img className="single-player-circle__player-icon" src={icon} alt={`player-${playerIndex}`}/>
     </div>
}

function CurrentPlayerBar({currentGameSession , currentMoveState} : CurrentPlayerBarType) {
     return (
          <div className="current-player-bar">

               <div className="current-player-bar__background"
                    style={{
                         backgroundColor : currentGameSession.players[currentMoveState.player].playerColor.split(' ')[0]
                    }}
               ></div>               

               {currentGameSession.players.map((player , playerIndex)=>{
                    return <SinglePlayerCircle 
                         key={playerIndex} 
                         playerIndex={playerIndex} 
                         color={player.playerColor} 
                         icon={player.playerIcon}
                         isPlayingTurn={currentMoveState.player === playerIndex}
                    />
               })}
               <div className="current-player-bar__player-name">
                    {currentGameSession.players.length > 0 && currentGameSession.players.filter((player , index)=>{
                         return index === currentMoveState.player;
                    })[0].playerName + " 's Turn"}
               </div>
          </div>
     )
}

export default CurrentPlayerBar
