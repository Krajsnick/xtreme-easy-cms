var express = require('express');
var router = express.Router();
var app = express();
var mongoose = require('mongoose');
var marked = require('marked');

var articleSchema = new mongoose.Schema({
  title: String,
  markdown: String,
  slug: String
});

var Article = mongoose.model('Article', articleSchema);

router.use(function(req, res, next) {
  Article.find({}, 'slug title -_id', function(err, articles) {
    res.locals.articles = articles;
    next();
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/add', function(req, res) {
  res.render('add');
});

router.post('/add', function(req, res) {
  if (isEmpty(req.body.title) || isEmpty(req.body.markdown)) {
    res.render('add', {error: "Enter text in all fields"});
    return;
  }

  var article = new Article({
    title: req.body.title,
    markdown: req.body.markdown,
    slug: makeSlug(req.body.title)
  });

  article.save(function(err) {
    if (err) throw err;

    console.log('Article saved');
    res.render('add', {posted: true});
  });
});

// Show article
router.get('/:slug', function(req, res, next) {
  var slug = req.params.slug;

  Article.findOne({ 'slug': slug  }, function(err, article) {
    if (err || !article) return next();
    article.markdown = marked(article.markdown);
    res.render('index', {mdArticle: article});
  });
});

module.exports = router;

function isEmpty(str) {
  return (!str || 0 === str.length);
}

function makeSlug(title) {
  return title.toLowerCase().split(' ').join('-').replace(/[^a-z-]+/gi, '');
}
