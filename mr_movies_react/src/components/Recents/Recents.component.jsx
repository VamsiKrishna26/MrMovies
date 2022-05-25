import React from 'react';
import './Recents.styles.scss';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectRecents, selectRecentsFetching, selectRecentsLoaded } from '../../redux/titles/titles.selector';
import { fetchRecentsAsync } from '../../redux/titles/titles.actions';
import { useEffect } from 'react';
import WithSpinner from '../with-spinner/with-spinner.component';
import TitleCards from '../TitleCard/TitleCards.component';

const TitleCardsWithSpinner=WithSpinner(TitleCards)
const Recents=(props)=>{
    const{recents,isRecentsFetching,fetchRecentsAsync}=props;

    useEffect(()=>{
        fetchRecentsAsync()
    },[fetchRecentsAsync])

    return(
        <div className='recents'>
            <h1 className="text-display"><b>Recents</b></h1>
            <TitleCardsWithSpinner {...props} titles={recents} horizantal isLoading={isRecentsFetching}/>
        </div>
    )
}

const mapStateToProps=createStructuredSelector({
    recents:selectRecents,
    isRecentsFetching:selectRecentsFetching,
    isRecentsLoaded:selectRecentsLoaded
})

const mapDispatchToProps=dispatch=>({
    fetchRecentsAsync:()=>dispatch(fetchRecentsAsync())
})

export default connect(mapStateToProps,mapDispatchToProps)(Recents);