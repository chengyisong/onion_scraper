$(document).on("click", "#scrapeBtn", function () {
  $.ajax({
    method: "GET",
    url: "/scrape"
  }).then(function () {
    location.reload();
  })

})

$(document).on("click", "#clearBtn", function () {
  $.ajax({
    method: "POST",
    url: "/scrape"
  });
  location.reload();
})

$(document).on("click", "#saveBtn", function () {
  var thisId = $(this).attr("data-id");

  if ($(this).attr("data-isSaved") === "true") {
    console.log("true....")
    $(this).text("Save");
    $(this).attr("data-isSaved", false)
    $.ajax({
      method: "POST",
      url: "/news/" + thisId
    })
  } else {
    console.log("false....")
    $(this).text("UnSave");
    $(this).attr("data-isSaved", true);
    $.ajax({
      method: "GET",
      url: "/news/" + thisId
    })
  }
});

$(document).on("click", "#rmvSaveBtn", function () {
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "POST",
    url: "/news/" + thisId
  }).then(function () {
    location.reload();
  })
});

$(document).on("click", "#noteBtn", function () {
  var thisId = $(this).attr("data-id");
  $("#saveNoteBtn").attr("data-id", thisId);
  $("#displayNotes").empty();
  
  $.ajax({
    method: "GET",
    url: "/notes/" + thisId,
  })
    .then(function (data) {
      console.log(data)
      for (var i=0; i< data.length; i++) {
        $("#displayNotes").append("<div class='eachNoteBox'><p class='eachNoteP'>" + data[i].content + "</p><button class='btn btn-outline-danger' id='dltNoteBtn' data-id=" + data[i]._id + " data-newsId=" + data[i].linkedNewsId + ">Delete</button></div>");
      }
    })
})

$(document).on("click", "#saveNoteBtn", function () {
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "POST",
    url: "/notes/" + thisId,
    data: {
      content: $("#noteInput").val(),
      linkedNewsId: thisId,
    }
  })
    .then(function (data) {
      console.log(data);
      location.reload();
    });

});


$(document).on("click", "#dltNoteBtn", function () {
  var newsId = $(this).attr("data-newsId");
  var thisId = $(this).attr("data-id");
  $("#displayNotes").empty();
  $.ajax({
    method: "PUT",
    url: "/notes/" + thisId,
  })
    .then(function (data) {
      $.ajax({
        method: "GET",
        url: "/notes/" + newsId,
      })
        .then(function (data) {
          console.log(data)
          for (var i=0; i< data.length; i++) {
            $("#displayNotes").append("<div class='eachNoteBox'><p class='eachNoteP'>" + data[i].content + "</p><button class='btn btn-outline-danger' id='dltNoteBtn' data-id=" + data[i]._id + ">Delete</button></div>");
          }
        })
    });

});