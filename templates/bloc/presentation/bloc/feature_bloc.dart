import 'package:flutter_bloc/flutter_bloc.dart';
import 'feature_event.dart';
import 'feature_state.dart';

class FeatureBloc extends Bloc<FeatureEvent, FeatureState> {
  FeatureBloc() : super(FeatureInitial()) {
    on<FeatureEvent>((event, emit) {
      // TODO: implement event handler
    });
  }
}
