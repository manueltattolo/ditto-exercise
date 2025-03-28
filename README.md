# Ditto Take Home Exercise

## The Exercise

The task was to adapt one of Ditto's Quickstart applications by adding a simple new feature. 
I choose React Native for this exercise due to my familiarity with React.

The original app natively supports adding and synchronizing tasks. 
The goal was to extend this functionality by enabling users to search for specific tasks.

List of the requirements:
- Start with an existing Quickstart application in a language of choice
- Add UI components to initiate and receive a search query from the user
- Retrieve all relevant documents from Ditto based on the query
- Display the resulting set of documents to the user
- The developer was free to adapt and extend the brief as they saw fit

## Implemented

### Search UI Component
I created a new `SearchBar` component that:
- Accepts user input
- Triggers a search query as the user types

```tsx
import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (text: string) => {
    setQuery(text);
    onSearch(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search tasks..."
        value={query}
        onChangeText={handleSearch}
      />
    </View>
  );
};
```

### Query Integration
In App.tsx, instead of using the original static observer:

```ts
taskObserver.current = ditto.current.store.registerObserver(
  'SELECT * FROM tasks WHERE NOT deleted',
  ...
);
```

I implemented a dynamic query using execute to retrieve tasks that start with the search query:

```ts
const fetchTasks = async (query = "") => {
  let queryString = "SELECT * FROM tasks WHERE NOT deleted";
  let args = {};

  // If anything is typed in, it filters the results in Ditto
  if (query.trim().length > 0) {
    queryString += " AND title >= :query AND title < :query_end";
    args = { query, query_end: query + "\uFFFF" }; 
  }

  queryString += " ORDER BY title ASC"; // Sort alphabetically

  const result = await ditto.current?.store.execute(queryString, args);

  const fetchedTasks: Task[] = result?.items.map(doc => ({
    id: doc.value._id,
    title: doc.value.title as string,
    done: doc.value.done,
    deleted: doc.value.deleted,
  })) || [];

  setTasks(fetchedTasks);
};
```

triggered via a ``useEffect`` every time the user changes the search input:
```ts
useEffect(() => {
  if (ditto.current) {
    fetchTasks(searchQuery);
  }
}, [searchQuery]);
```

---

### Images

![image](https://github.com/user-attachments/assets/703789b2-ed78-40e3-9fc2-df1178c08e2a)
![image](https://github.com/user-attachments/assets/5481d97b-d2e6-4481-b5eb-1e5b5f47f03d)
![image](https://github.com/user-attachments/assets/d35ce7f4-73b5-4f8a-a1d0-b0b6c6656198)


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
