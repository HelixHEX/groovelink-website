import { useState } from 'react'
import {
    Image,
    Text,
    Flex
} from '@chakra-ui/react'

import Card from './card'


const UserCards = () => {
    // const [users, setUsers] = useState([
    //     {
    //         name: 'Elias Wambugu',
    //         age: 18,
    //         city: 'San Rafael',
    //         state: 'CA',
    //         profile_img: 'https://i.ibb.co/n6XCkX6/DSC06044.jpg',
    //         songs: [
    //             {
    //                 name: 'Leave the door open',
    //                 artist: 'Bruno Mars, Anderson .Paak, Silk Sonic'
    //             },
    //             {
    //                 name: 'Animal',
    //                 artist: 'Neon Trees'
    //             },
    //             {
    //                 name: 'What you know',
    //                 artist: 'Two Door Cinema'
    //             }
    //         ]
    //     },
    //     {
    //         name: 'Elias Wambugu',
    //         age: 18,
    //         city: 'San Rafael',
    //         state: 'CA',
    //         profile_img: 'https://i.ibb.co/n6XCkX6/DSC06044.jpg',
    //         songs: [
    //             {
    //                 name: 'Leave the door open',
    //                 artist: 'Bruno Mars, Anderson .Paak, Silk Sonic'
    //             },
    //             {
    //                 name: 'Animal',
    //                 artist: 'Neon Trees'
    //             },
    //             {
    //                 name: 'What you know',
    //                 artist: 'Two Door Cinema'
    //             }
    //         ]
    //     },
    //     {
    //         name: 'Elias Wambugu',
    //         age: 18,
    //         city: 'San Rafael',
    //         state: 'CA',
    //         profile_img: 'https://i.ibb.co/n6XCkX6/DSC06044.jpg',
    //         songs: [
    //             {
    //                 name: 'Leave the door open',
    //                 artist: 'Bruno Mars, Anderson .Paak, Silk Sonic'
    //             },
    //             {
    //                 name: 'Animal',
    //                 artist: 'Neon Trees'
    //             },
    //             {
    //                 name: 'What you know',
    //                 artist: 'Two Door Cinema'
    //             }
    //         ]
    //     },
    // ])

    const [user, setUser] = useState({
        name: 'Elias Wambugu',
        age: 18,
        city: 'San Rafael',
        state: 'CA',
        profile_img: 'https://i.ibb.co/n6XCkX6/DSC06044.jpg',
        songs: [
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
        ]
    },)
    return (
        <>
            <Card user={user} />
        </>
    )
}

export default UserCards