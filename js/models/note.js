var app = app || {};

app.Note = Backbone.Model.extend({
    defaults: {
        id: '',
        text: '',
        tags: []
    }
});