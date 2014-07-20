var app = app || {};

app.DashView = Backbone.View.extend({
    el: '#app',

    events: {
        'keydown #new-note': 'submitOnEnter',
        'keyup #new-note': 'updateFilter'
    },

    initialize: function() {
        this.$input = $('#new-note');
        this.collection = new app.NoteCollection();
        this.collection.fetch();

        this.listenTo(this.collection, 'add', this.renderNote);
        this.listenTo(this.collection, 'filter', this.filterNotes);
        this.render();
    },

    render: function () {
        this.collection.each(function(note) {
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
        this.collection.create({id: this.collection.nextId(), text: newText, tags: newTags});
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
        this.collection.each(function(note) {
            note.trigger('checkHidden');
        })
    },

    updateFilter: function() {
        var inputText = this.$input.val().trim();
        if (inputText.charAt(0) === '#' && inputText.search(/\s/) === -1) {
            app.currentFilter = tag;
            this.filterNotes(inputText);
        } else {
            $('.note-container').removeClass('hidden');
        }
    }
});