import React from 'react';
import './Year.styles.scss';
import { Button } from 'react-bootstrap';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectMoviesByYear, selectMoviesByYearFetching, selectMoviesByYearLoaded } from '../../redux/titles/titles.selector';
import { fetchMoviesByYearAsync } from '../../redux/titles/titles.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import TitleCards from '../../components/TitleCard/TitleCards.component';

const TitleCardsWithSpinner=WithSpinner(TitleCards)
class Year extends React.Component{

    constructor(props){
        super(props);
        this.state={
            year:2017
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0);
        const {fetchMoviesByYearAsync}=this.props;
        fetchMoviesByYearAsync(2017);
    }

    buttonsByYear(){
        let years=[];
        for (let i=1990;i<=2017;i++){
            years.push(<Button 
                onClick={()=>{
                this.setState({year:i},
                    this.fetchMoviesByYear(i))}} 
                    className={this.state.year===i?"year-button active":"year-button"} 
                    key={i} variant="outline-secondary">
                        <p className='button-year'>
                        <b>{i}</b>
                        </p>
                    </Button>)
        }
        return years;
    }


    fetchMoviesByYear(value){
        const {fetchMoviesByYearAsync}=this.props;
        fetchMoviesByYearAsync(value);
    }

    render(){
        const {moviesByYear,isMoviesByYearFetching}=this.props;
        return(
            <div className='year'>
                <h1 className='year-title'><b>Get Movies by Year</b></h1>
                {this.buttonsByYear()}
                <TitleCardsWithSpinner titles={moviesByYear} isLoading={isMoviesByYearFetching} {...this.props}/>
            </div>
        )
    }
}

const mapStateToProps=createStructuredSelector({
    moviesByYear:selectMoviesByYear,
    isMoviesByYearFetching:selectMoviesByYearFetching,
    isMoviesByYearLoaded:selectMoviesByYearLoaded
})

const mapDispatchToProps=dispatch=>({
    fetchMoviesByYearAsync:(year)=>dispatch(fetchMoviesByYearAsync(year))
})

export default connect(mapStateToProps,mapDispatchToProps)(Year);