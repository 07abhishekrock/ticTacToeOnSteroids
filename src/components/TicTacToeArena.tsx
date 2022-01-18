import React from 'react'
import { SystemColors } from '../utils/constants';
import pushAudioEvent from '../utils/soundPanel';
import { SoundLabels } from '../utils/sounds';
import { TicTacToeLayoutInterface } from '../utils/TicTacToeLayout';
import { GameArenaCommonProps , GameResult, GameResultType, GameState } from '../utils/types';
import TicTacToeIcon from './TicTacToeIcon';



type TicTacToeArenaProps = GameArenaCommonProps & {
     currentMove : TicTacToeLayoutInterface,
     currentPlayer : 0 | 1,
     setCurrentMove : React.Dispatch<React.SetStateAction<TicTacToeLayoutInterface>>,
     markResult:(result : GameResult)=>void

}

function TicTacToeArena({ type , currentGameSession , currentMove  , setCurrentMove, currentPlayer , markResult} : TicTacToeArenaProps) {
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

                         setCurrentMove((OldMove)=>{
                              const newState = JSON.parse(JSON.stringify(OldMove)) as TicTacToeLayoutInterface;
                              newState[y][x] = currentPlayer === 0 ? 'O' : 'X';
                              return newState;
                         })
                    }}
                    onGameEnd={(result : GameResultType)=>{
                         if(result === GameResultType['WITH-RESULT']){
                              if(type === 'play') pushAudioEvent(SoundLabels.GAME_WIN_SOUND);
                              markResult({
                                   result ,
                                   winner : currentPlayer
                              })
                         }
                         else if(result === GameResultType['TIED']){
                              if(type === 'play') pushAudioEvent(SoundLabels.GAME_TIE_SOUND);
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
