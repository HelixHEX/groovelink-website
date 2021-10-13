import {
    Flex,
    Text
} from '@chakra-ui/react'

const Avatar = ({name}) => {
    return(
        <>
            <Flex justifyContent='center' alignSelf='center' w={45} h={45} bg='blue.400' rounded={100}>
                <Text alignSelf='center' color='white'>{name.charAt(0).toUpperCase()}</Text>
            </Flex>
        </>
    )
}

export default Avatar