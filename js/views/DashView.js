var app = app || {};

app.DashView = Backbone.View.extend({
    el: '#app',

    events: {
        'keydown #new-note': 'submitOnEnter'
    },

    initialize: function() {
        this.$input = $('#new-note');
        this.collection = new app.NoteCollection();
        this.collection.fetch();
        this.listenTo(this.collection, 'add', this.renderNote);
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

    handleInput: function() {
        var inputText = this.$input.val().trim();
        this.$input.val('').trigger('autosize.resize');
        if (inputText && (inputText.charAt(0) !== '#')) {
            this.addNote(inputText);
        }
    },

    submitOnEnter: function(e) {
        if ((event.keyCode === 13) && (!event.shiftKey)) {
            e.preventDefault();
            this.handleInput();
        }
    }
});