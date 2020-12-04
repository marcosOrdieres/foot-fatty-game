import React, { useContext } from 'react'
import { View, TouchableOpacity, Image, SafeAreaView, ScrollView, Text } from 'react-native';
import COLORS from '../common/Colors';

interface DrawerProps {
    props?: any,
}


const Drawer: React.FunctionComponent<DrawerProps> = ({ props: { navigation } }) => {
    return (
        <ScrollView style={{ flex: 1, backgroundColor: COLORS["profile-table"] }}>
            <>
                <TouchableOpacity
                    onPress={() => navigation.state.index === 1 ? navigation.closeDrawer() : navigation.navigate(navigation.state.routes[1].routeName)}>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.state.index === 0 ? navigation.closeDrawer() : navigation.navigate(navigation.state.routes[0].routeName)}>
                    <Text>First Screen</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.state.index === 1 ? navigation.closeDrawer() : navigation.navigate(navigation.state.routes[1].routeName)}>
                    <Text>Second Screen</Text>
                </TouchableOpacity>
            </>
        </ScrollView>
    )
}

Drawer.defaultProps = {
    props: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
}

export default Drawer