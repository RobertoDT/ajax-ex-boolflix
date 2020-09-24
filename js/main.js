$(document).ready(function(){
  // funzione cerca al click sul bottone
  $(".search_button").click(function(){
    //prendo il valore dell'input e lo salvo in variabile
    var searchMovie = $(".search_input").val("");

    if(searchMovie != ""){
      //svuoto contenuti della lista di film
      clear();
      //invoco funzione per stampare a schermo la lista di film
      getMovies(searchMovie);
      getSeries(searchMovie);

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
        getSeries(searchMovie);

        $(".search_input").val("");
      }
    }
  });

});
// /document

//FUNZIONI
//funzione che fa chiamata per la ricerca di film
function getMovies(cercaFilm){
  var api_key = "e985f53e1e87b07c7fd1095468f025a0";
  //chiamata per film
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

        stampaResults("Film", data);

      },
      "error": function (richiesta, stato, errori) {
        alert("E' avvenuto un errore. " + errori);
      }
    }
  );

}

//funzione che fa chiamata per la ricerca delle serieTv
function getSeries(cercaFilm){
  var api_key = "e985f53e1e87b07c7fd1095468f025a0";
  //chiamata per serieTv
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

        stampaResults("SerieTv", data);

      },
      "error": function (richiesta, stato, errori) {
        alert("E' avvenuto un errore. " + errori);
      }
    }
  );

}

//Printa il risultato della risposta a schermo con i film e le serieTv
function stampaResults(type, data){

  //preparo il template
  var source = $("#global-template").html();
  var template = Handlebars.compile(source);

  //array del risultato
  var results = data.results;
  for(var i = 0; i < results.length; i++){

    var title, original_title;
    if(type == "Film"){
      title = results[i].title;
      original_title = results[i].original_title;
    } else if(type == "SerieTv"){
      title = results[i].name;
      original_title = results[i].original_name;
    }

    //cambio i valori del context con le nuove chiavi della nuova chiamata API
    var context = {
      "title": title,
      "original_title": original_title,
      "original_language" : results[i].original_language,
      "vote_average": results[i].vote_average,
      "vote_star": convert(results[i].vote_average),
      "poster": results[i].poster_path,
      "type": type,
      "overview": results[i].overview
    };

    var html = template(context);
    $("#global-list").append(html);

  }
}

//funzione che svuota i contenuti della lista di film e serie quando faccio una nuova ricerca
function clear(){
  //svuoto contenuti della lista di film
  $("#global-list").html("");
}

//funzione che converte il numero decimale da 1 a 10 in un intero da 1 a 5 e restituisce il numero di stelle
function convert(vote){
  var newVote = Math.ceil(vote / 2);
  //setto la variabile vuota che andrò a popolare nel ciclo for
  var voteStar = "";

  for(var i = 1; i <= 5; i++){

    if(i < newVote){
      voteStar += "<i class='fas fa-star'></i>";
    } else{
      voteStar += "<i class='far fa-star'></i>";
    }
  }
  //la funzione mi restituirà il numero di stelline in base al voto
  return voteStar;
}
