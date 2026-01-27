import 'package:flutter/foundation.dart';

enum AgentState {
  booting,
  disconnected,
  connected,
  locked,
  unlocked,
  error,
}

class AgentStateNotifier extends ChangeNotifier {
  AgentState _state = AgentState.locked;

  AgentState get state => _state;

  void setState(AgentState newState) {
    if (_state != newState) {
      _state = newState;
      notifyListeners();
    }
  }
}