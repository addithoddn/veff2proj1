(function() {

	// function that returns if an object is the empty object.
	function isEmptyObject(object) {
		if (Object.keys(this).length == 0){
			return true;
		}
		return false;
	}

	function MyElem(elem, length) {
		this.elem = elem.length === 1 ? elem[0] : elem;
		this.length = length;
	};

	var makeBelieve = function(query) {
		var nodelist = document.querySelectorAll(query);
		if (nodelist) {
			return new MyElem(nodelist, nodelist.length);
		}
		return {};
	};

	MyElem.prototype.parent = function(query) {

		parents = [];
		if(isEmptyObject(this)) {
			return {};
		}
		else if(this.length == 1) {
			parentElement = this.elem.parentElement;
			if(parentElement) {
				if(query) {
					if (parentElement.matches(query)) {
						return new MyElem(parentElement, 1);
					}
				}
				// else just return the parent of the element.
				else {
					return new MyElem(this.elem.parentElement, 1);
				}
			}
		}
		else {
			for(var i = 0; i < this.length; i++) {
				parentElement = this.elem[i].parentElement;
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
			return new MyElem(parents, parents.length);
		}
		return {};
	};

	MyElem.prototype.grandParent = function(query) {
		grandParents = [];
		if(isEmptyObject(this)) {
			return {};
		}
		else if (this.length == 1) {
			grandParentElement = this.elem.parentElement.parentElement;
			if(grandParentElement) {
				if(query) {
					if(grandParentElement.matches(query)) {
						return new MyElem(grandParentElement, 1);
					}
				}
				else {
					return new MyElem(grandParentElement, 1);
				}
			}
		}
		else {
			for(var i = 0; i < this.length; i++) {
				garndParentElement = this.elem[i].parent.parent;
				if (query) {
					if(grandParentElement.matches(query)) {
						if(!grandParents.includes(grandParentElement)) {
							grandParents.push(grandParentElement);
						}
					}
				}
				else {
					if(grandParentElement) {
						if(!grandParents.includes(grandParentElement)) {
							grandParents.push(grandParenetElement);
						}
					}
				}
			}
		}
		return {};
	};


	MyElem.prototype.anscestor = function(query) {

		return {};
	};

	MyElem.prototype.insertText = function(text) {
		if(isEmptyObject(this)) {
			return {};
		}
		else if(this.length == 1) {
			this.elem.textContent = text;
		}
		else {
			for(var element of this.elem) {
				element.textContent = text;
			}	
		}
	};

	// hér kemur event handler dótið
	// TODO HANDLER

	
	MyElem.prototype.append = function() {

	};

	MyElem.prototype.prepend = function() {

	};

	MyElem.prototype.delete = function() {

	};

	window.__ = makeBelieve;
})();
