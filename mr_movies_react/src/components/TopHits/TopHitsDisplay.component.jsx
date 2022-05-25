import React from 'react';
import { Table } from 'react-bootstrap';
import './TopHitsDisplay.styles.scss';

const TopHitsDisplay=(props)=>{
    const {topHits,history}=props;
    let movies=[];
    Object.keys(topHits['movies']).map((id)=>movies.push(topHits['movies'][id]));
    return(
        <div className='top-hits-display'>
            <Table striped bordered hover responsive variant='dark'>
                <thead>
                    <tr className='title-head'>
                        <th>#</th>
                        <th>Title</th>
                        <th>Year</th>
                        <th>Hits</th>
                    </tr>
                </thead>
                <tbody>
                    {
                       movies.slice(0,15).map((movie,index)=>
                            (
                                <tr className='title-per-row' key={movie._id} onClick={()=>{history.push(`movies/getMovieWithId/${movie._id}`)}}>
                                
                                        <td className='title-table-details'>{index+1}</td>
                                        <td className='title-table-details'>{movie.title}</td>
                                        <td className='title-table-details'>{movie.release_date.split('-')[0]}</td>
                                        <td className='title-table-details'>{movie.hits}</td>
                                    
                                </tr>
                                
                            )
                        )
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default TopHitsDisplay;