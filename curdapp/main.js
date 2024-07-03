import './style.css';

import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

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
};

const saveDataBtn = document.querySelector('#save');

saveDataBtn.addEventListener('click', saveData);
