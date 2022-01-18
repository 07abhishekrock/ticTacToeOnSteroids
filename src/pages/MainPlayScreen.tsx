//this page is where the game loading starts , 
//consists of buttons to select the type of game to play.
import GameButton from '../components/GameButton';
import LandingScreenWithSplash from '../components/LandingScreenWithSplash';
import { useNavigate } from 'react-router';

const MainPlayScreen= ()=>{
     const navigate = useNavigate();
     return <LandingScreenWithSplash 
          mainScreenHeading='Start Here'
          mainScreen={
               <div className="pick-a-match-button-group">
                    <GameButton 
                         className="game-button pick-a-match-button pick-a-match-button__1v1"
                         text="Play Now"
                         type='button'
                         onClick={()=>{
                              navigate('/play/1v1');
                         }}
                    />
                    {/* <GameButton 
                         className="game-button pick-a-match-button pick-a-match-button__1vPC"
                         text="1 Vs 1"
                         type='button'
                    /> */}
                    <GameButton 
                         className="game-button pick-a-match-button pick-a-match-button__1vPC"
                         text="Replay"
                         type='button'
                         onClick={()=>{
                              navigate('/history');
                         }}
                    />
               </div>
     }/>
}

export default MainPlayScreen;

