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
		this.articleFigure.classList.add('col-4', 'articles_img-box');
		this.formatArticle.classList.add('col-5');
		this.articlePrice.classList.add('col-2', 'articles_price');
		this.listElt.classList.add('row', 'no-gutters', 'articles_deco', 'articles_deco-effect');

		this.articleFigure.appendChild(this.articleImg);
		this.formatArticle.appendChild(this.articleName);
		this.formatArticle.appendChild(this.articleDescription);
		this.listElt.appendChild(this.articleFigure)
		this.listElt.appendChild(this.formatArticle);
		this.listElt.appendChild(this.articlePrice);
		this.productLink.appendChild(this.listElt);


		const articleList = document.getElementById('article-list');
		articleList.appendChild(this.productLink);
    }
}

async function loadArticles() {
	if (articles = await handleFetch('http://localhost:3000/api/teddies'))
		for (article of articles)
			new articleHTMLElt().configElement(article.imageUrl, article.name, article.description, article.price, article._id);
}

loadArticles();