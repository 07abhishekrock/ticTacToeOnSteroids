import { useReducer } from 'react';
import { BrowserRouter, Routes , Route } from 'react-router-dom';
import MainPlayScreen from './pages/MainPlayScreen';

//stylesheets
import './styles/main.css';
import PlaygroundScreen from './pages/PlaygroundScreen';
import GlobalStateContext, { initialGlobalState , GlobalStateActionBundle , GlobalState} from './store/GlobalStateContext';
import { initialGameSession } from './utils/constants';
import { GameState } from './utils/types';


function App() {
  const [ globalState , dispatchToGlobalState ] = useReducer((state : GlobalState , action : GlobalStateActionBundle)=>{
    switch(action.type){
      case 'CREATE-GAME-SESSION' : return {
        ...state,
        currentGameSession : initialGameSession 
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
            currentGameSession : {
              ...state.currentGameSession,
              gameResult : action.payload,
              gameState : GameState.COMPLETE
            }
          }
        }
        return state;
    }
    return state; 
  }
  ,initialGlobalState)
  return (
    <GlobalStateContext.Provider value={{globalState , dispatchToGlobalState}}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route element={<div>Home Screen</div>} index/>
            <Route element={<MainPlayScreen/>} path="/play"/>
            <Route element={<PlaygroundScreen totalPlayers={2}/>} path="/play/1v1"/>
          </Routes> 
        </BrowserRouter>
      </div>
    </GlobalStateContext.Provider>
  );
}

export default App;
