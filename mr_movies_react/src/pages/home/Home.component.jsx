import React from 'react';
import Slideshow from '../../components/SlideShow/Slideshow.component';
import './Home.styles.scss';
import CelebritySpotlight from '../../components/CelebritySpotlight/CelebritySpotlight.component';
import SearchPage from '../search/search.component';
import TopHits from '../../components/TopHits/TopHits.component';
import Recents from '../../components/Recents/Recents.component';
import Wishlist from '../wishlist/Wishlist.component';
import RecentlyViewed from '../recentlyviewed/RecentlyViewed.component';

const HomePage=(props)=>{
    return(
        <div className='home-page'>
            <Slideshow {...props}/>
            <div className="container-fluid home-body">
                <div className="row">
                    <div className="col-md-12">
                        <SearchPage {...props}/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-12'>
                        <Recents {...props}/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-12'>
                        <RecentlyViewed {...props} horizantal/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-12'>
                        <Wishlist {...props} horizantal/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-3'>
                        <TopHits {...props}/>
                    </div>
                    <div className='col-md-9'>
                        <CelebritySpotlight {...props}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;