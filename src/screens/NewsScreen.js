import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import axios from 'axios';
import NewsThumbnail from "../components/NewsThumbnail";
import ServerAddress from '../utils/serverAddres'
import serverAddress from "../utils/serverAddres";


const NewsScreen = ({navigation}) => {
    const [posts, setPosts] = useState(null)
    const [passwords, setPasswords] = useState(null)
  
    useEffect( () => {
      (async function getPosts() {
        const result = await axios.get('http://xxxx/wp-json/wp/v2/posts?_embed&per_page=50')
        setPosts(result.data)
      })();
      (async function getPasswords() {
        const result = await axios.get(serverAddress + '/json/getAllPasswords')
        setPasswords(result.data)
      })()
  }, [])
  
    return (
    <>
    <FlatList data={posts} renderItem={({item}) => <NewsThumbnail news={item} navigation={navigation} passwords={passwords} />} />
      </>
  );
};

const styles = StyleSheet.create({
});

export default NewsScreen;
