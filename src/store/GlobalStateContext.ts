import React from 'react';
import { TicTacToeLayoutInterface } from '../utils/TicTacToeLayout';
import { GameSession, PlayerType , GameState, GameResult } from '../utils/types';

export type GlobalState = {
     allGameSessions : GameSession[],
     currentGameSession ?: GameSession
}

export const initialGlobalState = {
     allGameSessions : [],
} as GlobalState;

export type GlobalStateActionBundle = {
     type : 'ADD-TO-HISTORY',
     payload : GameSession
} | {
     type : 'CREATE-GAME-SESSION',
} | {
     type : 'ADD-PLAYERS',
     payload : PlayerType[]
} | {
     type : 'ADD-MOVE',
     payload : TicTacToeLayoutInterface
} | {
     type : 'CHANGE-GAME-STATE',
     payload : GameState
} | {
     type : 'MARK-RESULT',
     payload : GameResult
} | {
     type : 'DELETE-CURRENT-SESSION',
} | {
     type : 'REPLAY-CURRENT-GAME'
} | {
     type : 'FETCH-FROM-LOCALSTORAGE'
} | {
     type : 'ADD-GAME-SESSIONS',
     payload : GameSession[]
}


type GlobalStateContextType = {
     globalState : GlobalState,
     dispatchToGlobalState : (actionBundle : GlobalStateActionBundle)=>void
}

export default React.createContext({} as GlobalStateContextType);