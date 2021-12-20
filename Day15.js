fs = require('fs');
fs.readFile('Day15.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let lines = data.split('\n').map(line => line.split('').map(Number));
    let maxX = lines[0].length - 1;
    let maxY = lines.length - 1;

    // set baseline
    let lowScore = lines[0].reduce((acc, val) => {
        return acc + val
    }, 0);
    lines.forEach(line => {
        lowScore += line[maxX];
    });

    // console.log(lowScore);

    function getPath(score, x, y, visited, start) {
        let current = `${x},${y}`;
        // if (x === 0 && y === 0) console.log(score);
        if (score >= lowScore || lines[y]?.[x] === undefined || visited.includes(current)) {
            // console.log("too high or undefined or already visited")
            return 0;
        }
        score = start ? score : score + lines[y][x];
        // console.log({score, x, y, start});

        // console.log({lowScore})
        if (x === maxX && y === maxY) {
			//found the end
            // console.log("found the end, score:", score)
            lowScore = score;
            return 0;
        }

        const plusX = x+1;
        const plusY = y+1;
        const minusX = x-1;
        const minusY = y-1;

        return 0 + getPath(score, x, minusY, [...visited, current]) + // top
        getPath(score, minusX, y, [...visited, current]) + // left
        getPath(score, plusX, y, [...visited, current]) + // right
        getPath(score, x, plusY, [...visited, current]); // bottom
    }

    getPath(0, 0, 0, [], true);
    console.log("P1:", lowScore);
});
