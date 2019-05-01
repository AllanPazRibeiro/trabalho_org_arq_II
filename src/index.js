const Inspector = require('./inspector');
const RW = require('./reader_writter');

const instructions = RW.load('assets/assembly.txt');
Inspector.inspect(instructions);
const conflictless = Inspector.resolve_conflicts(instructions);
RW.write(conflictless, 'assets/conflictless.txt');