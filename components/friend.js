import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Flex,
    Text,
    Button,
    Icon,
    useToast,
} from '@chakra-ui/react'
import Avatar from './avatar'
import { ChevronUp, ChevronDown } from 'react-feather'
import { useState } from 'react'
import axios from 'axios'
import { signOut, useSession } from 'next-auth/client'

const Friend = ({ friend, page }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [dropDown, setDropDown] = useState('block')
    return (
        <>
            <Flex onClick={onOpen} h={page ? 65 : null} w='100%' _hover={{ bg: page ? '#032F95' : '#F5F9FA', cursor: 'pointer', color: page ? 'white' : '#032F95' }} w={page ? 720 : '100%'}>
                <Avatar alignSelf={page ? 'center' : 'flex-start'} rounded={100} src={friend.picture} w={45} h={45} name={friend.name} />
                <Text alignSelf='center' ml={3} w={150} isTruncated>{friend.name}</Text>
            </Flex>
            <Modal blockScrollOnMount={true} size='4xl' isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    {/* <ModalHeader>{friend.name}</ModalHeader> */}
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex mt={10} flexDir='column'>
                            <Flex>
                                <Avatar rounded={100} src={friend.picture} w={65} h={65} name={friend.name} />
                                <Flex alignSelf='center' fontSize={20} ml={3} flexDir='column'>
                                    <Text>{friend.name}, {friend.age}</Text>
                                    <Text fontWeight='200'>{friend.city}, {friend.state}</Text>
                                </Flex>
                                <RemoveFriend friend={friend} />
                            </Flex>
                            <Flex mt={5} flexDir='column'>
                                <Flex>
                                    <Text fontWeight='500'>Current Songs</Text>
                                    {friend.highlightedsongs.length > 0
                                        ? <>
                                            <Icon _hover={{ cursor: 'pointer' }} onClick={() => setDropDown('block')} ml={2} w={25} h={25} as={ChevronUp} display={dropDown === 'block' ? 'none' : 'block'} />
                                            <Icon _hover={{ cursor: 'pointer' }} onClick={() => setDropDown('none')} ml={2} w={25} h={25} as={ChevronDown} display={dropDown} />
                                        </>
                                        : null}
                                </Flex>
                                <Flex display={dropDown} flexDir='column'>
                                    {friend.highlightedsongs.length > 0
                                        ? friend.highlightedsongs.map((song, index) => (
                                            <Flex key={index} mt={2}>
                                                <Text alignSelf='center'>{index + 1}. </Text>
                                                <Flex w='100%' ml={2} flexDir='column'>
                                                    <Text isTruncated w='85%' >{song.name}</Text>
                                                    <Flex>
                                                        <Text fontWeight='200'>
                                                            {song.artists.map((artist, artistIndex) => {
                                                                return `${artist.name}${artistIndex + 1 !== song.artists.length ? ', ' : ''}`
                                                            })}
                                                        </Text>
                                                    </Flex>
                                                </Flex>
                                            </Flex>
                                        ))
                                        : null}
                                </Flex>
                            </Flex>
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

const RemoveFriend = ({ friend }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [session] = useSession()
    const toast = useToast()
    const handleRemoveFriend = async () => {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/remove-friend`, {
            spotifyId: session.user.id,
            accessToken: session.user.accessToken,
            userId: friend.spotifyId
        }).then(res => {
            if (res.data.success) location.reload()
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
    return (
        <>
            <Button onClick={onOpen} colorScheme='red' ml={3} size='sm' alignSelf='center'>Remove Friend</Button>
            <Modal closeOnOverlayClick={false} blockScrollOnMount={true} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Are you sure?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text margin='auto'>This action cannot be reveresed</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>No</Button>
                        <Button onClick={() => handleRemoveFriend()} ml={2} colorScheme='red'>Yes</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Friend