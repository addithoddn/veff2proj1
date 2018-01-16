(function() {

	// function that returns if an object is the empty object.
	function isEmptyObject(object) {
		if (Object.keys(this).length == 0){
			return true;
		}
		return false;
	}

	function MyElem(elem, length) {
		this.elem = elem;
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

	};

	MyElem.prototype.grandParent = function(query) {
		grandParents = [];
		if(isEmptyObject(this)) {
			return {};
		}
		for(var i = 0; i < this.length; i++) {
			if(this.elem[i].parentElement){
				console.log('if query');
				if(this.elem[i].parentElement.parentElement) {

					grandParentElement = this.elem[i].parentElement.parentElement;
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
								grandParents.push(grandParentElement);
							}
						}
					}
				}
			}	
		}
		return new MyElem(grandParents, grandParents.length);
	};


	MyElem.prototype.ancestor = function(query) {
		ancestors = [];
		if(isEmptyObject(this)) {
			return {};
		}
		for(var element of this.elem) {
			if(element.parentElement) {
				if(element.parentElement.parentElement) {
					if(element.parentElement.parentElement.parentElement){
						var ancestor = element.parentElement.parentElement.parentElement;
						if(query) {
							while(!ancestor.matches(query) && ancestor.parentElement) {
								ancestor = ancestor.parentElement;
							}
							if(ancestor.matches(query)) {
								ancestors.push(ancestor);
							}
						}
						else {
							ancestors.push(ancestor);
						}
					}
				}
			}
		}
		return new MyElem(ancestors, ancestors.length);
	};

	MyElem.prototype.insertText = function(text) {
		if(isEmptyObject(this)) {
			return {};
		}
		else {
			for(var element of this.elem) {
				element.textContent = text;
			}	
		}
	};

	MyElem.prototype.onClick = function(func) {
		if(isEmptyObject(this)) {
			return {};
		}
		
		for(var element of this.elem) {
			element.addEventListener('click', func);
		}
	};

	
	MyElem.prototype.append = function(newElement) {
		if(typeof newElement == "string") {
			for(var element of this.elem) {
				element.innerHTML += newElement;
			}
		}
		else {
			for(var element of this.elem) {
				element.appendChild(newElement);
			}
		}
	};

	MyElem.prototype.prepend = function(newElement) {
		if(typeof newElement == "string") {
			for(var element of this.elem) {
				element.innerHTML = newElement + element.innerHTML;
			}
		}
		else {
			for(var element of this.elem) {
				if(element.childElementCount == 0) {
					element.appendChild(newElement);
				}
				else {
					element.insertBefore(newElement, element.firstElementChild);
				}
			}
		}
	};

	MyElem.prototype.delete = function() {
		if(isEmptyObject(this)) {
			return {};
		}
		for(var element of this.elem) {
			if(element.parentElement) {
				element.parentElement.removeChild(element);
			}
		}
	};

	MyElem.prototype.ajax = function(options) {
		var method = options.method || 'GET';
		var request = new XMLHttpRequest();
		request.open(method, options.url);
		request.onreadystatechange = function() {
			if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
				console.log(request.responseText);
			}
		};

		request.send(JSON.stringify(options.data));
	};

	MyElem.prototype.css = function(attribute, value) {
		if(isEmptyObject(this)) {
			return {};
		}
		for(var element of this.elem) {
			element.style[attribute] = value;
		}
		console.log(this);
	};

	MyElem.prototype.toggleClass = function(newClass) {
		if(isEmptyObject(this)) {
			return {};
		}
		for(var element of this.elem) {
			element.classList.toggle(newClass);
		}
	};

	MyElem.prototype.onSubmit = function(func) {
	if(isEmptyObject(this)) {
			return {};
		}
		for(var element of this.elem) {
			element.addEventListener('submit', func);		
		}
	};

	MyElem.prototype.onInput = function(func) {
		if(isEmptyObject(this)) {
			return {};
		}
		for(var element of this.elem) {
			element.addEventListener('input', func);		
		}
	};

	window.__ = makeBelieve;
})();
