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
        console.log('called with ' + filter);
        filter = filter.trim();
        if (filter.charAt(0) === '#') {
            app.currentFilter = filter;
        }
        else {
            app.currentFilter = '#' + filter;
        }
        console.log('appnotes: ' + app.Notes.length);
        app.Notes.trigger('filter');
        //todo: must add # to beginning
        console.log("lol filter called here's what it thiks the filter is: " + filter);
    }
});

app.NoteRouter = new NoteRouter();
Backbone.history.start();
