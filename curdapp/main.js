import './style.css';

import { initializeApp } from 'firebase/app';
import { getDatabase, set, ref, get, remove } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyDarWHUzlTBfaWoy0j18S0waQUOZpkuflE',
	authDomain: 'crudapp-91890.firebaseapp.com',
	projectId: 'crudapp-91890',
	storageBucket: 'crudapp-91890.appspot.com',
	messagingSenderId: '302876566729',
	appId: '1:302876566729:web:9b20277cd3aee7e5d2d918',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const notify = document.querySelector('.notify');

const saveData = () => {
	const name = document.querySelector('#name').value;
	const email = document.querySelector('#email').value;

	if (!name || !email) {
		notify.innerText = 'Plz fill form';
		return;
	}

	const userId = Date.now();

	set(ref(db, 'users/' + userId), {
		name: name,
		email: email,
	})
		.then(() => {
			notify.innerText = 'Data saved';
			document.querySelector('#name').value = '';
			document.querySelector('#email').value = '';
		})
		.catch((error) => {
			notify.innerText = `Error: ${error.message}`;
		});
};

const saveDataBtn = document.querySelector('#save');
saveDataBtn.addEventListener('click', saveData);

/* 
  get data 
*/

const getData = () => {
	const userRef = ref(db, 'users/');
	get(userRef).then((snapshot) => {
		const data = snapshot.val();
		const table = document.querySelector('table');
		let html = '';
		if (data) {
			Object.keys(data).forEach((key) => {
				const { name, email } = data[key];

				html += `
				 <tr>
					<td>${name}</td>
					<td>${email}</td>
					<td> <button onclick="editUser('${key}')">Edit</button> </td>
					<td> <button class='del' onclick="deleteUser('${key}')">Delete</button> </td>
				 </tr>
				 `;
			});
		} else {
			html = '<tr><td colspan="4">No data available</td></tr>';
		}

		table.innerHTML = html;
	});
};

const editUser = (key) => {
	const userRef = ref(db, `users/${key}`);
	get(userRef).then((item) => {
		const name = item.val().name;
		const email = item.val().email;

		document.querySelector('#name').value = name;
		document.querySelector('#email').value = email;
		document.querySelector('.update_btn').classList.add('show');
		document.querySelector('.save_btn').classList.add('hide');

		const updateForm = () => {
			const name = document.querySelector('#name').value;
			const email = document.querySelector('#email').value;

			if (name && email) {
				set(userRef, {
					name: name,
					email: email,
				}).then(() => {
					notify.innerText = 'Data updated';
					getData();

					document.querySelector('.update_btn').classList.remove('show');
					document.querySelector('.save_btn').classList.remove('hide');

					// Clear inputs
					document.querySelector('#name').value = '';
					document.querySelector('#email').value = '';
				});
			} else {
				notify.innerText = 'Plz add data';
			}
		};

		const updateFormBtn = document.querySelector('#update_form');
		updateFormBtn.removeEventListener('click', updateForm);
		updateFormBtn.addEventListener('click', updateForm);
	});
};

const deleteUser = (key) => {
	const userRef = ref(db, `users/${key}`);
	remove(userRef).then(() => {
		notify.innerText = 'Data deleted!';
		getData();
	});
};

// Load data initially
getData();

/*
Get data end
*/

window.deleteUser = deleteUser;
window.editUser = editUser;
