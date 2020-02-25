/**
 * A curried version of randBetween for repeat use.
 * @param {number} min a natural 
 * @param {number} max a natural
 */
function randincc(min, max){
  return function(){ return randBetween(min, max); }
}