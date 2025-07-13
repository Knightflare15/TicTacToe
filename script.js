function Gameboard()
{
    const rows=3;
    const columns=3;
    const board = [];
    for (let i = 0;i<rows;i++)
    {
        board[i]=[];
        for(let j =0;j<columns;j++)
        {
            board[i].push(Cell());
        }
    }
    const getBoard= ()=>board;
    const mark = (player,col,row)=>
    {
        if(!(board[row][col].getValue()==="")){
            console.log("Occupied");
            return false ;
        }
        board[row][col].addToken(player);
        return true;

    };
    const printBoard=()=>{
        const currentBoard = board.map((rows)=>rows.map((cols)=>cols.getValue()));
        console.log(currentBoard);
    }
    const reset = () => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                board[i][j] = Cell();  
                }
            }
        };
    return {getBoard,printBoard,mark,reset};
}
function Cell(){
    let value = "";
    function getValue()
    {
        return value;
    }

    const addToken = (player)=>{
        value=player.marker;
    };
    return {addToken,getValue};
}
function player(nameP,markerP)
{   
    const name = nameP;
    const marker= markerP
    

    return { name, marker };
}
function GameController(
    P1,P2
){
    const board=Gameboard();
    const players = [P1,P2];
    let active = players[0];
    const getActive=()=>active;
    const switchTurn = ()=>{
        active = active===players[0]?players[1]:players[0];
    };
    const printNewRound=()=>{
        board.printBoard();
        console.log(`${getActive().name}'s Turn`)
    };
    const playRound=(row,column)=>
    {   
        played=board.mark(getActive(),column,row);
        if(!played)
        {
            return;
        }
        switchTurn();
        printNewRound();
    };
    const reset = () => {
        board.reset();
        active = players[0];  
        printNewRound();
    };
    printNewRound();
    return {playRound,getActive,getBoard: board.getBoard,reset}
}

function ScreenController(){
    const player1 = player("Aryan","X");
    const player2= player("Bryan","O");
    const game=GameController(player1,player2);
    const playerTurnDiv=document.querySelector('.turn');
    const boardDiv=document.querySelector('.board');
    const updateScreen = () => {
  const board = game.getBoard();
  const activePlayer = game.getActive();
  playerTurnDiv.textContent = `${activePlayer.name}'s Turn...`;

  const cellDivs = document.querySelectorAll('.board .cell');

  cellDivs.forEach((cellDiv, index) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    cellDiv.textContent = board[row][col].getValue();
    cellDiv.dataset.row = row;
    cellDiv.dataset.column = col;
  });
};  
    boardDiv.addEventListener("click",(e)=>
    {   if(!e.target.classList.contains("cell")) return;
        const selectedCell = [e.target.dataset.row,e.target.dataset.column];  
        let playRow=parseInt(selectedCell[0]);
        let playCol=parseInt(selectedCell[1]);
        if(isNaN(playRow)||isNaN(playCol)) return;
        let PotentialWin = game.getActive();
        game.playRound(playRow,playCol);
        updateScreen();
        let Win=function win()
        {   
            let i = playRow;
            let j = playCol;
            let board = game.getBoard();
            const curSymbol = board[i][j].getValue();
             if (
        board[i][0].getValue() === curSymbol &&
        board[i][1].getValue() === curSymbol &&
        board[i][2].getValue() === curSymbol
    ) {
        return true;
    }

    if (
        board[0][j].getValue() === curSymbol &&
        board[1][j].getValue() === curSymbol &&
        board[2][j].getValue() === curSymbol
    ) {
        return true;
    }

    if (i === j) {
        if (
            board[0][0].getValue() === curSymbol &&
            board[1][1].getValue() === curSymbol &&
            board[2][2].getValue() === curSymbol
        ) {
            return true;
        }
    }

    if (i + j === 2) {
        if (
            board[0][2].getValue() === curSymbol &&
            board[1][1].getValue() === curSymbol &&
            board[2][0].getValue() === curSymbol
        ) {
            return true;
        }
    }
            return false;
        }();
        if(Win)
        {
            alert(`${PotentialWin.name} has won!!`);
            
            game.reset();
            updateScreen();

        }

    })
    
    updateScreen();
}

ScreenController();


