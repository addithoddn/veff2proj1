(function() {

	

	// function that returns if an object is the empty object.
	function isEmptyObject(object) {
		if (Object.keys(object).length == 0){
			return true;
		}
		return false;
	};

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

	// Returns the parent elements of the elements in this that match the 
	// query string or if no string given
	MyElem.prototype.parent = function(query) {

		
		if(isEmptyObject(this)) {
			return {};
		}
		parents = [];
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

	// returns the grandparents of the elements in this that match the 
	// query string or if no string given
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

	// returns first ancestor of the elements in this that match the 
	// query string or if no string given
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
								if(!ancestors.includes(ancestor)) {
									ancestors.push(ancestor);
								}
							}
						}
						else {
							if(!ancestors.includes(ancestor)) {
								ancestors.push(ancestor);
							}
						}
					}
				}
			}
		}
		return new MyElem(ancestors, ancestors.length);
	};

	// insert text into the elements in this.
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

	// attach an onClick event to the elements in this that will execute 
	// the func function when triggered
	MyElem.prototype.onClick = function(func) {
		if(isEmptyObject(this)) {
			return {};
		}
		
		for(var element of this.elem) {
			element.addEventListener('click', func);
		}
	};

	// append an element to the elements in this as it's last child
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

	// prepend an element to the elements in this as it's first child
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

	// delete the elements in this
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

	// perform an ajax http request
	makeBelieve.ajax = function(options) {
		var tempMethod = options.method;
		var method;
		if(typeof tempMethod === 'string') {
			tempMethod = tempMethod.toUpperCase();
			if(tempMethod === 'POST' || tempMethod === 'PUT' || tempMethod === 'OPTIONS' ||
				tempMethod === 'HEAD' || tempMethod === 'DELETE') {
				method = tempMethod;
			}
		}
		method = method || 'GET';
		var request = new XMLHttpRequest();
		request.open(method, options.url);
		for(var header of options.headers) {
			request.setRequestHeader(Object.keys(header)[0], header[Object.keys(header)]);
			console.log(Object.keys(header)[0], typeof(Object.keys(header)[0]));
			console.log(header[Object.keys(header)], typeof(header[Object.keys(header)]));
			//request.setRequestHeader();
		}
		
		request.onreadystatechange = function() {
			if (request.readyState === XMLHttpRequest.DONE ) {
				if(request.status >= 200 && request.status < 300) {
					if(typeof options.success === 'function') {
						options.success(request.responseText);
					}
					
				}
				else if(request.status >= 400) {
					if(typeof options.fail === 'function') {
						options.fail(request.responseText);
					}
					
				}
			}
		};

		if(typeof options.beforeSend === 'function') {
			options.beforeSend(request);
		}
		request.send(JSON.stringify(options.data));
	};

	// set the css atribute to the value given on all elements in this.
	MyElem.prototype.css = function(attribute, value) {
		if(isEmptyObject(this)) {
			return {};
		}
		for(var element of this.elem) {
			element.style[attribute] = value;
		}
	};

	// toggle a class on the elements in this.
	MyElem.prototype.toggleClass = function(newClass) {
		if(isEmptyObject(this)) {
			return {};
		}
		for(var element of this.elem) {
			element.classList.toggle(newClass);
		}
	};

	// add a sumbit event listener to the elements in this.
	MyElem.prototype.onSubmit = function(func) {
	if(isEmptyObject(this)) {
			return {};
		}
		for(var element of this.elem) {
			element.addEventListener('submit', func);		
		}
	};

	// add an event lister for the onInput event to the elements in this.
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
