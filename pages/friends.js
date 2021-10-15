import {
    Flex,
    Text
} from '@chakra-ui/react'
import axios from 'axios'
import { useSession } from 'next-auth/client'
import { useEffect, useState } from 'react'
import Friend from '../components/friend'

import Nav from '../components/nav'
import RightNav from '../components/rigthnav'

const Friends = () => {
    const [session] = useSession()
    const [friends, setFriends] = useState([])
    useEffect(() => {
        console.log(session.user)
        console.log(session.user.accessToken)
        const main = async () => {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/friends`, {
                spotifyId: session.user.id,
                accessToken: session.user.accessToken
            }).then(res => {
                if (res.data.success) setFriends(res.data.friends)
                else if (res.data.type === 'accessToken') signOut()
                else if (res.data.type === 'newAccount') router.push('/onboard')
                else toast({
                    title: 'Uh Oh :(',
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
                <Flex flexDir='column' w='60%' h='100%'>
                    <Text alignSelf='center' fontSize={50} color='#032F95'>Friends</Text>
                    <Flex w='100%' overflowY='auto' mt={20} ml={5} mr={5}>
                        {friends.length > 0
                            ? friends.map((friend, index) => (
                                <Flex  _hover={{color: 'white', bg:'#032F95'}} h={65}>
                                    <Text ml={2} fontSize={20} alignSelf='center' mr={3}>{index + 1}. </Text>
                                    <Flex alignSelf='center'>
                                        <Friend page={true} friend={friend} />
                                    </Flex>
                                </Flex>
                            ))
                            : <>
                                <Text>Head to the discover page and start adding people!</Text>
                            </>
                        }
                    </Flex>
                </Flex>
                <RightNav />
            </Flex>
        </>
    )
}

export default Friends