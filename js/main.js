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
      var searchMovie = $(".search_input").val();
      $(".search_bar").attr("data-search", searchMovie);
      stampaFilm(searchMovie);

      $(".search_input").val("");
    }

  });

  //click sul quadratino prende il valore di data-page e passiamo il valore alla funzione stampaFilm
  $(document).on("click", ".numero_pagine", function(){
    //seleziono con il this
    var numeroPagina = $(this).attr("data-page");
    var lastSearch = $(".search_bar").attr("data-search");
    stampaFilm(lastSearch, numeroPagina);
  });

});

//Printa il risultato della risposta a schermo
function stampaFilm(cercaFilm, pagina){
  //svuoto contenuti
  $("#movies-list").html("");
  $(".movies-page-list").html("");

  //pagina==null
  if(pagina == ""){
    var pagina = 1;
  }
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
        "page": pagina,
        "query": cercaFilm
      },
      "method": "GET",
      "success": function (data, stato) {
        //array del risultato
        var results = data.results;
        var pageNumber = data.total_pages;

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
        stampaPagine(pageNumber);
      },
      "error": function (richiesta, stato, errori) {
        alert("E' avvenuto un errore. " + errori);
      }
    }
  );
}

//stampo il numero di pagine della chiamata
function stampaPagine(numeroPagine){
  //preparo il template
  var source = $("#pages-template").html();
  var template = Handlebars.compile(source);

  for(var i = 1; i <= numeroPagine; i++){
    var context = {
      "page": i
    }

    var html = template(context);

    $(".movies-page-list").append(html);
  }
}
