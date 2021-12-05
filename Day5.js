fs = require('fs');
fs.readFile('Day5.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let lines = data.split('\n').map(line => {
        let pattern = /(\d+),(\d+)\s->\s(\d+),(\d+)/;
        return line.match(pattern);
    });

    let points = new Set();
    let overlaps = new Set();

    lines.forEach(line => {
        let x1 = parseInt(line[1]),
            x2 = parseInt(line[3]),
            y1 = parseInt(line[2]),
            y2 = parseInt(line[4]);

        // vertical lines
        if(x1 === x2) {
            let length = y1 - y2;
            let start = length > 0 ? y2: y1;
            length = Math.abs(length);
            for(let inc = 0; inc <= length; inc++) {
                let point =`${x1},${start+inc}`
                if(points.has(point))
                    overlaps.add(point);
                else
                    points.add(point);
            }
        }
        // horizontal lines
        else if (y1 === y2) {
            let length = x1 - x2;
            let start = length > 0 ? x2: x1;
            length = Math.abs(length);
            for(let inc = 0; inc <= length; inc++) {
                let point =`${start+inc},${y1}`
                if(points.has(point))
                    overlaps.add(point);
                else
                    points.add(point);
            }
        }
        // 45 degree lines
        else if(Math.abs(x1 - x2)/Math.abs(y1 - y2) === 1) {
            let diffx = x2 - x1;
            let diffy = y2 - y1;
            length = Math.abs(diffx);
            for(let inc = 0; inc <= length; inc++) {
                let newX = diffx > 0 ? x1 + inc : x1 - inc;
                let newY = diffy > 0 ? y1 + inc : y1 - inc;
                let point = `${newX},${newY}`;

                if(points.has(point))
                    overlaps.add(point);
                else
                    points.add(point);
            }
        }
    });

    console.log(overlaps.size)

});