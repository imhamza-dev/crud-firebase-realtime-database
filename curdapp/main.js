import './style.css';

import { initializeApp } from 'firebase/app';
import { getDatabase, set, ref } from 'firebase/database';

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
	}

	const userId = Date.now();

	set(ref(db, 'users/' + userId), {
		name: name,
		email: email,
	});

	notify.innerText = 'data saved';
	documnet.querySelector('#name').value = '';
	documnet.querySelector('#email').value = '';
};

const saveDataBtn = document.querySelector('#save');

saveDataBtn.addEventListener('click', saveData);

/* 
  get data 

	*/
