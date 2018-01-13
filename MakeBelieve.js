(function() {

	// function that returns if an object is the empty object.
	function isEmptyObject(object) {
		if (Object.keys(this).length == 0){
			return true;
		}
		return false;
	}

	function myElem(elem, length) {
		this.elem = elem.length === 1 ? elem[0] : elem;
		this.length = length;
	};

	var makeBelieve = function(query) {
		var nodelist = document.querySelectorAll(query);
		if (nodelist) {
			return new myElem(nodelist, nodelist.length);
		}
		return {};
	};

	myElem.prototype.parent = function(query) {

		parents = [];
		if(isEmptyObject(this)) {
			return {};
		}
		else if(this.length == 1) {
			parentElement = this.elem.parentElement
			if(parentElement) {
				if(query) {
					if (parentElement.matches(query)) {
						return new myElem(parentElement, 1);
					}
				}
				// else just return the parent of the element.
				else {
					return new myElem(this.elem.parentElement, 1);
				}
			}
		}
		else {
			for(var i = 0; i < this.length; i++) {
				parentElement = this.elem[i].parentElement
				if(query) {
					if(parentElement.matches(query)) {
						if(!parents.includes(parentElement)) {
							parents.push(parentElement);
						}
					}
				}
				else{
					if(parentElement) {
						if(!parents.includes(parentElement)){
							parents.push(parentElement);
						}
					}
				}
			}
			return new myElem(parents, parents.length);
		}
		return {};
	};

	window.__ = makeBelieve;
})();
