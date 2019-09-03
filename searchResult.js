//get the url from the window and parse the search text
var url = window.location.href
url = new URL(url)
var searchQuery = url.searchParams.get('search')
var pageNo = 1
//set the search box value to searchQuery
document.getElementById("search").value = localStorage.getItem('searchQuery')
//if there is a valid searchQuery make a request
if(searchQuery != undefined || searchQuery != null)
    makeRequest()

//create new elements for every movie 
function addResult(movie){
    var newElement = '<div class="result"> <div class="result-poster"> <a href="movie.html?title='+ movie.imdbID+'"><img src="'
    newElement+=movie.Poster;
    newElement+='" onerror="this.src='+"'https://via.placeholder.com/150x210';"+'"/></a></div><div class="result-description"><div class="result-title"><a href="movie.html?title='+movie.imdbID+'">'
    newElement+=movie.Title;
    newElement+='</a></div><div class="result-rating"><span>'
    newElement+="IMDb</span><span>"
    newElement+=movie.Year+"</span><span>"
    newElement+=movie.Type.charAt(0).toUpperCase()+movie.Type.slice(1)+"</span></div></div></div>"

    // console.log(newElement)
    document.getElementsByClassName('results-container')[0].innerHTML+=newElement
    // console.log(movie)
}
//load more
function loadMore(){
    // console.log(pageNo)
    makeRequest()
}
//incase of false response then display no results
function displayNoResults(msg){
    var element = '<div class ="no-result"><h1>Aw, Snap!<br/>'+msg +'</h1></div>'
    document.getElementsByClassName('results-container')[0].innerHTML=element
}
//store the results in the localStorage
function storeSearchResult(data){
    if (typeof (Storage) !== "undefined") {
        if(localStorage.getItem(data.searchQuery) == null)
            localStorage.setItem(data.searchQuery, JSON.stringify(data));
            else{
                var temp = JSON.parse(localStorage.getItem(data.searchQuery))
                temp.result.push(data.result)
                localStorage.setItem(data.searchQuery, JSON.stringify(temp));
        }
    }
    else {
        alert("Sorry, your browser does not support web storage...");
    }
}

function storeSearchKeyword(key){
    if (typeof (Storage) !== "undefined") {
            localStorage.setItem("searchQuery", key);
        // if(localStorage.getItem('searchQuery') == null){
        //     // var temp = {searchQuery: [key]}
        // }
        // else{
        //     var temp = JSON.parse(localStorage.getItem('searchQuery'))
        //     console.log(temp)
        //     temp.searchQuery.push(key)
        //     localStorage.setItem("searchQuery",JSON.stringify(temp))
        // }
    }
    else {
        alert("Sorry, your browser does not support web storage...");
    }
}

//make a request using fetch
function makeRequest(){
    if(searchQuery !== undefined && searchQuery != null){
        var omdburl = "https://www.omdbapi.com/?s="+searchQuery+"&apikey=943ff609&page="+(pageNo++)
        var res = fetch(omdburl).then(
            response => response.json()).then(
                result => {
                    // console.log(result)
                    if(result.Response == "True"){
                        var data = {
                            searchQuery,
                            result: result.Search
                        }
                        storeSearchResult(data)
                        storeSearchKeyword(searchQuery)
                        result.Search.forEach(element => {
                            addResult(element)
                        });
                    }else{
                        displayNoResults("No movies found")
                    }
                }
            ).catch(error => {
                displayNoResults("Failed fetching movies!")
            })
    }else{
        var key = localStorage.getItem("searchQuery")
        var data = JSON.parse(localStorage.getItem(key))
        data.result.forEach(movie => {
            addResult(movie)
        })
    }
}