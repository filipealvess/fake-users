const usersList = document.querySelector('.users');

let currentPage = 0;
const users = [];

async function fetchUsers(url) {
	const response = await fetch(url);
	const json = await response.json();
	
	const data = json.data;
	const totalPages = json.total_pages;

	currentPage++;

	data.forEach(user => users.push(user));

	while(currentPage < totalPages) {
		await fetchUsers(`https://reqres.in/api/users?page=${++currentPage}`);
	}

	return users;
}

async function listUsers(url) {
	const users = await fetchUsers(url);

	users.forEach(user => {
		const userInfo = `
			<div class="user">
				<img src="${user.avatar}">

				<div class="data">
					<h4 class="name">${user.first_name} ${user.last_name}</h4>
					<p class="email">${user.email}</p>
				</div>
			</div>
		`
		
		usersList.innerHTML += userInfo;
	});
}

listUsers('https://reqres.in/api/users');