var app = app || {};

app.NoteView = Backbone.View.extend({
    tagName: 'div',
    className: 'note-container row',
    template: _.template( $('#note-template').html() ),

    events: {
        'click .note-content': 'turnOnEditMode',
        'mousedown .delete-button': 'deleteNote',
        'keyup .note-text-edit': 'adjustButton',
        'keydown .note-text-edit': 'saveOnEnter'
    },

    initialize: function() {
        this.render();
        this.listenTo(this.model, 'checkHidden', this.toggleHidden);
        this.listenTo(this.model, 'closeEdit', this.turnOffEditMode);
        this.listenTo(this.model, 'change', this.render);
    },

    render: function () {
        this.$el.html(this.template(this.model.attributes));
        this.$el.find('.note-text-edit').autosize({append: ''});
        console.log('render called');
        return this;
    },

    showDeleteButton: function () {
        var $noteContent = this.$el.find('.note-content');
        var $deleteButton = this.$el.find('.delete-button');

        $noteContent.removeClass('col-xs-offset-2').addClass('col-xs-offset-1');
        $deleteButton.removeClass('col-xs-0').addClass('col-xs-1');
        $deleteButton.height($noteContent.height());
    },

    hideDeleteButton: function () {
        var $noteContent = this.$el.find('.note-content');
        var $deleteButton = this.$el.find('.delete-button');
        $noteContent.removeClass('col-xs-offset-1').addClass('col-xs-offset-2');
        $deleteButton.removeClass('col-xs-1').addClass('col-xs-0');
    },

    turnOnEditMode: function () {
        if (this.$el.hasClass('edit-mode')) return;

        var currentNote = this.model;
        app.Notes.each(function(note) {
            if (note !== currentNote) note.trigger('closeEdit');
        });

        this.$el.addClass('edit-mode');
        this.showDeleteButton();
    },

    turnOffEditMode: function () {
        if (!this.$el.hasClass('edit-mode')) return;

        this.$el.removeClass('edit-mode');
        this.hideDeleteButton();
        this.$el.find('.note-text-edit').blur();

        var inputText = this.$el.find('.note-text-edit').val().trim();
        if (inputText) {
            this.model.save({text: inputText});
        } else {
            this.deleteNote();
        }
    },

    adjustButton: function () {
        var $noteContent = this.$el.find('.note-content');
        var $deleteButton = this.$el.find('.delete-button');
        $deleteButton.height($noteContent.height());
    },

    saveOnEnter: function () {
        if (event.keyCode === 13 && !event.shiftKey) {
            event.preventDefault();
            this.model.trigger('closeEdit');
        }
    },

    toggleHidden: function () {
        this.$el.toggleClass('filtered-out',
            !(_.some(this.model.get('tags'), function(t) {
                return t.toLowerCase().search(app.currentFilter.toLowerCase()) !== -1;
            })));
    },

    deleteNote: function () {
        this.model.destroy();
        this.remove();
    }
});
