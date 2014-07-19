var app = app || {};

$(function() {
    var $newNote = $('#new-note');
    // prevent extra line added at end
    $newNote.autosize({append: ''});

    new app.DashView();


    var startText = "This is a #yeah seamless sentence #tag2";
    var finalText = startText.split(/#[\w\d_-]+\s{0,1}/g).join('');
    var tags = startText.match(/#[\w\d_-]+\s{0,1}/g);
    console.log(finalText);
    console.log(tags);
});
