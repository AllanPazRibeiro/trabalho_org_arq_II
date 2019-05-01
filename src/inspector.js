const Instruction = require('./instruction');

const INST_DELAY = {
    'ADD': 3,
    'ADDI': 3,
    'SUB': 3,
    'LW': 3,
    'BW': 3
};

function get_nops(instruction_1, instruction_2, diff) {
    if (instruction_2.conflicts(instruction_1)) {
        const nop_count = INST_DELAY[instruction_1.inst] ? INST_DELAY[instruction_1.inst] - diff : 0;
        return Array.from({ length: nop_count }).map(x => new Instruction());
    }
    return [];
}

function inspect(instructions) {
    for (let index in instructions) {
        if (1 < index && instructions[index].conflicts(instructions[index - 2])) {
            console.log('[Line ' + (parseInt(index) + 1) + '] ' + instructions[index].inst + ' has problems with ' + instructions[index - 2].inst);
        }
        if (0 < index && instructions[index].conflicts(instructions[index - 1])) {
            console.log('[Line ' + (parseInt(index) + 1) + '] ' + instructions[index].inst + ' has problems with ' + instructions[index - 1].inst);
        }
    }
}

function resolve_conflicts(instructions) {
    let inspected = [];
    for (let index in instructions) {
        const instruction = instructions[index];
        const count = inspected.length
        if (1 < index) {
            inspected = inspected.concat(get_nops(inspected[count - 2], instruction, 2));
        }
        if (0 < index) {
            inspected = inspected.concat(get_nops(inspected[count - 1], instruction, 1));
        }
        inspected.push(instruction);
    }

    return inspected;
}

module.exports = {
    inspect: inspect,
    resolve_conflicts: resolve_conflicts
}