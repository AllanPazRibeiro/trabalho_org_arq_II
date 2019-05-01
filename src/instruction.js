const REG_INST = /^(?:(?:(\w+)\:\t)|(?:\t\t))(\w{1,4})\t((?:\$\w+)|(?:\w+)|(?:\d))(?:\,((?:\$\w+)|(?:\w+)|(?:\d)))?(?:\,((?:\$\w+)|(?:\w+)|(?:\d)))?$/;

module.exports = class Instruction {
    constructor(src = '\t\tNOP') {
        this.src = src;

        const matches = REG_INST.exec(src);
        this.branch = matches ? matches[1] : '';
        this.inst = matches ? matches[2] : '';
        this.parameters = matches ? matches.slice(3) : [];
    }

    conflicts(inst = new Instruction()) {
        if (['ADD', 'ADDI', 'SUB'].includes(inst.inst)) {
            for (let param of this.parameters) {
                if (inst.parameters[0] == param) {
                    return true;
                }
            }
        } else if (['LW', 'SW'].includes(inst.inst)) {
            for (let param of this.parameters) {
                if (inst.parameters[1] == param || inst.parameters[2] == param) {
                    return true;
                }
            }
        }
        return false;
    }
}
