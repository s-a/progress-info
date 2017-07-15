"use strict";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function ProgressInfo(documentsTotal, checkpointSize) {
  this.documentsTotal = documentsTotal;
  this.checkpointSize = checkpointSize;
  this.checkpoint();
  return this;
}

ProgressInfo.prototype.rawTimeString = function (milliseconds) {
  var seconds = (milliseconds / 1000);
  return seconds.toFixed(2) + " seconds";
};

ProgressInfo.prototype.estimatedTime = function (documentIndex) {
  var documentsLeft = this.documentsTotal - documentIndex;
  var t1 = new Date().getTime();
  var ty = t1 - this.t0;
  var timeLeft = ty * documentsLeft;
  return this.rawTimeString(timeLeft / 10);
};

ProgressInfo.prototype.percent = function (documentIndex) {
  return (documentIndex / this.documentsTotal * 100).toFixed(2);
};

ProgressInfo.prototype.index = function (documentIndex) {
  return numberWithCommas(documentIndex) + "/" + numberWithCommas(this.documentsTotal);
};

ProgressInfo.prototype.docsLeft = function (documentIndex) {
  return numberWithCommas(this.documentsTotal - documentIndex);
};

ProgressInfo.prototype.checkpoint = function () {
  this.t0 = new Date().getTime();
};

ProgressInfo.prototype.time = function () {
  return new Date().toLocaleTimeString();
};

ProgressInfo.prototype.tx = function () {
  var t1 = new Date().getTime();
  var tx = t1 - this.t0;
  return this.rawTimeString(tx);
};

ProgressInfo.prototype.info = function (index) {
  return "checkpoint: " + this.time() +
    " (" + this.percent(index) + "%)" +
    "\tT -" + this.estimatedTime(index) + " (t " + this.tx() + "/" + this.checkpointSize + " docs)" +
    "\tD -" + this.docsLeft(index) + " (" + this.index(index) + ")";
};

module.exports = ProgressInfo;
