import React from 'react'
import { SystemColors } from '../utils/constants';
import { TicTacToeLayoutInterface } from '../utils/TicTacToeLayout';
import { GameArenaCommonProps , GameResult, GameResultType, GameState, MoveStateType } from '../utils/types';
import TicTacToeIcon from './TicTacToeIcon';



type TicTacToeArenaProps = GameArenaCommonProps & {
     currentMove : TicTacToeLayoutInterface,
     currentPlayer : 0 | 1,
     setCurrentMoveState : React.Dispatch<React.SetStateAction<MoveStateType>>,
     markResult:(result : GameResult)=>void

}

function TicTacToeArena({ type , currentGameSession , currentMove  , setCurrentMoveState, currentPlayer , markResult} : TicTacToeArenaProps) {
     return (
          <div className="tic-tac-toe-arena">
               <TicTacToeIcon
                    size="large"
                    active={true}
                    noughtColor={currentGameSession.players[0]?.playerColor.split(' ')[0]}
                    crossColor={currentGameSession.players[1]?.playerColor.split(' ')[0]}
                    gutterColor={SystemColors.whiteTicTacToe.background}
                    boxShadow={SystemColors.whiteTicTacToe.boxShadow}
                    layout={currentMove}
                    plateColor="white"
                    markCrossOrNaught={(newState)=>{
                         if(type === 'replay') return;

                         const y = Math.floor(newState / 3);
                         const x = newState - (3 * y);

                         setCurrentMoveState((OldMoveState)=>{
                              const newState = JSON.parse(JSON.stringify(OldMoveState.state)) as TicTacToeLayoutInterface;
                              newState[y][x] = currentPlayer === 0 ? 'O' : 'X';
                              return {state : newState , player : currentPlayer === 0 ? 1 : 0}
                         })
                    }}
                    onGameEnd={(result : GameResultType)=>{
                         if(result === GameResultType['WITH-RESULT']){
                              markResult({
                                   result ,
                                   winner : currentPlayer === 0 ? 1 : 0
                              })
                         }
                         else if(result === GameResultType['TIED']){
                              markResult({
                                   result ,
                                   winner : null
                              })
                         }
                    }}
                    freeze={currentGameSession.gameState === GameState.COMPLETE}
               />
          </div>
     )
}

export default TicTacToeArena
