import {
    Flex,
    Text,
    Grid,
    GridItem
} from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Nav from '../components/nav'
import PlaylistCard from '../components/playlistcard'

const Playlists = ({ session }) => {
    const [playlists, setPlaylists] = useState([])
    useEffect(() => {
        const main = async () => {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/music/playlists`, {
                accessToken: session.user.accessToken
            }).then(res => {
                if (res.data.success) setPlaylists(res.data.playlists)
            })
        }
        main()
    }, [])
    return (
        <>
            <Flex w='100vw' h='100vh' p={3}>
                <Nav />

                <Flex overflowY='auto'  w='100%' h='100%' flexDir='column'>
                    <Text alignSelf='center' fontSize={50} color='#032F95'>Playlists</Text>
                    {playlists ?
                        <Grid mt={10} mb={10} rowGap={10} columnGap={20} alignSelf='center' templateColumns="repeat(3, 1fr)" flexDir='row'>
                            {playlists.map((playlist, index) => (
                                <Flex key={index}>
                                    <PlaylistCard playlist={playlist} />
                                </Flex>
                            ))}
                        </Grid>
                        : "loading..."
                    }
                </Flex>
            </Flex>
        </>
    )
}

export default Playlists