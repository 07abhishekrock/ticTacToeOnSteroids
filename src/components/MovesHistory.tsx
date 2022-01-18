import React from 'react'
import { GameArenaCommonProps, PlayerIndex } from '../utils/types'
import { SystemColors } from '../utils/constants'
import TicTacToeIcon from './TicTacToeIcon'
import { areSameLayouts, TicTacToeLayoutInterface } from '../utils/TicTacToeLayout'

type MovesHistoryProps = {
     currentMove : TicTacToeLayoutInterface,
     currentPlayer : PlayerIndex,
     setCurrentMove : React.Dispatch<React.SetStateAction<TicTacToeLayoutInterface>>,
     setCurrentPlayer : React.Dispatch<React.SetStateAction<PlayerIndex>>,
} & GameArenaCommonProps

function MovesHistory({
     type,
     currentGameSession,
     currentMove,
     setCurrentMove,
     setCurrentPlayer
} : MovesHistoryProps) {
     return (
          <div className="moves-history-wrapper">
               <ul className="moves-history">
                    {currentGameSession.gameMoves.map((gameMove , index)=>{
                         return <li key={index} className={`${areSameLayouts(currentMove , gameMove) ? 'move--highlight' : ''}`} onClick={()=>{
                              if(type === 'replay'){
                                   setCurrentMove(gameMove);
                                   if(index < currentGameSession.gameMoves.length){
                                        if(index == 0) setCurrentPlayer(0 as PlayerIndex);
                                        else setCurrentPlayer((index + 1) % 2 as PlayerIndex);
                                   }
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
