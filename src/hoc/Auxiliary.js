/*
* Create a higher order component that we can use in
* another component where there is adjacent JSX to
* save having to wrap everything in an unnecessary div,
* instead wrap it with this HOC.
* */

const aux = (props) => props.children;

export default aux;