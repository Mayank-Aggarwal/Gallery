import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { searchImageData } from "../../actions";
import './Search.css';

const SuggestionsListComponent = ({ filteredSuggestions, onSuggest }) => {
    return filteredSuggestions.length ? (
      <ul className="suggestions">
        {filteredSuggestions.map((suggestion, index) => {
          
          return (
            <li key={suggestion} onClick={e => onSuggest(e)}>
              {suggestion}
            </li>
          );
        })}
      </ul>
    ) : null;
};

const Search = () => {
    const [value, setValue] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const sugg = JSON.parse(localStorage.getItem("suggestions"));
        const keys = sugg ? Object.keys(sugg) : [];
        if (sugg && keys.length > 0) {
            setSuggestions(keys);
        } else {
            setSuggestions([]);
        }
    }, [])

    const onChange = (e) => {
        const userInput = e.target.value;
    
        // Filter our suggestions that don't contain the user's input
        const unLinked = suggestions.filter(
          (suggestion) =>
            suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );
    
        setValue(e.target.value);
        setFilteredSuggestions(unLinked);
        setShowSuggestions(true);
    };

    const onClick = (e) => {
        const input = e.target.innerText;
        setFilteredSuggestions([]);
        setValue(input);
        setShowSuggestions(false);
        handleClick(input);
      };

    const handleClick = (input = "") => {
        const searchTerm = input ? input : value;
        dispatch(searchImageData(`text=${searchTerm}`));
        const sugg = JSON.parse(localStorage.getItem("suggestions"));
        const keys = sugg ? Object.keys(sugg) : [];
        if (sugg && keys.length > 0) {
            if(!keys.includes(searchTerm)) {
                setSuggestions([...keys, searchTerm]);
                localStorage.setItem("suggestions", JSON.stringify({ ...sugg, [searchTerm]: 1 }))
            }
        } else {
            setSuggestions([searchTerm]);
            localStorage.setItem("suggestions", JSON.stringify({ [searchTerm]: 1 }))
        }
    }
    const handleKeypress = e => {
      if (e.charCode === 13) {
        handleClick();
      }
    }; 
    return (
        <div className="form-inline d-flex flex-row">
            <input className="form" type="search" value={value} aria-label="Search" placeholder="Search Images..." onChange={onChange} onKeyPress={handleKeypress}/>
            {showSuggestions && value && <SuggestionsListComponent filteredSuggestions={filteredSuggestions} onSuggest={(e)  => onClick(e)} />}
            <button className="btn btn-outline-success my-2 my-sm-0 " type="submit" onClick={() => handleClick()}><i class="fa fa-search"></i></button>
        </div>
    )
}

export default Search