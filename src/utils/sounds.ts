export type SoundType = 'track' | 'sample';

export type Sound = {
  label : string,
  component : HTMLAudioElement,
  type : SoundType,
  source : string,
  loaded : boolean,
  volume ?: number
}

export type SoundState = {
  track : boolean,
  sample : boolean
}

export type SoundElement = {
  source : string,
  label : string,
  type : SoundType,
  startingVolume : number
}

interface SoundPanelArguments{
  soundsArray : SoundElement[],
  disableOnStart ?: {
    'track' ?: boolean,
    'sample' ?: boolean
  },
}

export const SoundLabels = {
  HIT_BUTTON : 'HIT_BUTTON',
  SOUND_TRACK : 'SOUND_TRACK',
  GAME_START_SOUND : 'GAME_START_SOUND',
  GAME_WIN_SOUND : 'GAME_WIN_SOUND',
  GAME_TIE_SOUND : 'GAME_TIE_SOUND',
  DISABLE_ALL_TRACKS : 'DISABLE-TRACKS',
  DISABLE_ALL_SAMPLES : 'DISABLE-SAMPLES',
  ENABLE_ALL_TRACKS : 'ENABLE-TRACKS',
  ENABLE_ALL_SAMPLES : 'ENABLE-SAMPLES'
}

export function generateSoundEventString(soundName : string ){
  return `CUSTOM-SOUND-EVENT-${soundName}-LOADED`;
}

class SoundPanel{
  public soundsList : Sound[]
  private totalTracksLoaded : number;
  private totalSamplesLoaded : number;

  constructor( {soundsArray , disableOnStart} : SoundPanelArguments){
    this.soundsList = this.initialiseSoundsList(soundsArray);
    if(disableOnStart?.sample){
      this.muteSoundType('sample');
    }
    if(disableOnStart?.track){
      this.muteSoundType('track');
    }
    this.totalTracksLoaded = 0;
    this.totalSamplesLoaded = 0;
  }

  dispatchEvent(eventName : string){
    const event = new CustomEvent(eventName);
    document.dispatchEvent(event);
  }

  getSoundFromLabel(label : string){
    const soundsWithTargetLabel = this.soundsList.filter((sound)=>sound.label === label);
    let targetSound = null;

    if(soundsWithTargetLabel.length >  0) targetSound = soundsWithTargetLabel[0];
    return targetSound;
  }

  isSoundLoadedAndReadyToPlay(label : string){
    const targetSound = this.getSoundFromLabel(label);

    if(targetSound && targetSound.loaded){
      if(targetSound.component.readyState >= 2) return true;
      return false;
    }
  }

  checkIfAllSoundsLoadedAndDispatchEvent(){
    const totalTracks = this.soundsList.filter((sound)=>sound.type === 'track').length;
    const totalSamples  = this.soundsList.filter((sound)=>sound.type === 'sample').length;
    if(totalTracks === this.totalTracksLoaded) this.dispatchEvent(generateSoundEventString('TRACK'));
    if(totalSamples === this.totalSamplesLoaded) this.dispatchEvent(generateSoundEventString('SAMPLE'));
  }

  markSoundLoaded(sound : SoundElement){
    this.soundsList = this.soundsList.map<Sound>((loopSound)=>{
      if(loopSound.label === sound.label){
        if(sound.type === 'sample') this.totalSamplesLoaded = this.totalSamplesLoaded + 1;
        if(sound.type === 'track') this.totalTracksLoaded = this.totalTracksLoaded + 1;

        this.checkIfAllSoundsLoadedAndDispatchEvent();

        return {...loopSound , loaded : true};
      } 
      return loopSound;
    })
  }

  initialiseSoundsList(soundsArray : SoundElement[]){
    return soundsArray.map((sound)=>{
      const audioComponent = new Audio(sound.source);
      audioComponent.volume = sound.startingVolume;

      audioComponent.addEventListener('progress' , ()=>{
        this.markSoundLoaded(sound);
      })

      return {
        label : sound.label,
        component : audioComponent,
        type : sound.type,
        source : sound.source,
        loaded : false,
        volume : sound.startingVolume
      } as Sound
    })
  }

  playSound(label : string){

    if(this.isSoundLoadedAndReadyToPlay(label)){
      const soundComponent = this.getSoundFromLabel(label);

      if(soundComponent){
        if(soundComponent.type === 'track'){
          soundComponent.component.loop = true;
        }
        else{
          soundComponent.component.currentTime = 0;
        }
        soundComponent.component.play();
      }

    }
  }

  muteSoundType(type : SoundType){

    this.soundsList.forEach((sound)=>{
      if(sound.type === type){
        sound.component.volume = 0;
      }
    })

  }

  unmuteSoundType(type : SoundType){

    this.soundsList.forEach((sound)=>{
      if(sound.type === type){
        if(sound.volume) sound.component.volume = sound.volume;
        else sound.component.volume = 1;
      }
    })

  }

}


export default SoundPanel;