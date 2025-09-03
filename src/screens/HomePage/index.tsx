import React, { useEffect } from "react";
import { Text, View } from "react-native";
import HttpService from "../../services/httpService";

// import { Container } from './styles';

const HomePage: React.FC = () => {
  useEffect(() => {
    HttpService.get("/products")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Error fetching products:", err);
      });
  }, []);

  return (
    <View style={{ backgroundColor: "#291", flex: 1 }}>
      <Text>Ola</Text>
    </View>
  );
};

export default HomePage;
