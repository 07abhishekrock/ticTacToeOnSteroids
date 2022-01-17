import { SystemColors } from '../utils/constants';
import TicTacToeIcon from './TicTacToeIcon';
import SplashHeading from './SplashHeading';


interface LandingScreenProps{
     mainScreen : JSX.Element,
     mainScreenHeading : string
}

function LandingScreenWithSplash({mainScreen , mainScreenHeading} : LandingScreenProps) {
     return (
          <div className="landing-screen-with-splash">
               <div className="landing-screen-with-splash__splash">
                    <TicTacToeIcon 
                         size='large'
                         crossColor={SystemColors.blueTheme.markColor}
                         noughtColor={SystemColors.redTheme.markColor}
                         gutterColor={SystemColors.gutterColors.white}
                         plateColor={SystemColors.yellowTicTacToe.background}
                         layout={[['','X',''],['O','X','O'],['X','O','X']]}
                         boxShadow={SystemColors.yellowTicTacToe.boxShadow}
                         active = {false}
                         freeze = {false}
                    />
                    <SplashHeading/>
               </div>
               <div className="landing-screen-with-splash__content">
                    <h1 className="landing-screen-with-splash__content__heading">{mainScreenHeading}</h1>
                    {mainScreen}
               </div>
          </div>
     )
}

export default LandingScreenWithSplash

