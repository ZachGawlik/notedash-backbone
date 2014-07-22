var app = app || {};

app.NoteView = Backbone.View.extend({
    tagName: 'div',
    className: 'note-container row',
    template: _.template( $('#note-template').html() ),

    events: {
        'click .note-content': 'turnOnEditMode',
        'mousedown .delete-button': 'deleteNote',
        'keyup .note-text': 'adjustButton',
        'blur .note-content': 'turnOffEditMode',
        'keydown .note-text': 'saveOnEnter'
    },

    initialize: function() {
        this.listenTo(this.model, 'checkHidden', this.toggleHidden);
    },

    render: function () {
        this.$el.html(this.template(this.model.attributes));
        return this;
    },

    turnOnEditMode: function () {
        var $note = this.$el.find('.note-content');
        var $deleteButton = this.$el.find('.delete-button');
        $deleteButton.height($note.height());

        this.$el.addClass('edit-mode');
        $note.removeClass('col-xs-offset-2');
        $note.addClass('col-xs-offset-1');
        $deleteButton.removeClass('col-xs-0');
        $deleteButton.addClass('col-xs-1');
    },

    turnOffEditMode: function () {
        var $note = this.$el.find('.note-content');
        var $deleteButton = this.$el.find('.delete-button');

        this.$el.removeClass('edit-mode');
        $note.removeClass('col-xs-offset-1');
        $note.addClass('col-xs-offset-2');
        $deleteButton.removeClass('col-xs-1');
        $deleteButton.addClass('col-xs-0');

        var inputText = this.$el.find('.note-text').html();
        if (inputText) {
            this.model.save({text: inputText});
        } else {
            this.deleteNote();
        }
    },

    adjustButton: function () {
        var $note = this.$el.find('.note-content');
        var $deleteButton = this.$el.find('.delete-button');
        $deleteButton.height($note.height());
    },

    saveOnEnter: function () {
        if (event.keyCode === 13 && !event.shiftKey) {
            event.preventDefault();
            this.$el.find('.note-text').blur();
        }
    },

    toggleHidden: function () {
        this.$el.toggleClass('filtered-out',
            !(_.some(this.model.get('tags'), function(t) {
                return t.toLowerCase().search(app.currentFilter.toLowerCase()) !== -1;
            })));
    },

    deleteNote: function () {
        console.log('trying to delete');
        this.model.destroy();
        this.remove();
    }
});