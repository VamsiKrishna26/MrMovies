import React from 'react';
import { createStructuredSelector } from 'reselect';
import { selectGenreMovies, selectIsGenreMoviesFetching,selectIsGenreMoviesLoaded } from '../../redux/titles/titles.selector';
import './genre.styles.scss';
import { connect } from 'react-redux';
import TitleCards from '../../components/TitleCard/TitleCards.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import { fetchGenreMoviesAsync } from '../../redux/titles/titles.actions';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowRight } from "react-icons/md";
const TitleCardsWithSpinner=WithSpinner(TitleCards);
class GenrePage extends React.Component{
    
    componentDidMount(){
        window.scrollTo(0, 0);
        const {fetchGenreMoviesAsync}=this.props;
        fetchGenreMoviesAsync();
    }

    render(){
        const {genreMovies,isGenreMoviesFecthing}=this.props;
        return(
            <div className='genre-movies'>
                {
                   Object.keys(genreMovies).map((heading)=>(
                       <div key={heading}>
                           <h2 key={heading}><Link className='heading' to={`/searchPage/${heading}`}>{heading.toUpperCase()} <MdKeyboardArrowRight/></Link></h2>
                           <TitleCardsWithSpinner isLoading={isGenreMoviesFecthing} key={genreMovies[heading].id}
                           titles={genreMovies[heading]} horizantal {...this.props}/>
                       </div>
                   ))
                }
            </div>
        )
    }
}

const mapStateToProps=createStructuredSelector({
    genreMovies:selectGenreMovies,
    isGenreMoviesFecthing:selectIsGenreMoviesFetching,
    isGenreMoviesLoaded:selectIsGenreMoviesLoaded
})

const mapDispatchToProps=dispatch=>({
    fetchGenreMoviesAsync:()=>dispatch(fetchGenreMoviesAsync())
})

export default connect(mapStateToProps,mapDispatchToProps)(GenrePage);