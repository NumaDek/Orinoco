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
		this.articleFigure.appendChild(this.articleImg);
		this.formatArticle.appendChild(this.articleName);
		this.formatArticle.appendChild(this.articleDescription);
		this.listElt.appendChild(this.articleFigure)
		this.listElt.appendChild(this.formatArticle);
		this.listElt.appendChild(this.articlePrice);
		this.listElt.classList.add('row', 'no-gutters', 'articles_deco', 'articles_deco-effect');

		const articleList = document.getElementById('article-list');
		articleList.appendChild(this.productLink);
		this.productLink.appendChild(this.listElt);
	}
}


function contentBuilder {
	

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