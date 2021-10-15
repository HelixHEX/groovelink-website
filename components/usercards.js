import { useEffect, useState } from 'react'
import {
    Image,
    Text,
    Flex,
    useToast,
    Button
} from '@chakra-ui/react'

import Card from './card'
import axios from 'axios'
import { signOut, useSession } from 'next-auth/client'


const UserCards = () => {
    const [session] = useSession()
    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState()
    const [offset, setOffset] = useState(0)
    const toast = useToast()
    useEffect(() => {
        const main = async () => {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/discover`, {
                spotifyId: session.user.id,
                accessToken: session.user.accessToken
            }).then(res => {
                if (res.data.success) {
                    setUsers(res.data.potential)
                    setCurrentUser(res.data.potential[0])
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
        main()
    }, [])

    const handleAdd = async () => {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/add-friend`, {
            spotifyId: session.user.id,
            userId: users[0].spotifyId,
            accessToken: session.user.accessToken
        }).then(res => {
            if (res.data.success) {
                // checkLength()
                if (users.length > 1) {
                    setUsers(users.filter(user => user.spotifyId !== currentUser.spotifyId))
                    setCurrentUser(users[1])
                } else {
                    setUsers([])
                    setCurrentUser()
                }
            } else if (res.data.type === 'accessToken') {
                signOut()
            } else {
                console.log(res.data)
                toast({
                    title: 'Uh Oh :(',
                    description: res.data.error,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                })
            }
        })
    }

    const handleSkip = async () => {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/skip-user`, {
            spotifyId: session.user.id,
            userId: users[0].spotifyId,
            accessToken: session.user.accessToken
        }).then(res => {
            if (res.data.success) {
                // checkLength()
                if (users.length > 1) {
                    setUsers(users.filter(user => user.spotifyId !== currentUser.spotifyId))
                    setCurrentUser(users[1])
                } else {
                    setUsers([])
                    setCurrentUser()
                }
            } 
            else if (res.data.type === 'accessToken') signOut()
            else {
                toast({
                    title: 'Uh Oh :(',
                    description: res.data.error,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                })
            }
        })
    }
    return (
        <>
            {currentUser
                ?
                <Flex mt={10} alignSelf='center'>
                    <Button onClick={() => handleSkip()} right={10} margin='auto' color='white' bg='#032F95'>Skip</Button>
                    <Card user={currentUser} />
                    <Button onClick={() => handleAdd()} left={10} margin='auto' color='white' bg='#032F95'>Add</Button>

                </Flex>
                : <Text margin='auto'> There are currently no potential matches :(</Text>}
        </>
    )
}

export default UserCards