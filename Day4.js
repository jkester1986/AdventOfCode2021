fs = require('fs');
fs.readFile('Day4.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	const playboards = data.split('\n\n');
    const balls = playboards.shift().split(',').map(Number);
    let cards = {};

    playboards.forEach((board, index) => {
        const cardRows = board.split('\n').map(row => row.split(' ').reduce((acc, el) => {
            if(el.length > 0) acc.push(Number(el));
            return acc;
        }, []));
        cards[`card${index}`] = {
            cardNumber: index+1,
            largestRowOrColumnCount: 0,
            rows: [],
            columns: [{counter: 0}, {counter: 0}, {counter: 0}, {counter: 0}, {counter: 0}]
        };
        cardRows.forEach((row, rowIndex) => {
            //put a number in each row & column
            let newRow = {
                counter: 0
            }
            row.forEach((num, i) => {
                newRow[num] = {
                    found: false,
                    column: i
                }
                cards[`card${index}`].columns[i][num] = {
                    found: false
                }
            })
            cards[`card${index}`].rows.push(newRow);
        });
    });

    let { winningCard, winningNumber } = playBingo(balls, cards)

    let boardScore = findBoardScore(winningCard);
    console.log("P1:", boardScore * winningNumber)

    while(balls.length > 0 && Object.keys(cards).length > 0) {
        let winnings = playBingo([winningNumber, ...balls], cards);
        winningCard = winnings.winningCard;
        winningNumber = winnings.winningNumber;
    }

    boardScore = findBoardScore(winningCard);
    console.log("P2:", boardScore * winningNumber);
});

function findBoardScore(winningCard) {
    let boardScore = 0;
    winningCard.rows.forEach(row => {
        for (const [key, value] of Object.entries(row)) {
            if(!value.found && key !== "counter") {
                const val = parseInt(key);
                boardScore += val
            }
          }

    });
    return boardScore;
}

function playBingo(balls, cards) {
    while (true) {
        const currentBall = balls.shift();
        // loop through each card checking for the number
        let cardsLength = Object.keys(cards).length;
        let winnings;
        for (const [key, currCard] of Object.entries(cards)) {
            for(let row = 0; row < 5; row++) {
                const currRow = currCard.rows[row];
                if(currRow[currentBall]) {
                    if(!currRow[currentBall].found) {
                        currRow[currentBall].found = true;
                        currRow.counter++;
                    }
                    const currColumn = currCard.columns[currRow[currentBall].column];
                    if (!currColumn[currentBall].found) {
                        currColumn[currentBall].found = true;
                        currColumn.counter++;
                    }

                    const higher = currRow.counter > currColumn.counter ? currRow.counter : currColumn.counter;
                    currCard.largestRowOrColumnCount = higher > currCard.largestRowOrColumnCount ? higher : currCard.largestRowOrColumnCount;

                    if(currCard.largestRowOrColumnCount === 5) {
                        winningCard = currCard;
                        winningNumber = currentBall;
                        winnings = {
                            winningCard: currCard,
                            winningNumber: currentBall,
                        }
                        delete cards[key];
                        return winnings;
                    }
                }
            }
        }
    }
}