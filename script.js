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
      $(".boxi").append(animalDiv);
      var q = $("<p></p>");
      q.text("Author : " + response2.response.docs[i].byline.original);
      animalDiv.append(q);
      $(".boxi").append(animalDiv);
      var r = $("<p></p>");
      r.text("Section : " + response2.response.docs[i].section_name);
      animalDiv.append(r);
      $(".boxi").append(animalDiv);
      var s = $("<p></p>");
      s.text("Date published : " + response2.response.docs[i].pub_date);
      animalDiv.append(s);
      $(".boxi").append(animalDiv);
      var t = $("<a></a>");
      t.addClass("webUrl");
      t.attr("href", response2.response.docs[i].web_url);
      t.text(JSON.stringify(response2.response.docs[i].web_url));
      animalDiv.append(t);
      $(".boxi").append(animalDiv);
      var u = $("<hr />");
      u.addClass("webUrl");
      animalDiv.append(u);
      $(".boxi").append(animalDiv);
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
  $(".boxi").empty();
  for (var i = 0; i < 10; i++) {
    var animalDiv = $("<div></div>");
    animalDiv.addClass("responseNyt");
    var m = $("<h5></h5>");
    m.text(JSON.stringify(videos[i].competition.name));
    animalDiv.append(m);
    var n = $("<a></a>");
    n.attr("href", videos[i].side1.url);
    n.text(JSON.stringify(videos[i].side1.url));
    animalDiv.append(n);
    var k = $("<a></a>");
    k.attr("href", videos[i].side2.url);
    k.text(JSON.stringify(videos[i].side2.url));
    animalDiv.append(k);
    var p = $("<h5></h5>");
    p.text(JSON.stringify(videos[i].title));
    animalDiv.append(p);
    $(".boxi").append(animalDiv);
    var o = $("<img>");
    o.addClass("imageNews");
    o.attr("src", videos[i].thumbnail);
    $(".boxi").append(o);
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
  } else if (clickedBtn != "sports") {
    $(".boxi").empty();
    loadNews(clickedBtn);
  }
});

// starting functions
loadNews("covid-19");
moveTicker("covid-19");

// video
$(".is-active2").on("click", function () {
  function getVideo() {
    $.ajax({
      type: 'GET',
      url: 'https://www.googleapis.com/youtube/v3/search',
      data: {
          key: 'AIzaSyBI75VwxiTaM3dqg9qNYrllTFLyYnuIFaU',
          q: "top 10 viral 2020",
          part: 'snippet',
          maxResults: 1,
          type: 'video',
          videoEmbeddable: true,
      },
      success: function(data){
          embedVideo(data)
      },
      error: function(response){
          console.log("Request Failed");
      }
    });
  }
  function embedVideo(data) {
    let newDiv=$("<div></div>");
    $(".box").append(newDiv);
    let selectSrc=$('<iframe></iframe>').attr('src', 'https://www.youtube.com/embed/' + data.items[0].id.videoId);
   newDiv.append(selectSrc)
  newDiv.append($("<p>").attr("style","font-size:9px;").text(data.items[0].snippet.title));
    // $('.description').text(data.items[0].snippet.description)
}
getVideo();
});


// music
$(".is-active1").on("click", function () {
  function getVideo() {
    $.ajax({
      type: 'GET',
      url: 'https://www.googleapis.com/youtube/v3/search',
      data: {
          key: 'AIzaSyBI75VwxiTaM3dqg9qNYrllTFLyYnuIFaU',
          q: "top 5 music july 2020",
          part: 'snippet',
          maxResults: 1,
          type: 'video',
          videoEmbeddable: true,
      },
      success: function(data){
          embedVideo(data)
      },
      error: function(response){
          console.log("Request Failed");
      }
    });
  }
  function embedVideo(data) {
    let newDiv=$("<div></div>");
    $(".box").append(newDiv);
    let selectSrc=$('<iframe></iframe>').attr('src', 'https://www.youtube.com/embed/' + data.items[0].id.videoId);
   newDiv.append(selectSrc)
  newDiv.append($("<p>").attr("style","font-size:9px;").text(data.items[0].snippet.title));
    // $('.description').text(data.items[0].snippet.description)
}
getVideo();
});