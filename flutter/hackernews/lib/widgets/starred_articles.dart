import 'package:flutter/material.dart';
import 'package:hackernews_flutter/models/hacker_news_article.dart';

class StarredArticlesPage extends StatefulWidget {
  final Set<HackerNewsArticle> savedArticles;

  StarredArticlesPage(this.savedArticles);

  @override
  _StarredArticlesPagesState createState() => new _StarredArticlesPagesState();
}

class _StarredArticlesPagesState extends State<StarredArticlesPage> {
  @override
  Widget build(BuildContext context) {
      final tiles = widget.savedArticles.map((entry) {
        return ListTile(
          title: Text(
            entry.title,
            style:  TextStyle(fontSize: 18.0),
          ),
        );
      });

      final divided = ListTile.divideTiles(context: context, tiles: tiles).toList();
          return new Scaffold(
      appBar: new AppBar(
        title: new Text("Starred Articles"),
      ),
      body: ListView(children: divided));
    }
}