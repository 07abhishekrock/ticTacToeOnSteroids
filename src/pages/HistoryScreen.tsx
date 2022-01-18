import LandingScreenWithSplash from '../components/LandingScreenWithSplash'
import PastGames from '../components/PastGames'

function HistoryScreen() {
     return (
          <LandingScreenWithSplash
               mainScreen={<PastGames/>}
               mainScreenHeading='Past Games'
          />
     )
}

export default HistoryScreen
