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

	addItemToCart(id, customisation) {
		let orderList = [];
		if ((data = localStorage.getItem('order')) != null)
			orderList = JSON.parse(data);
		orderList.push({ 'id': id, 'customisation': customisation });
		localStorage.setItem('order', JSON.stringify(orderList));
	}

	handleFormEvent(form, id) {
		form.addEventListener('submit', function (e) {
			e.preventDefault();
			customisation = form.custom.options[form.custom.selectedIndex].text;
			this.addItemToCart(id, customisation);
		});
	}

	configForm(colors) {
		this.formButton.id = 'form-button';
		this.formButton.value = 'Ajouter au panier';
		this.formButton.type = 'submit';
		this.formMenu.name = 'custom';
		for (this.color of colors) {
			const formOption = document.createElement('option');
			formOption.value = this.color;
			formOption.innerHTML = this.color;
			this.formMenu.appendChild(formOption);
		}
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
		this.listElt.classList.add('row', 'no-gutters', 'articles_deco');

		this.articleFigure.appendChild(this.articleImg);
		this.formatArticle.appendChild(this.articleName);
		this.formatArticle.appendChild(this.articleDescription);
		this.listElt.appendChild(this.articleFigure)
		this.listElt.appendChild(this.formatArticle);
		this.formatAside.appendChild(this.articlePrice);
		this.formatAside.appendChild(this.form);
		this.listElt.appendChild(this.formatAside);
		this.form.appendChild(this.formMenu);
		this.form.appendChild(this.formButton);

		this.configForm(colors);
		this.handleFormEvent(this.form, id);

		const articleList = document.getElementById('article-list');
		articleList.appendChild(this.listElt);
	}
}

async function loadArticles() {
	let url = window.location.href.split('?');
	if ((article = await handleFetch('http://localhost:3000/api/teddies/' + url[1])))
		new articleHTMLElt().configElement(article.imageUrl, article.name, article.description, article.price, article.colors, article._id);
}

loadArticles();