import { TicTacToeLayoutInterface } from './TicTacToeLayout';

export enum GameState{'CREATED' , 'PLAYING' , 'COMPLETE'};

export enum GameResultType{'TBD' , 'WITH-RESULT' , 'TIED'}

export interface GameResult {
     result : GameResultType,
     winner : number | null
}

export interface PlayerType{
     playerName : string,
     playerIcon : string,
     playerColor : string
}

export interface GameSession{
     gameID : string,
     gameState : GameState,
     players : PlayerType[],
     gameResult : GameResult,
     gameMoves : TicTacToeLayoutInterface[],
     dateOfPlaying : string
}

export type BannerResultStateType = 'NONE' | 'FINISH-GAME' 

export interface GameArenaCommonProps{
     type : 'play' | 'replay',
     currentGameSession : GameSession,
}

export type MoveStateType = {state : TicTacToeLayoutInterface , player : 0 | 1};

export type PlayerIndex = 0 | 1;