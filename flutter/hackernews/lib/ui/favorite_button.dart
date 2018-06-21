import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

import '../models/hacker_news_article.dart';

typedef void FavoritePressedCallback(HackerNewsArticle newsEntry, bool isAlreadySaved, Set<HackerNewsArticle> savedEntries);

class FavoriteButton extends StatelessWidget {
  final HackerNewsArticle newsEntry;
  final Set<HackerNewsArticle> savedEntries;
  final FavoritePressedCallback handleFavoritePressed;
  final bool isAlreadySaved;

  FavoriteButton({@required this.newsEntry, @required this.savedEntries, @required this.handleFavoritePressed})
      : isAlreadySaved = savedEntries.contains(newsEntry);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(0.0),
      child: IconButton(
          icon:
              Icon(isAlreadySaved ? Icons.star : Icons.star_border, color: isAlreadySaved ? Colors.red : null),
          onPressed: () {
            handleFavoritePressed(newsEntry, isAlreadySaved, savedEntries);
          }),
    );
  }
}
