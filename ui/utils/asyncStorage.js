import AsyncStorage from "@react-native-async-storage/async-storage";


// makes using asyncStorage easier because it handles objects and try/catch for you


export async function store(key, value) {
	try {
		await AsyncStorage.setItem(key, JSON.stringify(value));
	} catch(e) {
		console.log(e);
	}
}


export async function get(key) {
	try {
		return JSON.parse(await AsyncStorage.getItem(key));
	} catch(e) {
		console.log(e);
	}
}


export async function remove(key) {
	try {
		return await AsyncStorage.removeItem(key);
	} catch(e) {
		console.log(e);
	}
}