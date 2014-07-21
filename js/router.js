var app = app || {};

var NoteRouter = Backbone.Router.extend({
    routes: {
        '': 'list',
        ':filter': 'setFilter'
    },

    list: function() {
        var $newNote = $('#new-note');
        $newNote.autosize({append: ''});

        app.Notes = new app.NoteCollection();
        app.Notes.fetch();
        new app.DashView();
    },

    setFilter: function(filter) {
        if (!app.Notes) this.list();
        app.currentFilter = filter.trim();
        $('#new-note').focus();
        $('#new-note').val('#' + app.currentFilter);
        app.Notes.trigger('filter');
    }
});

app.NoteRouter = new NoteRouter();
Backbone.history.start();
