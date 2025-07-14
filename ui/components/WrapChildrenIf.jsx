

// wraps children if condition is true
// wrapper is a function that takes children and returns jsx with the children wrapped however you want
export default function WrapChildrenIf({ condition, wrapper, children }) {
    return condition? wrapper(children) : children;
}
