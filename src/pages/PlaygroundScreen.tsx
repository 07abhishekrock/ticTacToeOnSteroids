//this page is used to actually play new games. /play
import React , {useContext, useEffect} from 'react'
import PlayerForm from '../components/PlayerForm'
import GlobalStateContext from '../store/GlobalStateContext';

import GameArena from '../components/GameArena';
import { GameResult, GameState, PlayerType } from '../utils/types';
import { initialTicTacToeState } from '../utils/constants';

interface PlaygroundScreenProps{
     totalPlayers : 1 | 2,
}

function PlaygroundScreen({totalPlayers} : PlaygroundScreenProps) {

     const {globalState , dispatchToGlobalState} = useContext(GlobalStateContext);

     useEffect(()=>{
          dispatchToGlobalState({
               type : 'CREATE-GAME-SESSION'
          })
     },[])

     return (
          <div className="playground-screen">
               {globalState.currentGameSession?.gameState === GameState.CREATED 

               ? 

               <PlayerForm 
                    totalPlayers={totalPlayers} 
                    addPlayers={(playerObject : PlayerType[])=>{
                         dispatchToGlobalState({
                              type : 'ADD-PLAYERS',
                              payload : playerObject
                         })
                    }}
                    cancelGame={()=>{
                         dispatchToGlobalState({
                              type : 'DELETE-CURRENT-SESSION'
                         })
                    }}
               /> : null }

               {globalState.currentGameSession && globalState.currentGameSession?.gameState !== GameState.CREATED 

               ?

               <GameArena 
                    addMoves={(newMoveState)=>{
                         dispatchToGlobalState({
                              type : 'ADD-MOVE',
                              payload : newMoveState
                         })
                    }} 
                    markResult={(gameResult : GameResult)=>{
                         dispatchToGlobalState({
                              type : 'MARK-RESULT',
                              payload : gameResult
                         })
                    }}
                    StartingMoveState={{
                         player : 0,
                         state : initialTicTacToeState
                    }}
                    currentGameSession={globalState.currentGameSession}
                    type="play"
               /> : null

               }
          </div>
     )
}

export default PlaygroundScreen
