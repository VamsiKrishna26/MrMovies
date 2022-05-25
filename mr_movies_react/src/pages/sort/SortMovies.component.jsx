import React from 'react';
import { createStructuredSelector } from 'reselect';
import { fetchSortMoviesAsync } from '../../redux/titles/titles.actions';
import { selectSortMovies, selectSortMoviesFetching, selectSortMoviesLoaded } from '../../redux/titles/titles.selector';
import './SortMovies.styles.scss';
import { connect } from 'react-redux';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import TitleCards from '../../components/TitleCard/TitleCards.component';
import { Typography,Slider,FormGroup,FormControlLabel,Checkbox,RadioGroup,Radio } from '@material-ui/core';
import { compose } from 'redux';
import { ImFilter } from "react-icons/im";
import { Button } from 'react-bootstrap';

const TitleCardsWithSpinner=WithSpinner(TitleCards);

class SortMoviesPage extends React.Component{
    constructor(){
        super();
        this.state={
            openFilters:false,
            lowest_rating:0,
            highest_rating:10,
            revenueCheckbox:{800000000:false,1500000000:false,3000000000:false},
            genreCheckBox:
            {Action:false,Drama:false,Fantasy:false,Horror:false,Romance:false,Comedy:false,Thriller:false,
                Crime:false,Animation:false,History:false,Adventure:false},
            lowest_revenue:0,
            highest_revenue:3000000000,
            lowest_budget:0,
            highest_budget:400000000,
            genresRegex:new RegExp('','i'),
            query:{}
        }
        this.lowest_rating=this.lowest_rating.bind(this);
        this.highest_rating=this.highest_rating.bind(this);
    }

    componentDidMount(){
        window.scrollTo(0, 0);
        const {fetchSortMoviesAsync1}=this.props;
        fetchSortMoviesAsync1();
    }

    fetchFilterMovies(value){
        const{fetchSortMoviesAsync2}=this.props;
        const {lowest_rating,highest_rating,lowest_revenue,highest_revenue,lowest_budget,highest_budget,genresRegex}=this.state;
        const obj={flags:genresRegex.flags,source:genresRegex.source};
        const string=JSON.stringify(obj);
        this.setState({query:{"$and":
        [{"weighted_average_vote":{"$gte":lowest_rating,"$lte":highest_rating}},
         {"revenue":{"$gte":lowest_revenue,"$lte":highest_revenue}},
        {"budget":{"$gte":lowest_budget,"$lte":highest_budget}},
        {"genres":string}]
    }},
        ()=>fetchSortMoviesAsync2(value,
            this.state.query)
        );  
    }

    lowest_rating(value){
        this.setState({lowest_rating:value},
            ()=>
            this.fetchFilterMovies("weighted_average_vote"))
    }

    highest_rating(value){
        this.setState({highest_rating:value},
            ()=>this.fetchFilterMovies("weighted_average_vote"))
    }

    handleRevenueChange(event,value){
        let checkboxes=this.state.revenueCheckbox;
        if(event.target.value==='800000000'){
            checkboxes[800000000]=value;
        }
        else if(event.target.value==='1500000000'){
            checkboxes[1500000000]=value;
        }
        else{
            checkboxes[3000000000]=value;
        }
        this.setState({revenue:checkboxes},
            ()=>this.callRevenueChange());
    }

    callRevenueChange(){
        let higher=3000000000;
        if(this.state.revenueCheckbox[3000000000]) higher=3000000000;
        else if(this.state.revenueCheckbox[1500000000]) higher=1500000000;
        else if (this.state.revenueCheckbox[800000000]) higher=800000000;
        this.setState({lowest_revenue:0,highest_revenue:higher},
            ()=>this.fetchFilterMovies("revenue"))
    }

    handleGenreChange(event,value){
        let genreCheckBox=this.state.genreCheckBox;
        let genre=event.target.value;
        genreCheckBox[genre]=value;
        this.setState({genreCheckBox:genreCheckBox},
            ()=>this.callGenreChange());
    }

    callGenreChange(){
        let genres=[];
        for(let genre in this.state.genreCheckBox){
            if(this.state.genreCheckBox[genre]){
                genres.push(genre);
            }
        }
        const string='('+genres.map((genre)=>genre).join('|')+')';
        const regex=new RegExp(string,'i');
        this.setState({genresRegex:regex},
            ()=>this.fetchFilterMovies("total_votes"))
    }

