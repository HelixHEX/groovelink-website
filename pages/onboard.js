import {
    Flex,
    Input,
    Text,
    Button,
    useToast,
    NumberInput,
    NumberInputField,
} from '@chakra-ui/react'
import axios from 'axios'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Onboard = () => {
    const toast = useToast()
    const router = useRouter()
    const [session] = useSession()
    const [fName, setFName] = useState()
    const [lName, setLName] = useState()
    const [email, setEmail] = useState(session.user.email)
    const [age, setAge] = useState(18)
    const [city, setCity] = useState()
    const [state, setState] = useState()

    useEffect(() => {
        const main = async () => {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/check-account`, {
                spotifyId: session.user.id,
                accessToken: session.user.accessToken
            }).then(res => {
                if (res.data.success) router.push('/')
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
    }, [router, session.user.id, session.user.accessToken, toast])

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
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/create`, {
                fName,
                lName,
                email,
                age,
                accessToken: session.user.accessToken,
                spotifyId: session.user.id,
                picture: session.user.picture,
                city,
                state
            }).then(res => {
                if (res.data.success) {
                    toast({
                        title: "Account Created",
                        description: 'Your account was successfully created!',
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                    })
                    router.push('/')
                }
                else if (res.data.error === 'User exists') {
                    router.push('/')
                    toast({
                        title: "Uh Oh :(",
                        description: res.data.error,
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    })
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
            <Flex w='100%' h='100vh' justifyContent='center' textAlign='center'>
                <Flex justifySelf='center' justifyContent='center' flexDir='column'>
                    <Text color='#032F95' fontWeight='700' fontSize={50}>Welcome to GrooveLynk!</Text>
                    <Text fontWeight='200' fontSize={50}>Before we can continue, we need a few details first</Text>
                    <Flex fontWeight='700' mt={5} flexDir='column' alignSelf='center' >
                        <Text textAlign='left'>First Name</Text>
                        <Input fontSize={20} w={300} variant='flushed' placeholder='Enter First Name' value={fName} onChange={e => setFName(e.target.value)} />
                    </Flex>
                    <Flex fontWeight='700' mt={5} flexDir='column' alignSelf='center'>
                        <Text textAlign='left'>Last Name</Text>
                        <Input fontSize={20} w={300} variant='flushed' placeholder='Enter Last Name' value={lName} onChange={e => setLName(e.target.value)} />
                    </Flex>
                    <Flex fontWeight='700' mt={5} flexDir='column' alignSelf='center' >
                        <Text textAlign='left'>Age</Text>
                        <NumberInput min={18} placeholder='Age' value={age} onChange={e => checkAge(e)} variant='flushed' w={300} >
                            <NumberInputField />
                        </NumberInput>
                    </Flex>
                    <Flex fontWeight='700' mt={5} flexDir='column' alignSelf='center'>
                        <Text textAlign='left'>Email</Text>
                        <Input fontSize={20} w={300} variant='flushed' placeholder='Enter Email' value={email} onChange={e => setEmail(e.target.value)} />
                    </Flex>
                    <Flex fontWeight='700' mt={5} flexDir='column' alignSelf='center'>
                        <Text textAlign='left'>City</Text>
                        <Input fontSize={20} w={300} variant='flushed' placeholder='Enter City' value={city} onChange={e => setCity(e.target.value)} />
                    </Flex>
                    <Flex fontWeight='700' mt={5} flexDir='column' alignSelf='center'>
                        <Text textAlign='left'>State</Text>
                        <Input fontSize={20} w={300} variant='flushed' placeholder='Enter State' value={state} onChange={e => setState(e.target.value)} />
                    </Flex>
                    <Button onClick={() => handleSubmit()} bg='#032F95' color='white' alignSelf='center' mt={5} w={300}>Submit</Button>
                </Flex>
            </Flex>
        </>
    )
}

export default Onboard