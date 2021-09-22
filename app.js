'use strict'
let i = null;
let arrObjProduct = [];
let resultBuckets = '';

let arr_product = document.querySelector('.add_buckets');
let product = document.querySelectorAll('.Link_cash_items');
let struct_card_add = document.querySelector('.add_card_buckets');
let struct_card_add_by_Id = document.querySelectorAll('.add_card_buckets');
let clear_buckets = document.querySelector('.clear_buckets');
let final_price = document.querySelector('.cash_result');
let icon_buckets = document.querySelector('.sum_buckets')
let delete_item = document.querySelectorAll('.delete_item_buckets')


/**
 * Функция конструктор карточки товара
 * @param {product} id 			id товара личный номер каждой карточки  
 * @param {*} info 				Данные о товаре
 * @param {*} price 			Цена товара
 * @param {*} img 				Ссылка на картинку
 */
function Product(id, count, info, price, img) {
	this.id = id;
	this.count = count;
	this.info = info;
	this.price = price;
	this.img = img;
}

function Buckets(final_price, count) {
	this.final_price = final_price;
	this.count = count;
}

/**
 * Добавление одинаковых товаров (уже имеются в корзине)
 * @param {*} constr_item Данные конструктора Product по выбранному товару
 */
function addBucketsByID(object) {
	let id = Number(object.id);
	struct_card_add_by_Id.forEach(item => {
		if (item.getAttribute('id') == object.id) {
			let child_buckets = item.childNodes[1];
			arrObjProduct[id].price += object.price;
			arrObjProduct[id].count += 1;
			child_buckets.querySelector('.num_cash_items').innerHTML = `${arrObjProduct[id].count} x $${arrObjProduct[id].price}`;			//Изменить цену продукта X2
			console.log(arrObjProduct);
		}
	});
}

/**
 * Функция заполнения структуры карточки корзины из объекта конструктора Product
 * @param {*} object структура карточки корзины
 * @param {*} item объект конструктора Product
 */
function addProductConstr(item, object) {
	let child_buckets = '';

	item.setAttribute('id', `${object.id}`);
	object.count = 1;
	child_buckets = item.childNodes[1];													//Получить доступ к разделу Figure
	child_buckets.querySelector('.buckets_img_item').setAttribute('src', `${object.img}`);	//Изменить путь изображения 
	child_buckets.querySelector('.Name_cash_items').innerHTML = `${object.info}`;			//Изменить текст карточки продукта
	child_buckets.querySelector('.num_cash_items').innerHTML = `$${object.price}`;			//Изменить цену продукта
}

function Sum_price(new_object, active) {
	if (active == 'sum') {
		new_object.forEach(item => {
			resultBuckets.final_price += item.price;
			console.log(resultBuckets);
		});
	}
	else if (active == 'deduction') {
		resultBuckets.final_price -= new_object.price;
		console.log(resultBuckets);
	}
	return resultBuckets.final_price;
}

function Sum_count(new_object, active) {
	if (active == 'sum') {
		new_object.forEach(item => {
			resultBuckets.count += item.count;
			console.log(resultBuckets);
		});
	}
	else if (active == 'deduction') {
		resultBuckets.count -= new_object.count;
		console.log(resultBuckets);
	}
	return resultBuckets.count;
}

function finalPriceAndCout(new_object, active) {
	if (active == 'sum') {
		resultBuckets.final_price = 0;
		resultBuckets.count = 0;
	}
	final_price.children[1].innerHTML = `$${Sum_price(new_object, active)}`;
	icon_buckets.innerHTML = Sum_count(new_object, active);

}

/**
 * Добавление новых товаров (еще нет в корзине)
 * @param {*} item Данные конструктора Product по выбранному товару
 */
