var app = app || {};

app.NoteView = Backbone.View.extend({
    tagName: 'div',
    className: 'note-container row',
    template: _.template( $('#note-template').html() ),

    events: {
        'click .note-content': 'slide',
        'click .confirm-delete.delete-button': 'deleteNote'
    },

    initialize: function() {
        this.listenTo(this.model, 'checkHidden', this.toggleHidden);
    },

    render: function () {
        this.$el.html(this.template(this.model.attributes));
        return this;
    },

    slide: function () {
        var $note = this.$el.find('.note-content');
        var $deleteButton = this.$el.find('.delete-button');
        $deleteButton.height($note.height());

        $note.toggleClass('confirm-delete');
        $note.toggleClass('col-xs-offset-2');
        $note.toggleClass('col-xs-offset-1');
        $deleteButton.toggleClass('confirm-delete');
        $deleteButton.toggleClass('col-xs-0');
        $deleteButton.toggleClass('col-xs-1');
    },

    toggleHidden: function () {
        this.$el.toggleClass('hidden',
            !(_.some(this.model.get('tags'), function(t) {
                return t.toLowerCase().search(app.currentFilter.toLowerCase()) !== -1;
            })));
    },

    deleteNote: function () {
        this.model.destroy();
        this.remove();
    }
});