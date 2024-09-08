# WatchParty Chrome Extension

WatchParty is a Chrome extension that allows users to create and join watch parties, synchronizing video playback across multiple devices.

## Features

- **Create Party**: Generate a unique party code and share it with friends to start a watch party.
- **Join Party**: Enter a party code to join an existing watch party.
- **Sync Playback**: Automatically sync video playback (play/pause) across all participants.

## Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/kaivalya404/WatchParty.git
    ```

2. **Navigate to the extension directory**:
    ```sh
    cd WatchParty/WatchParty-Extension
    ```

3. **Load the extension in Chrome**:
    - Open Chrome and go to `chrome://extensions/`.
    - Enable "Developer mode" in the top right corner.
    - Click "Load unpacked" and select the `WatchParty-Extension` directory.

## Usage

1. Open the extension popup by clicking on the WatchParty icon in the Chrome toolbar.
2. Enter your username.
3. To create a party:
    - Click the "Create Party" button.
    - Share the generated party code with your friends.
4. To join a party:
    - Enter the party code in the "Enter party code to join" field.
    - Click the "Join Party" button.

## File Structure

### WatchParty-Extension

- **manifest.json**: Defines the extension's metadata, permissions, and background scripts.
- **content.js**: Injected into web pages to interact with the DOM and handle video playback synchronization.
- **background.js**: Runs in the background to manage long-lived tasks, such as maintaining WebSocket connections.
- **popup.html**: The HTML file for the extension's popup interface.
- **popup.js**: Contains the logic for creating and joining parties from the popup interface.

### WatchParty-Server

- **src/package.json**: Defines the server's dependencies and scripts.
- **src/server.js**: The main server file.

## Communication Flow

The extension's components communicate as follows:

1. **popup.js <--> background.js**:
    - `popup.js` sends messages to `background.js` when a user creates or joins a party.
    - `background.js` handles the creation of WebSocket connections and manages party codes.

2. **background.js <--> content.js**:
    - `background.js` sends messages to `content.js` to control video playback (e.g., play, pause).
    - `content.js` listens for these messages and interacts with video elements on web pages.

### Example Workflow

1. **Creating a Party**:
   - User clicks "Create Party" in `popup.js`.
   - `popup.js` sends a message to `background.js`.
   - `background.js` generates a party code, establishes a WebSocket connection, and sends the party code back to `popup.js`.

2. **Joining a Party**:
   - User enters a party code in `popup.js`.
   - `popup.js` sends the party code to `background.js`.
   - `background.js` connects to the WebSocket server using the party code and sends a message to `content.js` to synchronize video playback.

3. **Syncing Video Playback**:
   - `content.js` detects play/pause actions on the video.
   - On receiving a signal, `content.js` sends the video state and time information to `background.js`.
   - `background.js` forwards this information to the server via WebSocket.
   - The server sends the message to all connected peers, whose `background.js` instances forward it to their respective `content.js`.
   - `content.js` adjusts video playback based on the received messages.

## Development

1. **Install dependencies**:
    ```sh
    cd WatchParty/WatchParty-Server/src
    npm install
    ```

2. **Start the development server**:
    ```sh
    npm run dev
    ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request to improve the project.