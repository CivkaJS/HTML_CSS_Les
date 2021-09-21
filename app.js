'use strict'

let arr_product = document.querySelector('.add_buckets');
let product = document.querySelectorAll('.Link_cash_items');
let struct_card_add = document.querySelector('.add_card_buckets');

function Product(name, info, price, img) {
	this.info = info;
	this.price = price;
	this.img = img;
}

function addBuckets(item) {
	console.log(struct_card_add);

	struct_card_add = struct_card_add.cloneNode(true);
	arr_product.insertAdjacentElement('beforeend', struct_card_add);
}

function select_product(event) {
	let objProduct = new Product;

	objProduct.info = event.currentTarget.querySelector('.cash_item_info_top').innerHTML;
	objProduct.price = event.currentTarget.querySelector('.Cash_item_info_bottom').innerHTML;
	objProduct.img = event.currentTarget.querySelector('.Fetured_img').getAttribute('src');
	console.log(objProduct);

	addBuckets(objProduct);
}

function eventClickItem(event) {
	event.addEventListener('click', event_cl => {
		select_product(event_cl);
		event_cl.preventDefault();
	});
}
//Честно не знаю зачем, и правильно ли использовать preventDefault(). Я так понимаю, что на событие клика влияет отправка формы?

product.forEach(item => {
	eventClickItem(item);
});

// product[0].addEventListener('click', event_item => {
// 	select_product(event_item);
// });
