import 'package:flutter/foundation.dart';

class Endpoint {
  final String topic;
  final String url;
  final int maxPages;

  factory Endpoint.fromMap(Map jsonMap) {
    return Endpoint._(
        topic: jsonMap['topic'],
        url: jsonMap['url'],
        maxPages: jsonMap['maxPages']);
  }

  Endpoint._({
    @required this.topic,
    @required this.url,
    @required this.maxPages
  });
}
