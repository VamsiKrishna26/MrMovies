import React from 'react';
import './TableData.styles.scss';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import {Table,TableContainer,Paper,TableRow,TableCell,TableBody,TableHead} from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body:{
        color:'white'
    }
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(even)': {
            backgroundColor: '#686868',
          },
      '&:nth-of-type(odd)': {
        backgroundColor: '	#505050',
      },
    },
  }))(TableRow);

  const useStyles = makeStyles({
    table:{
        width:'100%'
    }
    
  });

const TableData=(props)=>{
    const {movies,imdb,history}=props;
    const classes = useStyles();
    let rank=1
    return(
        <div className='table-display'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='movies col-md-12'>
                    <TableContainer component={Paper}>
                        <Table className={`${classes.table} table-data`} aria-label="simple table">
                        {
                            window.innerWidth>768?
                            <colgroup>
                                <col style={{width:'10%'}}/>
                                <col style={{width:'20%'}}/>
                                <col style={{width:'30%'}}/>
                                <col style={{width:'20%'}}/>
                                <col style={{width:'20%'}}/>
                            </colgroup>:
                        <colgroup>
                            <col style={{width:'18%'}}/>
                            <col style={{width:'48%'}}/>
                            <col style={{width:'17%'}}/>
                            <col style={{width:'17%'}}/>
                        </colgroup>
                        }
                        <TableHead>
                        <TableRow>
                            {
                                window.innerWidth>768?
                                <StyledTableCell><h6><b>Rank</b></h6></StyledTableCell>:
                                null
                            }
                            <StyledTableCell className='table-display-cell'><h6><b>Poster</b></h6></StyledTableCell>
                            <StyledTableCell className='table-display-cell'><h6><b>Title</b></h6></StyledTableCell>
                            <StyledTableCell align="right" className='table-display-cell'><h6><b>Year</b></h6></StyledTableCell>
                            <StyledTableCell align="right" className='table-display-cell'><h6><b>Rating</b></h6></StyledTableCell>
                        </TableRow>
                        </TableHead>
                            <TableBody >
                            {movies.map((movie) => (
                                <StyledTableRow key={movie._id} 
                                onClick={()=>{history.push(`/movies/getMovieWithId/${movie._id}`)}} className="title" >
                                    {
                                        window.innerWidth>768?
                                        <StyledTableCell align="left"><b>{rank++}</b></StyledTableCell>:
                                        null
                                    }
                                    <StyledTableCell className='table-display-cell' component="th" scope="row">
                                        <img className='poster' src={movie.poster_path} alt="Coming soon"/>
                                    </StyledTableCell>
                                    <StyledTableCell align="left" className='table-display-cell'><b>{movie.title}</b></StyledTableCell>
                                    <StyledTableCell align="right" className='table-display-cell'>{movie.release_date.split('-')[0]}</StyledTableCell>
                                    <StyledTableCell align="right" className='table-display-cell'>
                                        {
                                            imdb?
                                            <div>{movie.weighted_average_vote}</div>:
                                            <div></div>
                                        }
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TableData;