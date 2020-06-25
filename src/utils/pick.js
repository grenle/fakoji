const randinc = require('./randinc')

module.exports = function pick(xs){
  const l = xs.length
  const i = randinc(0, l)
  return xs[i]
}