import React from 'react'
import { View, Image, Text, Platform } from 'react-native';
import { indexAndGames } from '../helper-functions/indexAndGames'

interface SpongesProps {
    sponges: string[],
    games: number,
    width: number,
    height: number
}


const Sponges: React.FunctionComponent<SpongesProps> = ({ sponges, games, width, height }) => {
    return (
        <View style={{ position: 'absolute', left: '85%', top: '28%', flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ marginLeft: 30, flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                <View style={{ flex: 0.5 }}>

                    {sponges.map((eachSponge: string, index: number) => (
                        <Image
                            key={index}
                            style={{ height: indexAndGames(index, games) ? height / 8 : height / 10, width: indexAndGames(index, games) ? width / 20 : width / 25, resizeMode: 'center' }}
                            source={eachSponge} />
                    ))}
                </View>
                <View style={{ flex: 0.5 }}>
                    <Text style={{ fontSize: 18, fontFamily: Platform.OS === 'android' ? 'Arcade-Classic' : 'Teko-Semibold' }}>HARD</Text>
                </View>

            </View>
        </View>
    )
}

export default Sponges