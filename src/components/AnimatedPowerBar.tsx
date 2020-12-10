import React, { useContext, useState } from 'react'
import { View, TouchableOpacity, Image, SafeAreaView, ScrollView, Text, StyleSheet, Platform } from 'react-native';
import COLORS from '../common/Colors';
import AnimatedBar from "react-native-animated-bar";

interface AnimatedPowerBarProps {
    progress?: number,
    finish?: boolean,
}


const AnimatedPowerBar: React.FunctionComponent<AnimatedPowerBarProps> = ({ progress, finish }) => {
    return (
        progress < 1 && !finish ?
            <AnimatedBar
                progress={progress}
                height={null}
                borderColor="#DDD"
                barColor="tomato"
                borderRadius={5}
                borderWidth={5}
                duration={500}
            >
                <View style={[styles.row, styles.center]}>
                    <Text style={[styles.barText, { fontSize: 50 }]}>
                        {Math.round(progress * 100)}
                    </Text>
                </View>
            </AnimatedBar>
            :
            <Text style={{ fontSize: 20, fontStyle: 'normal', fontFamily: Platform.OS === 'android' ? 'Arcade-Classic' : null }}>Game Finalised 😀</Text>
    )
}

AnimatedPowerBar.defaultProps = {
    progress: 1,
    finish: false
}

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        paddingTop: 30,
        paddingHorizontal: 30,
        justifyContent: "space-around",
    },
    rowText: {
        marginRight: 20,
    },
    row: {
        flexDirection: "row",
    },
    center: {
        justifyContent: "center",
        alignItems: "center",
    },
    barText: {
        backgroundColor: "transparent",
        color: "#FFF",
        fontFamily: Platform.OS === 'android' ? 'Arcade-Classic' : null
    },
});

export default AnimatedPowerBar