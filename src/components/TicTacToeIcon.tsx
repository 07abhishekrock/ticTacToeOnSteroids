import { useEffect, useState } from 'react';
import { allMovesFilled, checkIfWinnerFound, TicTacToeLayoutInterface, ticTacToeValue } from '../utils/TicTacToeLayout';
import { ReactComponent as XIcon } from '../icons/X.svg';
import { ReactComponent as OIcon } from '../icons/0.svg';
import { GameResultType } from '../utils/types';
import pushAudioEvent from '../utils/soundPanel';
import { SoundLabels } from '../utils/sounds';

type TicTacToeSizeType = 'small' | 'medium' | 'large';

enum TicTacToeClasses{'small' = 'small-size' , 'large' = 'large-size' , 'medium' = 'medium-size'};

interface TicTacToeProps{
     size : TicTacToeSizeType,
     gutterColor : string,
     plateColor : string,
     crossColor : string,
     noughtColor : string,
     layout : TicTacToeLayoutInterface,
     boxShadow ?: string,
     active : boolean
     markCrossOrNaught ?: (position : number)=>void,
     freeze : boolean,
     onGameEnd ?: (result : GameResultType)=>void,
}

type TicTacToeWinnerObject = {
     angle : number | null,
     offset : number | null,
     showWinner : boolean,
     symbol : ticTacToeValue
}

function convertSizeToClass(size : TicTacToeSizeType){
     switch(size){
          case 'small' : return TicTacToeClasses.small
          case 'medium' : return TicTacToeClasses.medium
          default : return TicTacToeClasses.large
     }
}

function generateTransformString(angle : number | null, offset : number | null){
     if(angle === null || offset === null){
          return {};
     }
     switch(angle){
          case 0 : 
               return {
                    top: `${16.666667 * (offset * 2 + 1)}%`,
                    left : '0px',
                    transform : `rotateZ(${angle}deg)`
               }
          case 90 : 
               return {
                    top : '0px',
                    left : `${16.66667 * (offset * 2 + 1) - (1 - offset * 2)}%`,
                    transform : `rotateZ(${angle}deg) translateY(50%)`,
                    transformOrigin : '0% 50%'
               }
          default : 
               return {
                    top : '50%',
                    left : '50%',
                    transform:`translate(-50% , -50%) rotateZ(${angle}deg)`
               }
     }
}

function generateDisabledClass(value : ticTacToeValue , active : boolean){
     return  !active ? "" : value !== '' ? 'tic-tac-toe-icon__cell--disabled' : '';
}

function TicTacToeIcon({
     size , 
     gutterColor , 
     plateColor , 
     crossColor , 
     noughtColor , 
     layout , 
     boxShadow , 
     active,
     markCrossOrNaught,
     freeze,
     onGameEnd,
} : TicTacToeProps) {

     const [winnerState , setWinnerState] = useState<TicTacToeWinnerObject>({
          angle : null,
          offset : null ,
          showWinner : false,
          symbol : ''
     })

     useEffect(()=>{
          const {winnerFound , angleOfCut , cutOffset , winnerSymbol} = checkIfWinnerFound(layout);
          if(winnerFound){
               setWinnerState({
                    angle : angleOfCut,
                    offset : cutOffset,
                    showWinner : true,
                    symbol : winnerSymbol
               } as TicTacToeWinnerObject)

               //mark end of the game
               if(onGameEnd) onGameEnd(GameResultType['WITH-RESULT']);
          }
          else{
              if(allMovesFilled(layout) && onGameEnd) onGameEnd(GameResultType['TIED']);
              else{
                    if(winnerState.showWinner)
                    {
                         setWinnerState({
                              angle : null,
                              offset : null,
                              showWinner : false,
                              symbol : ''
                         })
                    }
              }
          }
     },[layout])

     return (
          <div className={'tic-tac-toe-icon ' + convertSizeToClass(size)} 
               style={{
                    backgroundColor : gutterColor,
                    boxShadow,
                    pointerEvents : freeze ? 'none' : 'all'
               }}
          >

               {winnerState.showWinner ? <div className="tic-tac-toe-icon__winner-line" style={{
                    backgroundColor : winnerState.symbol === 'X' ? crossColor : noughtColor,
                    ...generateTransformString(winnerState.angle , winnerState.offset)
               }}></div> : null}

               {layout.map<JSX.Element>((rowLayout , rowIndex)=>{

                    return <div className="tic-tac-toe-icon__row" key={`row-${rowIndex}`}>

                              {rowLayout.map<JSX.Element>((singleCell , singleCellIndex)=>{

                                   return <div className={"tic-tac-toe-icon__cell " + generateDisabledClass(singleCell , active)}
                                        key={`cell-${rowIndex}-${singleCellIndex}`}
                                        style={{
                                             color : singleCell === 'O' ? noughtColor : crossColor,
                                             backgroundColor : plateColor
                                        }}
                                        onClick={()=>{
                                             if(typeof markCrossOrNaught === 'function'){
                                                  pushAudioEvent(SoundLabels.HIT_BUTTON);
                                                  const position = rowIndex * 3 + singleCellIndex;
                                                  markCrossOrNaught(position);
                                             }
                                        }}
                                   >
                                        {singleCell === 'O' ? <OIcon/> : null}
                                        {singleCell === 'X' ? <XIcon/> : null}
                                   </div>
                              })
                         }
                         </div>
                    }
               )}
          </div>
     )
}

export default TicTacToeIcon
