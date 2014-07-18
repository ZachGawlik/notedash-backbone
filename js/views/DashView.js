var app = app || {};

app.DashView = Backbone.View.extend({
    el: '#app',

    initialize: function(initialNotes) {
        this.collection = new app.NoteCollection( initialNotes );
        this.render();
    },

    render: function () {
        this.collection.each(function( note ) {
            this.renderNote( note );
        }, this);
    },

    renderNote: function(note) {
        var noteView = new app.NoteView({model: note});
        this.$el.append( noteView.render().el );
    }
});