module.exports = class Hangman{
  constructor(word, id){
    this.word = word
    this.guessed = new Array(word.length).fill(null)
    this.keyboard = [...new Array(26)].map( (_, i) =>
    ({ char: String.fromCodePoint(i + 97), active: true }))
  }
}