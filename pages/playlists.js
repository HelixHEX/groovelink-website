import {
    Flex,
    Text,
    Grid,
    GridItem,
    useToast
} from '@chakra-ui/react'
import axios from 'axios'
import { signOut, useSession } from 'next-auth/client'
import { useEffect, useState } from 'react'
import Nav from '../components/nav'
import PlaylistCard from '../components/playlistcard'

const Playlists = () => {
    const [playlists, setPlaylists] = useState([])
    const [highlightedSongs, setHighlightedSongs] = useState([])
    const [session] = useSession()
    const toast = useToast()

    useEffect(() => {
        const main = async () => {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/music/playlists`, {
                accessToken: session.user.accessToken,
                spotifyId: session.user.id
            }).then(res => {
                if (res.data.success) {
                    setPlaylists(res.data.playlists)
                    setHighlightedSongs(res.data.highlightedsongs)
                }
                else if (res.data.type === 'accessToken') signOut()
                else toast({
                    title: "Uh Oh :(",
                    description: res.data.error,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                })
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
                        <Grid mt={10} mb={10} rowGap={10} columnGap={20} alignSelf='center' templateColumns="repeat(4, 1fr)" flexDir='row'>
                            {playlists.map((playlist, index) => (
                                <Flex key={index}>
                                    <PlaylistCard hSongs={highlightedSongs}  playlist={playlist} />
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