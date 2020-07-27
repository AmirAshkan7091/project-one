function loadNews(searchWord) {
  var queryURL =
    "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" +
    searchWord +
    "&fq=source:The+New+York+Times&api-key=uGYML0VIyPS3Za2FVfIRlyWHH82oGQZ3";
  // console.log("estoy aqui:", queryURL);
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response2) {
    // console.log("estoy aqui 2 : ", response2);
    // console.log("uv1 ; ", response2);
    // console.log("uv2 ; ", response2.copyright);
    // console.log("uv3 ; ", response2);
    for (var i = 0; i < 10; i++) {
      let artData = "response2.response.docs[" + i + "].byline";
      // console.log(
      //   "https://www.nytimes.com/" +
      //     response2.response.docs[i].multimedia[20].url
      // );
      // console.log("uv2 ; ", response2.response.docs[i]);
      var animalDiv = $("<div></div>");
      animalDiv.addClass("responseNyt");
      var o = $("<img>");
      o.addClass("imageNews");
      o.attr(
        "src",
        "https://www.nytimes.com/" +
          response2.response.docs[i].multimedia[20].url
      );
      animalDiv.append(o);
      var p = $("<p></p>");
      p.text("Headline : " + response2.response.docs[i].headline.main);
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

function moveTicker(searchWord) {
  var queryURL =
    "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" +
    searchWord +
    "&fq=source:The+New+York+Times&api-key=uGYML0VIyPS3Za2FVfIRlyWHH82oGQZ3";
  // console.log("estoy aqui:", queryURL);
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response2) {
    //   let artData = "response2.response.docs[" + i + "].byline";
    //   p.text("Headline : " + response2.response.docs[i].headline.main);
    var ticker1 = $("#news");
    var ticker2 = $("#news1");
    var ticker3 = $("#new2");
    var ticker4 = $("#new2");
    var ticker5 = $("#new2");
    var ticker6 = $("#new2");
    var ticker7 = $("#new2");
    ticker1.text(response2.response.docs[0].headline.main);
    ticker2.text(response2.response.docs[1].headline.main);
    ticker3.text(response2.response.docs[2].headline.main);
    ticker4.text(response2.response.docs[3].headline.main);
    ticker5.text(response2.response.docs[4].headline.main);
    ticker6.text(response2.response.docs[5].headline.main);
    ticker7.text(response2.response.docs[6].headline.main);
  });
}

function renderVideos(videos) {
  $(".box-left").empty();
  for (var i = 0; i < 10; i++) {
    var animalDiv = $("<div></div>");
    animalDiv.addClass("nytArticle");
    var m = $("<h5></h5>");
    m.text(JSON.stringify(videos[i].competition.name));
    animalDiv.append(m);
    var n = $("<a></a><br>");
    n.attr("href", videos[i].side1.url);
    n.text(JSON.stringify(videos[i].side1.url));
    animalDiv.append(n);
    var k = $("<a></a><br>");
    k.attr("href", videos[i].side2.url);
    k.text(JSON.stringify(videos[i].side2.url));
    animalDiv.append(k);
    var l = $("<a></a>");
    l.attr("href", videos[i].side2.url);
    l.text(JSON.stringify(videos[i].competition.url));
    animalDiv.append(l);
    var p = $("<h5></h5>");
    p.text(JSON.stringify(videos[i].title));
    animalDiv.append(p);
    $(".box-left").append(animalDiv);
    var o = $("<a>");
    var b = videos[i].competition.url;
    o.attr("href", b);
    console.log(videos[i].competition.url);
    var a = $("<img>").attr("src", videos[i].thumbnail);
    a.addClass("imageSports");
    o.wrapInner(a).parent();
    $(".box-left").append(o);
  }
}

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
    renderVideos(response);
  });
}

// function click menu News

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
  }
});

$("#btnSearch").on("click", function (event) {
  event.preventDefault();
  var clickedSrch = $(".txtInput").val();
  console.log("searching : ", clickedSrch);
  $(".box-left").empty();
  pictures(clickedSrch);
});

function pictures(searchWord) {
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
        m.text(JSON.stringify(data.hits[i].downloads));
        animalDiv.append(m);
        $(".box-left").append(m);
        var n = $("<a></a><br>");
        n.attr("href", data.hits[i].previewURL);
        n.text(JSON.stringify(data.hits[i].previewURL));
        n.addClass("textUrl");
        animalDiv.append(n);
        $(".box-left").append(animalDiv);
      });
    else console.log("No hits");
  });
}

