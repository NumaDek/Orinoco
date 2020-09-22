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

let loadArticles = (article, customisation) => {
		new articleHTMLElt().configElement(article.imageUrl, article.name, article.description, article.price, article._id, customisation);
}

async function getUserAsync(id) {
	let response = await fetch('http://localhost:3000/api/teddies/' + id);
	let data = await response.json();
	return data;
}

async function loadCart() {
	let orderList = [];
	if ((data = localStorage.getItem('order')) != null) {
		orderList = JSON.parse(data);
	}
	for (order of orderList) {
		await getUserAsync(order.id).then(data => loadArticles(data, order.customisation));
	}
}

loadCart();