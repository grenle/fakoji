const randinc = require('./randinc')

module.exports = function pickBang(xs){
  const l = xs.length
  const i = randinc(0, l)
  const res = xs[i]
  xs.splice(i, 1)
  return res
}