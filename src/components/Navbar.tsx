import React, { useState , useEffect } from 'react'
import {ReactComponent as TicTacToeSVG} from '../icons/ticTacToe.svg';
import {ReactComponent as HomeIcon} from '../icons/home.svg';
import pushAudioEvent, { SoundEvents } from '../utils/soundPanel';
import {ReactComponent as MusicIcon} from '../icons/music.svg';
import {ReactComponent as SoundIcon} from '../icons/sound.svg';
import {ReactComponent as PlayIcon} from '../icons/playIcon.svg';
import {ReactComponent as HistoryIcon} from '../icons/historyIcon.svg';
import { Link } from 'react-router-dom';



function SoundBar({linkIcons} : {linkIcons : Element | JSX.Element}){
     const [soundBarConfig , setSoundBarConfig] = useState({
          sound : false,
          audio : false
     })
     useEffect(()=>{
          const eventCallback = ()=>{
               pushAudioEvent(SoundEvents['DISABLE-TRACK']);
               pushAudioEvent(SoundEvents['DISABLE-SAMPLE']);
          }
          eventCallback();
     },[])

     return <div className="sound-bar">
          <i onClick={()=>{
               if(soundBarConfig.sound){
                    pushAudioEvent(SoundEvents['DISABLE-TRACK']);
                    setSoundBarConfig({
                         ...soundBarConfig,
                         sound : false
                    })
               }
               else{
                    pushAudioEvent(SoundEvents['ENABLE-TRACK']);
                    pushAudioEvent(SoundEvents['SOUND-TRACK']);
                    setSoundBarConfig({
                         ...soundBarConfig,
                         sound : true 
                    })
               }
          }} className={`sound-bar__icon sound-bar__icon--music ${soundBarConfig.sound ? "" : "sound-bar__icon--disabled"}`}>
               <MusicIcon/>
          </i>
          <i onClick={()=>{
               if(soundBarConfig.audio){
                    pushAudioEvent(SoundEvents['DISABLE-SAMPLE']);
                    setSoundBarConfig({
                         ...soundBarConfig,
                         audio : false
                    })
               }
               else{
                    pushAudioEvent(SoundEvents['ENABLE-SAMPLE']);
                    setSoundBarConfig({
                         ...soundBarConfig,
                         audio : true 
                    })
               }
          }} className={`sound-bar__icon sound-bar__icon--sound ${soundBarConfig.audio ? "" : "sound-bar__icon--disabled"}`}>
               <SoundIcon/>
          </i>
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