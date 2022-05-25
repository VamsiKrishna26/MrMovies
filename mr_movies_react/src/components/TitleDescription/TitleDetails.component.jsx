import React, { useEffect } from 'react';
import './TitleDetails.styles.scss';
import {Jumbotron} from 'react-bootstrap';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { addTitleToRecentlyViewedAsync, addTitleToWishlistAsync, removeTitleFromWishlistAsync } from '../../redux/user/user.actions';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { selectTitleSuggestions, selectTitleSuggestionsFetching, selectTitleSuggestionsLoaded } from '../../redux/titles/titles.selector';
import { fetchTitleSuggestionsAsync } from '../../redux/titles/titles.actions';
import WithSpinner from '../with-spinner/with-spinner.component';
import TitleCards from '../TitleCard/TitleCards.component';
import { Rating } from '@material-ui/lab';
import ReviewJumbotron from './ReviewJumbotron.component';
import Discussions from './Discussions.component';
const TitleCardsWithSpinner=WithSpinner(TitleCards);
const TitleDetails=(props)=>{
    let PORT='';
    // PORT='http://localhost:1020';
    window.scroll(0,0);
    const {movieWithId,currentUser,addTitleToWishlistAsync,removeTitleFromWishlistAsync,fetchTitleSuggestionsAsync,
    titleSuggestions,isTitleSuggestionsFetching,addTitleToRecentlyViewedAsync}=props;
    const addToWishlist=(titleId)=>{
        addTitleToWishlistAsync(currentUser.id,titleId,currentUser.wishlist);
      }
    
      const removeFromWishlist=(titleId)=>{
        removeTitleFromWishlistAsync(currentUser.id,titleId,currentUser.wishlist)
      }


    useEffect(()=>{
        fetchTitleSuggestionsAsync(movieWithId._id)
    },[movieWithId._id,fetchTitleSuggestionsAsync])

    useEffect(()=>{
        (async function(){
                await axios.post(PORT+'/hits',
                {
                    movie_id:movieWithId._id
                },{
                headers:{
                    'Content-Type': 'application/json'
                }})
            })();
    },[movieWithId._id,PORT])

    useEffect(()=>{
        if(currentUser){
            addTitleToRecentlyViewedAsync(currentUser.id,movieWithId._id,currentUser.recentlyViewed)
        }
    },[movieWithId._id,currentUser,addTitleToRecentlyViewedAsync])

    return(
        <Jumbotron>
        <div className='container-fluid title-description'>
            <div className='row'>
            <div className='col-md-5'>
                    <img className='img' src={movieWithId.poster_path} alt='IMAGE_ALT'/>
            </div>
            <div className='col-md-7 title-details'>
                <h2 className="title_name"><b>{movieWithId.title}</b></h2>
                <h6 className='text_details'>{movieWithId.genres.map((genre,index)=><Link to={`/searchPage/${genre}`} className='text_details underline_text' key={index}>{(index?', ':'')+genre}</Link>)}</h6>
                { currentUser?
                    <div>
                       { 
                      currentUser.wishlist.includes(movieWithId._id)?
                      <Button onClick={()=>{removeFromWishlist(movieWithId._id)}} className="remove-button">Remove from Wishlist</Button>
                     :
                    <Button onClick={()=>{addToWishlist(movieWithId._id)}} className="add-button">Add to WishList</Button>
                    }
                    </div>
                    :
                    <Button disabled className="login">Login to Wishlist</Button>
                  }
                <h6 className='text_details'><b>Plot:</b><br/>{movieWithId.overview}</h6>
                <h6 className='text_details'><b>Actors:</b><br/>{movieWithId.actors.slice(0,15).map((actor,index)=><Link to={`/searchPage/${actor}`} className='text_details underline_text' key={index}>{(index?', ':'')+actor}</Link>)}</h6>
                <h6 className='text_details'><b>Directors:</b><br/>{movieWithId.directors.slice(0,5).map((director,index)=><Link to={`/searchPage/${director}`} className='text_details underline_text' key={index}>{(index?', ':'')+director}</Link>)}</h6>
                {
                    movieWithId.release_date?
                    <h6 className='text_details'><b>Release Date: </b><Moment format="dddd, Do MMMM YYYY">{movieWithId.release_date.toLocaleString()}</Moment></h6>:
                    <div></div>
                }
                <h6 className='text_details'><b>Runtime: </b>{parseInt(movieWithId.runtime)} min</h6>
                <h6 className='text_details'><b>Budget: </b><NumberFormat value={movieWithId.budget} displayType={'text'} thousandSeparator={true} prefix={'$'} /></h6>
                <h6 className='text_details'><b>Revenue: </b><NumberFormat value={movieWithId.revenue} displayType={'text'} thousandSeparator={true} prefix={'$'} /></h6>
                <h6 className='text_details'><b>Content Rating: </b>{movieWithId.content_rating}</h6>
                <h6 className='text_details'><b>Production Company: </b>{movieWithId.production_company}</h6>
                <h4 className='rating'><b>Rating:</b><br/>
                <Rating className='rating_tmdb'size='small' precision={0.2} max={10} value={movieWithId.weighted_average_vote} readOnly />
                {movieWithId.weighted_average_vote} <span className='vote_count'>(<NumberFormat value={movieWithId.total_votes} displayType={'text'} thousandSeparator={true}/> votes)</span>
                </h4>
                <h6 className='text_details'>
                <a href={`https://www.imdb.com/title/${movieWithId.imdb_id}`} target='_blank' rel="noopener noreferrer" >
                <img className='imdb' src="https://www.logosurfer.com/wp-content/uploads/2018/03/imdb-logo_1.png" alt='IMAGE_ALT'/>
                </a>
                <a target="_blank" href={`http://www.google.com/search?q=${movieWithId.title} (film)`} rel="noopener noreferrer">
                <img className='google' src="https://www.logosurfer.com/wp-content/uploads/2018/03/google-logo_1.png" alt='IMAGE_ALT'/>
                </a>
                <a target="_blank" href={`https://www.rottentomatoes.com/${movieWithId.rotten}`} rel="noopener noreferrer">
                <img className='rotten' src="/Rotten.png" alt='IMAGE_ALT'/>
                </a>
                </h6>
            </div>
            </div>
            <div className='row'>
                <div className='col-md-12'>
                    <h4 className='discussions'>Discussions:</h4>
                    <Discussions {...props}/>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-12'>
                    <h4 className='similar'>Similar Titles:</h4>
                    <TitleCardsWithSpinner titles={titleSuggestions} isLoading={isTitleSuggestionsFetching} {...props} horizantal />
                </div>
            </div>
            {
                movieWithId.reviews.length>0?
                (
                    <div className='row'>
                <div className='col-md-12'>
                    <h4 className='reviews'>Reviews:</h4>
                    {
                        movieWithId.reviews.map((review)=>(
                            <ReviewJumbotron review={review} key={review._id}/>
                        ))
                    }
                </div>
            </div>
                ):
                (<div></div>)
            }
        </div>
        </Jumbotron>
    )
}

const mapStateToProps=createStructuredSelector({
    currentUser:selectCurrentUser,
    titleSuggestions:selectTitleSuggestions,
    isTitleSuggestionsFetching:selectTitleSuggestionsFetching,
    isTitleSuggestionsLoaded:selectTitleSuggestionsLoaded
})

const mapDispatchToProps=dispatch=>({
    fetchTitleSuggestionsAsync:(movie_id)=>dispatch(fetchTitleSuggestionsAsync(movie_id)),
    addTitleToWishlistAsync:(userId,titleId,wishlist)=>dispatch(addTitleToWishlistAsync(userId,titleId,wishlist)),
    removeTitleFromWishlistAsync:(userId,titleId,wishlist)=>dispatch(removeTitleFromWishlistAsync(userId,titleId,wishlist)),
    addTitleToRecentlyViewedAsync:(userId,titleId,recentlyViewed)=>dispatch(addTitleToRecentlyViewedAsync(userId,titleId,recentlyViewed))
})

export default connect(mapStateToProps,mapDispatchToProps)(TitleDetails);