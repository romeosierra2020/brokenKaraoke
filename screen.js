export default class Display {
    constructor() {

    }
    static getID = (line, note) => {
        let firstChar = String.fromCharCode(line+65);
        let secondChar = String.fromCharCode(note+65);
        return firstChar + secondChar;
    }
    static getNote = (className, line, note) => {
        let id = this.getID(line, note);
        return (
            `<span class="${className}" id="${id}">&nbsp</span>`
        )
    }
}