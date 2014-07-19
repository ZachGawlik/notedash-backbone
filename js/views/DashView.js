var app = app || {};

app.DashView = Backbone.View.extend({
    el: '#app',

    events: {
        'keydown #new-note': 'addOnEnter'
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

    addNote: function() {
        var newText = this.$input.val();
        this.$input.val('').trigger('autosize.resize');
        if (newText) {
            this.collection.create({id: this.collection.nextId(), text: newText, tags: ['#testtag']})
        }
    },

    addOnEnter: function(e) {
        if ((event.keyCode === 13) && (!event.shiftKey)) {
            e.preventDefault();
            this.addNote();
        }
    }
});