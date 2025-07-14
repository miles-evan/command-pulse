
// shows children if condition is true
export default function If({ condition, children }) {
	return condition ? children : null;
}