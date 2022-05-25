import React from 'react';
import './Wishlist.styles.scss';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsWishlistFetching, selectIsWishlistLoaded, selectWishlist } from '../../redux/titles/titles.selector';
import TitleCards from '../../components/TitleCard/TitleCards.component';
import { fetchWishlistAsync } from '../../redux/titles/titles.actions';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { useEffect } from 'react';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const TitleCardsWithSpinner=WithSpinner(TitleCards);
const Wishlist=(props)=>{

    const {currentUser,fetchWishlistAsync,isWishlistFetching,horizantal}=props;
    let {wishlist}=props;
    useEffect(()=>{
        if(currentUser){
            fetchWishlistAsync(currentUser.wishlist);
            if (!horizantal) {window.scrollTo(0, 0);}
        }
    },[currentUser,fetchWishlistAsync,horizantal])
    

    return(
        <div className='wishlist'>
            <h1 className='wishlist-name'><b>Wishlist</b></h1>
            {
                currentUser?
                <div>
                    {
                        currentUser.wishlist.length!==0?
                        <div>
                            {
                                horizantal?
                                <TitleCardsWithSpinner titles={wishlist} horizantal isLoading={isWishlistFetching} {...props}/>:
                                <div className='wishlist-vertical'>
                                    <TitleCardsWithSpinner titles={wishlist} isLoading={isWishlistFetching} {...props}/>
                                </div>
                            }
                        </div>:
                        <h1 className='login-pls'>Your wishlist is empty!!</h1>
                    }
                </div>
                :
                <div>
                    <h1 className='login-pls'>Please login to see Wishlist</h1>
                </div>
            }
        </div>
    )
}

const mapStateToProps=createStructuredSelector({
    currentUser:selectCurrentUser,
    wishlist:selectWishlist,
    isWishlistFetching:selectIsWishlistFetching,
    isWishlistloaded:selectIsWishlistLoaded
})

const mapDispatchToProps=dispatch=>({
    fetchWishlistAsync:(movieIds)=>dispatch(fetchWishlistAsync(movieIds))
})

export default connect(mapStateToProps,mapDispatchToProps)(Wishlist);