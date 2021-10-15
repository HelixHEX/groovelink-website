import {
    Flex,
    Button,
    Image,
    Text,
    Icon,
    OrderedList,
    ListItem,
    IconButton
} from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/client'
import { useEffect, useState } from 'react'
import { allMessages } from '../helpers/api'
import Avatar from './avatar'
import { Edit, X } from 'react-feather'
import axios from 'axios'
import Search from './search'

const RightNav = () => {
    const [session] = useSession()
    const [user, setUser] = useState()
    const [messages, setMessages] = useState(allMessages)
    useEffect(() => {
        const main = async () => {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
                spotifyId: session.user.id,
                accessToken: session.user.accessToken
            }).then(res => {
                if (res.data.success) setUser(res.data.user)
            })
        }
        main()
    }, [])

    const removeSong = async (spotifyId) => {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/remove-song-from-profile`, {
            spotifyId: session.user.id,
            accessToken: session.user.accessToken,
            songId: spotifyId
        }).then(res => {
            if (res.data.success) {
                setUser({
                    ...user,
                    highlightedsongs: user.highlightedsongs.filter(song => song.spotifyId !== spotifyId)
                })
            }
            if (res.data.error) console.log(res.data.error)
        })
    }
    const removeSongSearch = spotifyId => {
        setUser({
            ...user,
            highlightedsongs: user.highlightedsongs.filter(song => song.spotifyId != spotifyId)
        })
    }

    const addSongSearch = song => {
        setUser({
            ...user,
            highlightedsongs: [
                ...user.highlightedsongs,
                song
            ]
        })
    }
    return (
        <>
            {user ?
                <Flex flexDir='column' pt={10} pb={2} borderBottomRightRadius={20} borderTopRightRadius={20} bg='#F5F9FA' w={400} h={'100%'}>
                    <Flex fontSize={20} ml={5} flexDir='column'>
                        <Flex>
                            <Avatar alignSelf='center' rounded={100} name={user.name} src={user.picture} h={50} w={50} />
                            <Flex color='#66676E' flexDir='column'>
                                <Text ml={3} >{user.name}, {user.age}</Text>
                                <Text fontWeight='200' ml={3} >{user.city}, {user.state}</Text>
                            </Flex>
                        </Flex>
                        <Flex pr={3} mt={5} flexDir='column' w='100%'>
                            <Flex>
                                <Text alignSelf='center' color='#B4B5BD'>HIGHLIGHTED SONGS</Text>
                                <Search addSongSearch={addSongSearch} removeSongSearch={removeSongSearch} hSongs={user.highlightedsongs} />
                            </Flex>
                            <Flex flexDir='column'>
                                {user.highlightedsongs ?
                                    user.highlightedsongs.map((song, index) => (
                                        <Flex mt={4} key={index} >
                                            <Text mt={3} color='#66676E' fontSize={15} isTruncated>{index + 1}.</Text>
                                            <Flex ml={2} flexDir='column' color='#66676E' fontSize={15}>
                                                <Text fontWeight='500' isTruncated w={280}>{song.name} </Text>
                                                <Flex w='100%' isTruncated>
                                                    <Text fontWeight='200' w={280} isTruncated alignSelf='center' >
                                                        {song.artists.map((artist, artistIndex) => {
                                                            return `${artist.name}${artistIndex + 1 !== song.artists.length ? ', ' : ''}`
                                                        })}
                                                    </Text>
                                                </Flex>
                                            </Flex>
                                            <Icon onClick={() => removeSong(song.spotifyId)} _hover={{ color: '#032F95', cursor: 'pointer' }} ml={5} alignSelf='center' as={X} />
                                        </Flex>
                                    ))
                                    : null}
                            </Flex>
                        </Flex>
                    </Flex>
                    {/* <Flex margin='auto' mt={5} borderRadius={5} justifyContent='center' w={200} h={50} bg='#032F95'>
                <Text alignSelf='center' fontSize={25} color='#00F3F8'>Messages</Text>
            </Flex>
            <Flex overflowY='auto' flexDir='column' mt={5}>
                {messages.map((message, index) => (
                    <Flex mt={5} key={index} >
                        <Avatar ml={5} name={message.name} rounded={100} src={message.profile_img} w={45} h={45} />
                        <Flex ml={3} flexDir='column' alignSelf='center'>
                            <Text color='#66676E'>{message.sender}</Text>
                            <Text color='#B4B5BD'>{message.text}</Text>
                        </Flex>
                    </Flex>
                ))}
            </Flex> */}
                </Flex>
                : null}
        </>
    )
}

export default RightNav