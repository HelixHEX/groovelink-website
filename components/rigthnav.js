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
import { useSession } from 'next-auth/client'
import { useEffect, useState } from 'react'
import { allMessages } from '../helpers/api'
import Avatar from './avatar'
import { Edit } from 'react-feather'

const RightNav = () => {
    const [session] = useSession()
    const [songs, setSongs] = useState([
        {
            name: 'Leave the door open',
            artist: 'Bruno Mars, Anderson .Paak, Silk Sonic'
        },
        {
            name: 'Animal',
            artist: 'Neon Trees'
        },
        {
            name: 'What you know',
            artist: 'Two Door Cinema'
        }
    ])
    const [messages, setMessages] = useState(allMessages)
    return (
        <>
            <Flex flexDir='column' pt={10} pb={2} borderBottomRightRadius={20} borderTopRightRadius={20} bg='#F5F9FA' w={400} h={'100%'}>
                <Image h={300} src='https://i.ibb.co/n6XCkX6/DSC06044.jpg' />
                <Flex fontSize={20} ml={5} flexDir='column'>
                    <Flex>
                        <Avatar rounded={100} name={session.user.name} src={session.user.picture} h={100} w={100} mt={-50} />
                        <Flex mt={2} color='#66676E' flexDir='column'>
                            <Text ml={3} >{session.user.name}, 18</Text>
                            <Text fontWeight='200' ml={3} >San Rafael, CA</Text>
                        </Flex>
                    </Flex>
                    <Flex mt={5} flexDir='column'>
                        <Flex>
                            <Text alignSelf='center' color='#B4B5BD'>HIGHLIGHTED SONGS</Text>
                            <IconButton icon={<Edit size={18} />} ml={3} w={30} h={30}></IconButton>
                        </Flex>
                        {songs.map((song, index) => (
                            <Flex mt={3} color='#66676E' key={index} fontSize={15}>
                                <Text isTruncated>{index + 1}. {song.name} - {song.artist}</Text>
                            </Flex>
                        ))}
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
        </>
    )
}

export default RightNav