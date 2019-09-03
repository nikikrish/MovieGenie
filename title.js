var url = window.location.href
url = new URL(url)
var searchQuery = url.searchParams.get('title')
// console.log(searchQuery)
if(searchQuery !== undefined && searchQuery != null){
    var res = fetch("https://www.omdbapi.com/?i="+searchQuery+"&apikey=943ff609").then(
        response => response.json()).then(
            result => {
                // console.log(result)
                displayMovie(result)
            }
        )
}
//update the value in the search box
document.getElementById("search").value = localStorage.getItem('searchQuery')

//function to display the Movie details
function displayMovie(data){
      var element = '<div class="movie-title"><b>'
      element+=data.Title+'</b></div><div class="movie-details"><span>'
      element+=data.Runtime+'</span><span>'
      element+=data.Year+'</span><span>'
      element+=data.Rated+'</span></div><div class="movie-plot">'
      element+=data.Plot+'</div><div class="movie-poster"><img src="'
      element+=data.Poster+'"/></div><div class="movies-credits"><table>'
      element+='<tr><td>Director</td><td class="table-value">'+data.Director+'</td></tr>'
      element+='<tr><td>Starring</td><td class="table-value">'+data.Actors+'</td></tr>'
      element+='<tr><td>Genres</td><td class="table-value">'+data.Genre+'</td></tr>'
      element+='<tr><td>Languages</td><td class="table-value">'+data.Language+'</td></tr>'
      element+='<tr><td>Box Office</td><td class="table-value">'+data.BoxOffice+'</td></tr>'
      //   element+='<div class="movie-ratings"><div class="ratings-title">Ratings</div>'
      data.Ratings.forEach(rating => {
          element+='<tr><td>'+rating.Source+'</td><td class="table-value">'
          element+=rating.Value+'</td></tr>'
        })
      element+='</table></div></div>'
    // console.log(element)
    document.getElementsByClassName('movie-container')[0].innerHTML = element
  }