import { useEffect, useReducer } from 'react';
import { BrowserRouter, Routes , Route , Navigate } from 'react-router-dom';
import MainPlayScreen from './pages/MainPlayScreen';

//stylesheets
import './styles/main.css';
import PlaygroundScreen from './pages/PlaygroundScreen';
import GlobalStateContext, { initialGlobalState , GlobalStateActionBundle , GlobalState} from './store/GlobalStateContext';
import { initialGameSession } from './utils/constants';
import { GameState } from './utils/types';
import ReplayGameScreen from './pages/ReplayGameScreen';
import Navbar from './components/Navbar';
import { addGameSessionToLocalStorage, fetchDataFromLocalStorage } from './utils/localStorage';
import HistoryScreen from './pages/HistoryScreen';
import pushAudioEvent from './utils/soundPanel';
import { SoundLabels } from './utils/sounds';


function App() {
  const [ globalState , dispatchToGlobalState ] = useReducer((state : GlobalState , action : GlobalStateActionBundle)=>{
    switch(action.type){
      case 'CREATE-GAME-SESSION' : return {
        ...state,
        currentGameSession : initialGameSession() 
      }
      case 'ADD-PLAYERS' : 
        if(state.currentGameSession){
          return {
            ...state , 
            currentGameSession : {
              ...state.currentGameSession,
              players : action.payload,
              gameState : GameState.PLAYING
            }
          } as GlobalState;
        }
        return state;
      case 'ADD-MOVE' : 
        if(state.currentGameSession && state.currentGameSession.gameState === GameState.PLAYING){
          return {
            ...state,
            currentGameSession : {
              ...state.currentGameSession,
              gameMoves : [...state.currentGameSession.gameMoves , action.payload]
            }
          }
        }
        return state;
      case 'MARK-RESULT' : 
        if(state.currentGameSession){
          return {
            ...state,
            allGameSessions : [{
              ...state.currentGameSession,
              gameResult : action.payload,
              gameState : GameState.COMPLETE
            },
              ...state.allGameSessions
            ],
            currentGameSession : {
              ...state.currentGameSession,
              gameResult : action.payload,
              gameState : GameState.COMPLETE
            }
          }
        }
        return state;
      case 'REPLAY-CURRENT-GAME' :
        if(state.currentGameSession){
          return {
            ...state,
            currentGameSession : {
              ...initialGameSession(),
              players : state.currentGameSession.players,
              gameState : GameState.PLAYING
            }
          }
        }
        return state;
      case 'ADD-GAME-SESSIONS' : 
        return {
          ...state,
          allGameSessions : [...action.payload , ...state.allGameSessions]
        }
    }
    return state; 
  }
  ,initialGlobalState)

  const dispatchToGlobalStateWrapper = (action : GlobalStateActionBundle)=>{
    if(action.type === 'FETCH-FROM-LOCALSTORAGE'){
      const allPastGameSessions = fetchDataFromLocalStorage();
      dispatchToGlobalState({
        type : 'ADD-GAME-SESSIONS',
        payload : allPastGameSessions
      })
    }
    if(action.type === 'ADD-PLAYERS'){
      pushAudioEvent(SoundLabels.GAME_START_SOUND);
      dispatchToGlobalState(action);
    }
    else{
      dispatchToGlobalState(action);
    }
  }

  useEffect(()=>{
    dispatchToGlobalStateWrapper({
      type : 'FETCH-FROM-LOCALSTORAGE'
    })
  },[])

  useEffect(()=>{
    if(globalState.allGameSessions.length === 0) return;
    addGameSessionToLocalStorage(globalState.allGameSessions);
  },[globalState.allGameSessions])

  return (
    <GlobalStateContext.Provider value={{globalState , dispatchToGlobalState : dispatchToGlobalStateWrapper}}>
      <div className="App">
        <BrowserRouter> 
          <Navbar/>
          <Routes>
            <Route path="/" element={<Navigate replace to="/play" />} />
            <Route element={<MainPlayScreen/>} path="/play"/>
            <Route element={<PlaygroundScreen totalPlayers={2}/>} path="/play/1v1"/>
            <Route element={<HistoryScreen/>} path="/history"/>
            <Route element={<ReplayGameScreen/>} path="/history/:gameId"/>
          </Routes> 
        </BrowserRouter>
      </div>
    </GlobalStateContext.Provider>
  );
}

export default App;
