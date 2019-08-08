

// import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

import 'widgets/articles.dart';

void main() => runApp(new HackerNewsFlutter());


class HackerNewsFlutter extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Hacker News Flutter',
      theme: ThemeData(
        primaryColor: Color.fromARGB(255, 255, 102, 0)
      ),
      home: ArticlesPage(),
    );
  }
}