    handleBudgetChange(event,value){
        let lowest=0;
        let highest=400000000;
        if(event.target.value==='0-100'){
            lowest=0;
            highest=100000000;
        }
        else if(event.target.value==='100-200'){
            lowest=100000000;
            highest=200000000;
        }
        else if(event.target.value==='200-300'){
            lowest=200000000;
            highest=300000000
        }
        else if(event.target.value==='300+'){
            lowest=300000000;
            highest=400000000;
        }
        this.setState({lowest_budget:lowest,highest_budget:highest},
            ()=>this.fetchFilterMovies("budget"))
    }

    Filters_options(){
        return(
            <div className="filter-form">
                            <Typography gutterBottom className='filter-heading'>Ratings:</Typography>
                            <Typography id="discrete-slider-low-rating" gutterBottom className='filter-sub'>Lowest Rating:</Typography>
                            <Slider defaultValue={0} aria-labelledby="discrete-slider-low-rating" valueLabelDisplay="auto"
                                step={1} marks min={0} max={10} onChange={(event,value)=>this.lowest_rating(value)}/>
                            <Typography id="discrete-slider-high-rating" gutterBottom className='filter-sub'>Highest Rating:</Typography>
                            <Slider defaultValue={10} aria-labelledby="discrete-slider-high-rating" valueLabelDisplay="auto"
                                step={1} marks min={0} max={10} onChange={(event,value)=>this.highest_rating(value)}/>
                            <Typography id="genres" gutterBottom className='filter-heading'>Genres: </Typography>
                            <div className='row'>
                                <div className='col-md-6 col-xs-6'>
                            <FormControlLabel control={ <Checkbox name="checkedB" color="primary"/>} checked={this.state.genreCheckBox.Action} value="Action" onChange={(event,value)=>this.handleGenreChange(event,value)} label={<Typography className='filter-sub'>Action</Typography>}/>
                            <FormControlLabel control={ <Checkbox name="checkedB" color="primary"/>} checked={this.state.genreCheckBox.Drama} value="Drama" onChange={(event,value)=>this.handleGenreChange(event,value)} label={<Typography className='filter-sub'>Drama</Typography>}/>
                            <FormControlLabel control={ <Checkbox name="checkedB" color="primary"/>} checked={this.state.genreCheckBox.Fantasy} value="Fantasy" onChange={(event,value)=>this.handleGenreChange(event,value)} label={<Typography className='filter-sub'>Fantasy</Typography>}/>
                            <FormControlLabel control={ <Checkbox name="checkedB" color="primary"/>} checked={this.state.genreCheckBox.Horror} value="Horror" onChange={(event,value)=>this.handleGenreChange(event,value)} label={<Typography className='filter-sub'>Horror</Typography>}/>
                            <FormControlLabel control={ <Checkbox name="checkedB" color="primary"/>} checked={this.state.genreCheckBox.Romance} value="Romance" onChange={(event,value)=>this.handleGenreChange(event,value)} label={<Typography className='filter-sub'>Romance</Typography>}/>
                            <FormControlLabel control={ <Checkbox name="checkedB" color="primary"/>} checked={this.state.genreCheckBox.Comedy} value="Comedy" onChange={(event,value)=>this.handleGenreChange(event,value)} label={<Typography className='filter-sub'>Comedy</Typography>}/>
                                </div>
                                <div className='col-md-6 col-xs-6'>
                                <FormControlLabel control={ <Checkbox name="checkedB" color="primary"/>} checked={this.state.genreCheckBox.Thriller} value="Thriller" onChange={(event,value)=>this.handleGenreChange(event,value)} label={<Typography className='filter-sub'>Thriller</Typography>}/>
                            <FormControlLabel control={ <Checkbox name="checkedB" color="primary"/>} checked={this.state.genreCheckBox.Crime} value="Crime" onChange={(event,value)=>this.handleGenreChange(event,value)} label={<Typography className='filter-sub'>Crime</Typography>}/>
                            <FormControlLabel control={ <Checkbox name="checkedB" color="primary"/>} checked={this.state.genreCheckBox.Animation} value="Animation" onChange={(event,value)=>this.handleGenreChange(event,value)} label={<Typography className='filter-sub'>Animation</Typography>}/>
                            <FormControlLabel control={ <Checkbox name="checkedB" color="primary"/>} checked={this.state.genreCheckBox.History} value="History" onChange={(event,value)=>this.handleGenreChange(event,value)} label={<Typography className='filter-sub'>History</Typography>}/>
                            <FormControlLabel control={ <Checkbox name="checkedB" color="primary"/>} checked={this.state.genreCheckBox.Adventure} value="Adventure" onChange={(event,value)=>this.handleGenreChange(event,value)} label={<Typography className='filter-sub'>Adventure</Typography>}/>
                                </div>
                            </div>
                            <Typography id="budget" gutterBottom className='filter-heading'>Budget: </Typography>
                            <RadioGroup aria-label="budget" name="budget" onChange={(event)=>this.handleBudgetChange(event)}>
                            <FormControlLabel value="0-100" control={<Radio />} label={<Typography className='filter-sub'>0-100million$</Typography>} />
                            <FormControlLabel value="100-200" control={<Radio />} label={<Typography className='filter-sub'>100-200million$</Typography>} />
                            <FormControlLabel value="200-300" control={<Radio />} label={<Typography className='filter-sub'>200-300million$</Typography>} />
                            <FormControlLabel value="300+" control={<Radio />} label={<Typography className='filter-sub'>Above 300million$</Typography>} />
                            <FormControlLabel value="All" control={<Radio />} label={<Typography className='filter-sub'>All</Typography>}/>
                            </RadioGroup>
                            <Typography id="revenue" gutterBottom className='filter-heading'>Revenue: </Typography>
                            <FormGroup row>
                            <FormControlLabel control={ <Checkbox name="checkedB" color="primary"/>} checked={this.state.revenueCheckbox.above2Billion} value="3000000000" onChange={(event,value)=>this.handleRevenueChange(event,value)} label={<Typography className='filter-sub'>Below 3 billion$</Typography>}/>
                            <FormControlLabel control={ <Checkbox name="checkedB" color="primary"/>} checked={this.state.revenueCheckbox.above1Billion} value="1500000000" onChange={(event,value)=>this.handleRevenueChange(event,value)} label={<Typography className='filter-sub'>Below 1.5 billion$</Typography>}/>
                            <FormControlLabel control={ <Checkbox name="checkedB" color="primary"/>} checked={this.state.revenueCheckbox.above500Million} value="800000000" onChange={(event,value)=>this.handleRevenueChange(event,value)} label={<Typography className='filter-sub'>Below 800 million$</Typography>}/>
                            </FormGroup>
        
                            
                            </div>
        );
    }

