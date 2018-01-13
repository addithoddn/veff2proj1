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
		if(query) {
			var possibleParents = query.querySelectorAll(query);
		}
		else {
			possibleParents = [];
		}

		parents = [];
		if(isEmptyObject(this)) {
			return {};
		}
		else if(this.length == 1) {
			parentElement = this.elem.parentElement
			if(parentElement) {
				// if css selector, check parent of element against elements the selector returns
				if(query) {
					for( var i = 0; i < possibleParents.length; i++) {
						if(possibleParents[i] === parentElement){
							return new myElem(parentElement, 1);
						}
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
					for(var j = 0; j < possibleParents.length; j++){
						
						if(parentElement) {
							if(parentElement === possibleParents[j]) {
								if(!parents.includes(parentElement)) {
									parents.push(parentElement);
								}
								break;
							}
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
