//this page is where the game loading starts , 
//consists of buttons to select the type of game to play.
import LandingScreenWithSplash from '../components/LandingScreenWithSplash';

const MainPlayScreen= ()=>{
     return <LandingScreenWithSplash 
          mainScreenHeading='Pick A Game'
          mainScreen={
               <div className="pick-a-match-button-group">
                    <button className="game-button pick-a-match-button pick-a-match-button__1v1">
                         <span className="button-shadow"></span>
                         <span className="text">1 Vs 1</span>
                    </button>
                    <button className="game-button pick-a-match-button pick-a-match-button__1vPC">
                         <span className="button-shadow"></span>
                         <span className="text">1 Vs PC</span>
                    </button>
                    <button className="game-button pick-a-match-button pick-a-match-button__watch">
                         <span className="button-shadow"></span>
                         <span className="text">Watch</span>
                    </button>
               </div>
     }/>
}

export default MainPlayScreen;

