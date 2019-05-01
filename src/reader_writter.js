const FS = require('fs');
const Instruction = require('./instruction');

function load(file_path) {
    let data = {};
    try {
        data = FS.readFileSync(file_path, 'utf8');
    } catch (err) {
        console.error(err);
    }
    const lines = data.split('\n');
    const instructions = [];
    lines.map(line => instructions.push(new Instruction(line.replace(/\r/g, ''))));
    return instructions;
}

function write(instructions, file_path = 'assets/assembly_optmized.txt') {
    let lines = [];
    for (const instruction of instructions) {
        lines.push(instruction.src);
    }
    try {
        FS.writeFileSync(file_path, lines.join('\n'), 'utf8');
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    load: load,
    write: write
}
