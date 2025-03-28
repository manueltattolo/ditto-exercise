# Ditto Task Sync App

**Task**
The task was to adapt one of Ditto's Quickstart applications by adding a simple new feature. The original apps already supported adding and synchronizing tasks. The goal was to extend this functionality by enabling users to search for specific tasks.
To accomplish this, the following requirements were outlined:
- Start with an existing Quickstart application in a language of choice
- Add UI components to initiate and receive a search query from the user
- Retrieve all relevant documents from Ditto based on the query
- Display the resulting set of documents to the user
- The developer was free to adapt and extend the brief as they saw fit

## Prerequisites

- **Ditto Portal Account**: Ensure you have a Ditto account. Sign up [here](https://portal.ditto.live/signup).
- **App Credentials**: After registration, create an application within the Ditto Portal to obtain your `appID` and `token`. Visit the [Ditto Portal](https://portal.ditto.live/) to manage your applications.

## Getting Started

### Install Dependencies

```bash
# Project is set up to work seamlessly with yarn
yarn install
```

### Run the Application

Running the `start` script launches the "Metro" dev tool, which will build the iOS or Android apps on demand.
After running the start command, press `i` to launch the iOS simulator or `a` to launch the Android emulator.

```bash
yarn start
```

For iOS:

```bash
(cd ios && pod install)
yarn react-native run-ios
```

For Android:

```bash
yarn react-native run-android
```

## Features

- **Task Creation**: Users can add new tasks to their list.
- **Real-time Sync**: Tasks are synchronized in real-time across all devices using the same Ditto application.

## Additional Information

- Limitation: React Native's Fast Refresh must be disabled and it's something we're working on fixing.

### Troubleshooting

Should you encounter any issues, please refer to the [Ditto documentation](https://docs.ditto.live/) or check the FAQs on the Ditto Portal.

### Contact

For support or queries, reach out to us via [support@ditto.live](mailto:support@ditto.live).
