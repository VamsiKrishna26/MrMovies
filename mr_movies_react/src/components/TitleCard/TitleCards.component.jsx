import React from 'react';
import './TitleCards.styles.scss';
import { Button, Card,CardDeck, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import NumberFormat from 'react-number-format';
import { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { addTitleToWishlistAsync, removeTitleFromWishlistAsync } from '../../redux/user/user.actions';
import { Rating } from '@material-ui/lab';
import { AiFillStar,AiFillInfoCircle } from "react-icons/ai";
import { Modal,Grow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const Arrow = ({ text, className }) => {
  return (
    <div
      className={className}
    >{text}</div>
  );
};


const ArrowLeft = Arrow({ text: <div>&#11164;</div>, className: 'arrow-prev' });
const ArrowRight = Arrow({ text: <div>&#11166;</div>, className: 'arrow-next' });


const getModalStyle=()=> {
  const top = 100;
  const left = 100;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#282828',
    border: '2px solid black',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  cardText:{
    color:'white'
  },

  modalButton:{
    display:'flex',
    justifyContent:'center',
  },

  addWishlist:{
    backgroundColor:'green',
    border:'0px'
  },

  removeWishlist:{
    backgroundColor:'red',
    border:'0px'
  },

  login:{
    backgroundColor:'blue',
    border:'0px'
  }
}));


const TitleCards=({titles,horizantal,NoBio,long_cards,currentUser,addTitleToWishlistAsync,removeTitleFromWishlistAsync})=>{
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  let movies=[];
  let movies1=titles['movies'];
  const [showBio,setShowBio]=useState(false);
  const [showInfo,setShowInfo]=useState(false);
  const [modalMovie,setModalMovie]=useState(null);

  Object.keys(movies1).map((id)=>movies.push(movies1[id]));

  const addToWishlist=(titleId)=>{
    addTitleToWishlistAsync(currentUser.id,titleId,currentUser.wishlist);
  }

  const removeFromWishlist=(titleId)=>{
    removeTitleFromWishlistAsync(currentUser.id,titleId,currentUser.wishlist)
  }


  const handleClose = () => {
    setShowInfo(false);
  };


  return(
    <div className='container-fluid cards-display'>
      <Modal open={showInfo} onClose={handleClose}>
      <Grow in={showInfo} {...(showInfo ? { timeout: 1000 } : {})}>
          <div style={modalStyle} className={classes.paper}>
          {
            modalMovie?
            <div>
              {
                    modalMovie.actors?
                  <p className={classes.cardText}><b>Actors: </b>
                  {
                  modalMovie.actors.slice(0,5).map((actor,index)=><Link to={`/searchPage/${actor}`} key={index} className={classes.cardText}>{(index?', ':'')+actor}</Link>)
                  }
                  </p>
                  :null
              }
              {
                    modalMovie.directors?
                  <p className={classes.cardText}><b>Directors: </b> 
                  {
                  modalMovie.directors.slice(0,5).map((director,index)=><Link to={`/searchPage/${director}`} key={index} className={classes.cardText}>{(index?', ':'')+director}</Link>)
                  }
                  </p>
                  :null
              }
              {
                    modalMovie.genres?
                  <p className={classes.cardText}><b>Genres: </b> 
                  {
                  modalMovie.genres.slice(0,5).map((genre,index)=><Link to={`/searchPage/${genre}`} key={index} className={classes.cardText}>{(index?', ':'')+genre}</Link>)
                  }
                  </p>
                  :null
              }
              <div className={classes.modalButton}>
              { currentUser?
                    <div>
                       { 
                      currentUser.wishlist.includes(modalMovie._id)?
                      <Button onClick={()=>{removeFromWishlist(modalMovie._id)}} className={classes.removeWishlist}>Remove from Wishlist</Button>
                     :
                    <Button onClick={()=>{addToWishlist(modalMovie._id)}} className={classes.addWishlist}>Add to WishList</Button>
                    }
                    </div>
                    :
                    <Button disabled className={classes.login}>Login to Wishlist</Button>
                  }
              </div>
            </div>
            :null
          }
        </div>
        </Grow>
      </Modal>
      {
        titles['bio']&&!NoBio?
        (<div className='bio'>
          {titles['bio']['date_of_birth']?<h6 className='text-details'><b>Date of birth:</b> {titles['bio']['date_of_birth']}</h6>:<div></div>}
          {titles['bio']['place_of_birth']?<h6 className='text-details'><b>Place of birth:</b> {titles['bio']['place_of_birth']}</h6>:<div></div>}
          {titles['bio']['height']?<h6 className='text-details'><b>Height:</b> {titles['bio']['height']}m</h6>:<div></div>}
          {titles['bio']['spouses_string']?<h6 className='text-details'><b>Spouse(s):</b> {titles['bio']['spouses_string']}</h6>:<div></div>}
          {
            titles['bio']['bio']?
            <div className='bio-details text-details'><b>Bio: </b>
          {titles['bio']['bio'].slice(0,500)}
          {
            showBio?
            <span>
              <span>{titles['bio']['bio'].slice(501,)}</span>
              <span className="showbio-click" onClick={()=>setShowBio(!showBio)}> <b>(less...)</b></span>
            </span>
            :
            <span className="showbio-click" onClick={()=>setShowBio(!showBio)}> <b>(more...)</b></span>
          }
          </div>:
          <div></div>
          }
        </div>
        ):
        (<div></div>)
      }
    {
      horizantal?
      (
        <ScrollMenu
          data=
            {
              movies.map((movie)=>
              (movie.poster_path)?
              (
                <div key={movie._id}>
                <Card key={movie._id} className='titleCard'>
                {
                  window.innerWidth>768?
                  <Card.Header className='card-text'>
                  <Link className='card-text' to={`/movies/getMovieWithId/${movie._id}`}><b>{movie.title.toUpperCase()}</b></Link>
                  </Card.Header>:
                  null
                }
                <Link className='linkMovie' to={`/movies/getMovieWithId/${movie._id}`}>
                  <Card.Img className='img'  variant="top" src={movie.poster_path} alt="No Image" />
                </Link>
                {
                  window.innerWidth>768?
                  <Card.Body className='body-card'>
                  <Card.Text className='card-text'><b>Release Date:</b> {movie.release_date}</Card.Text>
                  {
                    movie.actors?
                  <Card.Text className='card-text'><b>Actors:</b>
                  {
                  movie.actors.slice(0,4).map((actor,index)=><Link to={`/searchPage/${actor}`} key={index} className='card-text'>{(index?',':'')+actor}</Link>)
                  }
                  </Card.Text>
                  :<div></div>
                  }
                  {
                    movie.directors?
                  <Card.Text className='card-text'><b>Directors:</b> 
                  {
                  movie.directors.slice(0,3).map((director,index)=><Link to={`/searchPage/${director}`} key={index} className='card-text'>{(index?',':'')+director}</Link>)
                  }
                  </Card.Text>
                  :<div></div>
                  }
                  <Card.Text className='card-text'><b>Rating: </b>
                  <Rating value={movie.weighted_average_vote/2} precision={0.25} max={5} size="small" readOnly/>
                  {movie.weighted_average_vote} <span className='vote_count'>(<NumberFormat value={movie.total_votes} displayType={'text'} thousandSeparator={true}/>)</span></Card.Text>
                  </Card.Body>:
                  <Card.Body className='body-card'>
                    <div className='left-side'>
                    <Card.Text className='card-text'>{movie.release_date}</Card.Text>
                    <Card.Text className='card-text'><AiFillStar color='#FDCC0D'/>{movie.weighted_average_vote}/10 <span className='vote_count'>(<NumberFormat value={movie.total_votes} displayType={'text'} thousandSeparator={true}/>)</span></Card.Text>
                    </div>
                    <AiFillInfoCircle color='black' className='info' onClick={()=>{setModalMovie(movie);setShowInfo(true);}}/>
                    
                  </Card.Body>
                }
                {
                  window.innerWidth>768?
                  <Card.Footer className="card-foot">
                  { currentUser?
                    <div>
                       { 
                      currentUser.wishlist.includes(movie._id)?
                      <Button onClick={()=>{removeFromWishlist(movie._id)}} className="remove-button">Remove from Wishlist</Button>
                     :
                    <Button onClick={()=>{addToWishlist(movie._id)}} className="add-button">Add to WishList</Button>
                    }
                    </div>
                    :
                    <Button disabled className="login">Login to Wishlist</Button>
                  }
                </Card.Footer>:
                null
                }
                </Card>
                </div>
              ):(<div key={movie._id}/>)
             )
            }
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          wheel={false}
          alignCenter={false}
        />
      )
      :
      (
        long_cards?
        (
          <CardDeck>
            {
              movies.map((movie)=>
              (movie.poster_path)?
              (
                <div key={movie._id}>
                  <Card key={movie._id} className='titleCard long-cards'>
                  <Card.Body>
                  <div className='row'>
                    <div className='col-md-2'>
                    <Link className='linkMovie' to={`/movies/getMovieWithId/${movie._id}`}>
                    <Card.Img className='img'  variant="top" src={movie.poster_path} alt="No Image" />
                    </Link>
                    </div>
                    <div className='col-md-6'>
                    <Card.Text className='titleName'><b>{movie.title}</b></Card.Text>
                    {
                    movie.actors?
                  <Card.Text className='card-text'><b>Actors:</b> {movie.actors.slice(0,4).map((actor,index)=>
                  <Link to={`/searchPage/${actor}`} key={index} className='card-text'>{(index?',':'')+actor}</Link>)}</Card.Text>
                  :<div></div>
                  }
                  {
                    movie.directors?
                  <Card.Text className='card-text'><b>Directors:</b> {movie.directors.slice(0,2).map((director,index)=>
                  <Link to={`/searchPage/${director}`} key={index} className='card-text'>{(index?',':'')+director}</Link>)}</Card.Text>
                  :<div></div>
                  }
                  <Card.Text className='card-text'><b>Rating: </b>
                  <Rating value={movie.weighted_average_vote/2} precision={0.25} max={5} size="small" readOnly/>
                  {movie.weighted_average_vote} <span className='vote_count'>(<NumberFormat value={movie.total_votes} displayType={'text'} thousandSeparator={true}/>)</span></Card.Text>
                  { currentUser?
                    <div>
                       { 
                      currentUser.wishlist.includes(movie._id)?
                      <Button onClick={()=>{removeFromWishlist(movie._id)}} className="remove-button">Remove from Wishlist</Button>
                     :
                    <Button onClick={()=>{addToWishlist(movie._id)}} className="add-button">Add to WishList</Button>
                    }
                    </div>
                    :
                    <Button disabled className="login">Login to Wishlist</Button>
                  }
                    </div>
                    <div className='col-md-4'>
                    <Card.Text className='card-text'><b>Budget:</b> <NumberFormat value={movie.budget} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Card.Text>
                    <Card.Text className='card-text'><b>Revenue:</b> <NumberFormat value={movie.revenue} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Card.Text>
                    <Card.Text className='card-text'><b>Total Number of votes:</b> <NumberFormat value={movie.total_votes} displayType={'text'} thousandSeparator={true} /></Card.Text>
                    <Card.Text className='card-text'><b>Runtime:</b> {movie.runtime} min</Card.Text>
                    <Card.Text className='card-text'><b>Release Date:</b> {movie.release_date}</Card.Text>
                    </div>
                    </div>
                  </Card.Body>
                  </Card>
                </div>
              ):(<div key={movie._id}/>)
             )
            }
          </CardDeck>
        ):
        (
          <Row md={4} sm={2} xs={2} className='horizantal-cards'>
            {
              movies.map((movie)=>
              <Col key={movie._id} className='per-column'>
              {
                
              (movie.poster_path)?
              (
                <div>
                  <Card key={movie._id} className='titleCard'>
                {
                  window.innerWidth>768?
                  <Card.Header className='card-text'>
                  <Link className='card-text' to={`/movies/getMovieWithId/${movie._id}`}><b>{movie.title.toUpperCase()}</b></Link>
                  </Card.Header>:
                  null
                }
                <Link className='linkMovie' to={`/movies/getMovieWithId/${movie._id}`}>
                  <Card.Img className='img'  variant="top" src={movie.poster_path} alt="No Image" />
                </Link>
                {
                  window.innerWidth>768?
                  <Card.Body className='body-card'>
                  <Card.Text className='card-text'><b>Release Date:</b> {movie.release_date}</Card.Text>
                  {
                    movie.actors?
                  <Card.Text className='card-text'><b>Actors:</b>
                  {
                  movie.actors.slice(0,4).map((actor,index)=><Link to={`/searchPage/${actor}`} key={index} className='card-text'>{(index?',':'')+actor}</Link>)
                  }
                  </Card.Text>
                  :<div></div>
                  }
                  {
                    movie.directors?
                  <Card.Text className='card-text'><b>Directors:</b> 
                  {
                  movie.directors.slice(0,3).map((director,index)=><Link to={`/searchPage/${director}`} key={index} className='card-text'>{(index?',':'')+director}</Link>)
                  }
                  </Card.Text>
                  :<div></div>
                  }
                  <Card.Text className='card-text'><b>Rating: </b>
                  <Rating value={movie.weighted_average_vote/2} precision={0.25} max={5} size="small" readOnly/>
                  {movie.weighted_average_vote} <span className='vote_count'>(<NumberFormat value={movie.total_votes} displayType={'text'} thousandSeparator={true}/>)</span></Card.Text>
                  </Card.Body>:
                  <Card.Body className='body-card'>
                    <div className='left-side'>
                    <Card.Text className='card-text'>{movie.release_date}</Card.Text>
                    <Card.Text className='card-text'><AiFillStar color='#FDCC0D'/>{movie.weighted_average_vote}/10 <span className='vote_count'>(<NumberFormat value={movie.total_votes} displayType={'text'} thousandSeparator={true}/>)</span></Card.Text>
                    </div>
                    <AiFillInfoCircle color='black' className='info' onClick={()=>{setModalMovie(movie);setShowInfo(true);}}/>
                    
                  </Card.Body>
                }
                {
                  window.innerWidth>768?
                  <Card.Footer className="card-foot">
                  { currentUser?
                    <div>
                       { 
                      currentUser.wishlist.includes(movie._id)?
                      <Button onClick={()=>{removeFromWishlist(movie._id)}} className="remove-button">Remove from Wishlist</Button>
                     :
                    <Button onClick={()=>{addToWishlist(movie._id)}} className="add-button">Add to WishList</Button>
                    }
                    </div>
                    :
                    <Button disabled className="login">Login to Wishlist</Button>
                  }
                </Card.Footer>:
                null
                }
                </Card>
                </div>
              ):(<div key={movie._id}/>)
              }
              </Col>
             )
            }
        </Row>
        )
      )

    }


    </div>
  )
}

const mapStateToProps=createStructuredSelector({
  currentUser:selectCurrentUser
})

const mapDispatchToProps=dispatch=>({
  addTitleToWishlistAsync:(userId,titleId,wishlist)=>dispatch(addTitleToWishlistAsync(userId,titleId,wishlist)),
  removeTitleFromWishlistAsync:(userId,titleId,wishlist)=>dispatch(removeTitleFromWishlistAsync(userId,titleId,wishlist))
})

export default connect(mapStateToProps,mapDispatchToProps)(TitleCards);