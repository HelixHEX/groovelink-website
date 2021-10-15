import {
    Image,
    Text,
    Flex
} from '@chakra-ui/react'

const Card = ({ user }) => {
    return (
        <>
            <Flex pos='relative' rounded={10} w={500} h={600}>
                <Flex bgGradient="linear(to-b, transparent, gray.900)" zIndex={-1} pos='absolute' rounded={10} w='100%' h='100%'></Flex>
                {user.picture
                    ? <Image zIndex={-2} pos='absolute' rounded={10} src={user.picture} w='100%' h='100%' />
                    : <Flex justifyContent='center' zIndex={-2} pos='absolute' rounded={10} w='100%' h='100%' bg='#032F95'>
                        <Text margin='auto' color='white' fontSize={50}>No Image :(</Text>
                        </Flex>}
                <Flex flexDir='column' color='white' alignSelf='flex-end' p={7}>
                    <Text fontSize={30} fontWeight='700'>{user.name}, {user.age}</Text>
                    <Text fontWeight='200' fontSize={30}>{user.city}, {user.state}</Text>
                    <Text fontSize={20} mt={10}>HIGHLIGHTED SONGS</Text>
                    {user.highlightedsongs.map((song, index) => (
                        <Flex key={index}>
                            <Text w='95%' isTruncated>{index + 1}. {song.name} - {song.artist}</Text>
                        </Flex>
                    ))}
                </Flex>
            </Flex>
        </>
    )
}

export default Card