function addBuckets(object) {
	console.log(clear_buckets.style.display);
	let id = Number(object.id);

	if (clear_buckets.style.display == 'block') {   	 //Проверка пустой корзины
		clear_buckets.style.display = 'none';			 //Скрыть текст 'Корзина пуста'	
		struct_card_add.style.display = 'block';		 //Оторазить форму каточки корзины
		icon_buckets.style.display = 'block';			 //Отобразить иконку суммы

		addProductConstr(struct_card_add, object);
		arrObjProduct[id] = Object.assign({}, object)
		resultBuckets = new Buckets(0, 0);
		finalPriceAndCout(arrObjProduct, 'sum');
		console.log(arrObjProduct);
	}
	else if (arrObjProduct[id] === undefined) {
		struct_card_add = struct_card_add.cloneNode(true);										//Копировать форму карточки корзины
		arr_product.insertAdjacentElement('beforeend', struct_card_add);						//Вставить копию в нижнюю часть блока

		addDeleteList();

		addProductConstr(struct_card_add, object);
		arrObjProduct[id] = Object.assign({}, object)

		finalPriceAndCout(arrObjProduct, 'sum');

		console.log(arrObjProduct);
	}
	else {
		addBucketsByID(object);

		finalPriceAndCout(arrObjProduct, 'sum');
	}
}

/**
 * Преобразование цены товара (Удаление знака $)
 * @param {*} price innerHTML выбранного товара ($52.00) 
 * @returns Возвращение числового значения
 */
function converArrPrice(price) {
	let price_conver
	price_conver = price.split('');
	delete price_conver[0];
	return Number(price_conver.join(''));
}

/**
 * Создание объекта и заполнение конструктора Product объектами с страницы
 * @param {*} event текущие событие "клика" по товару
 */
function select_product(event) {
	let objProduct = new Product;

	objProduct.info = event.currentTarget.querySelector('.cash_item_info_top').innerHTML;
	objProduct.price = converArrPrice(event.currentTarget.querySelector('.Cash_item_info_bottom').innerHTML);
	objProduct.img = event.currentTarget.querySelector('.Fetured_img').getAttribute('src');
	objProduct.id = event.currentTarget.getAttribute('id');

	addBuckets(objProduct);
}

function selectDeletLastItem(ID) {
	struct_card_add_by_Id.forEach(item => {
		if (item.id == `${ID}` &&
			struct_card_add.style.display == 'block') {

			finalPriceAndCout(arrObjProduct[ID], 'deduction');
			delete arrObjProduct[ID];

			struct_card_add = document.querySelector('.add_card_buckets');

			clear_buckets.style.display = 'block';			 //Скрыть текст 'Корзина пуста'	
			struct_card_add.style.display = 'none';		 	 //Оторазить форму каточки корзины
			icon_buckets.style.display = 'none';
		}
	});
}

function deleteItemBuckets(event_del) {
	let item_del = event_del.currentTarget.parentElement;
	for (let i = 0; i < 2; i++) {
		item_del = item_del.parentElement;
	}
	let id = item_del.getAttribute('id');

	if (struct_card_add_by_Id.length == '1') {
		selectDeletLastItem(id);
	}
	else if (struct_card_add_by_Id.length > 1) {
		struct_card_add_by_Id.forEach(item => {
			if (item.id == `${id}`) {
				finalPriceAndCout(arrObjProduct[id], 'deduction');
				delete arrObjProduct[id];

				item.parentNode.removeChild(item);
				struct_card_add_by_Id = document.querySelectorAll('.add_card_buckets');
				console.log(struct_card_add_by_Id);
			}
		});
	}
}

/**
 * Получение события "клика" по товару
 * @param {*} event все карточки товара которые можно поместить в корзину 
 */
function eventClickItem(event) {
	event.addEventListener('click', event_cl => {
		select_product(event_cl);
		event_cl.preventDefault();
		struct_card_add_by_Id = document.querySelectorAll('.add_card_buckets');
	});
}
//Честно не знаю зачем, и правильно ли использовать preventDefault(). Я так понимаю, что на событие клика влияет отправка формы?

function eventDeleteItem(item) {
	item.addEventListener('click', event => {
		deleteItemBuckets(event);
		event.preventDefault();
	});
}

function addDeleteList() {
	delete_item = document.querySelectorAll('.delete_item_buckets');

	delete_item.forEach(item => {
		eventDeleteItem(item);
	});
}


product.forEach(item => {
	item.setAttribute('id', `${i++}`);
	eventClickItem(item);
});
