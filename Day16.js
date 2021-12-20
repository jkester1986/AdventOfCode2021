fs = require('fs');
fs.readFile('Day16.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let binary = (parseInt(data, 16)).toString(2);
    const remainder = binary.length%4;
    if (remainder) {
        for(let i = 0; i < remainder; i++) {
            binary = "0" + binary
        }
    }

    console.log(binary)

    getPackets(binary);
    console.log({versionTotal})
});

let versionTotal = 0;
function getPackets(binary) {
    const version = binary.substr(0, 3);
    versionTotal += parseInt(version, 2);
    console.log(parseInt(version, 2))
    const typeId = binary.substr(3, 3);

    // if type is literal value
    if (parseInt(typeId, 2) === 4) {
        const result = getValue(binary.substr(6));
        console.log("returning value")
        return {
            ...result,
            packetLength: result.length + 6,
            version,
            typeId
        };
    }
    // type is operator
    else {
        const lengthTypeId = Number(binary.charAt(6));

        //length typeId 0, get length of next sub-packets
        if (!lengthTypeId) {
            const subPacketLength = parseInt(binary.substr(7, 15), 2);
            const subPackets = binary.substr(7+15, subPacketLength);
            console.log("getting subpacket by length", {subPackets, subPacketLength, binary})
            return getSubPacketsByLength(subPackets, subPacketLength);//todo: call from inside getSubPackets
        }
        //length typeId 1
        else {
            const subpacketCount = parseInt(binary.substr(7, 11), 2);
            const subPackets = binary.substr(7+11)
            console.log("getting subpacket by count")
            return getSubPacketsByCount(subPackets, subpacketCount);
        }
    }
}

function getSubPacketsByLength(subPackets, subPacketLength) {
    // process.exit();
    let packetsSize = 0;
    let packets = []
    while(packetsSize < subPacketLength) {
        console.log({subPackets})
        const subPacket = getPackets(subPackets);
        packets.push(subPackets.substr(0, subPacket.packetLength));
        subPackets = subPackets.substr(subPacket.packetLength);
        // console.log(subPackets, subPacket);
        packetsSize += subPacket.packetLength;
        // console.log({packets, subPackets, subPacketLength, packetsSize});
    }
}

function getSubPacketsByCount(subPackets, subPacketCount) {
    // process.exit();
    let packets = []
    while(packets.length < subPacketCount) {
        const subPacket = getPackets(subPackets);
        console.log({subPackets, subPacket})
        packets.push(subPackets.substr(0, subPacket.packetLength));
        subPackets = subPackets.substr(subPacket.packetLength);
        // console.log(subPackets, subPacket);
        // console.log({packets, subPackets, subPacketLength, packetsSize});
    }
    // console.log(packets);
}

function getValue(bits) {
    const length = bits.length;
    const bitGroups = []
    for (let i = 0; i < length; i += 5) {
        bitGroups.push(bits.substr(i+1, 4));
        if (bits.charAt(i) === "0") break;
    }
    let binaryNum = bitGroups.join('');
    return {
        length: binaryNum.length + binaryNum.length/4,
        value: parseInt(binaryNum, 2),
        binary: binaryNum
    };
}
