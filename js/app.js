var app = app || {};

$(function() {
    var $newNote = $('#new-note');
    // prevent extra line added at end
    $newNote.autosize({append: ''});

    // Make textarea require shift+enter for new line
    $newNote.on('keydown', function(event) {
        if (event.keyCode == 13)
            if (!event.shiftKey) $newNote.blur();
    });

    var notes = [
        {id: '1', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', tags:['#new', '#quote', '#arelativelylongtag']},
        {id: '2', text: 'A second shorter note', tags: ['#a', '#b']},
        {id: '3', text: 'Third and final example note that is extremely ordinary'}
    ];

    new app.DashView(notes);
});
