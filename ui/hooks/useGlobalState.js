const globalState = {
	reset() {
		for(const key in this) if(key !== "reset") delete this[key];
		this.params = {};
		this.context = {};
		this.companyName = "Loading...";
	}
}

globalState.reset();

export function useGlobalState() {
	return globalState;
}
