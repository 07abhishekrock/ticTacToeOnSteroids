export enum SoundEvents{
     'GAME-END-SOUND'='play-game-end-sound',
     'HIT-BUTTON-SOUND' ='play-hit-button-sound',
     'PLAYER-MOVE-SOUND' = 'play-player-move-sound',
     'SOUND-TRACK' = 'play-track',
     'GAME-DRAW-SOUND' = 'play-game-draw-sound',
     'GAME-START-SOUND' = 'play-game-start-sound',
     'DISABLE-TRACK' = 'disable-track',
     'DISABLE-SAMPLE' = 'disable-sample',
     'ENABLE-TRACK' = 'enable-track',
     'ENABLE-SAMPLE' = 'enable-sample',
     'ALL-SOUNDS-LOADED' = 'ALL-MEDIA-LOADED',
     'SAMPLES-ENABLED' = 'SAMPLE-ENABLED',
     'SAMPLES-DISABLED' = 'SAMPLE-DISABLED',
     'TRACK-ENABLED' = 'TRACK-ENABLED',
     'TRACK-DISABLED' = 'TRACK-DISABLED'
}


export default function pushAudioEvent(sound : SoundEvents){
     const newEvent = new Event(sound);
     document.dispatchEvent(newEvent);
}