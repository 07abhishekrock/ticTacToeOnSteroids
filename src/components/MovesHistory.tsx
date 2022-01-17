import React from 'react'
import { GameArenaCommonProps, MoveStateType } from '../utils/types'
import { SystemColors } from '../utils/constants'
import TicTacToeIcon from './TicTacToeIcon'
import { areSameLayouts } from '../utils/TicTacToeLayout'

type MovesHistoryProps = {
     currentMoveState : MoveStateType,
     setCurrentMoveState : React.Dispatch<React.SetStateAction<MoveStateType>>,
} & GameArenaCommonProps

function MovesHistory({
     type,
     currentGameSession,
     currentMoveState,
     setCurrentMoveState
} : MovesHistoryProps) {
     return (
          <div className="moves-history-wrapper">
               <ul className="moves-history">
                    {currentGameSession.gameMoves.map((gameMove , index)=>{
                         return <li key={index} className={`${areSameLayouts(currentMoveState.state , gameMove) ? 'move--highlight' : ''}`} onClick={()=>{
                              if(type === 'replay'){
                                   setCurrentMoveState({
                                        player : index % 2 as 0 | 1,
                                        state : gameMove
                                   })
                              }
                         }}>
                              <TicTacToeIcon 
                                   size="small"
                                   active={false}
                                   freeze={false}
                                   noughtColor={currentGameSession.players[0].playerColor.split(' ')[0]}
                                   crossColor={currentGameSession.players[1].playerColor.split(' ')[1]} 
                                   gutterColor={SystemColors.whiteTicTacToe.background}
                                   boxShadow={SystemColors.whiteTicTacToe.boxShadow}
                                   plateColor={"white"}
                                   layout={gameMove}
                              />
                         </li>
                    })}
               </ul>
          </div>
     )
}

export default MovesHistory
