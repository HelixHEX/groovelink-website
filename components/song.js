import {
    Flex,
    Text,
    Button,
    Icon
} from '@chakra-ui/react'

const Song = ({ song, index }) => {
    return (
        <>
            <Flex h={50} mt={10} _hover={{ bg: '#032F95', color: 'white', cursor: 'pointer' }}>
                <Text ml={2} alignSelf='center'>{index + 1}. {song.track.name} -</Text>
                <Flex ml={1}>
                    {song.track.artists.map((artist, artistIndex) => {
                        if (artistIndex + 1 === song.track.artists.length)
                            return <Text alignSelf='center' key={artistIndex}>{artist.name}</Text>
                        else return <Text alignSelf='center' key={artistIndex}>{artist.name},&nbsp;</Text>
                    })}
                </Flex>
            </Flex>
        </>
    )
}

export default Song