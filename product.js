class Contact {
	constructor(surname, name, adress, city, mail) {
		this.surname = surname;
		this.name = name;
		this.adress = adress;
		this.city = city;
		this.mail = mail;
    }
}

class Order {
	constructor(id, customisation) {
		this.id = id;
		this.customisation = customisation;
    }
}

class articleHTMLElt {
	constructor() {
		this.listElt = document.createElement('li');
		this.articleFigure = document.createElement('figure');
		this.articleImg = document.createElement('img');
		this.articleName = document.createElement('h2');
		this.articleDescription = document.createElement('p');
		this.articlePrice = document.createElement('p');
		this.formatArticle = document.createElement('article');
		this.formatDiv = document.createElement('div');
		this.formatAside = document.createElement('aside');

		this.form = document.createElement('form');
		this.formMenu = document.createElement('select');
		this.formButton = document.createElement('input');
	}

	configElement(imageUrl, name, description, price, colors, id) {
		this.articleImg.src = imageUrl;
		this.articleName.innerHTML = name;
		this.articleDescription.innerHTML = description;
		this.articlePrice.innerHTML = (price / 100.00).toFixed(2) + ' &#8364';
		this.articleImg.classList.add('articles_img');
		this.articleFigure.classList.add('col-4', 'articles_img-box');
		this.formatArticle.classList.add('col-5');
		this.articlePrice.classList.add('articles_price');
		this.articleFigure.appendChild(this.articleImg);
		this.formatArticle.appendChild(this.articleName);
		this.formatArticle.appendChild(this.articleDescription);
		this.listElt.appendChild(this.articleFigure)
		this.listElt.appendChild(this.formatArticle);

		this.formatAside.appendChild(this.articlePrice);
		this.formatAside.appendChild(this.form);
		this.listElt.appendChild(this.formatAside);
		this.listElt.classList.add('row', 'no-gutters', 'articles_deco');
		this.formButton.id = 'form-button';
		this.formButton.value = 'Ajouter au panier';
		this.formButton.type = 'submit';
		this.formMenu.name = 'custom';
		if (colors) {
			for (this.color of colors) {
				const formOption = document.createElement('option');
				formOption.value = this.color;
				formOption.innerHTML = this.color;
				this.formMenu.appendChild(formOption);
			}
		}
		else
			console.log('Problème de serveur');
		this.form.appendChild(this.formMenu);
		this.form.appendChild(this.formButton);
		const articleList = document.getElementById('article-list');
		articleList.appendChild(this.listElt);

		handleForm(this.form, id);
	}
}

function addItemToCart(id, customisation) {
	let orderList = [];
	if ((data = localStorage.getItem('order')) != null) {
		orderList = JSON.parse(data);
    }
	order = new Order(id, customisation);
	orderList.push(order);
	localStorage.setItem('order', JSON.stringify(orderList));
}

function delItemFromCart(id, customisation) {
	if ((data = localStorage.getItem('order')) != null)
		orderList = JSON.parse(data);
	for (let i in orderList) {
		if (orderList[i] != null && orderList[i].id == id && orderList[i].customisation == customisation) {
			orderList.splice(i, 1);
			localStorage.setItem('order', JSON.stringify(orderList));
			break;
		}
	}
}

function handleForm(form, id) {
	form.addEventListener('submit', function (e) {
		e.preventDefault();
		customisation = form.custom.options[form.custom.selectedIndex].text;
		console.log(customisation);
		addItemToCart(id, customisation);
	
	});
}

let loadArticle = (article) => {
	new articleHTMLElt().configElement(article.imageUrl, article.name, article.description, article.price, article.colors, article._id);
}

async function getUserAsync() {
	let url = window.location.href.split('?');
	try {
		let response = await fetch('http://localhost:3000/api/teddies/' + url[1]);
		let data = await response.json();
		return data;
	}
	catch {
		// Le serveur est injoignable, signaler une erreur.
		console.log('Le serveur est injoignable');
		return null;
	}
}

async function run() {
	data = await getUserAsync()
	if (data)
		loadArticle(data);
}

run();