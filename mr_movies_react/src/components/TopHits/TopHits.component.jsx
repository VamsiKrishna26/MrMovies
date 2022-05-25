import React from 'react';
import { createStructuredSelector } from 'reselect';
import { fetchTopHitsAsync } from '../../redux/titles/titles.actions';
import { selectTopHits, selectTopHitsFetching, selectTopHitsLoaded } from '../../redux/titles/titles.selector';
import './TopHits.styles.scss';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import WithSpinner from '../with-spinner/with-spinner.component';
import TopHitsDisplay from './TopHitsDisplay.component';

const TopHitsDisplayWithSpinner=WithSpinner(TopHitsDisplay);
const TopHits=(props)=>{
    const {topHits,isTopHitsFetching,fetchTopHitsAsync}=props;
    useEffect(()=>{
        fetchTopHitsAsync()
    },[fetchTopHitsAsync])

    return(
        <div className='top-hits'>
            <h1 className='top-hits-heading'><b>Top User Hits</b></h1>
            <TopHitsDisplayWithSpinner isLoading={isTopHitsFetching} {...props} topHits={topHits}/>
        </div>
    )
}

const mapStateToProps=createStructuredSelector({
    topHits:selectTopHits,
    isTopHitsFetching:selectTopHitsFetching,
    isTopHitsLoaded:selectTopHitsLoaded
})

const mapDispatchToProps=dispatch=>({
    fetchTopHitsAsync:()=>dispatch(fetchTopHitsAsync())
})

export default connect(mapStateToProps,mapDispatchToProps)(TopHits);