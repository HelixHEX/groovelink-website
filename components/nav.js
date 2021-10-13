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
        const main = async () => {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/friends`, {
                spotifyId: session.user.id
            }).then(res => {
                if (res.data.success) setFriends(res.data.friends)
            })
        }
        main()
    }, [])
    
    return (
        <>
            <Flex flexDir='column' pt={10} pb={10} borderBottomLeftRadius={30} borderTopLeftRadius={30} bg='#F5F9FA' w={250} h={'100%'}>
                <Flex alignSelf='center' flexDir='column'>
                    <Flex _hover={{ cursor: 'pointer', color: '#032F95' }} color={router.pathname === '/' ? '#032F95' : '#66676E'} h={6}>
                        <Icon h={25} w={25} alignSelf='center' as={UserPlus} />
                        <Text fontSize={20} ml={5}>Discover</Text>
                    </Flex>
                    <Flex _hover={{ cursor: 'pointer', color: '#032F95' }} mt={10} color='#66676E' h={6}>
                        <Icon h={25} w={25} alignSelf='center' as={Users} />
                        <Text ml={5} fontSize={20} >Friends</Text>
                    </Flex>
                    <Flex _hover={{ cursor: 'pointer', color: '#032F95' }} mt={10} color='#66676E' h={6}>
                        <Icon h={25} w={25} alignSelf='center' as={Disc} />
                        <Text ml={5} fontSize={20} >Playlists</Text>
                    </Flex>
                    <Flex _hover={{ cursor: 'pointer', color: '#032F95' }} mt={10} color='#66676E' h={6}>
                        <Icon h={25} w={25} alignSelf='center' as={User} />
                        <Text ml={5} fontSize={20} >Profile</Text>
                    </Flex>
                    <Text color='#B4B5BD' mt={20} fontSize={30}>FRIENDS</Text>
                    {friends ?
                        friends.map((data, index) => (
                            <Flex mt={5} key={index}>
                                {data.picture ? <Image w={45} h={45} rounded={100} src={data.picture} alt={data.name} /> : <Avatar name={data.name} />}
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