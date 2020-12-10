import React from 'react'
import { View, Image, Dimensions } from 'react-native';
import * as fatImages from '../assets'
const { width, height } = Dimensions.get('window');

interface GoldenPricesProps {
    prices?: string[] | null,
}


const GoldenPrices: React.FunctionComponent<GoldenPricesProps> = ({ prices }) => {
    return (
        <>
            <View style={{ position: 'absolute', left: '78%' }}>
                {prices?.map(value => value === 'goldenDiploma' ?
                    <Image
                        style={{ width: width / 18, height: height / 8, resizeMode: 'contain' }}
                        source={fatImages.goldenDiploma} /> : null)}
            </View>
            <View style={{ position: 'absolute', left: '78%', top: '17%' }}>
                {prices?.map(value => value === 'goldenMedal' ?
                    <Image
                        style={{ width: width / 18, height: height / 8, resizeMode: 'contain' }}
                        source={fatImages.goldenMedal} /> : null)}
            </View>
            <View style={{ position: 'absolute', left: '78%', top: '35%' }}>
                {prices?.map(value => value === 'goldenTrophy' ?
                    <Image
                        style={{ width: width / 18, height: height / 8, resizeMode: 'contain' }}
                        source={fatImages.goldenTrophy} /> : null)}
            </View>
        </>
    )

}

GoldenPrices.defaultProps = {
    prices: ['goldenDiploma', 'goldenMedal', 'goldenTrophy'],
}

export default GoldenPrices