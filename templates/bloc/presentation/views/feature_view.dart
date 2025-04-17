import 'package:flutter/material.dart';

class FeatureView extends StatelessWidget {
  const FeatureView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Feature'),
      ),
      body: const Center(
        child: Text('Feature View'),
      ),
    );
  }
}
