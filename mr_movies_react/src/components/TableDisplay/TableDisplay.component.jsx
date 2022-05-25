import React from 'react';
import TableData from './TableData.component';
import './TableDisplay.styles.scss';


const TableDisplay=(props)=>{
    const {topMovies}=props;
    const imdbMovies=topMovies['imdb'];
    console.log(topMovies);
    return(
        <div className='top-movies'>
            <div className='fluid-container'>
                <div className='row'>
                    <div className='imdb-movies col-md-12'>
                        <h4 className='top-movies-heading'><b>Top Rated Movies on IMDB</b></h4>
                        <TableData movies={imdbMovies} imdb {...props}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TableDisplay;