function testMinimumSpanningRange() {
  var Range = [3, 13];
  var Sets = [
      [1, 4], [30, 40], [20, 91] ,[8, 10], [6, 7], [3, 9], [9, 12], [11, 14]
  ];
  assertEquals(MinimumSpanningRange(Range, Sets), JSON.stringify([[3,9], [9,12], [11, 14]]), 'Results should be the same.');
}
