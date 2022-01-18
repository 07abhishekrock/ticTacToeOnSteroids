import face0 from '../icons/face-0.svg'; 
import face1 from '../icons/face-1.svg'; 
import face2 from '../icons/face-2.svg';
import face3 from '../icons/face-3.svg';
import { TicTacToeLayoutInterface } from './TicTacToeLayout';
import {v4 as uuidv4} from 'uuid';
import { GameResult, GameResultType, GameSession, GameState } from './types';

export const SystemColors = {
     yellowTicTacToe : {
          background : "#FFD76F",
          boxShadow : "0px 0px 30px 20px #FFC93E"
     },
     whiteTicTacToe : {
          background : "#F6F6F6",
          boxShadow : "0px 0px 25px 5px rgba(0,0,0,0.05)"
     },
     blueTheme : {
          markColor : "#009CCD",
     },
     redTheme : {
          markColor : "#FF5A5A",
     },
     gutterColors : {
          white : 'white',
          gray : '#f5f5f5'
     }
}

export const UserOptions = {
     avatars : [
          face0 , face1 , face2 , face3
     ],
     colors : [
          {
               background : '#009CCD',
               outline : '#0184AC'
          },
          {
               background : '#FF9D9D',
               outline : '#FF8080'
          },
          {
               background : '#4DA696',
               outline : '#2F8273'
          },
          {
               background : '#367090',
               outline : '#1E516D'
          }
     ]
}

export const initialTicTacToeState : TicTacToeLayoutInterface = [
     ['' , '' , ''],
     ['' , '' , ''],
     ['' , '' , '']
]

export const initialGameSession = () : GameSession => {
     return {
          dateOfPlaying : (new Date()).toDateString(),
          gameID : uuidv4(),
          gameMoves : [initialTicTacToeState],
          gameResult : {
               result : GameResultType.TBD,
               winner : null
          },
          gameState : GameState.CREATED,
          players : []
     }

}

export const initialGameResult : GameResult = {
     result : GameResultType.TBD,
     winner : null
}