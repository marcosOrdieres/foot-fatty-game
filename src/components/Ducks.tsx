import React, { useContext } from 'react'
import { View, Image } from 'react-native';
import * as fatImages from '../assets'

interface DuckProps {
    ducks: string[] | null,
}

const Ducks: React.FunctionComponent<DuckProps> = ({ ducks }) => {

    return (
        <View style={{ marginTop: '160%', flex: 1, flexDirection: 'row' }}>
            {ducks?.map((value, index) => value === 'yellowDuck' ?
                <Image
                    key={index}
                    style={{ height: 50, width: 50, resizeMode: 'stretch', justifyContent: 'center', alignItems: 'center', right: 90 }}
                    source={fatImages.yellowDuck} /> : null)}
            {ducks?.map((value, index) => value === 'pinkDuck' ?
                <Image
                    key={index}
                    style={{ height: 50, width: 50, resizeMode: 'stretch', justifyContent: 'center', alignItems: 'center', right: 70 }}
                    source={fatImages.pinkDuck} /> : null)}
            {ducks?.map((value, index) => value === 'greenDuck' ?
                <Image
                    key={index}
                    style={{ height: 50, width: 50, resizeMode: 'stretch', justifyContent: 'center', alignItems: 'center', right: 50 }}
                    source={fatImages.greenDuck} /> : null)}
        </View>
    )
}

Ducks.defaultProps = {
    ducks: ['yellowDuck', 'pinkDuck', 'greenDuck'],
}

export default Ducks