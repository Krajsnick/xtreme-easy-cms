var express = require('express');
var router = express.Router();
var app = express();
var mongoose = require('mongoose');
var marked = require('marked');

var articleSchema = new mongoose.Schema({
  title: String,
  markdown: String,
  renderedHtml: String,
  slug: String
});

var Article = mongoose.model('Article', articleSchema);

router.use(function(req, res, next) {
  Article.find({}, 'slug title', function(err, articles) {
    res.locals.articles = articles;
    next();
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/add', function(req, res) {
  res.render('add');
});

router.post('/add', function(req, res) {
  if (isEmpty(req.body.title) || isEmpty(req.body.htmlContent)) {
    res.render('add', {error: "Enter text in all fields"});
    return;
  }

  var article = new Article({
    title: req.body.title,
    //markdown: req.body.markdown,
    renderedHtml: req.body.htmlContent,
    slug: makeSlug(req.body.title)
  });

  article.save(function(err) {
    if (err) throw err;

    console.log('Article saved');
    res.redirect(article.slug);
  });
});

// Show article
router.get('/:slug', function(req, res, next) {
  var slug = req.params.slug;

  Article.findOne({ 'slug': slug  }, function(err, article) {
    if (err || !article) return next();
    res.render('index', {mdArticle: article});
  });
});

// Delete article
router.delete('/:slug', function(req, res, next) {
  var slug = req.params.slug;

  Article.remove({slug: slug}, function(err, removed) {
    if (err) return next();
    res.json({success: true, deleted: "everything"});
  });
});

module.exports = router;

function isEmpty(str) {
  return (!str || 0 === str.length);
}

function makeSlug(title) {
  return title.toLowerCase().split(' ').join('-').replace(/[^a-z-]+/gi, '');
}
