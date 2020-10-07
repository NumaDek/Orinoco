async function handlePostFetch(payload) {
	let url = 'http://localhost:3000/api/teddies/order';
	let options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: payload };
	response = await fetch(url, options);
	return (response);
}

async function handleFetch(url) {
	try {
		let response = await fetch(url);
		return response.json();
	}
	catch {
		error.classList.remove('display');
		return null;
	}
}