import 'package:flutter/foundation.dart';

import 'endpoints.dart';

class EndpointList {
  final String name;
  final List<Endpoint> endpoints;

  factory EndpointList.fromMap(Map jsonMap) {
    return EndpointList._(
        name: jsonMap['name'],
        endpoints: jsonMap['endpoints']);
  }

  EndpointList._({
    @required this.name,
    @required this.endpoints
  });
}
