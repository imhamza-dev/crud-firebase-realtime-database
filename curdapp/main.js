import './style.css';

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/database';

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

const notify = documentSelector('.notify');
