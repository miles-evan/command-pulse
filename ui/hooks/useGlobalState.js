const globalState = {
	reset() {
		for(const key in this) {
			if(!["params", "context", "companyName"].includes(key))
				delete this[key];
		}
		this.params = {};
		this.context = {};
		this.companyName = "Loading...";
	}
}

globalState.reset();

export function useGlobalState() {
	return globalState;
}
