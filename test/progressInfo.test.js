/* Const should =  */
require("should");
var ProgressInfo = require("./../lib/index.js");

var total = 100
var checkpointSize = 10
var progressInfo = new ProgressInfo(total, checkpointSize);
var index = 0;
describe("progressInfo", function () {
  it("has a test", function (done) {

    this.timeout(10000)

    var interval = setInterval(function () {
      index++
      if (index % checkpointSize === 0) {
        console.log(progressInfo.info(index))
        progressInfo.checkpoint();
        if (index === total) {
          clearInterval(interval)
          done()
        }
      }
    }, 50)

  });
});
