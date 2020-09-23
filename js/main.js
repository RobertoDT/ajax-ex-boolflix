$(document).ready(function(){
  //variabile globale
  var lastSearch = "";


  // funzione cerca al click sul bottone
  $(".search_button").click(function(){
    //prendo il valore dell'input e lo salvo in variabile
    var searchMovie = $(".search_input").val();
    lastSearch = $(".search_input").val();
    if(searchMovie != ""){
      //invoco funzione per stampare a schermo la lista di film
      clear();
      getMovies(searchMovie);

      //svuoto il valore della input del momento
      $(".search_input").val("");
    }
  });

  // funzione cerca premendo invio
  $(".search_input").keyup(function(){

    if(event.which == 13){
      var searchMovie = $(".search_input").val();
      //setto l'attriburo come valore della input per salvarlo
      lastSearch = $(".search_input").val();
      if(searchMovie != ""){
        clear();
        getMovies(searchMovie);

        $(".search_input").val("");
      }
    }

  });

  //click sul quadratino prende il valore di data-page e passiamo il valore alla funzione stampaFilm
  $(document).on("click", ".numero_pagine", function(){
    //seleziono con il this cioè quel quadratino che vado a selezionare
    var numeroPagina = $(this).attr("data-page");
    getMovies(lastSearch, numeroPagina);
    clear();
  });

});
// /document

//FUNZIONI
function getMovies(cercaFilm, pagina){
  var api_key = "e985f53e1e87b07c7fd1095468f025a0";

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

        stampaFilm(data);
        stampaPagine(data);

      },
      "error": function (richiesta, stato, errori) {
        alert("E' avvenuto un errore. " + errori);
      }
    }
  );
}


//Printa il risultato della risposta a schermo con i film e il numero di pagine
function stampaFilm(data, pagina){

  //pagina==null
  // if(pagina == ""){
  //   var pagina = 1;
  // }

  //preparo il template
  var source = $("#movies-template").html();
  var template = Handlebars.compile(source);

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
}


//stampo il numero di pagine della chiamata
function stampaPagine(data){
  var pageNumber = data.total_pages;
  //preparo il template
  var source = $("#pages-template").html();
  var template = Handlebars.compile(source);

  //ciclo i numeri delle pagine prodotte dal risutato della query e compilo il context
  for(var i = 1; i <= pageNumber; i++){
    var context = {
      "page": i
    }

    var html = template(context);
    //stampo nel DOM
    $(".movies-page-list").append(html);
  }
}


function clear(){
  //svuoto contenuti della lista di film e dei quadratini
  $("#movies-list").html("");
  $(".movies-page-list").html("");
}
