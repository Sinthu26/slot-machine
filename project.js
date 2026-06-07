const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS = {
    CHERRY: { count: 10, value: 2},
    GRAPE: { count: 8, value: 4},
    ORANGE: { count: 6, value : 6},
    MELON: { count: 4, value: 7},
    LEMON: { count: 2, value: 10}
}

const promptOrQuit = (message) => {
    const input = prompt(message);
    if (input === "q") {
        console.log("Thanks for playing!");
        process.exit(0)
    }
    return input;
;}

const deposit = () => {
    while (true) {
        const depositAmount = promptOrQuit("Enter a deposit amount: ");
        const numberDepositAmount = parseFloat(depositAmount);

        if (isNaN(numberDepositAmount)|| numberDepositAmount <= 0) {
            console.log("Invalid deposit amount, try again.")
        } else {
            return numberDepositAmount;
        }
    }
};

const getNumberOfLines = () => {
    while (true) {
        const lines = promptOrQuit("Enter the number of lines to bet on (1-3): ");
        const numberOfLines = parseInt(lines);

        if (isNaN(numberOfLines) || !Number.isInteger(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            console.log("Invalid number of lines to bet, try again.")
        } else {
            return numberOfLines;
        }
    }
};

const getBet = (balance, lines) => {
    while (true) {
        const bet = promptOrQuit("Enter the total bet: ");
        const numberBet = parseFloat(bet);

        if (isNaN(numberBet)|| numberBet <= 0 || numberBet > balance / lines) {
            console.log("Invalid bet, try again.")
        } else {
            return numberBet;
        }
    }
};

const spin = () => {
    const symbols = [];
    for (const [symbol, data] of Object.entries(SYMBOLS)) {
        for (let i = 0; i < data.count; i++) {
            symbols.push(symbol);
        }
    }

    const reels = [];
    for (let i = 0; i < COLS; i ++) {
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j ++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }

    return reels
};

const transpose = (reels) => {
    const rows = [];

    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]);
        }
    }

    return rows;
};

const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol;
            if (i != row.length - 1) {
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
};

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }

        if (allSame) {
            winnings += bet * SYMBOLS[symbols[0]].value;
        }
    }

    return winnings;
};

const playRound = (bet, lines) => {
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        return getWinnings(rows, bet, lines);
}

const displayResult = (winnings, bet, lines) => {
        if (winnings === 0) {
            console.log("You lost, $" + (bet * lines).toFixed(2));
        } else{
            console.log("You won, $" + winnings.toFixed(2));
        }
}

const game = () => {
    let balance = deposit();
    while (true) {
        console.log("You have a balance of $" + balance.toFixed(2));
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance, numberOfLines);
        balance -= bet *numberOfLines;
        const winnings = playRound(bet, numberOfLines);
        displayResult(winnings, bet, numberOfLines);
        balance += winnings;
        
        if (balance <= 0) {
            console.log("You ran out of money!");
            break;
        }
        while (true) {
            const playAgain = promptOrQuit("Do you want to play again (y/n/q)? ");
            if (playAgain === "y") break; 
            if (playAgain === "n") return;
            console.log("Invalid response, type (y/n).")
        }
    }
};

game();