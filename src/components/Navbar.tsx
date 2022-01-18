import React, { useState , useEffect } from 'react'
import {ReactComponent as TicTacToeSVG} from '../icons/ticTacToe.svg';
import {ReactComponent as HomeIcon} from '../icons/home.svg';
import pushAudioEvent from '../utils/soundPanel';
import { generateSoundEventString, SoundLabels, SoundState, SoundType } from '../utils/sounds';
import {ReactComponent as MusicIcon} from '../icons/music.svg';
import {ReactComponent as SoundIcon} from '../icons/sound.svg';
import {ReactComponent as PlayIcon} from '../icons/playIcon.svg';
import {ReactComponent as HistoryIcon} from '../icons/historyIcon.svg';
import { Link } from 'react-router-dom';

function SoundBar({linkIcons} : {linkIcons : Element | JSX.Element}){
     const [soundState , setSoundState] = useState<SoundState>({
          sample : false,
          track : false
     })
     const [areSamplesLoaded , changeIfSamplesLoaded] = useState(false);
     const [areTracksLoaded , changeIfTracksLoaded] = useState(false);
     useEffect(()=>{

          document.addEventListener(generateSoundEventString('SAMPLE'),()=>{
               changeIfSamplesLoaded(true);
          })
          document.addEventListener(generateSoundEventString('TRACK'),()=>{
               changeIfTracksLoaded(true);
          })
     },[])

     return <div className="sound-bar">
          {areTracksLoaded ? <i onClick={()=>{
               if(!soundState.track){
                    pushAudioEvent(SoundLabels.ENABLE_ALL_TRACKS);
                    pushAudioEvent(SoundLabels.SOUND_TRACK);
               }
               else{
                    pushAudioEvent(SoundLabels.DISABLE_ALL_TRACKS);
               }
               setSoundState(state=>{
                    return {...state , track : !state.track};
               })
          }} className={`sound-bar__icon sound-bar__icon--music ${soundState.track ? "" : "sound-bar__icon--disabled"} `}>
               <MusicIcon/>
          </i> : null}
          {areSamplesLoaded ? <i onClick={()=>{
               if(!soundState.sample){
                    pushAudioEvent(SoundLabels.ENABLE_ALL_SAMPLES);
               }
               else{
                    pushAudioEvent(SoundLabels.DISABLE_ALL_SAMPLES);
               }
               setSoundState(state=>{
                    return {...state , sample : !state.sample};
               })
          }} className={`sound-bar__icon sound-bar__icon--sound ${soundState.sample ? "" : "sound-bar__icon--disabled"}`}>
               <SoundIcon/>
          </i> : null}
          <i className={`sound-bar__seperator`}></i>
          {linkIcons}
          
     </div>
}

function Navbar() {
     return (
          <nav className="navbar">
               <i className="navbar__tic-tac-toe-icon">
                    <TicTacToeSVG/>
               </i>
               <SoundBar
                    linkIcons={
                    <>
                    <i className={`sound-bar__icon sound-bar__icon--link`}>
                         <Link to="/play">
                              <HomeIcon/>
                         </Link>
                    </i>
                    <i className={`sound-bar__icon sound-bar__icon--link`}>
                         <Link to="/history">
                              <HistoryIcon/>
                         </Link>
                    </i>
                    <i className={`sound-bar__icon sound-bar__icon--link`}>
                         <Link to="/play/1v1">
                              <PlayIcon/>
                         </Link>
                    </i>
                    </>}
               />
          </nav>
     )
}

export default Navbar;