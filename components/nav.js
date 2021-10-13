import {
    Text,
    Icon,
    Flex,
    Button,
    Image,
} from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'

import { Users, UserPlus, Disc, User } from 'react-feather'
import { signOut, useSession } from 'next-auth/client'

import Avatar from '../components/avatar'
import { useRouter } from 'next/router'
const Nav = () => {
    const router = useRouter()
    const [session] = useSession()
    const [friends, setFriends] = useState([])
    useEffect(() => {
        console.log(session.user)
        console.log(session.user.accessToken)
        const main = async () => {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/friends`, {
                spotifyId: session.user.id
            }).then(res => {
                if (res.data.success) setFriends(res.data.friends)
            })
        }
        main()
    }, [])

    const handleNav = path => {
        router.push(path)
    }
    return (
        <>
            <Flex flexDir='column' pt={10} pb={10} borderBottomLeftRadius={20} borderTopLeftRadius={20} bg='#F5F9FA' w={250} h={'100%'}>
                <Flex alignSelf='center' flexDir='column'>
                    <Flex onClick={() => handleNav('/')} _hover={{ cursor: 'pointer', color: '#032F95' }} color={router.pathname === '/' ? '#032F95' : '#66676E'} h={6}>
                        <Icon h={25} w={25} alignSelf='center' as={UserPlus} />
                        <Text fontSize={20} ml={5}>Discover</Text>
                    </Flex>
                    <Flex onClick={() => handleNav('friends')} _hover={{ cursor: 'pointer', color: '#032F95' }} color={router.pathname === '/friends' ? '#032F95' : '#66676E'} mt={10} h={6}>
                        <Icon h={25} w={25} alignSelf='center' as={Users} />
                        <Text ml={5} fontSize={20} >Friends</Text>
                    </Flex>
                    <Flex onClick={() => handleNav('playlists')} _hover={{ cursor: 'pointer', color: '#032F95' }} color={router.pathname === '/playlists' ? '#032F95' : '#66676E'} mt={10} h={6}>
                        <Icon h={25} w={25} alignSelf='center' as={Disc} />
                        <Text ml={5} fontSize={20} >Playlists</Text>
                    </Flex>
                    <Flex onClick={() => handleNav('profile')} _hover={{ cursor: 'pointer', color: '#032F95' }} color={router.pathname === '/profile' ? '#032F95' : '#66676E'} mt={10} h={6}>
                        <Icon h={25} w={25} alignSelf='center' as={User} />
                        <Text ml={5} fontSize={20} >Profile</Text>
                    </Flex>
                    <Text color='#B4B5BD' mt={20} fontSize={30}>FRIENDS</Text>
                    {friends ?
                        friends.map((data, index) => (
                            <Flex mt={5} key={index}>
                                <Avatar rounded={100} src={data.picture} w={45} h={45} name={data.name} />
                                <Text alignSelf='center' ml={3} w={150} isTruncated>{data.name}</Text>
                            </Flex>
                        )) : <Text>Loading...</Text>}
                    <Button mt={30} onClick={signOut}>Sign out</Button>
                </Flex>
            </Flex>
        </>
    )
}

export default Nav