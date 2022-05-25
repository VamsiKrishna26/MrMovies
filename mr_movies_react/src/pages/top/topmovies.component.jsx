import React from 'react';
import './topmovies.styles.scss';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectTopMovies, selectTopMoviesFetching, selectTopMoviesLoaded } from '../../redux/titles/titles.selector';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import TableDisplay from '../../components/TableDisplay/TableDisplay.component';
import { fetchTopMoviesAsync } from '../../redux/titles/titles.actions';
const TableDisplayWithSpinner=WithSpinner(TableDisplay);
class TopMoviesPage extends React.Component{

    componentDidMount(){
        window.scrollTo(0, 0);
        const {fetchTopMoviesAsync}=this.props;
        fetchTopMoviesAsync();
    }

    render(){
        const {topMovies,isTopMoviesfetching,isTopMoviesLoaded}=this.props;
        return(
            <div className='top-movies'>
                <TableDisplayWithSpinner isLoading={(!isTopMoviesLoaded&&isTopMoviesfetching)} topMovies={topMovies} {...this.props}/>
            </div>
        )
    }
}

const mapStateToProps=createStructuredSelector({
    topMovies:selectTopMovies,
    isTopMoviesfetching:selectTopMoviesFetching,
    isTopMoviesLoaded:selectTopMoviesLoaded
})

const mapDispatchToProps=dispatch=>({
    fetchTopMoviesAsync:()=>dispatch(fetchTopMoviesAsync())
})

export default connect(mapStateToProps,mapDispatchToProps)(TopMoviesPage);