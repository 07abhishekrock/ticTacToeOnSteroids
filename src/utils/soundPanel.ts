import SoundPanel , {SoundLabels} from "./sounds";

const soundPanel = new SoundPanel({
  soundsArray : [
    {
      label : SoundLabels.GAME_START_SOUND,
      source : "/sounds/startMatch.wav",
      startingVolume : 1,
      type : 'sample'
    },{
      label : SoundLabels.GAME_TIE_SOUND,
      source : "/sounds/playOnMatchDraw.wav",
      startingVolume : 1,
      type : 'sample'
    },{
      label : SoundLabels.HIT_BUTTON,
      source : "/sounds/hittingButton.wav",
      startingVolume : 1,
      type : 'sample'
    },{
      label : SoundLabels.SOUND_TRACK,
      source : "/sounds/soundTrack.mp3",
      startingVolume : 0.2,
      type : 'track'
    },{
      label : SoundLabels.GAME_WIN_SOUND,
      source : "/sounds/gameEndSound.wav",
      startingVolume : 1,
      type : 'sample'
    }
  ],
  disableOnStart : {
    sample : true,
    track : true 
  }
})

console.log(soundPanel);


export default function pushAudioEvent(target : string){
     switch(target){
          case SoundLabels.GAME_START_SOUND : soundPanel.playSound(SoundLabels.GAME_START_SOUND);break;
          case SoundLabels.GAME_TIE_SOUND : soundPanel.playSound(SoundLabels.GAME_TIE_SOUND);break;
          case SoundLabels.GAME_WIN_SOUND : soundPanel.playSound(SoundLabels.GAME_WIN_SOUND);break;
          case SoundLabels.HIT_BUTTON : soundPanel.playSound(SoundLabels.HIT_BUTTON);break;
          case SoundLabels.SOUND_TRACK : soundPanel.playSound(SoundLabels.SOUND_TRACK);break;
          case SoundLabels.ENABLE_ALL_TRACKS : soundPanel.unmuteSoundType('track');break;
          case SoundLabels.DISABLE_ALL_TRACKS : soundPanel.muteSoundType('track');break;
          case SoundLabels.ENABLE_ALL_SAMPLES : soundPanel.unmuteSoundType('sample');break;
          case SoundLabels.DISABLE_ALL_SAMPLES : soundPanel.unmuteSoundType('sample');break;
     }
}