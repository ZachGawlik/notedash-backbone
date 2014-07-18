var app = app || {};

app.NoteView = Backbone.View.extend({
    tagName: 'div',
    className: 'note-container row',
    template: _.template( $('#note-template').html() ),

    render: function () {
        this.$el.html(this.template(this.model.attributes));
        return this;
    }
});