import {
    IconButton,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Icon,
    Image,
    Button,
    Flex,
    Text,
    useToast,
} from '@chakra-ui/react'
import axios from 'axios'
import { signOut, useSession } from 'next-auth/client'
import { useState } from 'react'

import { ChevronDown, ChevronUp, Edit, X, Search as SearchIcon } from 'react-feather'
import Song from './song'

const Search = ({ hSongs, removeSongSearch, addSongSearch }) => {
    const [session] = useSession()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [dropDown, setDropDown] = useState('block')
    const [name, setName] = useState('')
    const toast = useToast()
    const [songs, setSongs] = useState([])

    const handleSearch = async (e) => {
        e.preventDefault()
        if (name.length > 0) {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/music/search-track`, {
                accessToken: session.user.accessToken,
                // spotifyId: session.user.id,
                name
            }).then(res => {
                if (res.data.success) 
                    setSongs(res.data.songs)
                else if (res.data.type === 'accessToken') signOut()
                else toast({
                    title: 'Uh Oh :(',
                    description: res.data.error,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                })
            })
        } else {
            setSongs([])
        }
    }

    return (
        <>
            <IconButton onClick={onOpen} icon={<Edit size={18} />} ml={3} w={30} h={30}></IconButton>
            <Modal blockScrollOnMount={true} size='4xl' isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Highlighted Songs</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex fontSize={20} flexDir='column'>
                            <Flex>
                                <Text fontWeight='500'>Current Songs</Text>
                                {hSongs.length > 0
                                    ? <>
                                        <Icon _hover={{ cursor: 'pointer' }} onClick={() => setDropDown('block')} ml={2} w={25} h={25} as={ChevronUp} display={dropDown === 'block' ? 'none' : 'block'} />
                                        <Icon _hover={{ cursor: 'pointer' }} onClick={() => setDropDown('none')} ml={2} w={25} h={25} as={ChevronDown} display={dropDown} />
                                    </>
                                    : null}
                            </Flex>
                            <Flex display={dropDown} flexDir='column'>
                                {hSongs.length > 0
                                    ? hSongs.map((song, index) => (
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
                                            <IconButton onClick={() => removeSongSearch(song.spotifyId)} alignSelf='center' pos='absolute' right={20} icon={<X />} />
                                        </Flex>
                                    ))
                                    : null}
                            </Flex>

                            <Text fontWeight='500' fontSize={20} mt={5}>Search</Text>
                            <form onSubmit={handleSearch}>
                                <Flex w='100%'>
                                    <Input w='100%' value={name} onChange={e => setName(e.target.value)} placeholder='Search track' variant='flushed' />
                                    <Icon type='submit' onClick={handleSearch} _hover={{ cursor: 'pointer' }} w={25} h={25} alignSelf='center' as={SearchIcon} />
                                </Flex>
                            </form>
                            <Flex w='100%'>
                                {songs.length > 0
                                    ? <Flex w='100%' Flex flexDir='column'>
                                        {songs.map((song, index) => (
                                            <Song addSongSearch={addSongSearch} key={index} removeSongSearch={removeSongSearch} search={true} hSongs={hSongs} song={song} index={index} />
                                        ))}
                                    </Flex>
                                    : null}
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

export default Search