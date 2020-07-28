function loadNews(searchWord) {
  var queryURL =
    "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" +
    searchWord +
    "&fq=source:The+New+York+Times&api-key=uGYML0VIyPS3Za2FVfIRlyWHH82oGQZ3";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response2) {
    for (var i = 0; i < 10; i++) {
      let artData = "response2.response.docs[" + i + "].byline";
      var animalDiv = $("<div></div>");
      animalDiv.addClass("responseNyt");
      var o = $("<img>");
      o.addClass("imageNews");
      o.attr(
        "src",
        "https://www.nytimes.com/" +
          response2.response.docs[i].multimedia[20].url
      );
      // console.log("Headline : ", response2);
      animalDiv.append(o);
      var p = $("<p></p>");
      p.text("Headline : " + response2.response.docs[i].abstract);
      animalDiv.append(p);
      $(".box-left").append(animalDiv);
      var q = $("<p></p>");
      q.text("Author : " + response2.response.docs[i].byline.original);
      animalDiv.append(q);
      $(".box-left").append(animalDiv);
      var r = $("<p></p>");
      r.text("Section : " + response2.response.docs[i].section_name);
      animalDiv.append(r);
      $(".box-left").append(animalDiv);
      var s = $("<p></p>");
      s.text("Date published : " + response2.response.docs[i].pub_date);
      animalDiv.append(s);
      $(".box-left").append(animalDiv);
      var t = $("<a></a>");
      t.addClass("webUrl");
      t.attr("href", response2.response.docs[i].web_url);
      t.text(JSON.stringify(response2.response.docs[i].web_url));
      animalDiv.append(t);
      $(".box-left").append(animalDiv);
      var u = $("<hr />");
      u.addClass("webUrl");
      animalDiv.append(u);
      $(".box-left").append(animalDiv);
    }
  });
}

//Function to add information to the News Ticker

function moveTicker() {
  var queryURL =
    "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=uGYML0VIyPS3Za2FVfIRlyWHH82oGQZ3";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response2) {
    var tckr = "";
    var news = "";
    for (var i = 0; i < 7; i++) {
      tckr = "ticker" + i;
      ticker1 = $("#news" + i);
      // console.log("ticker", tckr, ticker1, response2.results[i].title);
      ticker1.text(response2.results[i].title);
    }
  });
}

// Function to render pictures for the sports/soccer section

