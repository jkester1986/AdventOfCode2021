fs = require('fs');
fs.readFile('Day10.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let lines = data.split('\n').map(line => line.split(''));
	const pairs = {
		")" : "(",
		">": "<",
		"]": "[",
		"}": "{",
		"(": ")",
		"<": ">",
		"[": "]",
		"{": "}"
	}

	const incorrectLineScores = {
		")": 3,
		"]": 57,
		"}": 1197,
		">": 25137
	}

	const incompleteLineScores = {
		")": 1,
		"]": 2,
		"}": 3,
		">": 4
	}


	let incorrectScore = 0;
	let incompleteLines = [];
	lines.forEach(line => {
		const length = line.length;
		let stack = [];
		let incorrectChar = "";
		for(let i = 0; i < length; i++) {
			let symbol = line[i];
			if(["(", "[", "{", "<" ].includes(symbol)) {
				stack.push(symbol);
			}
			else {
				let toRemove = stack[stack.length - 1];

				if (toRemove === pairs[symbol]) {
					stack.pop();
				}
				else {
					incorrectChar = symbol;
					break;
				}
			}
		}

		if (incorrectChar) {
			incorrectScore += incorrectLineScores[incorrectChar];
		}
		else if (stack.length) {
			incompleteLines.push(stack);
		}
	});

	console.log("P1:", incorrectScore);

	let incompleteScores = []
	incompleteLines.forEach(line => {
		let length = line.length - 1;

		let score = 0;
		for (let i = length; i >= 0; i--) {
			score *= 5;
			score += incompleteLineScores[pairs[line[i]]];
		}
		incompleteScores.push(score)
	})

	incompleteScores.sort((a, b) => a - b)
	console.log("P2:", incompleteScores[Math.floor(incompleteScores.length/2)])
});
