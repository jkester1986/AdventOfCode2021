fs = require('fs');
fs.readFile('Day11.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let lines = data.split('\n').map(line => line.split('').map(Number));

	function findFlashes(octopus, x, y, start) {
		if (octopus === undefined || (!start && octopus === 10) || octopus > 10) {
			//already flashed, or doesn't exist
            return 0;
        }

		const newOctopus = octopus + 1;
		lines[y][x] = newOctopus;
		if (newOctopus >= 10) {
			const plusX = x+1;
			const plusY = y+1;
			const minusX = x-1;
			const minusY = y-1;


			return 1 +
			findFlashes(lines[minusY]?.[minusX], minusX, minusY) + // top-left
			findFlashes(lines[minusY]?.[x], x, minusY) + // top
			findFlashes(lines[minusY]?.[plusX], plusX, minusY) + // top-right
			findFlashes(lines[y]?.[minusX], minusX, y) + // left
			findFlashes(lines[y]?.[plusX], plusX, y) + // right
			findFlashes(lines[plusY]?.[minusX], minusX, plusY) + // bottom-left
			findFlashes(lines[plusY]?.[x], x, plusY) + // bottom
			findFlashes(lines[plusY]?.[plusX], plusX, plusY); // bottom-right
		}
		else return 0;
    }

	let steps = 0;
	let greaterThan9 = []
	let flashCount = 0;
	let firstSync = null;
	while(!firstSync) {
		greaterThan9 = []
		lines.forEach((line, y) => {
			line.forEach((octopus, x) => {
				const newVal = octopus + 1;
				lines[y][x] = octopus + 1;
				if(newVal > 9) {
					greaterThan9.push({
						x,
						y,
						octopus: newVal
					})
				}
			});
		});

		greaterThan9.forEach(({octopus, x, y}) => {
			findFlashes(octopus, x, y, true);
		});

		let zeros = 0;
		lines.forEach((line, y) => {
			line.forEach((octopus, x) => {
				if(octopus > 9) {
					//reset to 0
					lines[y][x] = 0;
					if(steps < 100)
						flashCount++;
					zeros++;
				}
			})
		});
		steps++;
		if(!firstSync && zeros === 100) {
			firstSync = steps;
		}
	}

	console.log("P1:", flashCount)
	console.log("P2:", firstSync);

});
