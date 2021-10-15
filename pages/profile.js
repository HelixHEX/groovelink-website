import {
    Flex,
    Text,
    Image,
    Input,
    Button,
    NumberInput,
    NumberInputField,
    useToast,
} from '@chakra-ui/react'
import axios from 'axios'
import { signOut, useSession } from 'next-auth/client'
import { useEffect, useState } from 'react'
import Avatar from '../components/avatar'

import Nav from '../components/nav'

const Profile = () => {
    const toast = useToast()
    const [session] = useSession()
    const [user, setUser] = useState()
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState(18)
    const [city, setCity] = useState('')
    const [state, setState] = useState('')

    useEffect(() => {
        const main = async () => {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
                spotifyId: session.user.id,
                accessToken: session.user.accessToken
            }).then(res => {
                if (res.data.success) {
                    let data = res.data.user
                    setUser(data)
                    setFName(data.name.split(" ")[0])
                    setLName(data.name.split(" ")[1])
                    setEmail(data.email)
                    setAge(data.age)
                    setCity(data.city)
                    setState(data.state)
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

    const checkAge = e => {
        if (e.toString().length > 1 && e < 18) {
            toast({
                title: "You must be at least 18 years old to use GrooveLynk",
                status: "error",
                duration: 5000,
                isClosable: true,
            })
        }
        setAge(e)
    }

    const handleSubmit = async () => {
        if (fName.length > 0 && lName.length > 0 && age.toString().length > 1 && email.length > 0 && city.length > 0 && state.length > 0) {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/update-info`, {
                accessToken: session.user.accessToken,
                spotifyId: session.user.id,
                fName,
                lName,
                email,
                age, 
                city,
                state
            }).then(res => {
                if (res.data.success)
                toast({
                    title: "Preferences saved",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                })
                else if (res.data.type === 'accessToken') signOut()
                else toast({
                    title: "Uh Oh : (",
                    description: res.data.error,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                })
            })
        } else {
            toast({
                title: "Uh Oh : (",
                description: "All fields are required",
                status: "error",
                duration: 5000,
                isClosable: true,
            })
        }
    }
    return (
        <>
            <Flex w='100vw' h='100vh' p={3}>
                <Nav />
                {user
                    ? <>
                        <Flex pl={5} w='100%' h='100%' flexDir='column'>
                            <Text fontSize={30}>Edit Profile</Text>
                            <Avatar fontSize={50} rounded={100} src={user.picture} name={user.name} w={100} h={100} alignSelf='center' />
                            <Flex fontWeight='600' w={500} mt={20} alignSelf='center' flexDir='column'>
                                <Flex>
                                    <Flex flexDir='column'>
                                        <Text >First Name</Text>
                                        <Input onChange={e => setFName(e.target.value)} value={fName} w={230} variant='flushed' />
                                    </Flex>
                                    <Flex ml={10} flexDir='column'>
                                        <Text>Last Name</Text>
                                        <Input onChange={e => setLName(e.target.value)} value={lName} w={230} variant='flushed' />
                                    </Flex>
                                </Flex>
                                <Flex w='100%' mt={10}>
                                    <Flex flexDir='column'>
                                        <Text>Age</Text>
                                        <NumberInput isDisabled min={18} placeholder='Age' value={age} onChange={e => checkAge(e)} variant='flushed' w={100} >
                                            <NumberInputField  />
                                        </NumberInput>
                                    </Flex>
                                    <Flex ml={10} flexDir='column'>
                                        <Text>Email</Text>
                                        <Input onChange={e => setEmail(e.target.value)} value={email} variant='flushed' w={365} />
                                    </Flex>
                                </Flex>
                                <Flex mt={10}>
                                    <Flex flexDir='column'>
                                        <Text>City</Text>
                                        <Input onChange={e => setCity(e.target.value)} value={city} w={230} variant='flushed' />
                                    </Flex>
                                    <Flex ml={10} flexDir='column'>
                                        <Text>State</Text>
                                        <Input onChange={e => setState(e.target.value)} value={state} w={230} variant='flushed' />
                                    </Flex>
                                </Flex>
                                <Button onClick={() => handleSubmit()} bg='#032F95' color='white' mt={10}>Update</Button>
                            </Flex>

                        </Flex>
                    </>
                    : 'loading...'}
            </Flex>
        </>
    )
}

export default Profile