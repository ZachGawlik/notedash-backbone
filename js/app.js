$(function() {
    var $newNote = $('#new-note');
    // prevent extra line added at end
    $newNote.autosize({append: ''});

    // Make textarea require shift+enter for new line
    $newNote.on('keydown', function(event) {
        if (event.keyCode == 13)
            if (!event.shiftKey) $newNote.blur();
    });

    var d = new Date();

});
