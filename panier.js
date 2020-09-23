class Contact {
	constructor(surname, name, adress, city, mail) {
		this.surname = surname;
		this.name = name;
		this.adress = adress;
		this.city = city;
		this.mail = mail;
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


function handleForm(orderList) {
	const form = document.getElementById('commande');

	form.addEventListener('submit', async function (e) {
		e.preventDefault();
		let contact = new Contact(form.prenom.value, form.nom.value, form.adresse.value, form.city.value, form.mail.value);
		//let order = JSON.stringify(contact) + JSON.stringify(orderList);
		let order = JSON.stringify({ contact, orderList });
		console.log(order);
		const response = await fetch('http://localhost:3000/api/teddies/order', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: order });
		if (response.status === 400) {
			console.log('Salut');
        }
		const data = await response.json();

		console.log(response);
		console.log(data.json);
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
		dataList.push(data);
	}
	//handleForm(orderList);
	handleForm(dataList);
}

loadCart();