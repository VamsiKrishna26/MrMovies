import './App.css';
import React from 'react';
import {Switch,Route} from 'react-router-dom';
import { auth, createUserProfileDocument } from './firebase/firebase.util';
import GenrePage from './pages/genre/genre.component';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import TitleDescription from './components/TitleDescription/TitleDescription.component';
import SearchPage from './pages/search/search.component';
import SearchClickPage from './pages/search/SearchClick.component';
import TopMoviesPage from './pages/top/topmovies.component';
import Header from './components/Header/Header.component';
import HomePage from './pages/home/Home.component';
import {setCurrentUser} from './redux/user/user.actions';
import {selectCurrentUser} from './redux/user/user.selector';
import Footer from './components/Footer/Footer.component';
import SortMoviesPage from './pages/sort/SortMovies.component';
import FranchisesPage from './pages/franchises/Franchises.component';
import Wishlist from './pages/wishlist/Wishlist.component';
import Year from './pages/year/Year.component';

class App extends React.Component{

  unSubscribeFromAuth=null;

  componentDidMount(){
    const {setCurrentUser}=this.props;
    this.unsubscribeFromAuth=auth.onAuthStateChanged(async userAuth=>{
      if(userAuth){
        const userRef=await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot=>{
          setCurrentUser({
            id:snapshot.id,
            ...snapshot.data()
          })
        });
      }
      });
  }

  componentWillUnmount(){
    this.unSubscribeFromAuth=null;
  }

  render(){
    return(
      <div>
        <Header className='header' {...this.props}/>
        <div className="body">
        <Switch>
          <Route path='/genrePage' component={GenrePage}/>
          <Route path='/franchisesPage' component={FranchisesPage}/>
          <Route path='/movies/getMovieWithId/:id' component={TitleDescription}/>
          <Route path='/searchPage/:value' component={SearchClickPage}/>
          <Route path='/searchPage' component={SearchPage}/>
          <Route path='/topMoviesPage' component={TopMoviesPage}/>
          <Route path='/sortMoviesPage' component={SortMoviesPage}/>
          <Route path='/wishlistPage' component={Wishlist}/>
          <Route path='/yearPage' component={Year}/>
          <Route path='/' component={HomePage}/>
        </Switch>
        </div>
        <Footer/>
      </div>
    );
  }
}

const mapStateToProps=createStructuredSelector({
  currentUser:selectCurrentUser
})

const mapDispatchToProps=dispatch=>({
  setCurrentUser: user=>dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
