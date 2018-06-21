import 'package:flutter/foundation.dart';

class HackerNewsArticle {
  final int id;
  final String title;
  final int points;
  final String user;
  final int time;
  final String timeAgo;
  final int commentsCount;
  final String type;
  final String url;
  final String domain;

  factory HackerNewsArticle.fromMap(Map jsonMap) {
    return HackerNewsArticle._(
        id: jsonMap['id'],
        title: jsonMap['title'],
        points: jsonMap['points'],
        user: jsonMap['user'],
        time: jsonMap['time'],
        timeAgo: jsonMap['time_ago'],
        commentsCount: jsonMap['comments_count'],
        type: jsonMap['type'],
        url: jsonMap['url'],
        domain: jsonMap['domain']);
  }

  HackerNewsArticle._(
      {@required this.id,
      @required this.title,
      @required this.points,
      @required this.user,
      @required this.time,
      @required this.timeAgo,
      @required this.commentsCount,
      @required this.type,
      @required this.url,
      @required this.domain});
}
