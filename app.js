class articleHTMLElt {
	constructor() {
		this.productLink = document.createElement('a');
		this.listElt = document.createElement('li');
		this.articleFigure = document.createElement('figure');
		this.articleImg = document.createElement('img');
		this.articleName = document.createElement('h2');
		this.articleDescription = document.createElement('p');
		this.articlePrice = document.createElement('p');
		this.formatArticle = document.createElement('article');
	}

	configElement(imageUrl, name, description, price, id) {
		this.productLink.href = 'produit.html?' + id;
		this.articleImg.src = imageUrl;
		this.articleName.innerHTML = name;
		this.articleDescription.innerHTML = description;
		this.articlePrice.innerHTML = (price / 100.00).toFixed(2) + ' &#8364';
		this.articleImg.classList.add('articles_img');
		this.articleFigure.classList.add('col-3');
		this.formatArticle.classList.add('col-7');
		this.articlePrice.classList.add('col-2', 'articles_price');
		this.articleFigure.appendChild(this.articleImg);
		this.formatArticle.appendChild(this.articleName);
		this.formatArticle.appendChild(this.articleDescription);
		this.listElt.appendChild(this.articleFigure)
		this.listElt.appendChild(this.formatArticle);
		this.listElt.appendChild(this.articlePrice);
		this.listElt.classList.add('row', 'no-gutters', 'articles_deco');

		const articleList = document.getElementById('article-list');
		articleList.appendChild(this.productLink);
		this.productLink.appendChild(this.listElt);
    }
}

let loadArticles = (object) => {
	for (article of object)
		new articleHTMLElt().configElement(article.imageUrl, article.name, article.description, article.price, article._id);
}

async function getUserAsync() {
	try {
		let response = await fetch('http://localhost:3000/api/teddies');
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
	let data = await getUserAsync();
	if (data != null)
		loadArticles(data);
}

run();