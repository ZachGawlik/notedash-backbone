var app = app || {};

app.NoteCollection = Backbone.Collection.extend({
    model: app.Note
});