import React from 'react'

function ShowPage(props) {
    console.log(props)
    let pCards
    if (props.movies) {
        pCards = props.movies.map((movie) => <PreviewCard movie={movie} />);
    }
    return <div className="container">{pCards}</div>;
}

export default ShowPage;
