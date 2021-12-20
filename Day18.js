fs = require('fs');
fs.readFile('Day18.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let lines = data.split('\n');
    let lineLength = lines.length;

    // keep going to right until done, then do again

    /*
     explode:
     1. left number added to next immediate left number
     2. right number added to next immediate right number
     3. entire pair becomes 0 e.g. [8,9] => 0
    */

    /*
     split:
     1. left number = Math.floor(num/2)
     2. right number = Math.ceil(num/2)
    */

    // two stacks for each side? One the full amount, one just the numbers?

    // TODO: don't reset during splits and explodes? Check list to see if those are affected again?

    let current = lines[0];
    for (let i = 1; i < lineLength; i++) {
        // step 1: combine current with next line
        current = `[${current},${lines[i]}]`;

        // step 2: start to evaluate
        let leftStack = []
        let rightStack = current.split('').map(char => char.match(/\d/) ? Number(char) : char);
        let location = 0;
        let nestedLevel = -1;

        console.log(rightStack.join(''))

        while (rightStack.length > 0) {
            const char = rightStack.shift();
            leftStack.push(char);
            if (char !== ']') {
                if (char === '[') {
                    nestedLevel++; // does this need to be done way at the end?
                }
                else if (typeof char === 'number' && char >= 10) {
                    // split
                    let insert = split(char);
                    leftStack.pop();

                    // reset everything
                    rightStack = [...leftStack, ...insert, ...rightStack];
                    leftStack = [];
                    location = 0;
                    nestedLevel = -1;

                    console.log(char);
                    console.log("right stack after SPLIT: " ,rightStack.join(''));
                }
            }
            else { // see if we need to explode!
                // check to see how far nested
                // console.log({nestedLevel, leftStack})
                if (nestedLevel >= 4) {
                    // explode!
                    // 1. we are going to replace the last 5 chars, but we need the numbers out of it
                    const nestedPair = leftStack.splice(leftStack.length - 5);
                    const leftNum = nestedPair[1];
                    const rightNum = nestedPair[3];

                    // find left number
                    let leftStackLength = leftStack.length;
                    for (let i = leftStackLength; i >= 0; i--) {
                        if (typeof leftStack[i] === 'number') {
                            leftStack[i] = leftStack[i] + leftNum;
                            break;
                        }
                    }

                    // find right number
                    let rightStackLength = rightStack.length;
                    for (let i = 0; i < rightStackLength; i++) {
                        if (typeof rightStack[i] === 'number') {
                            rightStack[i] = rightStack[i] + rightNum;
                            break;
                        }
                    }
                    // tack on 0 to the end of the left stack
                    leftStack.push(0);

                    // reset everything
                    rightStack = [...leftStack, ...rightStack];
                    leftStack = [];
                    location = 0;
                    nestedLevel = 0;

                    console.log(nestedPair.join(''));
                    console.log("rightStack after EXPLODE:", rightStack.join(''));
                }
                nestedLevel--;
            }

        }
        console.log(leftStack.join(''));
        current = leftStack.join('');
        // process.exit();
    }
});

function split(num) {
    let left = Math.floor(num/2);
    let right = Math.ceil(num/2);
    return ['[', left, ',', right, ']'];
}