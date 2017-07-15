# progress-info [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Donate](http://s-a.github.io/donate/donate.svg)](http://s-a.github.io/donate/)

> determine long running progress status.

## Installation

```sh
npm install --save progress-info
```

## Usage

Asuming we want to process `100` documents and define a checkpoint size of`10\`.

```js
const ProgressInfo = require('progress-info');

var total = 100
var checkpointSize = 10
var progressInfo = new ProgressInfo(total, checkpointSize);
var index = 0;

var interval = setInterval(function () {
    index++
    if (index % checkpointSize === 0){
        progressInfo.checkpoint();
        if (index === total){
            clearInterval(interval)
            done()
        }
    }
}, 50)
```

Yields:

```sh
checkpoint: 17:02:48 (10.00%)   T -5.32 seconds (t 0.59 seconds/10 docs)        D -90 (10/100)
checkpoint: 17:02:48 (20.00%)   T -4.63 seconds (t 0.58 seconds/10 docs)        D -80 (20/100)
checkpoint: 17:02:49 (30.00%)   T -4.00 seconds (t 0.57 seconds/10 docs)        D -70 (30/100)
checkpoint: 17:02:49 (40.00%)   T -3.46 seconds (t 0.58 seconds/10 docs)        D -60 (40/100)
checkpoint: 17:02:50 (50.00%)   T -2.80 seconds (t 0.56 seconds/10 docs)        D -50 (50/100)
checkpoint: 17:02:51 (60.00%)   T -2.26 seconds (t 0.56 seconds/10 docs)        D -40 (60/100)
checkpoint: 17:02:51 (70.00%)   T -1.73 seconds (t 0.58 seconds/10 docs)        D -30 (70/100)
checkpoint: 17:02:52 (80.00%)   T -1.13 seconds (t 0.56 seconds/10 docs)        D -20 (80/100)
checkpoint: 17:02:52 (90.00%)   T -0.57 seconds (t 0.57 seconds/10 docs)        D -10 (90/100)
checkpoint: 17:02:53 (100.00%)  T -0.00 seconds (t 0.56 seconds/10 docs)        D -0 (100/100)
```

## API

### Constructor

`ProgressInfo(documentsTotal, checkpointSize)`

### Methods

-   `ProgressInfo.rawTimeString()` returns a time in seconds as human readble string.
-   `ProgressInfo.estimatedTime()` returns an estimated time in seconds as human readble string.
-   `ProgressInfo.percent()` returns an percent value as decimal.
-   `ProgressInfo.index()` returns an string in form of [current document] / [total documents].
-   `ProgressInfo.docsLeft()` returns a counter integer of forthcoming documents.
-   `checkpoint()` resets the current time for the next measurement.

## License

MIT © [Stephan Ahlf](https://github.com/s-a)

[npm-image]: https://badge.fury.io/js/progress-info.svg

[npm-url]: https://npmjs.org/package/progress-info

[travis-image]: https://travis-ci.org/s-a/progress-info.svg?branch=master

[travis-url]: https://travis-ci.org/s-a/progress-info

[daviddm-image]: https://david-dm.org/s-a/progress-info.svg?theme=shields.io

[daviddm-url]: https://david-dm.org/s-a/progress-info
