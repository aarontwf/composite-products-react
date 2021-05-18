/**
 * @param {Function} cb 
 */
function latency(cb) {
  var ms = Math.round(100 + (Math.random() * 1000));
  console.log(`adding ${ms}ms latency...`);

  setTimeout(function () {
    cb();
  }, ms);
}

module.exports = latency;
