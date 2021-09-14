import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, Text, View, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// import { useIsFocused } from '@react-navigation/native';


const renderAddListIcon = (navigation, addItemToLists) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("NewCar", { saveChanges: addItemToLists })}>
      <Icon name="plus-circle" size={30} color="#fff" style={{ margin: 5 }} />
    </TouchableOpacity>
  )
}



const Home = ({ navigation }) => {
  // const isFocused = useIsFocused();
  const { items, text, imageStyle } = styles;
  const [car, setCar] = useState([])



  const addItemToLists = async (item) => {
    const newCarList = car;
    newCarList.push(item)
    // setCar(newCarList) böyle olduğunda sayfaya yeni liste eklenmiyor 
    // yenilediğinde geliyor liste
    setCar([...newCarList]);
    console.log(newCarList);

    try {
      await AsyncStorage.setItem("cars", JSON.stringify(newCarList))
      console.log("storeData.");

    } catch (e) {
      console.log("addItemToLists hata", e);
    }

    // newCarList.push(item);
    // setCar(car);


    //push etmek ile aynı işlemi yapmış olduk
  }



  const removeItemFromList = async (index) => {
    console.log("index", index)
    const newCarList2 = car
    console.log("önce", newCarList2)

    newCarList2.splice(index, 1);
    console.log("sonra", newCarList2)
    setCar([...newCarList2])

    try {
      await AsyncStorage.setItem("cars", JSON.stringify(newCarList2))
      console.log("storeData.");

    } catch (e) {
      console.log("addItemToLists hata", e);
    }


  }

  useEffect(async () => {
    try {
      var listCar = await AsyncStorage.getItem('cars')
      var cars2 = JSON.parse(listCar)
      if (cars2 !== null) {
        setCar(cars2)
        console.log("getdata parse edildi", cars2);

      } else {
        console.log("else hata");
      }


    } catch (e) {
      console.log("getData", e);
    }

  }, [])

  //sadece sayfa ilk açıldığında çalışmasını istiyorsak },[]) şeklinde kullanırız.



  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => renderAddListIcon(navigation, addItemToLists)
    })

  })

  return (
    <View>
      <FlatList
        data={car}
        renderItem={({ item, index }) => (

          <TouchableOpacity onPress={() => navigation.navigate("Information",
            { title: item.title, model: item.model, kilometer: item.kilometer, key: item.key, filePath: item.filePath })}>
            <View style={items}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={{ uri: item.filePath.uri }}
                  style={{ width: 100, height: 100 }}
                />
                <View>
                <Text style={text}> {item.title} </Text>
                <Text  style= {{color:"gray", marginTop:40}}> {item.model} model</Text> 

                  
                </View>
              </View>





              <View>
              <TouchableOpacity onPress={() => removeItemFromList(index)}>
                <Text>
                  <Icon name="trash" size={30} color="black" />
                </Text>
              </TouchableOpacity>
              </View>
             

            </View>

          </TouchableOpacity>
        )}
      />
    </View>

  );
}


const styles = {
  container: {
    paddingTop: 40,

  },
  items: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    fontSize: 18,
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 6,


  },
  text: {
    fontSize: 30,

  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },

}


export default Home;