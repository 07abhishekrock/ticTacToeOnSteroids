const allEvents = {
     trackDisabledEvent : 'TRACK-DISABLED',
     trackEnabledEvent : 'TRACK-ENABLED',
     sampleDisabledEvent : 'SAMPLE-DISABLED',
     sampleEnabledEvent : 'SAMPLE-ENABLED',
     allTracksLoadedEvent : 'ALL-MEDIA-LOADED'
}


class SoundPanel{
     constructor({
          soundIDList
     } = {
          soundIDList : [
               {
                   audioSrc : '' ,
                   label : '',
                   type : 'track'
               },
               {
                    audioSrc : '',
                    label : '',
                    type : 'sample'
               }
          ]
     }){
          this.soundPanel = {};
          this.soundIDList = soundIDList;
          this.soundTracksDisabled = false;
          this.soundSamplesDisabled = false;
          this.initialiseSoundElements(); 
          this.totalTracks = soundIDList.length;
          this.totalTracksLoaded = 0;
     }
     
     dispatchEvent(eventName){
          const newEvent = new Event(eventName)
          document.body.dispatchEvent(newEvent);
     }

     markAudioLoaded(id){
          if(this.soundPanel[id]){
               this.soundPanel[id].loaded = true;
               this.totalTracksLoaded++;
          }
          if(this.totalTracksLoaded === this.totalTracks){
               this.dispatchEvent(allEvents.allTracksLoadedEvent);
          }
     }

     isAudioValid(label){
          return this.soundPanel[label] && this.soundPanel[label].loaded && this.soundPanel[label].audioElement.readyState >= 2;
     }

     playAudio(label){
          if(this.isAudioValid(label)){
               this.soundPanel[label].audioElement.currentTime = 0;
               if(this.soundPanel[label].type === 'track'){
                    this.soundPanel[label].audioElement.loop = true;
                    this.soundPanel[label].audioElement.volume = 0.2;
               }
               this.soundPanel[label].audioElement.play();
          }
     }

     pauseAudio(label){
          if(this.isAudioValid(label)){
               this.soundPanel[label].audioElement.currentTime = 0;
               this.soundPanel[label].audioElement.pause();
          }
     }

     initialiseSoundElements(){
          this.soundIDList.forEach((sound)=>{
               const audioComponent = new Audio(sound.audioSrc);
               audioComponent.onloadeddata = ()=>{
                    this.markAudioLoaded(sound.label);
               }
               this.soundPanel[sound.label] = {
                    loaded : false,
                    src : sound.audioSrc,
                    label : sound.label,
                    audioElement : audioComponent,
                    type : sound.type
               }
          })
     }

     disableSound(type=''){
          this.soundTracksDisabled = true;
          for (let audio in this.soundPanel){
               if(this.isAudioValid(audio) && this.soundPanel[audio].type === type){
                    this.soundPanel[audio].audioElement.volume = 0;
               }
          }
          this.dispatchEvent(`${type === 'track' ? allEvents.sampleDisabledEvent : allEvents.trackDisabledEvent}`);
     }

     enableSound(type){
          if(this.soundTracksDisabled){
               for (let audio in this.soundPanel){
                    if(this.isAudioValid(audio) && this.soundPanel[audio].type === type){
                         this.soundPanel[audio].audioElement.volume = 1;
                    }
               }    
               this.soundTracksDisabled = false;
          }
          this.dispatchEvent(`${type === 'track' ? allEvents.trackDisabledEvent : allEvents.trackEnabledEvent}`);
     }

     
}


const soundPanel = new SoundPanel({
     soundIDList : [
          {
               type : 'sample',
               audioSrc : '/sounds/gameEndSound.wav',
               label : 'GAME-END-SOUND'
          },
          {
               type : 'sample',
               audioSrc : '/sounds/hittingButton.wav',
               label : 'HIT-BUTTON-SOUND'
          },
          {
               type : 'track',
               audioSrc : '/sounds/soundTrack.mp3',
               label : 'SOUND-TRACK'
          },
          {
               type : 'sample',
               audioSrc : '/sounds/playOnMatchDraw.wav',
               label : 'GAME-DRAW-SOUND'
          },
          {
               type : 'sample',
               audioSrc : '/sounds/startMatch.wav',
               label : 'GAME-START-SOUND'
          }
     ]
});

window.onload = ()=>{
     soundPanel.disableSound('track');
     soundPanel.disableSound('sample');
}

document.addEventListener('play-game-end-sound',()=>{
     soundPanel.playAudio('GAME-END-SOUND');
})

document.addEventListener('play-hit-button-sound' , ()=>{
     soundPanel.playAudio('HIT-BUTTON-SOUND');
})

document.addEventListener('play-player-move-sound',()=>{
     soundPanel.playAudio('PLAYER-MOVE-SOUND');
})

document.addEventListener('play-game-draw-sound',()=>{
     soundPanel.playAudio('GAME-DRAW-SOUND');
})

document.addEventListener('play-game-start-sound',()=>{
     soundPanel.playAudio('GAME-START-SOUND');
})

document.addEventListener('play-track', ()=>{
     soundPanel.playAudio('SOUND-TRACK');
})

document.addEventListener('disable-track',()=>{
     soundPanel.disableSound('track');
})

document.addEventListener('disable-sample',()=>{
     soundPanel.disableSound('sample');
})

document.addEventListener('enable-track',()=>{
     soundPanel.enableSound('track');
})

document.addEventListener('enable-sample',()=>{
     soundPanel.enableSound('sample');
})

