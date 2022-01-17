import { useEffect, useState , useCallback } from "react"
import { UserOptions } from "./constants";
import { PlayerType } from "./types"

export const usePlayerForm = ({totalPlayers} : {totalPlayers : number})=>{


     const [players , setPlayers] = useState([] as PlayerType[]);
     
     const nextAvailableAvatar = useCallback(()=>{
          const takenAvatars = players.map(player=>player.playerIcon);
          const availableAvatars = UserOptions.avatars.filter((userOption)=>{
               if(takenAvatars.includes(userOption)) return false;
               else return true;
          })
          if(availableAvatars.length > 0) return availableAvatars[0];
          return '';
     },[players])

     const nextAvailableColor = useCallback(()=>{
          const takenColors = players.map(player=>player.playerColor.split(' ')[0]);
          const availableColors = UserOptions.colors.filter((userOption)=>{
               if(takenColors.includes(userOption.background)) return false;
               else return true;
          })
          if(availableColors.length > 0) return availableColors[0].background.concat(' ' , availableColors[0].outline);
          return 'white white';
     },[players])

     const isPropTaken = ({type , value} : {type : 'avatar' | 'color' , value : string})=>{
          if(type === 'color'){
               const takenColors = players.map(player=>player.playerColor);
               return takenColors.includes(value);
          }
          else{
               const takenAvatars = players.map(player=>player.playerIcon);
               return takenAvatars.includes(value);
          }
     }

     const addAPlayer = ()=>{
          if(totalPlayers > players.length){
               const isNameProvided = currentPlayer.playerName !== '';
               if(isNameProvided) {
                    setPlayers(players => [
                         ...players,
                         currentPlayer
                    ])
               }
               else{
                    setPlayers(players => [
                         ...players,
                         {
                              ...currentPlayer,
                              playerName : 'Anonymous #' + players.length
                         }
                    ])
               }
          }
     }
     const [currentPlayer , setCurrentPlayer] = useState({
          playerName : '',
          playerColor : nextAvailableColor(),
          playerIcon : nextAvailableAvatar()
     } as PlayerType);

     useEffect(()=>{
          if(players.length > 0){
               setCurrentPlayer({
                    playerName : '',
                    playerColor : nextAvailableColor(),
                    playerIcon : nextAvailableAvatar()
               })
          }
     },[players])

     return { players , addAPlayer , currentPlayer , setCurrentPlayer , nextAvailableAvatar , nextAvailableColor , isPropTaken}
}