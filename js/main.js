$(document).ready(function(){
  //variabile globale settata a vuota che andrò a riempire con il valore del campo input (mi servirà se utilizzerò il numero di pagine)
  // var lastSearch = "";


  // funzione cerca al click sul bottone
  $(".search_button").click(function(){
    //prendo il valore dell'input e lo salvo in variabile
    var searchMovie = $(".search_input").val("");
    //clono la variabile searchmovie
    // lastSearch = $(".search_input").val();
    if(searchMovie != ""){
      //svuoto contenuti della lista di film
      clear();
      //invoco funzione per stampare a schermo la lista di film
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
      // lastSearch = $(".search_input").val();
      if(searchMovie != ""){
        clear();
        getMovies(searchMovie);

        $(".search_input").val("");
      }
    }


  });

  //click sul quadratino prende il valore di data-page e passiamo il valore alla funzione stampaFilm
  // $(document).on("click", ".numero_pagine", function(){
  //   //seleziono con il this cioè quel quadratino che vado a selezionare
  //   var numeroPagina = $(this).attr("data-page");
  //   getMovies(lastSearch, numeroPagina);
  //   clear();
  // });

});
// /document

//FUNZIONI
function getMovies(cercaFilm){
  var api_key = "e985f53e1e87b07c7fd1095468f025a0";

  $.ajax(
    {
      "url": "https://api.themoviedb.org/3/search/movie",
      "data": {
        "api_key" : api_key,
        "language": "it-IT",
        "page": "",
        "query": cercaFilm
      },
      "method": "GET",
      "success": function (data, stato) {

        stampaFilm(data);
        // stampaPagine(data);

      },
      "error": function (richiesta, stato, errori) {
        alert("E' avvenuto un errore. " + errori);
      }
    }
  );

  //seconda chiamata ajax
  $.ajax(
    {
      "url": "https://api.themoviedb.org/3/search/tv",
      "data": {
        "api_key" : api_key,
        "language": "it-IT",
        "page": "",
        "query": cercaFilm
      },
      "method": "GET",
      "success": function (data, stato) {

        stampaSerie(data);
        // stampaPagine(data);

      },
      "error": function (richiesta, stato, errori) {
        alert("E' avvenuto un errore. " + errori);
      }
    }
  );

}


function stampaSerie(data){

    //pagina==null
    // if(pagina == ""){
    //   var pagina = 1;
    // }

    //preparo il template
    var source = $("#series-template").html();
    var template = Handlebars.compile(source);

    //array del risultato
    var results = data.results;
    for(var i = 0; i < results.length; i++){

      //mi prendo il voto e lo trasformo in stelle
      var voto = convert(results[i].vote_average);
      //mi prendo la lingua e la trasformo in bandiera (includendo anche inghilterra e giappone)
      var originalLanguage = translation(results[i].original_language);

      var context = {
        "name": results[i].name,
        "original_name": results[i].original_name,
        "original_language" : originalLanguage,
        "vote_average": results[i].vote_average,
        "vote_star": voto
      };

      var html = template(context);
      $("#global-list").append(html);

    }
}


//Printa il risultato della risposta a schermo con i film e il numero di pagine
function stampaFilm(data){

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

    var originalLanguage = translation(results[i].original_language);

    //mi prendo il voto e lo trasformo in stelle
    var voto = convert(results[i].vote_average);

    //cambio i valori del context con le nuove chiavi della nuova chiamata API
    var context = {
      "title": results[i].title,
      "original_title": results[i].original_title,
      "original_language" : originalLanguage,
      "vote_average": results[i].vote_average,
      "vote_star": voto
    };

    var html = template(context);
    $("#global-list").append(html);

  }
}


//stampo il numero di pagine della chiamata
// function stampaPagine(data){
//   var pageNumber = data.total_pages;
//   //preparo il template
//   var source = $("#pages-template").html();
//   var template = Handlebars.compile(source);
//
//   //ciclo i numeri delle pagine prodotte dal risutato della query e compilo il context
//   for(var i = 1; i <= pageNumber; i++){
//     var context = {
//       "page": i
//     }
//
//     var html = template(context);
//     //stampo nel DOM
//     $(".movies-page-list").append(html);
//   }
// }


//funzione che svuota i contenuti della lista di film e serie quando faccio una nuova ricerca
function clear(){
  //svuoto contenuti della lista di film e dei quadratini
  $("#global-list").html("");
  $(".movies-page-list").html("");
}


//funzione che converte il numero decimale da 1 a 10 in un intero da 1 a 5
function convert(vote){

  var newVote = Math.ceil(vote / 2);

  // preparo il template
  var source = $("#star-template").html();
  var template = Handlebars.compile(source);

  //il template è già compilato nell'html quindi non abbiamo il context
  var html = template();

  //setto la variabile vuota che andrò a popolare nel ciclo for
  var voteStar = "";

  for(var i = 0; i < newVote; i++){
    //ad ogni giro popolo la var aggiungendo ad ogni giro l'html che sarebbe la nuova stellina
    voteStar = voteStar + html;
  }

  //la funzione mi restituirà il numero di stelline in base al voto
  return voteStar;
}


//funzione per leggere anche la bandiera dell'inghilterra e del giappone
function translation(lang){

  if(lang == "en"){
    return "gb";
  } else if(lang == "ja"){
    return "jp";
  }

  return lang;
}
