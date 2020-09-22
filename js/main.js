$(document).ready(function(){

  // funzione cerca al click sul bottone
  $(".search_button").click(function(){
    //svuoto subito il contenuto della lista del momento
    $("#movies-list").html("");

    var searchMovie = $(".search_input").val();
    stampaFilm(searchMovie);

    //svuoto il valore della input del momento
    $(".search_input").val("");
  });

  // funzione cerca premendo invio
  $(".search_input").keyup(function(){

    if(event.which == 13){
      $("#movies-list").html("");

      var searchMovie = $(".search_input").val();
      stampaFilm(searchMovie);

      $(".search_input").val("");
    }

  });

});

//Printa il risultato della risposta a schermo
function stampaFilm(cercaFilm){
  var api_key = "e985f53e1e87b07c7fd1095468f025a0";

  //preparo il template
  var source = $("#movies-template").html();
  var template = Handlebars.compile(source);

  $.ajax(
    {
      "url": "https://api.themoviedb.org/3/search/movie",
      "data": {
        "api_key" : api_key,
        "language": "it-IT",
        "page": 1,
        "query": cercaFilm
      },
      "method": "GET",
      "success": function (data, stato) {
        //array del risultato
        var results = data.results;

        for(var i = 0; i < results.length; i++){

          var context = {
            "title": results[i].title,
            "original_title": results[i].original_title,
            "original_language" : results[i].original_language,
            "vote_average": results[i].vote_average
          };

          var html = template(context);

          $("#movies-list").append(html);
        }
      },
      "error": function (richiesta, stato, errori) {
        alert("E' avvenuto un errore. " + errori);
      }
    }
  );
}
