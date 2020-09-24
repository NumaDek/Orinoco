class Contact {
	constructor(lastName, firstName, address, city, email) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.address = address;
		this.city = city;
		this.email = email;
	}
}

class articleHTMLElt {
	constructor() {
		this.listElt = document.createElement('li');
		this.articleFigure = document.createElement('figure');
		this.articleImg = document.createElement('img');
		this.articleName = document.createElement('h2');
		this.articlePrice = document.createElement('p');
		this.articleCustom = document.createElement('p');
		this.formatArticle = document.createElement('article');
	}

	configElement(imageUrl, name, description, price, id, custimisation) {
		this.articleImg.src = imageUrl;
		this.articleName.innerHTML = name;
		this.articlePrice.innerHTML = price + ' &#8364';
		this.articleCustom.innerHTML = custimisation;
		this.articleCustom.classList.add('col-1', 'articles_price')
		this.articleImg.classList.add('articles_img');
		this.articleFigure.classList.add('col-3');
		this.formatArticle.classList.add('col-2');
		this.articlePrice.classList.add('col-1', 'articles_price');
		this.articleFigure.appendChild(this.articleImg);
		this.formatArticle.appendChild(this.articleName);
		this.listElt.appendChild(this.articleFigure)
		this.listElt.appendChild(this.formatArticle);
		this.listElt.appendChild(this.articlePrice);
		this.listElt.appendChild(this.articleCustom);
		this.listElt.classList.add('row', 'no-gutters', 'articles_deco');
		const articleList = document.getElementById('article-list');
		articleList.appendChild(this.listElt);
	}
}

async function handleFetch(payload) {
	let url = 'http://localhost:3000/api/teddies/order';
	let options = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: payload
	}
	response = await fetch(url, options);
	return (response);
}

function handleForm(products) {
	const form = document.getElementById('command');

	form.addEventListener('submit', async function (e) {
		e.preventDefault();
		let contact = new Contact(form.prenom.value, form.nom.value, form.adresse.value, form.city.value, form.mail.value);
		let order = JSON.stringify({ contact, products });
		console.log(order);
		const response = await handleFetch(order);
		const data = response.json();

		console.log(response);
	});
}

function loadTotal(total) {
	const priceBox = document.getElementById('total-price');
	priceBox.innerHTML = total + '&#8364';
}

let total = 0;
let loadArticles = (article, customisation) => {
	new articleHTMLElt().configElement(article.imageUrl, article.name, article.description, article.price, article._id, customisation);
	total += article.price;
	loadTotal(total);
}

async function getUserAsync(id) {
	let response = await fetch('http://localhost:3000/api/teddies/' + id);
	return data = response.json();
}

async function loadCart() {
	let orderList = [];
	let total = 0;
	if ((data = localStorage.getItem('order')) != null) {
		orderList = JSON.parse(data);
	}
	let dataList = [];
	for (order of orderList) {
		let data = await getUserAsync(order.id);
		loadArticles(data, order.customisation);
		dataList.push(data._id);
	}
	//handleForm(orderList);
	handleForm(dataList);
}

loadCart();