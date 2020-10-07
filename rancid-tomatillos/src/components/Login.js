import React from 'react'

function Login(props) {
    console.log(props)
    let pCards
    if (props.movies) {
        pCards = props.movies.map((movie) => <PreviewCard movie={movie} />);
    }
    return <div className="container">{pCards}</div>;
}

export default Login;

