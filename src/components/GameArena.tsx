import React , {useEffect, useState} from 'react'
import MovesHistory from './MovesHistory';
import { BannerResultStateType, GameArenaCommonProps, GameResult, GameState, MoveStateType} from '../utils/types'
import TicTacToeArena from './TicTacToeArena';
import {isInitialLayout, TicTacToeLayoutInterface} from '../utils/TicTacToeLayout';
import CurrentPlayerBar from './CurrentPlayerBar';

type GameArenaProps = GameArenaCommonProps & {
     addMoves : (state : TicTacToeLayoutInterface)=>void,
     StartingMoveState : MoveStateType,
     markResult : (gameResult : GameResult)=>void
};

function GameArena({
     type , currentGameSession , addMoves , StartingMoveState , markResult
} : GameArenaProps) {

     const [currentMoveState , setCurrentMoveState] = useState<MoveStateType>(StartingMoveState)
     const [bannerDisplayState , setBannerDisplayState] = useState('NONE' as BannerResultStateType);

     useEffect(()=>{
          if(!isInitialLayout(currentMoveState.state) && type === 'play'){
               addMoves(currentMoveState.state);
          }
     },[type , currentMoveState.state])


     return (
          <div className="game-arena">
               <TicTacToeArena 
                    type={type} 
                    currentMove={currentMoveState.state}
                    currentPlayer={currentMoveState.player}
                    setCurrentMoveState={setCurrentMoveState}
                    currentGameSession={currentGameSession}
                    markResult={markResult}
               />

               <MovesHistory
                    currentGameSession={currentGameSession} 
                    currentMoveState={currentMoveState}
                    setCurrentMoveState={setCurrentMoveState}
                    type={type}
               />

               <CurrentPlayerBar
                    currentGameSession={currentGameSession} 
                    currentMoveState={currentMoveState}
               />

          </div>
     )
}

export default GameArena