// starting functions
loadNews("covid-19");
moveTicker("covid-19");


document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }

});


// function btn-side
function mainPage(){
  // as soon as click on sport kepp the #btn-side empty
  $("#main-page").empty();
  // but as soon as click on sport make a button
      let btnSide= $("<button></button>");
      btnSide.attr('id','btnSide');
      btnSide.text("Home");
      btnSide.attr("style","background-color: #ffffff;border:0px; font-size:30px; color:#4a4a4a");
      $("#main-page").append(btnSide);

      function toggleClock() {
        $(".box-right").empty();
        $("#main-page").html('<a id="atag">&nbsp;</a>');
        $(".box-right").html('<span class="bd-notification is-info" id="main-box" data-target="target"><p>kekek</p></span');
        $("#main-box").html('<div class="box elai"><article class="media"><div class="media-left"><img src="./images/uci-profile2019.png" alt="uci-bootcamp" class="picImg"></div><div class="media-content"><div class="content"><h1>Today:<hr>UCI-Bootcamp have a presentation for the first project in this course.</h1><p>About the UC Irvine, Division of Continuing Education The University of California, Irvine Division of Continuing Education provides open enrollment learning opportunities, serving adult students online, at the UCI campus, and at employer sites nationally and worldwide.</p></div></div></article></div><div class="box"><article class="media"><div class="media-left"><figure class="image is-64x64"><img src="./images/0.jpeg" alt="Corey Burkett"></figure></div><div class="media-content"><div class="content"><p><strong>Corey Burkett</strong> <small>said:</small><br>We are going to present our first project very powerful.</p></div></div></article><article class="media"><div class="media-left"><figure class="image is-64x64"><img src="./images/Screen Shot 2020-07-26 at 12.57.30.png" alt="Maxx Sanner"></figure></div><div class="media-content"><div class="content"><p><strong>Maxx Sanner</strong> <small>said:</small><br>We would make it easy for everyone to feel to have a powerful project.</p></div></div></article><article class="media"><div class="media-left"><figure class="image is-64x64"><img src="./images/Screen Shot 2020-07-26 at 12.56.03.png" alt="Image"></figure></div><div class="media-content"><div class="content"><p><strong>Bryan Lowe</strong> <small>said:</small><br>I can not give you the answers.</p></div></div></article></br><hr><h1 style="font-size: larger; font-weight: 900em;">B-UPTODATE with the lastest news about UCI-Bootcamp</h1></div>');
      }


        btnSide.click(function(){
        toggleClock();
        });

  }


