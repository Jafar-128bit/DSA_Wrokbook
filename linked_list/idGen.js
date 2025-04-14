const idGen = (mapQuantity = [], idType = 'small') => {
    if (mapQuantity.length === 0) throw new Error('mapQuantity is Empty!');

    const listNumber = mapQuantity.length;
    let IDs = {};
    let idPartOne = 0, idPartTwo = 0;
    let padStart = idType === 'small' ? 3 : 6;

    function geneNumber(idFor) {
        if (!idFor) throw new Error('Mention idFor --> list or node');
        if (idFor === 'list') {
            if (idPartOne < 1000) {
                idPartOne++;
                idPartTwo = 0;
                return String(idPartOne).padStart(padStart, '0');
            } else return '000';
        } else if (idFor === 'node') {
            if (idPartTwo < 1000) {
                idPartTwo++;
                const idOne = String(idPartOne).padStart(padStart, '0');
                const idTwo = String(idPartTwo).padStart(padStart, '0');
                return idOne + idTwo;
            } else return idPartOne + '000';
        } else throw new Error('Wrong Function Argument !');
    }

    function generate(genType) {
        for (let i = 0; i < listNumber; i++) {
            IDs.listId = genType('list');
            if (mapQuantity[i].numberOfNode <= 1)
                throw new Error(`Number of Node in List ${IDs.listId} cannot be lower than 2 !`);
            for (let j = 0; j < mapQuantity[i].numberOfNode; j++) IDs[`node_Id${j + 1}`] = genType('node');
            console.log('For List --> ' + IDs.listId);
            console.table(IDs);
            IDs = {};
        }
    }

    if (idType === 'small' || idType === 'large') generate(geneNumber);
    else throw new Error('The idType argument is wrong it can be either small or large');
}

module.exports = idGen;