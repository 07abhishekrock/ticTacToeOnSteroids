import {useContext, useEffect , useState} from 'react'
import GlobalStateContext from '../store/GlobalStateContext';
import {useParams} from 'react-router';
import GameArena from '../components/GameArena';
import { GameSession, GameState } from '../utils/types';
import { initialGameSession } from '../utils/constants';



function ReplayGameScreen() {

     const {globalState , dispatchToGlobalState} = useContext(GlobalStateContext);
     const [replayingGameSession , setReplayingGameSession] = useState<GameSession>(initialGameSession);
     const {gameId} = useParams();

     useEffect(()=>{
          const gameSessionFound = globalState.allGameSessions.filter((gameSession)=>{
               return gameSession.gameID === gameId;
          })[0];
          if(gameSessionFound){
               setReplayingGameSession(gameSessionFound);
          }
     },[gameId , globalState.allGameSessions])

     return (
          <div className="playground-screen">

               {replayingGameSession && replayingGameSession?.gameState !== GameState.CREATED 

               ?

               <GameArena 
                    addMoves={(newMoveState)=>{
                         dispatchToGlobalState({
                              type : 'ADD-MOVE',
                              payload : newMoveState
                         })
                    }} 
                    StartingMoveState={{
                         state : replayingGameSession.gameMoves[0],
                         player : 0
                    }}
                    currentGameSession={replayingGameSession}
                    type="replay"
               /> : 

               <h1 style={{margin:"4em auto",textAlign : 'center'}}>No Game Found For This ID</h1>

               }
          </div>
     )
}

export default ReplayGameScreen
