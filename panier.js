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
		this.articlePrice.innerHTML = (price / 100.00).toFixed(2) + ' &#8364';
		this.articleCustom.innerHTML = custimisation;
		this.articleImg.classList.add('articles_img', 'articles_img-cart');
		this.articleFigure.classList.add('col-2', 'articles_img-box');
		this.formatArticle.classList.add('col-3');
		this.articlePrice.classList.add('col-4', 'articles_price');
		this.articleCustom.classList.add('col-2', 'articles_price');
		this.articleFigure.appendChild(this.articleImg);
		this.formatArticle.appendChild(this.articleName);
		this.listElt.appendChild(this.articleFigure)
		this.listElt.appendChild(this.formatArticle);
		this.listElt.appendChild(this.articleCustom);
		this.listElt.appendChild(this.articlePrice);
		this.listElt.classList.add('row', 'no-gutters', 'articles_deco');
		const articleList = document.getElementById('article-list');
		articleList.appendChild(this.listElt);
	}
}

function handleConfirmation(data) {
	const title = document.getElementById('title');
	title.innerHTML = 'Confirmation de votre commande :';
	const cart = document.getElementById('cart');
	cart.innerHTML = '';
	const confirmation = document.getElementById('confirmation');
	confirmation.innerHTML = '</br><p>Nous vous remercions pour votre commande ! Au plaisir de vous retrouver bientot !</p><p>prix total de la commande : ' + (total / 100.00).toFixed(2) + '&#8364</p><p>Adresse de livraison :</br>' + data.contact.lastName + ' ' + data.contact.firstName + '</br>' + data.contact.address + '</br>' + data.contact.city + '</p><p>Identifiant de commande : ' + data.orderId + '</p>';
	if ((data = localStorage.getItem('order')) != null)
		localStorage.removeItem('order');
}

async function handleFetch(payload) {
	let url = 'http://localhost:3000/api/teddies/order';
	let options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: payload };
	response = await fetch(url, options);
	return (response);
}

function handleForm(products) {
	const form = document.getElementById('command');
	if (form != null) {
		form.addEventListener('submit', async function (e) {
			e.preventDefault();
			let contact = new Contact(form.prenom.value, form.nom.value, form.adresse.value, form.city.value, form.mail.value);
			let order = JSON.stringify({ contact, products });
			const response = await handleFetch(order);
			const data = await response.json();
			handleConfirmation(data);
			console.log(data);
		});
	}
	else
		console.log('Le panier est vide.');
}

function loadTotal(total) {
	const priceBox = document.getElementById('total-price');
	priceBox.innerHTML = (total / 100.00).toFixed(2) + '&#8364';
}

let total = 0;
let loadArticles = (article, customisation) => {
	new articleHTMLElt().configElement(article.imageUrl, article.name, article.description, article.price, article._id, customisation);
	total += article.price;
	loadTotal(total);
}

async function getUserAsync(id) {
	try {
		let response = await fetch('http://localhost:3000/api/teddies/' + id);
		return data = response.json();
	}
	catch {
		// Le serveur est injoignable, signaler une erreur.
		console.log('Le serveur est injoignable');
		return null;
    }
}

async function loadCart() {
	let orderList = [];
	if ((data = localStorage.getItem('order')) != null) {
		orderList = JSON.parse(data);
		let idList = [];
		for (order of orderList) {
			let data = await getUserAsync(order.id);
			if (!data)
				return (null);
			loadArticles(data, order.customisation);
			idList.push(data._id);
		}
		handleForm(idList);
	}
	else {
		if (empty = document.getElementById('empty')) {
			empty.classList.remove('display');
		}
		if (cart = document.getElementById('cart')) {
			cart.parentNode.removeChild(cart);
		}
		console.log('Le panier est vide.');
    }
}

loadCart();