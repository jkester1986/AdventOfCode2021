const { warn } = require('console');

fs = require('fs');
fs.readFile('Day12.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let lines = data.split('\n');

    const mappings = {};

    let paths = [];
    function findAllPaths(cave, path, part2) {
        if (cave === "end") {
            paths.push({
                path: `${path.path},end`,
                visitedSmallTwice: path.visitedSmallTwice
            });
            return;
        }

        let nextSteps = mappings[cave];
        nextSteps.forEach(nextCave => {
            let smallerCase = [...path.smallerCase || []];
            let visitedSmallTwice = path.visitedSmallTwice;
            if (nextCave !== "end" &&
                nextCave.match(/^([a-z]+)$/)
                ) {
                    if(!path.smallerCase?.includes(nextCave)) {
                        smallerCase.push(nextCave);
                    }
                    else if (!path.visitedSmallTwice && part2) { // Parth 2
                        visitedSmallTwice = true;
                    }
                    else {
                        return;
                    }
            }
            let newPath = `${path.path},${cave}`;

            return findAllPaths(nextCave, {
                smallerCase,
                path: newPath,
                visitedSmallTwice
            }, part2);
        })

    }

    lines.forEach(line => {
        let connections = line.split("-");
        if(connections[1] !== "start") {
            mappings[connections[0]] = [...mappings[connections[0]] || [], connections[1]];
        }

        if(connections[0] !== "start") {
            mappings[connections[1]] = [...mappings[connections[1]] || [], connections[0]];
        }

    });


    findAllPaths("start", { path: '' })
    console.log("P1:", paths.length)

    findAllPaths("start", { path: '' }, true)
    console.log("P2:", paths.length)
});