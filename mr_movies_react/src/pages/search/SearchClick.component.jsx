import React from 'react';
import { fetchSearchAsync } from '../../redux/titles/titles.actions';
import './SearchClick.styles.scss';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectSearchMovies, selectSearchMoviesFetching, selectSearchMoviesLoaded } from '../../redux/titles/titles.selector';
import TitleCards from '../../components/TitleCard/TitleCards.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
const TitleCardsWithSpinner=WithSpinner(TitleCards);

class SearchClickPage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            search_value:null
        }
    }

    componentDidMount(){
        window.scroll(0,0);
        const {fetchSearchAsync}=this.props;
        this.setState({search_value:this.props.match.params.value},
            ()=>fetchSearchAsync(this.state.search_value));
    }

    componentDidUpdate(){
        const {fetchSearchAsync}=this.props;
        window.scroll(0,0);
        if(this.state.search_value!==this.props.match.params.value){
            this.setState({search_value:this.props.match.params.value},
                ()=>fetchSearchAsync(this.state.search_value));
        }
    }

    render(){
        const {searchMovies,isSearchMoviesLoaded,isSearchMoviesFetching}=this.props;
        return(
            <div className='search-page'>
            <h1 className='search-page-heading'><b>{this.state.search_value}</b></h1>
            <TitleCardsWithSpinner isLoading={(!isSearchMoviesLoaded||isSearchMoviesFetching)} titles={searchMovies} {...this.props}/>
            </div>
        )
    }
}

const mapStateToProps=createStructuredSelector({
    searchMovies:selectSearchMovies,
    isSearchMoviesFetching:selectSearchMoviesFetching,
    isSearchMoviesLoaded:selectSearchMoviesLoaded
})

const mapDispatchToProps=dispatch=>({
    fetchSearchAsync:(value)=>dispatch(fetchSearchAsync(value))
})

export default connect(mapStateToProps,mapDispatchToProps)(SearchClickPage);