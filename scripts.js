const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
	const form = document.querySelector('.form');
	const items = document.querySelector('.items');

  	text.init(form, items);
});

const text = (() => {
  	let items;

	function init(_form, _items) {
    	items = _items;
		
    	_form.addEventListener('submit', formHandler);

		let delete_buttons = document.getElementsByClassName('item__button');
		for(var i = 0; i < delete_buttons.length; i++) {
			delete_buttons[i].addEventListener('click', deleteItem);
		}

		let checkboxes = document.getElementsByClassName('item__checkbox');
		for(var i = 0; i < checkboxes.length; i++) {
			checkboxes[i].addEventListener('click', finish);
		}

		let item_texts = document.getElementsByClassName('item__text');
		for(var i = 0; i < item_texts.length; i++) {
			item_texts[i].addEventListener('click', edit);
		}
	}

	function formHandler(e) {
    	e.preventDefault();

		var input_text = document.querySelector('.form__input').value;
		
		if(input_text !== '') {
			add(input_text);
		}
    }

    // event handler fyrir það að klára færslu
    function finish(e) {
		let checkbox = e.srcElement;
		if(checkbox.checked) {
			checkbox.parentNode.classList.add('item--done');
		}else {
			checkbox.parentNode.classList.remove('item--done');
		}
    }

    // event handler fyrir það að breyta færslu
    function edit(e) {
		let text_element = e.srcElement;
		let text_parent = text_element.parentElement;
		let text = text_element.innerHTML;

		let input = document.createElement("input");
		input.type = "text";
		input.classList.add("item__edit");
		input.addEventListener("keypress", commit);
		input.value = text;

		text_parent.insertBefore(input, text_element);
		text_element.remove();

		input.focus();
    }

    // event handler fyrir það að klára að breyta færslu
    function commit(e) {
		if(e.keyCode == ENTER_KEYCODE) {
			let input_element = e.srcElement;
			let input_parent = input_element.parentElement;
			let text = input_element.value;

			let text_element = document.createElement("span");
			text_element.innerHTML = text;
			text_element.classList.add("item__text");
			text_element.addEventListener('click', edit);

			input_parent.insertBefore(text_element, input_element);
			input_element.remove();
		}
    }

    // fall sem sér um að bæta við nýju item
    function add(value) {
		var item = document.createElement("li");
		var checkbox = document.createElement("input");
		var text = document.createElement("span");
		var delete_button = document.createElement("button");

		item.classList.add("item");

		checkbox.type = "checkbox";
		checkbox.classList.add("item__checkbox");
		checkbox.addEventListener('click', finish);

		text.innerHTML = value;
		text.classList.add("item__text");
		text.addEventListener('click', edit);

		delete_button.innerHTML = "Eyða";
		delete_button.classList.add("item__button");
		delete_button.addEventListener('click', deleteItem);

		item.appendChild(checkbox);
		item.appendChild(text);
		item.appendChild(delete_button);

		items.appendChild(item);
    }

    // event handler til að eyða færslu
    function deleteItem(e) {
		e.srcElement.parentNode.remove();
    }

    // hjálparfall til að útbúa element
    function el(type, className, clickHandler) {
    }

    return {
    	init: init
    }
})();
