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
  $(".box").empty();
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
    var k = $("<a></a>");
    k.attr("href", videos[i].side2.url);
    k.text(JSON.stringify(videos[i].side2.url));
    animalDiv.append(k);
    var p = $("<h5></h5>");
    p.text(JSON.stringify(videos[i].title));
    animalDiv.append(p);
    $(".box").append(animalDiv);
    var o = $("<img>");
    o.addClass("imageNews");
    o.attr("src", videos[i].thumbnail);
    $(".box").append(o);
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
    $(".boxi").empty();
    loadNews("Technology");
  } else if (clickedBtn === "Politics" || clickedBtn == "politics") {
    $(".boxi").empty();
    loadNews("Politics");
  } else if (clickedBtn === "Health" || clickedBtn == "health") {
    $(".boxi").empty();
    loadNews("Health");
  }
});

$("#btnSearch").on("click", function (event) {
  event.preventDefault();
  var clickedSrch = $(".txtInput").val();
  // console.log("searching : ", clickedSrch);
  $(".box").empty();
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
        $(".box").append(o);
        animalDiv.append(o);
        var m = $("<p></p>");
        m.addClass("textNumber");
        m.text(JSON.stringify(data.hits[i].downloads));
        animalDiv.append(m);
        $(".box").append(m);
        var n = $("<a></a><br>");
        n.attr("href", data.hits[i].previewURL);
        n.text(JSON.stringify(data.hits[i].previewURL));
        n.addClass("textUrl");
        animalDiv.append(n);
        $(".box").append(animalDiv);
      });
    else console.log("No hits");
  });
}

// starting functions
loadNews("covid-19");
moveTicker("covid-19");
