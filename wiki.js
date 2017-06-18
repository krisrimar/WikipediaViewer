
//CONSTANTS

const DEBUG = false;
const MAX_ALLOWED_TEXT_LENGTH = 320;

//LINKS

const wikipediaSearchAPILink ="http://en.wikipedia.org/w/api.php?action=query&generator=search&format=json&prop=info|extracts|pageterms&exintro=true&exchars=320&inprop=url&gsrsearch=";

//TEXT

//UI ELEMENT IDs

const searchResultsID = "#search-results";
const searchWikiButtonID = "#search-wiki";
const searchTextID = "#search-text";

//VARIABLES

//CODE

function crop(text) {
  if(text.length > MAX_ALLOWED_TEXT_LENGTH) {
    text = text.substr(0,MAX_ALLOWED_TEXT_LENGTH) + "...";
  }
  return text;
}

function displaySearchResults(data) {

  if(DEBUG) { console.log("Displaying results"); };

  var searchResultsArray = data.query.pages;

  //TO DO: handle error when user searches an empty string

  for(var key in searchResultsArray) {

    if(DEBUG) { console.log(searchResultsArray[key].title); };

    $(searchResultsID).append("<a href=" + searchResultsArray[key].fullurl + "><div class='card' style='padding:10px;margin-bottom:10px'><h4>" + searchResultsArray[key].title + "</h4><p>" + crop(searchResultsArray[key].extract) + "</p></div></a>");
  }
}


function makeRequest(searchText) {
  $(searchResultsID).empty();
  $.ajax({
    type: "GET",
    url: wikipediaSearchAPILink + searchText,
    data: searchText,
    dataType: 'json',
    type: 'POST',
    headers: { 'Api-User-Agent': 'KrisRimarWiki/1.1 (rimarkris@gmail.com)'},
    success: function(data) {

      if(DEBUG) { console.log("Value of search: " + searchText); };
      if(DEBUG) { console.log("Received results of AJAX request"); };

      displaySearchResults(data);

    },
    error: function(error) {
      if(DEBUG) { console.log("no search results"); };
    },
    cache: false
  });
}

//MAIN

$(document).ready(function(){
  if(DEBUG) { makeRequest("hell"); };

  //Make request when user is on search field an presses "Enter" button
  $(searchTextID).keyup(function(event){
    if(event.keyCode == 13){
      makeRequest($(searchTextID).val());
    }
  });

  //Make request when user presses "Seach" button on the UI
  $(searchWikiButtonID).on('click', function(e) {
    makeRequest($(searchTextID).val());
  });
});
