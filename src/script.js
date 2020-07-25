const usersList = document.querySelector('.users');

const users = [];
let currentPage = 1;

async function getUsers(url) {
	const response = await fetch(url);
	const json = await response.json();
	const data = json.data;
	const totalPages = json.total_pages;

	data.forEach(user => users.push(user));

	while(currentPage < totalPages) {
		await getUsers(`https://reqres.in/api/users?page=${++currentPage}`);
	}

	return users;
}

async function listUsers(url) {
	const users = await getUsers(url);

	users.forEach(({avatar, first_name, last_name, email}) => {
		const userInfo = `
			<div class="user">
				<img src="${avatar}">

				<div class="data">
					<h4 class="name">${first_name} ${last_name}</h4>
					<p class="email">${email}</p>
				</div>
			</div>
		`
		
		usersList.innerHTML += userInfo;
	});
}

listUsers('https://reqres.in/api/users');