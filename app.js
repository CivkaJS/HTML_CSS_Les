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
	let id = Number(object.id);							//Сохранение ID 
	struct_card_add_by_Id.forEach(item => {				//Перебор всех объектов в корзине
		if (item.getAttribute('id') == object.id) {		//Если ID объекта в корзине совпадет с ID объекта в функции
			let child_buckets = item.childNodes[1];		//Сохранить дочерний объекта с совпавшими ID 
			arrObjProduct[id].price += object.price;	//Сумировать сумму
			arrObjProduct[id].count += 1;				//Сумировать количесто
			child_buckets.querySelector('.num_cash_items').innerHTML = `${arrObjProduct[id].count} x $${arrObjProduct[id].price}`; 			//Изменить цену продукта (2 х $106)
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

	item.setAttribute('id', `${object.id}`);												//Запись в объект ID как карточках на странице
	object.count = 1;																		//Запись однго товара 
	child_buckets = item.childNodes[1];														//Получить доступ к разделу Figure
	child_buckets.querySelector('.buckets_img_item').setAttribute('src', `${object.img}`);	//Изменить путь изображения 
	child_buckets.querySelector('.Name_cash_items').innerHTML = `${object.info}`;			//Изменить текст карточки продукта
	child_buckets.querySelector('.num_cash_items').innerHTML = `$${object.price}`;			//Изменить цену продукта
}


/**
 * Подсчет результирующей цены
 * @param {*} new_object объект задействанный в данный лежащий в корзине
 * @param {*} active 'sum' - если нужно прибавить к общей сумме о кол-ву 'deduction' - если нужно вычесть (удалить)
 * @returns результат сумирования или вычитания результирующей цены в корзине
 */
function Sum_price(new_object, active) {
	if (active == 'sum') {								//Если суммирование
		new_object.forEach(item => {					//Перебор объектов(карточек) которые лежат в корзине
			resultBuckets.final_price += item.price;	//Запись в объект рез. информации о корзине сумирование цены даной карточки
			console.log(resultBuckets);
		});
	}
	else if (active == 'deduction') {					//Если вычитание
		resultBuckets.final_price -= new_object.price;	//Вычитание объекта(ов) из объекта рез. информации о корзине (Не использовал перебор т.к удаление происходит по конкретному ID)
		console.log(resultBuckets);
	}
	return resultBuckets.final_price;
}


/**
 * Подсчет количества добавленых товаров
 * @param {*} new_object объект задействанный в данный лежащий в корзине
 * @param {*} active 'sum' - если нужно прибавить к общей сумме о кол-ву 'deduction' - если нужно вычесть (удалить)
 * @returns результат сумирования или вычитания общего количества товара в корзине
 */
function Sum_count(new_object, active) {
	if (active == 'sum') {						//Если суммирование
		new_object.forEach(item => {			//Перебор объектов(карточек) которые лежат в корзине
			resultBuckets.count += item.count;	//Запись в объект рез. информации о корзине добавления 1 катрочки
			console.log(resultBuckets);
		});
	}
	else if (active == 'deduction') {				//Если вычитание
		resultBuckets.count -= new_object.count;	//Вычитание объекта(ов) из объекта рез. информации о корзине (Не использовал перебор т.к удаление происходит по конкретному ID)
		console.log(resultBuckets);
	}
	return resultBuckets.count;
}

/**
 * Подсчет общей суммы и количества карточек в корзине
 * @param {*} new_object объект задействанный в данный лежащий в корзине
 * @param {*} active 	 'sum' - если нужно прибавить к общей сумме о кол-ву 'deduction' - если нужно вычесть (удалить)
 */
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

	if (clear_buckets.style.display == 'block') {   	 //Проверка пуста ли корзина
		clear_buckets.style.display = 'none';			 //Скрыть текст 'Корзина пуста'	
		struct_card_add.style.display = 'block';		 //Оторазить форму каточки корзины
		icon_buckets.style.display = 'block';			 //Отобразить иконку суммы

		addProductConstr(struct_card_add, object);
		arrObjProduct[id] = Object.assign({}, object)	//Копирование объекта в массив объектов направленных в корзину
		resultBuckets = new Buckets(0, 0);				//Создание объекта для хранения общей суммы и количества товаров
		finalPriceAndCout(arrObjProduct, 'sum');		//Подсчет общ. суммы и количества карточек в корзине и заполнение ячеек результирующей инфы для корзины
		console.log(arrObjProduct);
	}
	else if (arrObjProduct[id] === undefined) {													//Если объекта с данным ID еще нет в корзине
		struct_card_add = struct_card_add.cloneNode(true);										//Копировать форму карточки корзины
		arr_product.insertAdjacentElement('beforeend', struct_card_add);						//Вставить копию в нижнюю часть блока

		addDeleteList();								//Обновить кнопки удаления по которым совершается событие 'клика' (удалить)

		addProductConstr(struct_card_add, object);
		arrObjProduct[id] = Object.assign({}, object)	//Копирование нового объекта в массив объектов направленных в корзину

		finalPriceAndCout(arrObjProduct, 'sum');		//Подсчет общ. суммы и количества карточек в корзине и заполнение ячеек результирующей инфы для корзины

		console.log(arrObjProduct);
	}
	else {												//Если объект с данным ID уже лежит в корзине
		addBucketsByID(object);

		finalPriceAndCout(arrObjProduct, 'sum');		//Подсчет общ. суммы и количества карточек в корзине и заполнение ячеек результирующей инфы для корзины
	}
}

/**
 * Преобразование цены товара (Удаление знака $)
 * @param {*} price innerHTML выбранного товара ($52.00) 
 * @returns Возвращение числового значения
 */
function converArrPrice(price) {
	let price_conver
	price_conver = price.split('');				//Разделение строки на элементы массива
	delete price_conver[0];						//Удаление '$' первый символ перед ценой 
	return Number(price_conver.join(''));		//Собираем массив возвращаем функции
}

/**
 * Создание объекта и заполнение конструктора Product объектами с страницы
 * @param {*} event текущие событие "клика" по товару
 */
function select_product(event) {
	let objProduct = new Product;				//Создать объект по типу конструктора Product

	objProduct.info = event.currentTarget.querySelector('.cash_item_info_top').innerHTML;						//Запись информации о карточке товара на странице
	objProduct.price = converArrPrice(event.currentTarget.querySelector('.Cash_item_info_bottom').innerHTML);	//Запись цены товара на странице
	objProduct.img = event.currentTarget.querySelector('.Fetured_img').getAttribute('src');						//Запись ссылки картинки товара на странице
	objProduct.id = event.currentTarget.getAttribute('id');														//Запись ID карточки товара

	addBuckets(objProduct);
}

/**
 * Удаление последней карточки товара (в корзине 1 карточка товара)
 * @param {*} ID ID объекта по которому был совершен клик (Кнопка удаления карточки)
 */
function selectDeletLastItem(ID) {
	struct_card_add_by_Id.forEach(item => {						//Перебрать все карточки лежащие в корзине
		if (item.id == `${ID}` &&								//Сравнить ID карточки товара в корзине с полученным значением в функции
			struct_card_add.style.display == 'block') {			//Проверить осталась ли последняя карточка в корзине

			finalPriceAndCout(arrObjProduct[ID], 'deduction');
			delete arrObjProduct[ID];							//Удалить объект с указанным ID 

			struct_card_add = document.querySelector('.add_card_buckets');	//Уточнить объект который остался в корзине 

			clear_buckets.style.display = 'block';			 //Отобразить текст 'Корзина пуста'	
			struct_card_add.style.display = 'none';		 	 //Скрыть форму каточки корзины
			icon_buckets.style.display = 'none';			 //Скрыть иконку кол-ва товаров в корзине
		}
	});
}


/**
 * Функция удаления карточки товара из корзины (больше 1 карточки товара)
 * @param {*} event_del событие вызванное нажатием кнопки удаления из корзины
 */
function deleteItemBuckets(event_del) {
	let item_del = event_del.currentTarget.parentElement;	// Получение родительсского элемента li в котором указан ID для удаления
	for (let i = 0; i < 2; i++) {
		item_del = item_del.parentElement;			// Получение родительсского элемента li в котором указан ID для удаления
	}
	let id = item_del.getAttribute('id');			//Сохранение ID объекта удаления

	if (struct_card_add_by_Id.length == '1') {		//Если в корзине последняя карточка
		selectDeletLastItem(id);
	}
	else if (struct_card_add_by_Id.length > 1) {	//Если в корзине больше 1 карточки
		struct_card_add_by_Id.forEach(item => {		//Перебрать все карточки лежащие в корзине
			if (item.id == `${id}`) {				//Сравнить ID карточки товара в корзине	
				finalPriceAndCout(arrObjProduct[id], 'deduction');
				delete arrObjProduct[id];			//Удалить объект с указанным ID 

				item.parentNode.removeChild(item);	//Удалить форму каточки корзины
				struct_card_add_by_Id = document.querySelectorAll('.add_card_buckets'); //Уточнить объекты которые остались в корзине
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
		event_cl.preventDefault();				//???
		struct_card_add_by_Id = document.querySelectorAll('.add_card_buckets'); //Не помню зачем может забыл удалить
	});
}
//Честно не знаю зачем, и правильно ли использовать preventDefault(). Я так понимаю, что на событие клика влияет отправка формы?

/**
 * Объявление кнопки и события удаления карточки товара из корзины 
 * @param {*} item объект кнопки удаления катрочки товара
 */
function eventDeleteItem(item) {
	item.addEventListener('click', event => {
		deleteItemBuckets(event);
		event.preventDefault();						//????
	});
}
/**
 * Объявление карточки товара для добавления в карзину
 */
function addDeleteList() {
	delete_item = document.querySelectorAll('.delete_item_buckets');

	delete_item.forEach(item => {
		eventDeleteItem(item);
	});
}


product.forEach(item => {
	item.setAttribute('id', `${i++}`);				//Случайная простановка ID товара на странице
	eventClickItem(item);
});
