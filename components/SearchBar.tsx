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

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
  },
  input: {
    fontSize: 16,
  },
});

export default SearchBar;
