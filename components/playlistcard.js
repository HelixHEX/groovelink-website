import {
    Flex,
    Text,
    Image,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
} from '@chakra-ui/react'
import axios from 'axios'
import { useSession } from 'next-auth/client'
import { useEffect, useState } from 'react'
import Song from './song'

const PlaylistCard = ({ playlist }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Flex onClick={onOpen} p={3} textAlign='center' _hover={{ bg: '#032F95', color: 'white', cursor: 'pointer', rounded: '10' }} flexDir='column'>
                {playlist.images.length > 0
                    ? <Image margin='auto' rounded={10} w={150} h={150} src={playlist.images[0].url} /> :
                    <Flex margin='auto' rounded={10} w={150} h={150} bg='blue.400'>
                        <Text margin='auto' fontSize={50} color='white'>{playlist.name.charAt(0)}</Text>
                    </Flex>
                }
                <Text w={200} >{playlist.name}</Text>
            </Flex>
            <PlaylistModal playlist={playlist} onOpen={onOpen} isOpen={isOpen} onClose={onClose} />
        </>
    )
}

const PlaylistModal = ({ playlist, isOpen, onClose, onOpen }) => {
    const [session] = useSession()
    const [playlistData, setPlaylistData] = useState({})
    useEffect(() => {
        const main = async () => {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/music/playlist`, {
                accessToken: session.user.accessToken,
                playlistId: playlist.id
            }).then(res => {
                if (res.data.success) {
                    setPlaylistData(res.data.playlist)
                    console.log(res.data.playlist.tracks.items)
                }
                // if (res.data.error)
            })
        }
        main()
    }, [])
    return (
        <Modal blockScrollOnMount={true} size='6xl' isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{playlist.name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {playlistData.tracks ?
                        <Flex overflowY='auto' flexDir='column'>
                            {playlistData.tracks.items.map((track, index) => (
                                <div key={index}>
                                    <Song song={track} index={index} />
                                </div>
                            ))}
                        </Flex>
                        : "Loading..."}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="ghost">Secondary Action</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default PlaylistCard