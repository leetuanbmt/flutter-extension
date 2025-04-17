import 'package:flutter/material.dart';

class FeatureInfoWidget extends StatelessWidget {
  const FeatureInfoWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return const Card(
      child: Padding(
        padding: EdgeInsets.all(8.0),
        child: Text('Feature Info'),
      ),
    );
  }
}
