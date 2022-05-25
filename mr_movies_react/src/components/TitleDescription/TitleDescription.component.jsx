import React from 'react';
import { fetchMovieWithIdAsync } from '../../redux/titles/titles.actions';
import './TitleDescription.styles.scss';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectMovieWithId, selectMovieWithIdFetching, selectMovieWithIdLoaded } from '../../redux/titles/titles.selector';
import WithSpinner from '../with-spinner/with-spinner.component';
import TitleDetails from './TitleDetails.component';
const TitleDetailsWithSpinner=WithSpinner(TitleDetails);
class TitleDescription extends React.Component{
    
    componentDidMount(){
        const {fetchMovieWithIdAsync}=this.props;
        fetchMovieWithIdAsync(this.props.match.params.id);
    }

    componentDidUpdate(){
        const {fetchMovieWithIdAsync,movieWithId}=this.props;
        if(movieWithId._id!==this.props.match.params.id){
            fetchMovieWithIdAsync(this.props.match.params.id);
        }
    }

    render(){
        const {movieWithId,isMovieWithIdfetching,isMovieWithIdLoaded}=this.props;
        return(
            <div className='title-description'>
                <TitleDetailsWithSpinner isLoading={isMovieWithIdfetching&&!isMovieWithIdLoaded} movieWithId={movieWithId} {...this.props}/>
            </div>
        )
    }
}

const mapStateToProps=createStructuredSelector({
    movieWithId:selectMovieWithId,
    isMovieWithIdfetching:selectMovieWithIdFetching,
    isMovieWithIdLoaded:selectMovieWithIdLoaded,
})

const mapDispatchToProps=dispatch=>({
    fetchMovieWithIdAsync:(id)=>dispatch(fetchMovieWithIdAsync(id))
})

export default connect(mapStateToProps,mapDispatchToProps)(TitleDescription);
