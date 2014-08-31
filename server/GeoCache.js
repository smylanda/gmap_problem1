
var	fs  = require("fs");
var readline = require('readline');

module.exports = function(arr, name) {
	var Tree = build(arr);
	
	name = name || "";
	console.log("Geo Cache " + name + " Root: " + Tree.x + ", " + Tree.y + ", count: " + arr.length);
	
	return {
		name: name,
		
		search: function(x1, y1, x2, y2) {
			return search(Tree, x1, y1, x2, y2);
		}
	};
}

//-------------------------------------------------------------------------------------
//	 Tree
//-------------------------------------------------------------------------------------

function build(arr) {
	var a1 = arr[0];
	var Tree = createTree(a1);
	var l = arr.length;
	for(var i = 1; i < l; i++) {
		var ai = createTree(arr[i]);
		addtoTree(ai);
	}
	
	return Tree;

	function addtoTree(node) {
		var parent = Tree;
		if(node.x <= parent.x) {
			if(node.x == parent.x && node.y == parent.y) {
				return;
			}
			
			if(node.y < parent.y) {
				node.d = parent;
			} else {
				node.c = parent;
			}
			Tree = node;
			return;
		}
		
		var prev;
		while(parent.x < node.x) {
			var next;
			if(parent.y < node.y) {
				next = "d"
			} else {
				next = "c";
			}
			if(!parent[next]) {
				if(node.x == parent.x && node.y == parent.y) {
					return;
				}			
				
				parent[next] = node;
				return;
			}
			prev = parent;
			parent = parent[next];
		}
		
		if(node.x == parent.x && node.y == parent.y) {
			return;
		}
		
		if(prev.y < node.y) {
			prev.d = node;
		} else {
			prev.c = node;
		}
		if(node.y < parent.y) {
			node.d = parent;
		} else {
			node.c = parent;
		}
	}
}

function createTree(arr) {
	return { x: Number1(arr[2]), y: Number1(arr[3]), i: arr[0] + "(" + arr[1] + ")" };
}

function Number1(str) {
	return Number(str);
}

function split1(str) {
	return str.substring(1, str.length - 1);
}

//---------------------------------------------------------------------
//		Geo Search
//---------------------------------------------------------------------

function search(Tree, x1, y1, x2, y2) {
	var result = [];

	search(Tree);
	
	console.log("Found " + result.length);
	
	return result;
	
	function search(node) {
		if(!node) {
			return null;
		}
		if(node.x < x1) {
			if(node.y < y1) {
				return search(node.d)
			}
			search(node.c);
			search(node.d);
			return;
		}
		if(node.y < y1) {
			return search(node.d)
		}
		search1(node);
	}
	
	function search1(node) {
		if(!node) {
			return;
		}
		if(node.x < x2) {
			if(node.y < y2) {				
				result.push([ node.x, node.y, node.i ]);
				search1(node.d);
			}
			search1(node.c);
		}
	}
}