function renderSportsNews(news) {
  var newsItem;
  var soccerNewsDiv;
  var headlineContainer;
  var headline;
  var headlineLink;
  var competitionContainer;
  var team1;
  var team2;
  var imageLink;
  var imageUrl;
  var imageTag;

  $(".box-left").empty();

  for (var i = 0; i < 10; i++) {
    newsItem = news[i];

    soccerNewsDiv = $("<div></div>");
    soccerNewsDiv.addClass("nytArticle");

    headline = $("<h3></h3>").attr("class", "headline");
    headline.text(JSON.stringify(newsItem.competition.name).replace(/"/g, ""));
    headlineLink = $("<a></a>");
    headlineLink.attr("href", newsItem.competition.url);
    headlineLink.append(headline);
    headlineContainer = $("<div></div>");
    headlineContainer.attr("class", "headline-container");
    headlineContainer.append(headlineLink);
    soccerNewsDiv.append(headlineContainer);

    competitionContainer = $("<div></div>");
    competitionContainer.attr("class", "competition-container");

    team1 = $("<a></a>");
    team1.attr("href", newsItem.side1.url);
    team1.attr("class", "team");
    team1.text(JSON.stringify(newsItem.side1.name).replace(/"/g, ""));
    competitionContainer.append(team1);
    competitionContainer.append(" <span>vs</span> ");

    team2 = $("<a></a>");
    team2.attr("href", newsItem.side2.url);
    team2.attr("class", "team");
    team2.text(JSON.stringify(newsItem.side2.name).replace(/"/g, ""));
    competitionContainer.append(team2);

    soccerNewsDiv.append(competitionContainer);

    $(".box-left").append(soccerNewsDiv);

    imageUrl = newsItem.competition.url;
    imageLink = $("<a>");
    imageLink.attr("href", imageUrl);
    imageTag = $("<img>").attr("src", newsItem.thumbnail);
    imageTag.attr("class", "game-photo");
    imageTag.addClass("imageSports");
    imageLink.wrapInner(imageTag).parent();
    $(".box-left").append(imageLink);
    $(".box-left").append("<br>");
  }
}

// Ajax call for Rapid API - soccer

function sports() {
  var settings = {
    async: true,
    "  crossDomain": true,
    url: "https://free-football-soccer-videos.p.rapidapi.com/",
    method: "GET",
    headers: {
      "x-rapidapi-host": "free-football-soccer-videos.p.rapidapi.com",
      "x-rapidapi-key": "e846e03355msh594f257a54b7d94p15ae95jsnf468134b6c22",
    },
  };
  $.ajax(settings).done(function (response) {
    renderSportsNews(response);
  });
}

// Function click Menu News

$(".navbar-item").on("click", function (event) {
  event.preventDefault();
  var clickedBtn = $(this).text().trim();
  if (clickedBtn === "sports" || clickedBtn === "Sports") {
    sports();
  } else if (clickedBtn === "Tech" || clickedBtn == "tech") {
    $(".box-left").empty();
    loadNews("Technology");
  } else if (clickedBtn === "Politics" || clickedBtn == "politics") {
    $(".box-left").empty();
    loadNews("Politics");
  } else if (clickedBtn === "Health" || clickedBtn == "health") {
    $(".box-left").empty();
    loadNews("Health");
  } else if (clickedBtn === "Covid-19 News" || clickedBtn == "covid-19 news") {
    $(".box-left").empty();
    loadNews("Covid-19");
  } else if (
    clickedBtn === "Covid-19 Statistics" ||
    clickedBtn == "covid-19 statistics"
  ) {
    $(".box-left").empty();
    loadNews("Covid-19 Statistics");
  }
});

// Button Search Click for the Pixabay Api Ajax Call

$("#btnSearch").on("click", function (event) {
  event.preventDefault();
  var clickedSrch = $(".txtInput").val();
  console.log("searching : ", clickedSrch);
  $(".box-left").empty();
  pictures(clickedSrch);
});

// Pixabay API Ajax call for the Search Button
function pictures(searchWord) {
  var b = $("<img><br>");
  b.addClass("imagePixabay");
  b.attr("src", "https://pixabay.com/static/img/public/leaderboard_b.png");
  $(".box-left").append(b);
  var API_KEY = "17639543-1a8aa8d189f802759b60ba76d";
  var URL =
    "https://pixabay.com/api/?key=" +
    API_KEY +
    "&q=" +
    encodeURIComponent(searchWord);
  $.getJSON(URL, function (data) {
    if (parseInt(data.totalHits) > 0)
      $.each(data.hits, function (i, hit) {
        var animalDiv = $("<div></div>");
        animalDiv.addClass("nytArticle");
        var o = $("<img><br>");
        o.addClass("imageNews");
        o.attr("src", data.hits[i].previewURL);
        $(".box-left").append(o);
        animalDiv.append(o);
        var m = $("<p></p>");
        m.addClass("textNumber");
        m.text("Number of Hits : " + JSON.stringify(data.hits[i].downloads));
        animalDiv.append(m);
        $(".box-left").append(m);
        var n = $("<a></a><br>");
        n.attr("href", data.hits[i].previewURL);
        n.text("URL : " + JSON.stringify(data.hits[i].previewURL));
        n.addClass("textUrl");
        animalDiv.append(n);
        $(".box-left").append(animalDiv);
      });
    else console.log("No hits");
  });
}

// starting functions
loadNews("covid-19");
moveTicker();

document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );
  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach((el) => {
      el.addEventListener("click", () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});

// function btn-side
function mainPage() {
  // as soon as click on sport kepp the #btn-side empty
  $("#main-page").empty();
  // but as soon as click on sport make a button
  let btnSide = $("<button></button>");
  btnSide.attr("id", "btnSide");
  btnSide.text("Home");
  btnSide.attr(
    "style",
    "background-color: #ffffff;border:0px; font-size:30px; color:#4a4a4a"
  );
  $("#main-page").append(btnSide);

  function toggleClock() {
    $(".box-right").empty();
    $("#main-page").html('<a id="atag">&nbsp;</a>');
    $(".box-right").html(
      '<span class="bd-notification is-info" id="main-box" data-target="target"><p>kekek</p></span'
    );
    $("#main-box").html(
      '<div class="box elai"><article class="media"><div class="media-left"><img src="./images/uci-profile2019.png" alt="uci-bootcamp" class="picImg"></div><div class="media-content"><div class="content"><h1>Today:<hr>UCI-Bootcamp have a presentation for the first project in this course.</h1><p>About the UC Irvine, Division of Continuing Education The University of California, Irvine Division of Continuing Education provides open enrollment learning opportunities, serving adult students online, at the UCI campus, and at employer sites nationally and worldwide.</p></div></div></article></div><div class="box"><article class="media"><div class="media-left"><figure class="image is-64x64"><img src="./images/0.jpeg" alt="Corey Burkett"></figure></div><div class="media-content"><div class="content"><p><strong>Corey Burkett</strong> <small>said:</small><br>We are going to present our first project very powerful.</p></div></div></article><article class="media"><div class="media-left"><figure class="image is-64x64"><img src="./images/Screen Shot 2020-07-26 at 12.57.30.png" alt="Maxx Sanner"></figure></div><div class="media-content"><div class="content"><p><strong>Maxx Sanner</strong> <small>said:</small><br>We would make it easy for everyone to feel to have a powerful project.</p></div></div></article><article class="media"><div class="media-left"><figure class="image is-64x64"><img src="./images/Screen Shot 2020-07-26 at 12.56.03.png" alt="Image"></figure></div><div class="media-content"><div class="content"><p><strong>Bryan Lowe</strong> <small>said:</small><br>I can not give you the answers.</p></div></div></article></br><hr><h1 style="font-size: larger; font-weight: 900em;">B-UPTODATE with the lastest news about UCI-Bootcamp</h1></div>'
    );
  }
  btnSide.click(function () {
    toggleClock();
  });
}

// about us section
$("#btn-side").on("click", function () {
  let newImg = $("<img></img>");
  newImg.attr("src", "./images/unnamed.jpg");
  newImg.attr("alt", "contact-us");
  $(".box-right").empty();
  $(".box-right").append(
    $("<div></div>").attr("style", "margin-left:9%;").append(newImg)
  );

  // first box func is about the page
  function firstBox() {
    let aboutDiv = $("<div></div>").attr("class", "about-div");
    $(".box-right").append(aboutDiv);
    let mainDiv = $("<div></div>").attr("class", "box");
    let article = $("<article></article>").attr("class", "media");
    let medconDiv = $("<div></div>").attr("class", "media-content");
    let contDiv = $("<div></div>").attr("class", "content");
    let h1 = $("<h1></h1>").attr("class", "first-subj");
    // needs to be up date
    h1.text(
      "@@@B-UPTODATE is a news page that helps people know more about everything ...... "
    );

    // needs to be up date
    let pTag = $("<p></p>")
      .attr("class", "ptag")
      .text(
        "B Up to date is an application that intends to show the latest news on different areas and also give some functionality on search, it is one enviroment that covers some of the fileds that interest to most for people"
      );
    aboutDiv.append(mainDiv);
    mainDiv.append(article);
    article.append(medconDiv);
    medconDiv.append(contDiv);
    contDiv.append(h1);
    contDiv.append(pTag);
  }

  // Harold box func
  function haroldBox() {
    let aboutDiv = $("<div></div>").attr("class", "about-div");
    $(".box-right").append(aboutDiv);

    let mainDiv = $("<div></div>").attr("class", "box");
    let article = $("<article></article>").attr("class", "media");

    let medlefDiv = $("<div></div>").attr("class", "media-left");
    let figure = $("<figure></figure>").attr("class", "image is-64x64");
    let imgTag = $("<img>").attr("src", "./images/Harold_Picture.jpg");

    let medconDiv = $("<div></div>").attr("class", "media-content");
    let contDiv = $("<div></div>").attr("class", "content");

    let h1 = $("<h1></h1>").attr("class", "first-subj");

    // needs to be up date
    h1.text("Harold Zuluaga");

    // needs to be up date
    let pTag = $("<p></p>")
      .attr("class", "ptag")
      .text(
        "Studied Computer Science, some coding experience in structured programming, Program Management Experience in Aerospace 4+ years."
      );

    aboutDiv.append(mainDiv);
    mainDiv.append(article);

    article.append(medlefDiv);
    medlefDiv.append(figure);
    figure.append(imgTag);

    article.append(medconDiv);
    medconDiv.append(contDiv);
    contDiv.append(h1);
    contDiv.append(pTag);
  }

  // Fernando box func
  function fernandoBox() {
    let aboutDiv = $("<div></div>").attr("class", "about-div");
    $(".box-right").append(aboutDiv);

    let mainDiv = $("<div></div>").attr("class", "box");
    let article = $("<article></article>").attr("class", "media");

    let medlefDiv = $("<div></div>").attr("class", "media-left");
    let figure = $("<figure></figure>").attr("class", "image is-64x64");
    let imgTag = $("<img>").attr("src", "./images/IMG_3192.jpg");

    let medconDiv = $("<div></div>").attr("class", "media-content");
    let contDiv = $("<div></div>").attr("class", "content");

    let h1 = $("<h1></h1>").attr("class", "first-subj");

    // needs to be up date
    h1.text("Fernando Angulo Donoso");

    // needs to be up date
    let pTag = $("<p></p>")
      .attr("class", "ptag")
      .text(
        "I did a little bit of Swift on my own a while ago, but I forgot most of it, at work sometimes I have to manipulate some HTML code because I do software support. I have a little programming knowledge beside this Bootcamp."
      );

    aboutDiv.append(mainDiv);
    mainDiv.append(article);

    article.append(medlefDiv);
    medlefDiv.append(figure);
    figure.append(imgTag);

    article.append(medconDiv);
    medconDiv.append(contDiv);
    contDiv.append(h1);
    contDiv.append(pTag);
  }

  // Amir box func
  function amirBox() {
    let aboutDiv = $("<div></div>").attr("class", "about-div");
    $(".box-right").append(aboutDiv);

    let mainDiv = $("<div></div>").attr("class", "box");
    let article = $("<article></article>").attr("class", "media");

    let medlefDiv = $("<div></div>").attr("class", "media-left");
    let figure = $("<figure></figure>").attr("class", "image is-64x64");
    let imgTag = $("<img>").attr("src", "./images/IMG_0899.jpg");

    let medconDiv = $("<div></div>").attr("class", "media-content");
    let contDiv = $("<div></div>").attr("class", "content");

    let h1 = $("<h1></h1>").attr("class", "first-subj");

    // needs to be up date
    h1.text("Amir Ashkan Salehian Dardashti");

    // needs to be up date
    let pTag = $("<p></p>")
      .attr("class", "ptag")
      .text(
        "Amir has an associate degree in computer since and also an associate degree in business administration and management. No coding experience."
      );

    aboutDiv.append(mainDiv);
    mainDiv.append(article);

    article.append(medlefDiv);
    medlefDiv.append(figure);
    figure.append(imgTag);

    article.append(medconDiv);
    medconDiv.append(contDiv);
    contDiv.append(h1);
    contDiv.append(pTag);
  }

  firstBox();
  haroldBox();
  fernandoBox();
  amirBox();
  mainPage();
});

// contact us section
$("#btn-side1").on("click", function () {
  $(".box-right").empty();

  let contactDiv = $("<div></div>");
  contactDiv.attr("class", "contact-div");
  $(".box-right").append(contactDiv);

  let newImg = $("<img></img>");
  newImg.attr("src", "./images/contact-us-hero.jpg");
  newImg.attr("alt", "contact-us");

  let secondSubj = $("<h1></h1>");
  secondSubj.attr("class", "first-subj");
  secondSubj.text(
    "@@@B-UPTODATE is a news page that helps people know more contact everything ...... "
  );
  let pargSubj2 = $("<p></p>");
  pargSubj2.text(
    "B Up to date is an application that intends to show the latest news on different areas and also give some functionality on search, it is one enviroment that covers some of the fileds that interest to most for people"
  );

  contactDiv.append(newImg);

  contactDiv.append(secondSubj);
  contactDiv.append(pargSubj2);

  mainPage();
});
