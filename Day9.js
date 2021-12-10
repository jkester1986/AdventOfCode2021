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
    let lowPoints = {}

    lines.forEach((line, y) => {
        for(let x = 0; x < lineLength; x++) {
            let lowest = true;
            const currentHeight = line[x];
            if (
                // not first line, check against val in previous line
                (y !== 0 && lines[y-1][x] <= currentHeight) ||
                // not last line, check against val in next line
                (y !== lastInd && lines[y+1][x] <= currentHeight) ||
                // not first val, check against prev val
                (x !== 0 && line[x-1] <= currentHeight) ||
                // not last val, check against next val
                (x !== lineLength - 1 && line[x+1] <= currentHeight)
            ) {
                lowest = false;
            }
            if(lowest) {
                lowPointCount++;
                lowestPointsTotal += currentHeight;
                lowPoints[`${x},${y}`] = {
                    x,
                    y,
                    depth: currentHeight
                };
            }
        }
    });

    console.log("P1:", lowestPointsTotal + lowPointCount)

    let foundCoords = new Set();

    function findBasinSize(depth, x, y) {
        let coords = `${x},${y}`;
        if(depth === undefined || depth === 9 || foundCoords.has(coords)) {
            return 0;
        }

        foundCoords.add(coords);

        const plusX = x+1;
        const plusY = y+1;
        const minusX = x-1;
        const minusY = y-1;


        return depth + findBasinSize(lines[plusY]?.[x], x, plusY) +
            findBasinSize(lines[minusY]?.[x], x, minusY) +
            findBasinSize(lines[y]?.[minusX], minusX, y) +
            findBasinSize(lines[y]?.[plusX], plusX, y)
    }

    let depths = []
    Object.entries(lowPoints).forEach(([key, val]) => {
        const { x, y, depth } = val;

        findBasinSize(depth, x, y);
        const basinSize = foundCoords.size;
        depths.push(basinSize);
        foundCoords.clear()
    });

    const last3 = depths.sort((a, b) => a - b).slice(depths.length - 3);

    console.log("P2:", last3[0] * last3[1] * last3[2]);

});
