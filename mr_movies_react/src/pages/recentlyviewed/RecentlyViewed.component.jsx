import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import TitleCards from '../../components/TitleCard/TitleCards.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import { fetchRecentlyViewedAsync } from '../../redux/titles/titles.actions';
import { selectIsRecentlyViewedFetching, selectIsRecentlyViewedLoaded, selectRecentlyViewed } from '../../redux/titles/titles.selector';
import { selectCurrentUser } from '../../redux/user/user.selector';
import './RecentlyViewed.styles.scss';

const TitleCardsWithSpinner=WithSpinner(TitleCards);
const RecentlyViewed=(props)=>{

    const{currentUser,fetchRecentlyViewedAsync,isRecentlyViewedFetching,horizantal}=props;
    let {recentlyViewed}=props;

    useEffect(()=>{
        if(currentUser){
            fetchRecentlyViewedAsync(currentUser.recentlyViewed)
            if(!horizantal){
                window.scrollTo(0,0);
            }
        }
    },[currentUser,fetchRecentlyViewedAsync,horizantal])

    return(
        <div className='recently-viewed'>
            <h1 className='recently-viewed-name'><b>Recently Viewed</b></h1>
            {
                currentUser?
                <div>
                    {
                        currentUser.recentlyViewed.length!==0?
                        <div>
                            {
                                horizantal?
                                <div>
                                    <TitleCardsWithSpinner titles={recentlyViewed} horizantal isLoading={isRecentlyViewedFetching} {...props}/>
                                </div>:
                                <div className='recently-viewed-vertical'>
                                    <TitleCardsWithSpinner titles={recentlyViewed} isLoading={isRecentlyViewedFetching} {...props}/>
                                </div>
                            }
                        </div>:
                        <h1 className='login-pls'>
                            Your recently Viewed is empty!!
                        </h1>
                    }
                </div>:
                <div>
                    <h1 className='login-pls'>Please login to see Recently Viewed</h1>
                </div>
            }
        </div>
    )
}

const mapStateToProps=createStructuredSelector({
    currentUser:selectCurrentUser,
    recentlyViewed:selectRecentlyViewed,
    isRecentlyViewedFetching:selectIsRecentlyViewedFetching,
    isRecentlyViewedLoaded:selectIsRecentlyViewedLoaded
})

const mapDispatchToProps=dispatch=>({
    fetchRecentlyViewedAsync:(movieIds)=>dispatch(fetchRecentlyViewedAsync(movieIds))
})

export default connect(mapStateToProps,mapDispatchToProps)(RecentlyViewed);
