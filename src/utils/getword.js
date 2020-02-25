const randinc = require('./randinc')

const words = require('../data/words.json')

module.exports = async function getword(){
  return words[randinc(0, (await words).length)]
}