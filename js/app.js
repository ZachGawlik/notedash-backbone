var app = app || {};

$(function() {
    var $newNote = $('#new-note');
    // prevent extra line added at end
    $newNote.autosize({append: ''});

    new app.DashView();
});