// about us section
$("#btn-side").on("click",function(){
  let newImg=$("<img></img>");
  newImg.attr("src","./images/unnamed.jpg");
  newImg.attr("alt","contact-us");
  $(".box-right").empty();
  $(".box-right").append($("<div></div>").attr("style","margin-left:9%;").append(newImg));





// first box func is about the page
function firstBox (){
  
  let aboutDiv=$("<div></div>").attr("class","about-div");
  $(".box-right").append(aboutDiv);

  let mainDiv=$("<div></div>").attr("class","box");
  let article=$("<article></article>").attr("class","media");

  let medconDiv=$("<div></div>").attr("class","media-content");
  let contDiv=$("<div></div>").attr("class","content");

  let h1=$("<h1></h1>").attr("class","first-subj");

// needs to be up date 
      h1.text("@@@B-UPTODATE is a news page that helps people know more about everything ...... ");

// needs to be up date 
  let pTag=$("<p></p>").attr("class","ptag").text("bla bla bla.....kdfkdjfkdfd dkfdf dkfd fkdf dfnd fkdf dfdf dkfd fkdf kn.....................");



  aboutDiv.append(mainDiv);
  mainDiv.append(article);
  article.append(medconDiv);
  medconDiv.append(contDiv);
  contDiv.append(h1)
  contDiv.append(pTag);

}

// Harold box func
function haroldBox (){
  
  let aboutDiv=$("<div></div>").attr("class","about-div");
  $(".box-right").append(aboutDiv);

  let mainDiv=$("<div></div>").attr("class","box");
  let article=$("<article></article>").attr("class","media");

  let medlefDiv=$("<div></div>").attr("class","media-left");
  let figure=$("<figure></figure>").attr("class","image is-64x64");
  let imgTag=$("<img>").attr("src","./images/Harold_Picture.jpg");

  let medconDiv=$("<div></div>").attr("class","media-content");
  let contDiv=$("<div></div>").attr("class","content");

  let h1=$("<h1></h1>").attr("class","first-subj");

// needs to be up date 
      h1.text("harold");

// needs to be up date 
  let pTag=$("<p></p>").attr("class","ptag").text("bla bla bla.....kdfkdjfkdfd dkfdf dkfd fkdf dfnd fkdf dfdf dkfd fkdf kn.....................");



  aboutDiv.append(mainDiv);
  mainDiv.append(article);

  article.append(medlefDiv);
  medlefDiv.append(figure);
  figure.append(imgTag);

  article.append(medconDiv);
  medconDiv.append(contDiv);
  contDiv.append(h1)
  contDiv.append(pTag);

}

// Fernando box func 
function fernandoBox (){
  
  let aboutDiv=$("<div></div>").attr("class","about-div");
  $(".box-right").append(aboutDiv);

  let mainDiv=$("<div></div>").attr("class","box");
  let article=$("<article></article>").attr("class","media");

  let medlefDiv=$("<div></div>").attr("class","media-left");
  let figure=$("<figure></figure>").attr("class","image is-64x64");
  let imgTag=$("<img>").attr("src","./images/IMG_3192.jpg");

  let medconDiv=$("<div></div>").attr("class","media-content");
  let contDiv=$("<div></div>").attr("class","content");

  let h1=$("<h1></h1>").attr("class","first-subj");

// needs to be up date 
      h1.text("fernando");

// needs to be up date 
  let pTag=$("<p></p>").attr("class","ptag").text("bla bla bla.....kdfkdjfkdfd dkfdf dkfd fkdf dfnd fkdf dfdf dkfd fkdf kn.....................");



  aboutDiv.append(mainDiv);
  mainDiv.append(article);

  article.append(medlefDiv);
  medlefDiv.append(figure);
  figure.append(imgTag);

  article.append(medconDiv);
  medconDiv.append(contDiv);
  contDiv.append(h1)
  contDiv.append(pTag);

}

// Amir box func 
function amirBox (){
  
  let aboutDiv=$("<div></div>").attr("class","about-div");
  $(".box-right").append(aboutDiv);

  let mainDiv=$("<div></div>").attr("class","box");
  let article=$("<article></article>").attr("class","media");

  let medlefDiv=$("<div></div>").attr("class","media-left");
  let figure=$("<figure></figure>").attr("class","image is-64x64");
  let imgTag=$("<img>").attr("src","./images/IMG_0899.jpg");

  let medconDiv=$("<div></div>").attr("class","media-content");
  let contDiv=$("<div></div>").attr("class","content");

  


  let h1=$("<h1></h1>").attr("class","first-subj");

// needs to be up date 
      h1.text("amir");

// needs to be up date 
  let pTag=$("<p></p>").attr("class","ptag").text("bla bla bla.....kdfkdjfkdfd dkfdf dkfd fkdf dfnd fkdf dfdf dkfd fkdf kn.....................");



  aboutDiv.append(mainDiv);
  mainDiv.append(article);

  article.append(medlefDiv);
  medlefDiv.append(figure);
  figure.append(imgTag);

  article.append(medconDiv);
  medconDiv.append(contDiv);
  contDiv.append(h1)
  contDiv.append(pTag);

}

firstBox();
haroldBox();
fernandoBox();
amirBox();
mainPage();


});







// contact us section
$("#btn-side1").on("click",function(){
  $(".box-right").empty();

 
  let contactDiv=$("<div></div>");
  contactDiv.attr("class","contact-div");
  $(".box-right").append(contactDiv);

  let newImg=$("<img></img>");
  newImg.attr("src","./images/contact-us-hero.jpg");
  newImg.attr("alt","contact-us");


  let secondSubj=$("<h1></h1>");
  secondSubj.attr("class","first-subj");
  secondSubj.text("@@@B-UPTODATE is a news page that helps people know more contact everything ...... ");
  let pargSubj2=$("<p></p>");
  pargSubj2.text("@@@@shsdsd dskdjskd dskdjksdjskjd sdjskjdks dskdjskdjsk ddjdkskdns shsndsndsndsnd ndskndskndd shfsjksjdksjdshfjshf jsfh jsh djsh jdshdjs dj djshd jshd js sjdh sjdh jss djs hd sj djshdjs  sdjshdj shs djsdhs ddjsdhjs dhjsdjsjhjhjhjhjhdjshdj");
  
  contactDiv.append(newImg);
  
  contactDiv.append(secondSubj);
  contactDiv.append(pargSubj2);

  mainPage()
});
