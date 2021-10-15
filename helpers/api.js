import axios from "axios"
const url = process.env.NEXT_PUBLIC_API_URL
export const allMessages = () => {
    let messages = [
        {
            text: 'Sample message',
            sender: 'Elias Wambugu',
            profile_img: 'https://i.ibb.co/pf24Ttq/IMG-6145-Original.jpg',
            timestamp: '12:00 PM'
        },
        {
            text: 'Sample message',
            sender: 'Elias Wambugu',
            profile_img: 'https://i.ibb.co/pf24Ttq/IMG-6145-Original.jpg',
            timestamp: '12:00 PM'
        },
        {
            text: 'Sample message',
            sender: 'Elias Wambugu',
            profile_img: 'https://i.ibb.co/pf24Ttq/IMG-6145-Original.jpg',
            timestamp: '12:00 PM'
        },
        {
            text: 'Sample message',
            sender: 'Elias Wambugu',
            profile_img: 'https://i.ibb.co/pf24Ttq/IMG-6145-Original.jpg',
            timestamp: '12:00 PM'
        },
        {
            text: 'Sample message',
            sender: 'Elias Wambugu',
            profile_img: 'https://i.ibb.co/pf24Ttq/IMG-6145-Original.jpg',
            timestamp: '12:00 PM'
        },
    ]
    return messages
}

export const getFriends = async (session) => {
    await axios.post(`${url}/user/friends`, {
        spotifyId: session.user.id
    }).then(res => {
        if (res.success)
            return res.data.friends
    })
}
