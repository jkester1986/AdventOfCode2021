fs = require('fs');
fs.readFile('Day22.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let rebootSteps = data.split('\n').map(line => {
        let match = line.match(/(\w+)\sx=(-?\d+)\.\.(-?\d+),y=(-?\d+)\.\.(-?\d+),z=(-?\d+)\.\.(-?\d+)/);

        let lightRange = {
            switch: match[1],
            xLow: parseInt(match[2]),
            xHigh: parseInt(match[3]),
            yLow: parseInt(match [4]),
            yHigh: parseInt(match[5]),
            zLow: parseInt(match[6]),
            zHigh: parseInt(match[7])
        };
        return lightRange
    });

    let lights = new Map();

    rebootSteps.forEach(step => {
        if (step.xHigh <= 50 && step.yHigh <= 50 && step.zHigh <= 50 &&
                step.xLow >= -50 && step.yLow >= -50 && step.zLow >= -50) {
            if (step.switch === "on") {
                for(let z = step.zLow; z <= step.zHigh; z++) {
                    for(let y = step.yLow; y <= step.yHigh; y++) {
                        for(let x = step.xLow; x <= step.xHigh; x++) {
                            let pos = `${x},${y},${z}`;
                            lights.set(pos, {
                                x, y,
                            });
                        }
                    }
                }
            }
            else {
                lights.forEach((x, y, z) => {
                    if (x <= step.xHigh && x >= step.xLow &&
                        y <= step.yHigh && y >= step.yLow &&
                        z <= step.zHigh && z >= step.zLow) {
                            lights.delete(`${x},${y},${z}`);
                        }
                });
            }
        }
    });

    console.log("lights on:", lights.size);
});
