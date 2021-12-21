let player1 = {
    position: 6,
    score: 0
};
let player2 = {
    position: 7,
    score: 0
}

let diceRoll = 0;
scoreMet:
while (player1.score < 1000 && player2.score < 1000) {
    for (let i = 0; i < 3; i++) {
        diceRoll++;
        player1.position = (player1.position + diceRoll)%10;
    }
    player1.score = player1.position === 0 ? player1.score + 10 : player1.score + player1.position;
    if (player1.score >= 1000) break scoreMet;

    for (let i = 0; i < 3; i++) {
        diceRoll++;
        player2.position = (player2.position + diceRoll)%10;
    }
    player2.score = player2.position === 0 ? player2.score + 10 : player2.score + player2.position;
}

let losingPlayer = player1.score < player2.score ? player1 : player2;

console.log("P1:", losingPlayer.score * diceRoll);