    render(){
        const {sortMovies,isSortMoviesFetching}=this.props;
        return(
            <div className='sort-movies'>
                <h1 className='sort-heading'><b>Sort Movies</b></h1>
                <div className="container-fluid sort-titles">
                    <div className="row">
                        <div className="sorting">
                            <h5 className='sort-by-heading'>
                                {window.innerWidth>768?<span>Sort movies by:</span>:null}
                                <span className="option" onClick={()=>this.fetchFilterMovies("weighted_average_vote")}>Rating</span>
                                <span className="option" onClick={()=>this.fetchFilterMovies("total_votes")}>Total Votes</span>
                                <span className="option" onClick={()=>this.fetchFilterMovies("budget")}>Budget</span>
                                <span className="option" onClick={()=>this.fetchFilterMovies("revenue")}>Revenue</span>
                                {window.innerWidth>768?<span className="option" onClick={()=>this.fetchFilterMovies("runtime")}>Runtime</span>:null}
                                {window.innerWidth>768?<span className="option" onClick={()=>this.fetchFilterMovies("release_date")}>Release Date</span>:null}
                            </h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className='col-md-2'>
                            {
                                window.innerWidth>768?
                                this.Filters_options():
                                <div>
                                    <div className='filter-icon' onClick={()=>this.setState({openFilters:!this.state.openFilters})}><ImFilter/><span> Filter</span></div>
                                    {
                                        this.state.openFilters?
                                        <div>
                                            {
                                                this.Filters_options()
                                            }
                                            <Button variant='outline-secondary' onClick={()=>{this.setState({openFilters:!this.state.openFilters})}}>Apply and Close</Button>
                                        </div>:
                                        null
                                    }
                                </div>
                            }
                        </div>
                        <div className="col-md-10">
                        {
                            window.innerWidth>768?
                            <TitleCardsWithSpinner isLoading={isSortMoviesFetching} titles={sortMovies} long_cards {...this.props}/>:
                            <TitleCardsWithSpinner isLoading={isSortMoviesFetching} titles={sortMovies} {...this.props}/>
                        }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps=createStructuredSelector({
    sortMovies:selectSortMovies,
    isSortMoviesFetching:selectSortMoviesFetching,
    isSortMoviesLoaded:selectSortMoviesLoaded
})

const mapDisptachToProps=dispatch=>({
    fetchSortMoviesAsync:(value)=>dispatch(fetchSortMoviesAsync(value)),
    fetchSortMoviesAsync2:(value,query)=>dispatch(fetchSortMoviesAsync(value,query)),
    fetchSortMoviesAsync1:()=>dispatch(fetchSortMoviesAsync())
})

export default compose(connect(mapStateToProps,mapDisptachToProps))(SortMoviesPage);