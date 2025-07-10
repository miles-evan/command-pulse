
export default function ShowIf({ condition, children }) {
	return condition ? children : null;
}