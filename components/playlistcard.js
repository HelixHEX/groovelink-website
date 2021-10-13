import {
    Flex,
    Text,
    Image
} from '@chakra-ui/react'
import { useEffect } from 'react'

const PlaylistCard = ({ playlist }) => {
    useEffect(() => {
        console.log(playlist.images)
    }, [])
    return (
        <>
            <Flex alignContent='center' flexDir='column'>
                {playlist.images.length > 0
                    ? <Image rounded={10} w={150} h={150} src={playlist.images[0].url} /> :
                    <Flex rounded={10} w={150} h={150} bg='#032F95'>
                        <Text margin='auto' fontSize={50} color='white'>{playlist.name.charAt(0)}</Text>
                    </Flex>
                }
                <Text  w={200} >{playlist.name}</Text>
            </Flex>
        </>
    )
}

export default PlaylistCard