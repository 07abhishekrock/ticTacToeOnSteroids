import React , {useContext} from 'react'
import GlobalStateContext from '../store/GlobalStateContext';
import { GameResult, PlayerType } from '../utils/types';
import { useNavigate } from 'react-router';
import {ReactComponent as PlayIcon} from '../icons/play.svg';

function getTagLine(gameResult : GameResult , players : PlayerType[] , gameMovesCount : number){
     if(gameResult.winner !== null){
          return `${players[gameResult.winner].playerName} won by ${gameMovesCount} Moves`;
     }
     else{
          return `Game Tied`;
     }
}

function PastGames() {
     const {globalState} = useContext(GlobalStateContext);
     const navigate = useNavigate();
     return (
          <ul className="past-games">
               {globalState.allGameSessions.map((gameSession)=>{

                    return <li key={gameSession.gameID} onClick={()=>{
                         navigate('/history/' + gameSession.gameID);
                    }} className="past-games__single">
                              <h4 className="past-games__single--title">
                                   {gameSession.players[0].playerName}  <i>Vs</i>  {gameSession.players[1].playerName}
                              </h4>
                              <span className="past-games__single--game-play-btn">
                                   <PlayIcon/>
                              </span>
                              <h2 className="past-games__single--game-summary">
                                   {getTagLine(gameSession.gameResult , gameSession.players , gameSession.gameMoves.length)}
                              </h2>
                    </li> 

               })}
               {globalState.allGameSessions.length === 0 ? <li className="past-games__single">
                    <h4 className="past-games__single--title">No <i>Past Games</i> Found</h4>
                    <span className="past-games__single--game-play-btn">
                         <PlayIcon/>
                    </span>
                    <h2 className="past-games__single--game-summary">
                         Its all Empty
                    </h2>

               </li> : null}
          </ul>
     )
}

export default PastGames
