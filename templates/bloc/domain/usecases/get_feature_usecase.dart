import '../repositories/feature_repository.dart';

class GetFeatureUseCase {
  const GetFeatureUseCase(this.repository);

  final FeatureRepository repository;

  Future<void> call() => repository.fetchFeature();
}
