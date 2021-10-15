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

const Song = ({ search, song, index, hSongs, removeSongSearch, addSongSearch }) => {
    song = song.track ? song.track : song
    const [session] = useSession()
    let min = (song.duration_ms / 1000) / 60;
    min = ~~min
    let seconds = (song.duration_ms / 1000) - (min * 60)
    seconds = ~~seconds
    seconds = seconds
    const toast = useToast()
    const [added, setAdded] = useState('block')
    useEffect(() => {
        // console.log(hSongs)
        if (hSongs.length > 0) {
            // console.log(hSongs)
            let exists = hSongs.find(hSong => hSong.spotifyId === song.id)
            if (exists){
                console.log(exists)
                setAdded('none')
            } else {
                setAdded('block')
            }
        }
    }, [song, hSongs])
    const addToProfile = async () => {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/add-song-to-profile`, {
            accessToken: session.user.accessToken,
            spotifyId: session.user.id,
            songId: song.id,
            artists: song.artists,
            name: song.name
        }).then(res => {
            if (res.data.success) {
                if (search) addSongSearch({
                    name: song.name,
                    artists: song.artists,
                    spotifyId: song.id
                })
                setAdded('none')
            }
            else if (res.data.type === 'accessToken') signOut()
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
            songId: song.id,
            accessToken: session.user.accessToken,
            index
        }).then(res => {
            if (res.data.success) {
                if (search) {
                    removeSongSearch(song.id)
                }
                setAdded('block')
            }
            else if (res.data.type === 'accessToken') signOut()
            else toast({
                title: 'Uh Oh :(',
                description: res.data.error,
                status: "error",
                duration: 5000,
                isClosable: true,
            })  
        })
        console.log('hi')
    }
    return (
        <>
            <Flex w='100%' mt={10} h={65} _hover={{ bg: '#032F95', color: 'white', cursor: 'pointer' }}>
                <Text fontSize={20} ml={2} alignSelf='center'>{index + 1}.</Text>
                <Flex alignSelf='center' flexDir='column' fontSize={20} ml={3}>
                    <Text isTruncated w={600}>{song.name}</Text>
                    <Text fontWeight='200'>
                        {song.artists.map((artist, artistIndex) => {
                            return `${artist.name}${artistIndex + 1 !== song.artists.length ? ', ' : ''}`
                        })}
                    </Text>
                </Flex>
                <Flex pos='absolute' alignSelf='center' right={50}>
                    <Text mr={10} >{min}:{seconds}</Text>
                    <Icon display={added} onClick={() => addToProfile()} _hover={{ color: 'black' }} w={25} h={25} alignSelf='center' as={Plus} />
                    <Icon display={added === 'block' ? 'none' : 'block'} onClick={() => removeSong()} _hover={{ color: 'black' }} w={25} h={25} alignSelf='center' as={X} />
                </Flex>
            </Flex>
            {/* <Flex w='100%' h={65} mt={12} _hover={{ bg: '#032F95', color: 'white', cursor: 'pointer' }}>
                <Text ml={2} alignSelf='center'>{index + 1}.</Text>
                <Flex flexDir='column' ml={1}>
                    <Text>{song.name}</Text>
                    {song.artists.map((artist, artistIndex) => {
                        if (artistIndex + 1 === song.artists.length)
                            return <Text alignSelf='center' key={artistIndex}>{artist.name}</Text>
                        else return <Text alignSelf='center' key={artistIndex}>{artist.name},&nbsp;</Text>
                    })}
                    <Text fontWeight='200' isTruncated alignSelf='center' >
                        {song.artists.map((artist, artistIndex) => {
                            return `${artist.name}${artistIndex + 1 !== song.artists.length ? ', ' : ''}`
                        })}
                    </Text>
                </Flex>
                <Flex pos='absolute' alignSelf='center' right={50}>
                    <Text mr={10} >{min}:{seconds}</Text>
                    <Icon display={added} onClick={() => addToProfile()} _hover={{ color: 'black' }} w={25} h={25} alignSelf='center' as={Plus} />
                    <Icon display={added === 'block' ? 'none' : 'block'} onClick={() => removeSong()} _hover={{ color: 'black' }} w={25} h={25} alignSelf='center' as={X} />
                </Flex>
            </Flex> */}
        </>
    )
}

export default Song