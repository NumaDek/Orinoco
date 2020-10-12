/* Generated HTML element from API info */
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
		this.listElt.classList.add('row', 'no-gutters', 'articles_deco');

		this.articleFigure.appendChild(this.articleImg);
		this.formatArticle.appendChild(this.articleName);
		this.listElt.appendChild(this.articleFigure)
		this.listElt.appendChild(this.formatArticle);
		this.listElt.appendChild(this.articleCustom);
		this.listElt.appendChild(this.articlePrice);

		const articleList = document.getElementById('article-list');
		articleList.appendChild(this.listElt);
	}
}

/* displays order confirmation text */
function handleConfirmation(data, total) {
	const title = document.getElementById('title');
	const cart = document.getElementById('cart');
	const confirmation = document.getElementById('confirmation');

	title.innerHTML = 'Confirmation de votre commande :';
	cart.innerHTML = '';
	confirmation.innerHTML = '</br><p>Nous vous remercions pour votre commande ! Au plaisir de vous retrouver bientot !</p><p>prix total de la commande : ' + (total / 100.00).toFixed(2) + '&#8364</p><p>Adresse de livraison :</br>' + data.contact.lastName + ' ' + data.contact.firstName + '</br>' + data.contact.address + '</br>' + data.contact.city + '</p><p>Identifiant de commande : ' + data.orderId + '</p>';
	if ((data = localStorage.getItem('order')))
		localStorage.removeItem('order');
}

/* Ordering form handling. */ 
function handleCartForm(products, total) {
	const form = document.getElementById('command');
	form.addEventListener('submit', async function (e) {
		e.preventDefault();
		let contact = { 'firstName': form.prenom.value, 'lastName': form.nom.value, 'address': form.adresse.value, 'city': form.city.value, 'email': form.mail.value };
		let order = JSON.stringify({ contact, products });
		const response = await handlePostFetch(order);
		const data = await response.json();
		handleConfirmation(data);
	});
}

/* Loads order info from local storage, requests info from API and integrating it. */
async function loadCart() {
	if (data = localStorage.getItem('order')) {
		let orderList = JSON.parse(data);
		let idList = [];
		let total = 0;
		for (order of orderList) {
			if (!(article = await handleFetch('http://localhost:3000/api/teddies/' + order.id)))
				return (null);
			new articleHTMLElt().configElement(article.imageUrl, article.name, article.description, article.price, article._id, order.customisation);
			total += article.price;
			idList.push(article._id);
		}
		const priceBox = document.getElementById('total-price');
		priceBox.innerHTML = (total / 100.00).toFixed(2) + '&#8364';
		handleCartForm(idList, total);
	}
	else {
		empty.classList.remove('display');
		cart.parentNode.removeChild(cart);
    }
}

loadCart();