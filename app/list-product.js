document.addEventListener("DOMContentLoaded", () => {
	const products = [];
	for (let i = 1; i <= 12; i++) {
		products.push({
			image: require(`assets/images/Image${i}.jpg`), // Use require to load the images correctly
			title: `Product ${i}`,
			desc: `Description ${i}`,
			price: `$${i * 10}`,
		});
	}

	const productContainer = document.getElementById("product-container");

	products.forEach((product) => {
		const card = document.createElement("div");
		card.classList.add("col-md-4", "mb-4");
		card.innerHTML = `
            <div class="card" style="max-width: 320px">
                <img src="${product.image}" class="card-img-top" alt="${product.title}">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">${product.desc}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="h5 mb-0">${product.price}</span>
                        <div>
                            <i class="bi bi-star-fill text-warning"></i>
                            <i class="bi bi-star-fill text-warning"></i>
                            <i class="bi bi-star-fill text-warning"></i>
                            <i class="bi bi-star-fill text-warning"></i>
                            <i class="bi bi-star-half text-warning"></i>
                            <small class="text-muted">(4.5)</small>
                        </div>
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-between bg-light">
                    <button class="btn btn-primary btn-sm">Add to Cart</button>
                    <button class="btn btn-outline-secondary btn-sm"><i class="bi bi-heart"></i></button>
                </div>
            </div>
        `;
		productContainer.appendChild(card);
	});
});
