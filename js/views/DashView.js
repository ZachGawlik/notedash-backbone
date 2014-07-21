var app = app || {};

app.DashView = Backbone.View.extend({
    el: '#app',

    events: {
        'keydown #new-note': 'submitOnEnter',
        'keyup #new-note': 'updateFilter'
    },

    initialize: function() {
        this.$input = $('#new-note');
        this.$input.focus();
        this.listenTo(app.Notes, 'add', this.renderNote);
        this.listenTo(app.Notes, 'filter', this.filterNotes);
        this.render();
        if (app.Notes.length === 0) {
            this.addTutorialNotes();
        }
    },

    render: function () {
        $('#notes-container').html('');
        app.Notes.each(function(note) {
            this.renderNote(note);
        }, this);
    },

    renderNote: function(note) {
        var noteView = new app.NoteView({model: note});
        $('#notes-container').prepend( noteView.render().el );
    },

    addNote: function(inputText) {
        var newTags = inputText.match(/#[\w\d_-]+\s{0,1}/g);
        var newText = inputText.split(/#[\w\d_-]+\s{0,1}/g).join('').trim();
        app.Notes.create({id: app.Notes.nextId(), text: newText, tags: newTags});
    },

    submitOnEnter: function(event) {
        var inputText = this.$input.val().trim();
        if (event.keyCode === 13 && !event.shiftKey) {
            event.preventDefault();
            if (inputText && !(inputText.charAt(0) === '#' && inputText.search(/\s/) === -1)) {
                this.$input.val('').trigger('autosize.resize');
                this.addNote(inputText);
            }
        }
    },

    filterNotes: function () {
        app.Notes.each(function(note) {
            note.trigger('checkHidden');
        });
    },

    updateFilter: function() {
        var inputText = this.$input.val().trim();
        if (inputText.charAt(0) === '#' && inputText.search(/\s/) === -1) {
            app.currentFilter = inputText;
            this.filterNotes(inputText);
        } else {
            $('.note-container').removeClass('hidden');
            app.NoteRouter.navigate('');
        }
    },

    addTutorialNotes: function() {
        this.addNote('Include tags by typing a # anywhere. #instruction Click them on the side or type them in at top to filter your notes and organize your thoughts');
        this.addNote('Welcome to NoteDash! NoteDash is meant for quickly writing and accessing notes. No fuss. Just start typing and hit Enter to create your first note. \n\nHit Shift+Enter for a new line within the note \n\nDelete old notes by clicking on them and confirming');
    }
});