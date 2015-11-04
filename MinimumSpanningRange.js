/**
 * My solution for the Minimum Spanning Range problem
 * @license MIT
 * @author reyuto
 */

/**
 * Minimum Spanning Range
 * @param {array} TargetRange 
 * @param {array} SetOfRanges
 * @param {=debug} debug
 * @returns {string}
 */
function MinimumSpanningRange(TargetRange, SetOfRanges, debug) {
  // simple object to be used as a tree node
  function Node(prev, set) {
    this.prev = prev;
    this.next = null;
    this.set = set;
    this.depth = this.prev ? this.prev.depth + 1 : 0;
  }

  // filter function to tell if a location
  // is part of a range
  function hasLocation(range) {
    return (this.location >= range[0] && this.location <= range[1]);
  };

  // filter function to return false,
  // when the scope array and the item
  // have the same 0 and 1st elements
  function removeMe(range) {
    return (this[0] !== range[0] || this[1] !== range[1]);
  }

  // goes up a branch from the leaf and
  // adds all nodes to the result array
  function createResultBranch(result, node) {
    if (node.prev !== null) {
      result.push(node);
      createResultBranch(result, node.prev);
    }
  }

  // recursively gets the leaf nodes and
  // pushes them into the leavesNodes array
  function getLeafNodes(node, leavesNodes) {
    if (node.next === null) {
      leavesNodes.push(node);
    } else {
      node.next.forEach(function(child) {
        getLeafNodes(child, leavesNodes);
      });
    }
  }

  // uses an 2 dimensional check algorithm to find all the possible solutions
  // creates a tree with each solution as a branch.
  function findSpanningSets(location, node, limit, _Sets) {
      var collectionRow = _Sets.filter(hasLocation, {location: location}).filter(removeMe, node.set);

      // boundary condition
      if (node.set && node.set[1] >= limit) return node;

      collectionRow.forEach(function(item) {
          var newNode = new Node(node, item);

          if (Array.isArray(node.next)) {
              node.next.push(newNode);
          } else {
              node.next = [newNode];
          }
          findSpanningSets(item[1], newNode, limit, _Sets.filter(removeMe, newNode.set));
      });
  }

  var root = new Node(null, null);
  var leavesNodes = [];
  var result = []

  debug = !!debug;

  // create a tree with each solution as a branch
  findSpanningSets(TargetRange[0], root, TargetRange[1], SetOfRanges);
  debug && console.log(root);

  // get the leaf nodes for each branch into an array
  getLeafNodes(root, leavesNodes);

  // sort the array by depth to get the smallest branch hence the solution to this problem
  leavesNodes.sort(function(leaf1, leaf2) { return leaf1.depth - leaf2.depth; });
  debug && console.log(leavesNodes);

  // flatter the branch into an array,
  // marshal the nodes into arrays
  createResultBranch(result, leavesNodes[0]);
  debug && console.log(result);

  // print out the result
  return JSON.stringify(result.map(function (node) { return node.set || []; }).reverse());
}
