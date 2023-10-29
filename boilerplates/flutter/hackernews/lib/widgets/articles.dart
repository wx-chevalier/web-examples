import 'dart:async';
import 'package:flutter/material.dart';

import 'package:url_launcher/url_launcher.dart' as url_launcher;

import 'package:hackernews_flutter/models/hacker_news_article.dart';
import 'package:hackernews_flutter/widgets/starred_articles.dart';
import 'package:hackernews_flutter/services/hnpwa_service.dart';
import 'package:hackernews_flutter/ui/favorite_button.dart';

class ArticlesPage extends StatefulWidget {
  @override
  createState() => ArticlesPageState();
}

class ArticlesPageState extends State<ArticlesPage>
 {
  final GlobalKey<RefreshIndicatorState> _refreshIndicatorKey = 
          GlobalKey<RefreshIndicatorState>();
  final List<HackerNewsArticle> _newsArticles = [];
  final HackerNewsService hackerNewsService = HackerNewsService();
  final Set<HackerNewsArticle> _starredArticles = Set<HackerNewsArticle>();

  bool overlayShouldBeVisible = false;
  final TextStyle _biggerFontStyle = TextStyle(fontSize: 18.0);
  int _nextPage = 1;
  bool _isLastPage = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          leading: Image.asset('assets/images/hn_logo_48x48.png'),
          actions: <Widget>[
            IconButton(icon: Icon(Icons.share), onPressed: null),
            IconButton(icon: Icon(Icons.refresh), onPressed: null),
            IconButton(icon: Icon(Icons.list), onPressed: _navigateToSavedPage)
          ],
        ),
        body: _buildBody());
  }

  @override
  void initState() {
    super.initState();
    _nextPage = 1;
    _retrieveArticles();
  }

  Widget _buildBody() {
    if (_newsArticles.isEmpty) {
      return Center(
        child: Container(
          margin: EdgeInsets.only(top: 8.0),
          width: 32.0,
          height: 32.0,
          child: CircularProgressIndicator(),
        ),
      );
    } else {
      _nextPage = 1;

      return RefreshIndicator(
        key: _refreshIndicatorKey,
        onRefresh: _retrieveArticles,
        child: _buildNewsEntriesListView(),
      );
    }
  }

  Widget _buildNewsEntriesListView() {
    return ListView.builder(itemBuilder: (BuildContext context, int index) {
      if (index.isOdd) return Divider();

      final i = index ~/ 2;
      if (i < _newsArticles.length) {
        return _buildNewsEntryRow(_newsArticles[i]);
      } else if (i == _newsArticles.length) {
        if (_isLastPage) {
          return null;
        } else {
          _retrieveArticles();
          return Center(
            child: Container(
              margin: EdgeInsets.only(top: 8.0),
              width: 32.0,
              height: 32.0,
              child: CircularProgressIndicator(),
            ),
          );
        }
      } else if (i > _newsArticles.length) {
        return null;
      }
    });
  }

Widget _buildNewsEntryRow(HackerNewsArticle newsEntry) {
    return ListTile(
      leading: _buildBadge(newsEntry.points),
      title: Text(
        newsEntry.title,
        style: _biggerFontStyle,
      ),
      subtitle: Text('${newsEntry.domain} | ${newsEntry.commentsCount} comments'),
      trailing: FavoriteButton(
          newsEntry: newsEntry, 
          savedEntries: _starredArticles, 
          handleFavoritePressed: _handleFavoritePressed),
      onTap: () {
        _viewHackerNewsArticle(newsEntry);
      },
    );
  }

  Widget _buildBadge(int points) {
    return Container(
      margin: const EdgeInsets.only(bottom: 2.0),
      width: 40.0,
      height: 40.0,
      decoration:
          BoxDecoration(color: (points == null || points < 100) ? Colors.red : Colors.green, 
                        shape: BoxShape.circle),
      child: Container(
        padding: EdgeInsets.all(1.0),
        child: Center(
          child: Text(points == null ? '' : '$points', 
                      style: TextStyle(color: Colors.white, fontSize: 14.0)
                     ),
        ),
      ),
    );
  }

  void _reloadArticles() {
    _nextPage = 1;
    _retrieveArticles();
  }

  Future<Null> _retrieveArticles() async {
    final articles = await hackerNewsService.getNewsEntries(_nextPage);
    if (articles.isEmpty) {
      setState(() {
        _isLastPage = true;
      });
    } else {
      setState(() {
        _newsArticles.addAll(articles);
        _nextPage++;
      });
    }
  }

  void _navigateToSavedPage() {
    Navigator.of(context).push(
      new MaterialPageRoute(builder: (context) => new StarredArticlesPage(_starredArticles))
    );
  }

  void _viewHackerNewsArticle(HackerNewsArticle newsEntry) {
    url_launcher.launch(newsEntry.url);
  }

  void _handleFavoritePressed(HackerNewsArticle newsEntry, bool isAlreadySaved, 
                              Set<HackerNewsArticle> savedEntries) {
    setState(() {
      if (isAlreadySaved) {
        savedEntries.remove(newsEntry);
      } else {
        savedEntries.add(newsEntry);
      }
    });
  }
}
