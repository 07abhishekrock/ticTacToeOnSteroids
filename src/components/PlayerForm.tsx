import React, { useState , useEffect } from 'react'
import { UserOptions } from '../utils/constants'
import { PlayerType } from '../utils/types'
import UserOptionsModal from './UserOptionsModal'
import GameButton from './GameButton'
import { usePlayerForm } from '../utils/hooks'

type PlayerFormProps = {
     totalPlayers : 1 | 2,
     addPlayers : (playerObject : PlayerType[])=>void,
}

enum UserOptionModalStateType{'none', 'color', 'avatar'};

function appendSuperscriptToNumber(number : number){
     switch(number){
          case 0 : return '1st';
          case 1 : return '2nd';
          default : return 'nth'
     }
}

function PlayerForm({totalPlayers , addPlayers } : PlayerFormProps) {

     const [userOptionModalState , setUserOptionModalState] = useState<UserOptionModalStateType>(UserOptionModalStateType.none);
     const { 
          players,
          addAPlayer , 
          currentPlayer , 
          setCurrentPlayer ,
          isPropTaken
     } = usePlayerForm({totalPlayers});

     const closeModal = ()=>{
          setUserOptionModalState(UserOptionModalStateType.none);
     }

     useEffect(()=>{
          if(players.length === totalPlayers){
               addPlayers(players);
          }
     },[players , addPlayers , totalPlayers])


     return (
          <div className="add-player-form-wrapper">
               <h3 className="add-player-form--heading">Add {appendSuperscriptToNumber(players.length)} Player</h3>
               <form className="add-player-form" onSubmit={(e)=>{
                    e.preventDefault();
                    addAPlayer();
               }}>
                    <div className="add-player-form-user-preview">
                         <img className="add-player-form-user-preview__image" 
                              alt="avatar"
                              src={currentPlayer.playerIcon}
                              style={{
                                   outlineColor : currentPlayer.playerColor.split(' ')[0]
                              }}
                         />

                         <div className="add-player-form-user-preview__button-group">
                              <GameButton 
                                   type="button" 
                                   text="Change Avatar" 
                                   onClick={()=>{
                                        setUserOptionModalState(UserOptionModalStateType.avatar)
                                   }}
                                   className="add-player-form-user-preview__button add-player-form-user-preview__button--avatar"
                              />
                              <GameButton 
                                   type="button" 
                                   text="Change Color"
                                   onClick={()=>{
                                        setUserOptionModalState(UserOptionModalStateType.color)
                                   }}
                                   className="add-player-form-user-preview__button add-player-form-user-preview__button--color"
                              /> 
                         </div>

                         <UserOptionsModal 
                              view={userOptionModalState === UserOptionModalStateType.avatar} 
                              heading="Choose Avatar" 
                              closeModal={closeModal}
                         >
                              {UserOptions.avatars.map((avatarOption , index)=>{
                                   const id = `face-${index}`;
                                   return <div className="user-option user-option--avatar" key={index}>
                                        <input 
                                             type="radio"
                                             checked={currentPlayer.playerIcon === avatarOption}
                                             id={id} 
                                             className="user-option__radio" 
                                             name="avatar"
                                             value={avatarOption}
                                             disabled={isPropTaken({type : 'avatar' , value : avatarOption})}
                                             onChange={(e)=>{
                                                  if(e.target.checked) setCurrentPlayer(player=>{
                                                       return {
                                                            ...player,
                                                            playerIcon : avatarOption
                                                       }
                                                  })
                                             }}
                                        />
                                        <label className="user-option__label" htmlFor={id}>
                                             <img src={avatarOption} alt={id}/>
                                        </label>
                                   </div>
                              })}
                         </UserOptionsModal>
                         
                         <UserOptionsModal 
                              view={userOptionModalState === UserOptionModalStateType.color} 
                              heading="Choose Color" 
                              closeModal={closeModal}
                         >
                              {UserOptions.colors.map((colorOption , index)=>{
                                   const id = `color-${index}`;
                                   return <li className="user-option user-option--color" key={index}>
                                        <input 
                                             type="radio" 
                                             id={id} 
                                             className="user-option__radio" 
                                             name="color" 
                                             checked={colorOption.background === currentPlayer.playerColor.split(' ')[0]}
                                             value={colorOption.background.concat(' ' , colorOption.outline)}
                                             disabled={isPropTaken({type : 'color' , value : colorOption.background.concat(' ' , colorOption.outline)})}
                                             onChange={(e)=>{
                                                  if(e.target.checked) setCurrentPlayer(player=>{
                                                       return {
                                                            ...player,
                                                            playerColor : e.target.value
                                                       }
                                                  })
                                             }}
                                        />
                                        <label className="user-option__label" htmlFor={id} style={{backgroundColor : colorOption.background}}></label>
                                   </li> 
                              })} 
                         </UserOptionsModal>                         

                    </div>

                    <div className="add-player-form-user-name">
                         <label className="add-player-form-user-name__label" htmlFor='input-'>Name</label>
                         <input type="text" 
                              className="add-player-form-user-name__input" 
                              value={currentPlayer.playerName} 
                              onChange={(e)=>{
                                   setCurrentPlayer(player => {
                                        return {
                                             ...player,
                                             playerName : e.target.value
                                        }
                                   })
                              }
                         }/>
                    </div>
                    
                    <GameButton 
                         className="game-button add-player-submit" 
                         text="Add Player" 
                         type="submit"
                         
                    />
               </form> 
          </div>
     )
}

export default PlayerForm
