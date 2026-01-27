# Windows Agent for Best Cafe

This is the Windows agent application that runs on cafe computers to enforce lock/unlock commands from the backend.

## Prerequisites

- Flutter SDK: https://flutter.dev/docs/get-started/install
- Visual Studio 2022 with "Desktop development with C++" workload for Windows builds
- Enable Developer Mode in Windows settings

## Setup

1. Update `lib/core/config/config.dart` with your backend URL and device token.

2. Run the app in development:
   ```bash
   flutter run -d windows
   ```

## Architecture

- **State Machine**: Manages agent states (BOOTING, DISCONNECTED, CONNECTED, LOCKED, UNLOCKED, ERROR)
- **WebSocket Connection**: Connects to NestJS backend for real-time commands
- **Lock Screen**: Fullscreen overlay when computer is locked
- **Heartbeat**: Sends status updates every 10 seconds

## Features

- Automatic connection on startup
- Lock screen with admin unlock option
- State synchronization on reconnect
- Failure recovery

## Building for Production

```bash
flutter build windows
```

The executable will be in `build/windows/runner/Release/`

## Auto-Start Setup

To make the agent start automatically on Windows boot:

1. Build the release version
2. Copy the executable to `C:\Program Files\WindowsAgent\`
3. Create a shortcut in the Startup folder or use Task Scheduler

## Device Token

Each computer needs a unique deviceToken. Generate UUIDs for each PC and update the config.
