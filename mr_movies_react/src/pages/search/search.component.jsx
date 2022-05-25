import React from 'react';
import {  fetchSuggestionsAsync } from '../../redux/titles/titles.actions';
import './search.styles.scss';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectSuggestions, selectSuggestionsFetching, selectSuggestionsLoaded } from '../../redux/titles/titles.selector';
import { Autocomplete } from '@material-ui/lab';
import {TextField,Button,createTheme,ThemeProvider} from '@material-ui/core';
import {withStyles} from "@material-ui/core/styles";
import { Link } from 'react-router-dom';
const styles={
    input:{
        color:"white"
    }
}
const theme=createTheme({
    overrides: {
        MuiOutlinedInput:{
            root:{
                position: 'relative',
                '& $notchedOutline': {
                borderColor: 'rgba(255, 255, 255)',
            }
            }
        },
        MuiInputLabel: { // Name of the component ⚛️ / style sheet
          root: { // Name of the rule
            color: "white",
            "&$focused": { // increase the specificity for the pseudo class
              color: "white"
            }
          }
        }
      }
})
class SearchPage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            search:''
        }
        this.handleChange=this.handleChange.bind(this);
    }


    handleChange=(event)=>{
        event.preventDefault();
        const {fetchSuggestionsAsync}=this.props;
        const {name,value}=event.target;
        this.setState({[name]:value},
            fetchSuggestionsAsync(value))
    }

    handleChange1=(value)=>{
        this.setState({'search':value})
    }


    render(){
        const {search} =this.state;
        const {suggestions,classes}=this.props;
        return(
            <div className='search-page'>
                <h2 className="text-center search-title">Search Across 10k+ Movies and 40k+ Actors and Directors</h2>
                <div className='search-bar'>
                    <ThemeProvider theme={theme}>
                    <Autocomplete
                        freeSolo
                        id="searchField"
                        disableClearable
                        options={suggestions}
                        onChange={(event,value)=>this.handleChange1(value)}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Movies/Actors/Directors/Plot/Genres"
                            margin="normal"
                            variant="outlined"
                            name="search"
                            value={search}
                            onChange={this.handleChange}
                            InputProps={{ ...params.InputProps,className: classes.input, type: 'search' }}
                        />
                        )}
                    />
                    </ThemeProvider>
                </div>
                <div className='searchButton'>
                    <Link className="search-link" to={`/searchPage/${this.state.search}`}>
                        <Button variant="outlined" type="submit" color="inherit" size="large" value={search}>Search</Button>
                    </Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps=createStructuredSelector({
    suggestions:selectSuggestions,
    isSuggestionsFetching:selectSuggestionsFetching,
    isSuggestionsLoaded:selectSuggestionsLoaded,
})

const mapDispatchToProps=dispatch=>({
    fetchSuggestionsAsync:(value)=>dispatch(fetchSuggestionsAsync(value))
})
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(SearchPage));