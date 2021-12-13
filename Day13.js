fs = require('fs');
fs.readFile('Day13.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let sections = data.split('\n\n');
    let dots = sections[0].split('\n').reduce((acc, dot) => {
        const [x, y] = dot.split(',').map(Number);
        acc[dot] = { x, y}
        return acc;
    }, {});

    let folds = sections[1].split('\n').map(fold => {
        let loc = fold.split(' ')[2].split('=');
        return {
            [loc[0]]: loc[1]
        }
    });
    let foldCount = folds.length;

    // p1: just first fold
    let direction;
    let line;
    for (let i = 0; i < foldCount; i++) {
        for (const [key, val] of Object.entries(folds[i])) {
            if(key === "y") {
                direction = "horizontal"
            }
            else direction = "vertical";
            line = val;

            for (const [key, {x, y}] of Object.entries(dots)) {
                switch(direction) {
                    case "horizontal":
                        if (y > line) {
                            let diff = y - line;
                            let newPoint = line - diff;
                            dots[`${x},${newPoint}`] = { x, y: newPoint }
                            delete dots[key]
                        }
                        break;
                    case "vertical":
                        if (x > line) {
                            let diff = x - line;
                            let newPoint = line - diff;
                            dots[`${newPoint},${y}`] = { x: newPoint, y }
                            delete dots[key]
                        }
                        break;
                }
            }
        }
        if (i === 0) {
            console.log("P1:", Object.entries(dots).length);
        }
    }

    for(let y = 0; y < 6; y++) {
        let line = '';
        for (let x = 0; x < 45; x++) {
            line = line + (dots[`${x},${y}`] ? "#" : ' ');
        }
        console.log(line);
    }
});
