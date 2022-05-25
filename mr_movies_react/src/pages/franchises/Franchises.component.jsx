import React from 'react';
import { createStructuredSelector } from 'reselect';
import { selectFranchises, selectIsFranchisesFetching,selectIsFranchisesLoaded } from '../../redux/titles/titles.selector';
import './Franchises.styles.scss';
import { connect } from 'react-redux';
import TitleCards from '../../components/TitleCard/TitleCards.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import { fetchFranchisesAsync } from '../../redux/titles/titles.actions';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowRight } from "react-icons/md";
const TitleCardsWithSpinner=WithSpinner(TitleCards);
class FranchisesPage extends React.Component{
    
    componentDidMount(){
        window.scrollTo(0, 0);
        const {fetchFranchisesAsync}=this.props;
        fetchFranchisesAsync();
    }

    render(){
        const {franchises,isFranchisesFecthing}=this.props;
        return(
            <div className='franchises'>
                {
                   Object.keys(franchises).map((heading)=>(
                       <div key={heading}>
                           <h2 key={heading}><Link className='heading' to={`/searchPage/${heading}`}><b>{heading.toUpperCase()} <MdKeyboardArrowRight/></b></Link></h2>
                           <TitleCardsWithSpinner isLoading={isFranchisesFecthing} key={franchises[heading].id}
                           titles={franchises[heading]} horizantal {...this.props}/>
                       </div>
                   ))
                }
            </div>
        )
    }
}

const mapStateToProps=createStructuredSelector({
    franchises:selectFranchises,
    isFranchisesFecthing:selectIsFranchisesFetching,
    isFranchisesLoaded:selectIsFranchisesLoaded
})

const mapDispatchToProps=dispatch=>({
    fetchFranchisesAsync:()=>dispatch(fetchFranchisesAsync())
})

export default connect(mapStateToProps,mapDispatchToProps)(FranchisesPage);