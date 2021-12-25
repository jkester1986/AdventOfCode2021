fs = require('fs');
const { cloneDeep } = require('lodash');

fs.readFile('Day25.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let cucumbers = data.split('\n').map(line => line.split(''));
    let yLength = cucumbers.length;
    let xLength = cucumbers[0].length;

    let steps = 0;
    let stillMoving = true;
    while (stillMoving) {
        steps++;
        let newCucumbers = cloneDeep(cucumbers);
        let moved = false;
        for (let y = 0; y < yLength; y++) {
            for (let x = 0; x < xLength; x++) {
                let cucumber = cucumbers[y][x];
                if (cucumber === '>') {
                    // move east?
                    let wrap = (x + 1) % xLength === 0;
                    let nextCuke = wrap ? cucumbers[y][0] : cucumbers[y][x+1];
                    if (nextCuke === '.') {
                        newCucumbers[y][x] = '.';
                        if (wrap) {
                            newCucumbers[y][0] = '>';
                        }
                        else {
                            newCucumbers[y][x+1] = '>';
                        }
                        moved = true;
                    }
                }
            }
        }

        cucumbers = cloneDeep(newCucumbers);

        for (let y = 0; y < yLength; y++) {
            for (let x = 0; x < xLength; x++) {
                let cucumber = cucumbers[y][x];
                if (cucumber === 'v') {
                    //move south?
                    let wrap = (y + 1) % yLength === 0;
                    let nextCuke = wrap ? cucumbers[0][x] : cucumbers[y+1][x];
                    if (nextCuke === '.') {
                        newCucumbers[y][x] = '.';
                        if (wrap) {
                            newCucumbers[0][x] = 'v';
                        }
                        else {
                            newCucumbers[y+1][x] = 'v';
                        }
                        moved = true;
                    }
                }
            }
        }

        cucumbers = newCucumbers;
        stillMoving = moved;
    }

    console.log("steps:", steps)
});
