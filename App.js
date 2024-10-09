import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const App = () => {
  const [fact, setFact] = useState('');
  const [loading, setLoading] = useState(true);

 
  const fetchFact = () => {
    setLoading(true); 
    fetch('https://cat-fact.herokuapp.com/facts')
      .then((response) => response.json())
      .then((data) => {
        const randomFact = data[Math.floor(Math.random() * data.length)].text;
        setFact(randomFact);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching cat fact:', error);
        setFact('Failed to load fact, please try again.');
        setLoading(false); 
      });
  };

  useEffect(() => {
    fetchFact();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Random Cat Fact</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <Text style={styles.fact}>{fact}</Text>
      )}
      <Button title="Get Another Fact" onPress={fetchFact} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  fact: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default App;
