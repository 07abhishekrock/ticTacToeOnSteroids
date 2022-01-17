export type ticTacToeValue = 'O' | 'X' | '';

export type ticTacToeRow = [ticTacToeValue , ticTacToeValue , ticTacToeValue];

export type TicTacToeLayoutInterface = [ticTacToeRow , ticTacToeRow , ticTacToeRow];


export function isInitialLayout(layout : TicTacToeLayoutInterface){
     let totalEmptyFound = 0;
     layout.forEach((row)=>{
          row.forEach((cell)=>{
               if(cell === ''){
                    totalEmptyFound++;
               }
          })
     })

     if(totalEmptyFound === 9) return true;
     return false;
}

export function areSameLayouts(layout1 : TicTacToeLayoutInterface , layout2 : TicTacToeLayoutInterface){
     let differentCellFound = false;
     layout1.every((row , row_index)=>{
          row.every((cell , x_index)=>{
               if(cell !== layout2[row_index][x_index]){
                    differentCellFound = true;
                    return false;
               }
               return true;
          })
          if(differentCellFound){
               return false;
          }
          return true;
     })

     return !differentCellFound;
}

function convertIndexToXandY(index : number):[number , number]{
     const y = Math.floor(index / 3);
     const x = (index - y * 3);
     return [y , x]
}

export function checkIfWinnerFound(layout : TicTacToeLayoutInterface){
     let possibleWinIndex : number[] = [];
     let angleOfCut = 0;
     let cutOffset = 0;
     let winnerSymbol = '';
     const possibleWins = [
          [0 , 1 , 2],
          [3 , 4 , 5],
          [6 , 7 , 8],
          [0 , 3 , 6],
          [1 , 4 , 7],
          [2 , 5 , 8],
          [0 , 4 , 8],
          [2 , 4 , 6]
     ]

     possibleWins.every((possibleWin)=>{
          const [[y1, x1],[y2 , x2],[y3 , x3]] = [convertIndexToXandY(possibleWin[0]) , convertIndexToXandY(possibleWin[1]) , convertIndexToXandY(possibleWin[2])];
          if (layout[y1][x1] && layout[y2][x2] && layout[y3][x3] 
               && 
               layout[y1][x1] === layout[y2][x2] 
               && 
               layout[y2][x2] === layout[y3][x3] 
          ){
               possibleWinIndex = possibleWin;
               winnerSymbol = layout[y1][x1];
               return false;
          }
          return true;
     })

     if(possibleWinIndex.length > 0){
          const [p1 , p2] = possibleWinIndex;
          switch(Math.abs(p2 - p1)){
               case 1 : 
                    angleOfCut = 0;
                    cutOffset = Math.floor(p1 / 3);
                    break;

               case 3 : 
                    angleOfCut = 90;
                    cutOffset = p2 - 3;
                    break;

               default : 
                    if(Math.abs(p2 - p1) / 2 === 1){
                         angleOfCut = 135;
                         cutOffset = 0;
                    }
                    else if(Math.abs(p2 - p1) / 2 === 2){
                         angleOfCut = 45;
                         cutOffset = 0;
                    }
                    else{
                         angleOfCut = -1;
                         cutOffset = -1;
                    }
          }
     }

     return {angleOfCut , cutOffset , winnerFound : possibleWinIndex.length > 0, winnerSymbol}

}

export function allMovesFilled(layout:TicTacToeLayoutInterface):boolean{
     let emptyFound = false;
     layout.every((row)=>{
          row.every((cell)=>{
               if(cell === ''){
                    emptyFound = true;
                    return false;
               }
               return true;
          })
     })
     return !emptyFound
}