import React from "react";
import { SafeAreaView, Text, View } from "react-native";

export default function Home(){
    return (
        <>
            <View 
            style={{
                backgroundColor: "#121212",
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>

                <View 
                style={{
                    backgroundColor: "#420039",
                    width: "90%",
                    height: "40%",
                    borderRadius: 20
                }}>
                </View>
                <View 
                style={{
                    backgroundColor: "#12355b",
                    width: "90%",
                    height: "15%",
                    borderRadius: 20,
                }}>
                </View>
                <View 
                style={{
                    backgroundColor: "#d72638",
                    width: "90%",
                    height: "40%",
                    borderRadius: 20
                }}>
                </View>

            </View>
        </>
    )
}