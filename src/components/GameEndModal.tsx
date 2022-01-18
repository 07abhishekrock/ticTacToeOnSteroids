import React from 'react'
import { useNavigate } from 'react-router';
import crownImage from '../icons/crown.svg';
import { BannerResultStateType, GameArenaCommonProps, GameResultType, GameSession, PlayerType } from '../utils/types';
import GameButton from './GameButton';

type GameEndModalProps = {
     modalDisplayType : BannerResultStateType,
     closeModal : ()=>void,
     playCurrentGameAgain ?: ()=>void
} & GameArenaCommonProps;

type UserIconProps = {
     isWinner : boolean;
     playerData : PlayerType
}

function UserIcon({isWinner , playerData} : UserIconProps){
     return <div className="user-icon-wrapper">
          {isWinner ? <img src={crownImage} className="user-icon__crown"></img> : null}
          <img className="user-icon__image" src={playerData.playerIcon} alt={playerData.playerName}/>
          <h5 className="user-icon__name">{playerData.playerName}</h5>
     </div>
}

function OnFinishButtonGroup({playCurrentGameAgain , currentGameSession} : {playCurrentGameAgain ?:  ()=>void , currentGameSession : GameSession}){
     const navigate = useNavigate();
     return <div className="game-end-modal__button-group">
          <GameButton
               text="Play Again"
               className="game-end-modal__button game-end-modal__button--play-again"
               type="button"
               onClick={()=>{
                    if(playCurrentGameAgain) playCurrentGameAgain();
               }}
          />
          <GameButton 
               text="Replay"
               className="game-end-modal__button game-end-modal__button--replay"
               type="button"
               onClick={()=>{
                    //redirect to url
                    navigate('/history/' + currentGameSession.gameID , {
                         state : {
                              hideBannerOnStart : true
                         }
                    });
               }}
          />
     </div>

}

function OnReplayButtonGroup({closeModal} : {closeModal : ()=>void}){
     const navigate = useNavigate();
     return <div className="game-end-modal__button-group">
          <GameButton
               text="Go Back"
               className="game-end-modal__button game-end-modal__button--go-back"
               type="button"
               onClick={()=>{
                    navigate('/play');
               }}
          />
          <GameButton
               text="Replay Game"
               className="game-end-modal__button game-end-modal__button--replay"
               type="button"
               onClick={closeModal}
          />
     </div>
}

const HeadLines = {
     winnerAfterGame : <>We have a winner !!!</>,
     tieAfterGame : <>Whew !!!<br/>That was a close one.</>,
     replayGameDate : (date: string)=><>This game was played on {(new Date(date)).toDateString()}</>,
     replayWinnerAfterGame : <>We had a winner !!!</>,
     replayTieAfterGame : <>Whew !!!<br/>This was a close one.</>,
}

function GameEndModal({
     modalDisplayType , closeModal , currentGameSession , type , playCurrentGameAgain
} : GameEndModalProps) {
     return (
          modalDisplayType === 'FINISH-GAME' ? 
          <div className="game-end-modal-wrapper">
               <div className="game-end-modal">
                    {
                         currentGameSession.gameResult.result === GameResultType['WITH-RESULT'] && currentGameSession.gameResult.winner !== null ? 
                              <> 
                                   <h2 className="game-end-modal__heading game-end-modal__heading--winner">
                                        {type === 'play' ? HeadLines.winnerAfterGame 
                                             : 
                                        <>
                                             <i className="smaller">{HeadLines.replayGameDate(currentGameSession.dateOfPlaying)}</i>
                                             {HeadLines.replayWinnerAfterGame}
                                        </>
                                        }
                                   </h2> 

                                   <UserIcon isWinner={true} playerData={currentGameSession.players[currentGameSession.gameResult.winner]}/>

                                   <h5 className="game-end-modal__sub-heading game-end-modal__sub-heading--winner">completed in {currentGameSession.gameMoves.length} moves</h5>

                                   {type === 'play' ? 
                                   <OnFinishButtonGroup 
                                        playCurrentGameAgain={playCurrentGameAgain}
                                        currentGameSession={currentGameSession}
                                   />
                                    : <OnReplayButtonGroup closeModal={closeModal}/>}
                              </>
                         : null
                    }
                    {
                         currentGameSession.gameResult.result === GameResultType['TIED'] && currentGameSession.gameResult.winner === null ? 
                              <>
                                   <h2 className="game-end-modal__heading game-end-modal__heading--tie">
                                        {type === 'play' ? HeadLines.tieAfterGame 
                                             : 
                                        <>
                                             <i className="smaller">{HeadLines.replayGameDate(currentGameSession.dateOfPlaying)}</i>
                                             {HeadLines.replayTieAfterGame}
                                        </>
                                        }
                                   </h2>    

                                   <div className="game-end-modal__user-icons">
                                        {currentGameSession.players.map((player)=>{
                                             return <UserIcon isWinner={false} playerData={player} key={player.playerName}/>
                                        })}
                                   </div>

                                   <h5 className="game-end-modal__sub-heading game-end-modal__sub-heading--tie">the game ended in a tie</h5>
                                   {type === 'play' ? <OnFinishButtonGroup currentGameSession={currentGameSession} playCurrentGameAgain={playCurrentGameAgain}/>
                                   : <OnReplayButtonGroup closeModal={closeModal}/>}
                              </>
                         : null
                    }
               </div>
          </div>
          : null
     )
}

export default GameEndModal
