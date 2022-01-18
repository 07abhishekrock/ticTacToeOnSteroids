import { GameSession } from "./types";
const gameSessionLabelForLocalStorage = 'pastGameSessions';

function createEntryInLocalStorage(){
     localStorage.setItem(gameSessionLabelForLocalStorage , JSON.stringify([]));
}

export function fetchDataFromLocalStorage(){
     const pastGameSessionsJSONString = localStorage.getItem(gameSessionLabelForLocalStorage);
     if(pastGameSessionsJSONString){
          return JSON.parse(pastGameSessionsJSONString) as GameSession[];
     }
     else{
          createEntryInLocalStorage();
          return [] as GameSession[];
     }
}

export function addGameSessionToLocalStorage(newGameSessionArray : GameSession[]){
     const pastGameSessions = fetchDataFromLocalStorage();
     if(typeof pastGameSessions.length !== undefined){
          //it is an array
          const newGameSessionArrayString = JSON.stringify(newGameSessionArray);
          localStorage.setItem(gameSessionLabelForLocalStorage , newGameSessionArrayString);
     }
}

