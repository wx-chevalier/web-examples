import 'dart:async';
import 'dart:convert';

import 'package:http/http.dart' as http;

import '../models/endpoints.dart';
import '../models/hacker_news_article.dart';

const baseUrl = 'https://api.hnpwa.com/v0';

class HackerNewsService {
  final String _baseUrl = baseUrl;

  // Store the last feed in memory to instantly load when requested.
  String _cacheFeedKey;
  List<HackerNewsArticle> _cacheFeedResult;

  Future<List<HackerNewsArticle>> getEndpoints(int page) async {
    final url = '$_baseUrl/';

    final response = await http.get(url);

    final data = json.decode(response.body);
    final jsonMapList = data["endpoints"].cast<Map>();

    return jsonMapList.map((e) => Endpoint.fromMap(e)).toList();
  }

  Future<List<HackerNewsArticle>> getNewsEntries(int page) async {
    final url = '$_baseUrl/news/$page.json';
   
    if (_cacheFeedKey == url) {
      return _cacheFeedResult;
    }

    final response = await http.get(url);
    final decoded = json.decode(response.body) as List;
    _cacheFeedKey = url;
    final jsonMapList = decoded.cast<Map>();
    _cacheFeedResult = jsonMapList.map((e) => HackerNewsArticle.fromMap(e)).toList();
    return _cacheFeedResult;
  }
}
