import '../../domain/entities/feature_entity.dart';

class FeatureModel extends FeatureEntity {
  FeatureModel({required super.id, required super.name});

  factory FeatureModel.fromJson(Map<String, dynamic> json) {
    return FeatureModel(
      id: json['id'],
      name: json['name'],
    );
  }
}
