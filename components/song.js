import {
    Flex,
    Text,
    Button,
    Icon,
    useToast
} from '@chakra-ui/react'
import axios from 'axios';
import { signOut, useSession } from 'next-auth/client';
import { useEffect, useState } from 'react';
import { Plus, X } from 'react-feather'
import { toastError } from '../helpers/error';

const Song = ({ song, index, hSongs }) => {
    const [session] = useSession()
    let min = (song.track.duration_ms / 1000) / 60;
    min = ~~min
    let seconds = (song.track.duration_ms / 1000) - (min * 60)
    seconds = ~~seconds
    const toast = useToast()
    const [added, setAdded] = useState('block')
    useEffect(() => {
        if (hSongs.length > 0) {
            let exists = hSongs.find(hSong => hSong.spotifyId === song.track.id)
            if (exists)
                setAdded('none')
        }
    }, [])
    const addToProfile = async () => {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/add-song-to-profile`, {
            accessToken: session.user.accessToken,
            spotifyId: session.user.id,
            songId: song.track.id,
            artists: song.track.artists,
            name: song.track.name
        }).then(res => {
            if (res.data.success) setAdded('none')
            else if (res.data.type === 'accessToken') console.log(res.data)
            else toast({
                title: 'Uh Oh :(',
                description: res.data.error,
                status: "error",
                duration: 5000,
                isClosable: true,
            })
        })
    }
    const removeSong = async () => {
        console.log(index)
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/remove-song-from-profile`, {
            spotifyId: session.user.id,
            accessToken: session.user.accessToken,
            index
        }).then(res => {
            if (res.data.success) {
                setAdded('block')
            }
            else console.log(res.data)
        })
        console.log('hi')
    }
    return (
        <>
            <Flex w='100%' h={50} mt={10} _hover={{ bg: '#032F95', color: 'white', cursor: 'pointer' }}>
                <Text ml={2} alignSelf='center'>{index + 1}. {song.track.name} -</Text>
                <Flex ml={1}>
                    {/* {song.track.artists.map((artist, artistIndex) => {
                        if (artistIndex + 1 === song.track.artists.length)
                            return <Text alignSelf='center' key={artistIndex}>{artist.name}</Text>
                        else return <Text alignSelf='center' key={artistIndex}>{artist.name},&nbsp;</Text>
                    })} */}
                    <Text fontWeight='200' w={'85%'} isTruncated alignSelf='center' >
                        {song.track.artists.map((artist, artistIndex) => {
                            return `${artist.name}${artistIndex + 1 !== song.track.artists.length ? ', ' : null}`
                        })}
                    </Text>
                </Flex>
                <Flex pos='absolute' alignSelf='center' right={50}>
                    <Text mr={10} >{min}:{seconds}</Text>
                    <Icon display={added} onClick={() => addToProfile()} _hover={{ color: 'black' }} w={25} h={25} alignSelf='center' as={Plus} />
                    <Icon display={added === 'block' ? 'none' : 'block'} onClick={() => removeSong()} _hover={{ color: 'black' }} w={25} h={25} alignSelf='center' as={X} />
                </Flex>
            </Flex>
        </>
    )
}

export default Song