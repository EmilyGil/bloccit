const flairQueries = require("../db/queries.flairs.js");
module.exports = {
    index(req, res, next) {
        flairQueries.getAllFlairs((err, flairs) => {
          if(err) {
            res.redirect(500, "static/index", {title: "Welcome to Bloccit"});
          } else {
            res.render("flairs/index", {title: "Welcome to Bloccit", flairs});
          }
        });
      },

      new(req, res, next) {
        res.render("flairs/new", {title: "Welcome to Bloccit"});
      },

      create(req, res, next) {
        let newFlair = {
          name: req.body.name,
          color: req.body.color
        };
        flairQueries.addFlair(newFlair, (err, flair) => {
          if(err) {
            res.redirect(500, "/flairs/new");
          } else {
            res.redirect(303, `/flairs/${flair.id}`);
          }
        });
      },

      show(req, res, next) {
        flairQueries.getFlair(req.params.id, (err, flair) => {
          if(err || flair == null) {
            res.redirect(404, "/");
          } else {
            res.render("flairs/show", {title: "Welcome to Bloccit", flair});
          }
        });
      },

      destroy(req, res, next) {
        flairQueries.deleteFlair(req.params.id, (err, flair) => {
          if(err) {
            res.redirect(500, `/flairs/${flair.id}`)
          } else {
            res.redirect(303, "/flairs")
          }
        });
      },

      edit(req, res, next) {
        flairQueries.getFlair(req.params.id, (err, flair) => {
          if(err || flair == null) {
            res.redirect(404, "/");
          } else {
            res.render("flairs/edit", {title: "Welcome to Bloccit", flair});
          }
        });
      },

      update(req, res, next) {
        flairQueries.updateFlair(req.params.id, req.body, (err, flair) => {
          if(err || flair == null) {
            res.redirect(404, `/flairs/${req.params.id}/edit`);
          } else {
            res.redirect(`/flairs/${flair.id}`);
          }
        });
      }
} 