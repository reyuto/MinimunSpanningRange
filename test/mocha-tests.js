
var test = require('unit.js');
var msr = require('../MinimumSpanningRange');

describe('functional tests for minimum spanning range', function() {
    it('inital testing', function() {
        var Range = [3, 13];
        var Sets = [
          [1, 4], [30, 40], [20, 91] ,[8, 10], [6, 7], [3, 9], [9, 12], [11, 14]
        ];
        var result = JSON.stringify([[3,9], [9,12], [11, 14]]);
        test.value(msr.MinimumSpanningRange(Range, Sets)).isEqualTo(result);
    });
});
