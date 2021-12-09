fs = require('fs');
fs.readFile('Day9.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let lines = data.split('\n').map(line => line.split('').map(Number));
    let lastInd = lines.length - 1;
	let lineLength = lines[0].length;

    let lowPointCount = 0;
    let lowestPointsTotal = 0;

    lines.forEach((line, i) => {
        for(let smoke = 0; smoke < lineLength; smoke++) {
            let lowest = true;
            const currentHeight = line[smoke];
            if (
                // not first line, check against val in previous line
                (i !== 0 && lines[i-1][smoke] <= currentHeight) ||
                // not last line, check against val in next line
                (i !== lastInd && lines[i+1][smoke] <= currentHeight) ||
                // not first val, check against prev val
                (smoke !== 0 && line[smoke-1] <= currentHeight) ||
                // not last val, check against next val
                (smoke !== lineLength - 1 && line[smoke+1] <= currentHeight)
            ) {
                lowest = false;
            }
            if(lowest) {
                lowPointCount++;
                lowestPointsTotal += currentHeight;
            }
        }
    });

    console.log("P1:", lowestPointsTotal + lowPointCount)

});
