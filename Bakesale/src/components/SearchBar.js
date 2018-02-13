import React, { Component } from 'react';
import { TextInput, StyleSheet } from 'react-native';

class SearchBar extends Component {
    state = {
        searchTerm: '',
    };

    handleChange = (searchTerm) => {
        this.setState({ searchTerm });
    }

    render() {
        return (
            <TextInput
                placeholder="Search All Deals"
                style={styles.input}
                onChangeText={this.handleChange}
            />
        );
    }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
  },
});

export default SearchBar;
