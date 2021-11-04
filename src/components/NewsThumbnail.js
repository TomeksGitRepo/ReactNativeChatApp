import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { HeaderTitle } from "react-navigation-stack";
import {Card} from 'react-native-elements';
import { TouchableOpacity } from "react-native-gesture-handler";
import {Html5Entities} from 'html-entities'




const NewsThumbnail = ({news, navigation, passwords}) => {
    ////console.log('news:', news) 
    return (
    <TouchableOpacity onPress={() => navigation.navigate('NewsDetail', {news, passwords}) }>
    <Card style={styles.card}>
    <View style={styles.row}>
    {news.featured_media !== 0 ? <Image source={{uri: news._embedded['wp:featuredmedia']['0'].source_url}} style={styles.image} /> : null}
    <View style={styles.column}>
    <Text style={styles.header}>{Html5Entities.decode(news.title.rendered)}</Text>
    <Text style={styles.paragraph}>{Html5Entities.decode( news.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, "").substring(0,100) )+ `...
   
     Czytaj Więcej`}</Text>
    </View>
    </View>
      </Card>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    image: {
        height: 150,
        width: '30%',
        marginRight: 8
      },
      row: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center'
      },
      column: {
        flexDirection: 'column',
        width: '70%'
      },
      card: {
            
            flexDirection: "row",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          
      },
      header: {
        fontSize: 20,
        fontWeight: 'bold'
      },
      paragraph: {
        fontSize: 20
      }
});

export default NewsThumbnail;
