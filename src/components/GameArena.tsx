import {useEffect, useState} from 'react'
import MovesHistory from './MovesHistory';
import { BannerResultStateType, GameArenaCommonProps, GameResult, GameResultType, GameState, MoveStateType, PlayerIndex} from '../utils/types'
import TicTacToeArena from './TicTacToeArena';
import {isInitialLayout, TicTacToeLayoutInterface} from '../utils/TicTacToeLayout';
import CurrentPlayerBar from './CurrentPlayerBar';
import GameEndModal from './GameEndModal';
import { initialGameResult, initialTicTacToeState } from '../utils/constants';
import { useLocation } from 'react-router-dom';

type GameArenaProps = GameArenaCommonProps & {
     addMoves : (state : TicTacToeLayoutInterface)=>void,
     StartingMoveState : MoveStateType,
     markResult ?: (gameResult : GameResult)=>void,
     playCurrentGameAgain ?: ()=>void
};

type BannerStartCommand = {
     state : {
          hideBannerOnStart ?: boolean
     }
}

function GameArena({
     type , currentGameSession , addMoves , StartingMoveState , markResult , playCurrentGameAgain
} : GameArenaProps) {

     const [currentMove , setCurrentMove] = useState<TicTacToeLayoutInterface>(StartingMoveState.state)
     const [currentPlayer , setCurrentPlayer] = useState<PlayerIndex>(StartingMoveState.player);
     const [gameResult , markGameResult] = useState<GameResult>(initialGameResult as GameResult);

     const location = useLocation() as BannerStartCommand;
     const [resultBannerType , setResultBannerType] = useState<BannerResultStateType>(type === 'play' || location.state?.hideBannerOnStart ? 'NONE' : 'FINISH-GAME' );

     useEffect(()=>{
          if(!isInitialLayout(currentMove) && type === 'play'){
               addMoves(currentMove);
          }
     },[type , currentMove , currentGameSession.gameState])

     useEffect(()=>{
          if(currentGameSession.gameMoves.length <= 1 || currentGameSession.gameState === GameState.COMPLETE) return;
          if(gameResult.result !== GameResultType.TBD){
               setTimeout(()=>{
                    setResultBannerType('FINISH-GAME');
               },1000)
               if(markResult) markResult(gameResult);
          }
          else{
               if(type==='play') setCurrentPlayer(player=>player === 0 ? 1 : 0);
          }
     },[currentGameSession.gameMoves , gameResult , markResult , currentGameSession.gameState])


     return (
          <div className="game-arena">
               <TicTacToeArena 
                    type={type} 
                    currentMove={currentMove}
                    currentPlayer={currentPlayer}
                    setCurrentMove={setCurrentMove}
                    currentGameSession={currentGameSession}
                    markResult={markGameResult}
               />

               <MovesHistory
                    currentGameSession={currentGameSession} 
                    currentMove={currentMove}
                    currentPlayer={currentPlayer}
                    setCurrentMove={setCurrentMove}
                    setCurrentPlayer={setCurrentPlayer}
                    type={type}
               />

               <CurrentPlayerBar
                    currentGameSession={currentGameSession} 
                    currentMoveState={{
                         player : currentPlayer,
                         state : currentMove
                    }}
               />

               <GameEndModal 
                    modalDisplayType={resultBannerType} 
                    closeModal={()=>{
                         setResultBannerType('NONE');
                    }}
                    currentGameSession={currentGameSession}
                    type={type}
                    playCurrentGameAgain={()=>{
                         if(playCurrentGameAgain){
                              setResultBannerType('NONE');
                              setCurrentPlayer(0);
                              setCurrentMove(initialTicTacToeState);
                              markGameResult({
                                   result : GameResultType.TBD,
                                   winner : null
                              })
                              playCurrentGameAgain();
                         }
                    }}
               />

          </div>
     )
}

export default GameArena
