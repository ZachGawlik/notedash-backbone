var app = app || {};

app.NoteCollection = Backbone.Collection.extend({
    model: app.Note,

    localStorage: new Backbone.LocalStorage('dashnotes'),

    nextId: function () {
        if (!this.length) return 1;
        return this.last().get('id') + 1;
    }
});