var movies = [];

function Ticket(movie, inputTime, inputAge){
  this.movie = movie;
  this.movieTitle = movie.movieTitle;
  this.time = inputTime;
  this.age = inputAge;

  var discountType;
  if(this.age < 13){
    discountType = "Child";
  } else if(this.age >= 60){
    discountType = "Senior"
  } else {
    discountType = "Adult";
  }
  this.discount = discountType;
}

function Movie(title,duration,release){
  this.movieTitle = title;
  this.availableTimes = [];
  this.firstRelease = release;
  this.duration = duration;
}

movies.push(new Movie("Serenity", 119,false));
movies.push(new Movie("Jurassic World", 125,true));
movies.push(new Movie("Terminator", 108,false));
movies.push(new Movie("Wall-e", 104,false));

function minutesToHours(minutes){
  var formattedMinutes;
  if(minutes%60 === 0){
    formattedMinutes = '00'
  } else if(minutes%60 < 10){
    formattedMinutes = '0' + minutes%60;
  } else {
    formattedMinutes = minutes%60;
  }
  return Math.floor(minutes/60) + ":" + formattedMinutes;
}

movies.forEach(function(movie){
  var time = 420;
  while(time <= 1140){
    movie.availableTimes.push(minutesToHours(time));
    time += movie.duration + 15;
  }
})

Ticket.prototype.getPrice = function(){
  var price = 12
  if(this.age < 13 || this.age >= 60){
    price -= 4;
  }
  if(this.time === "7:00"){
    price -= 2;
  }
  if(this.movie.firstRelease){
    price += 2;
  }
  return price;
}

$(document).ready(function(){
  movies.forEach(function(movie, index){
    $("#movieTitles").append("<option value=" + index + ">" + movie.movieTitle + "</option>");
  })

  $("#movieTitles").change(function(){
    $("#ticketDisplay").hide();
    $("select#times").empty();
    $("select#times").append("<option selected disabled>Choose a time</option>");
    var index = $("#movieTitles").val();
    var movie = movies[index];
    $("#selectedMovie").text(movie.movieTitle);
    movie.availableTimes.forEach(function(time, index){
      $("select#times").append("<option>" + time + "</option>");
    })
    $("#movieTimes").show();
  })

  $("#buyTicket").submit(function(event){
    event.preventDefault();
    var age = parseInt($("#userAge").val());
    var movieIndex = parseInt($("#movieTitles").val());
    var movie = movies[movieIndex];
    var time =  $("select#times").val();

    var newTicket = new Ticket(movie,time,age);

    $("#outputName").text(newTicket.movieTitle);
    $("#outputPrice").text(newTicket.discount + ": $" + newTicket.getPrice() + ".00");
    $("#outputTime").text("Time: " + newTicket.time);
    $("#theatre").text("Theatre number: " + (movieIndex + 1));
    $("#ticketDisplay").show();
  });
});
