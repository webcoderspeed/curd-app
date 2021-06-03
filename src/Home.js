import React from 'react'
import UserList from './UserList';
import useFetch from './useFetch'

const Home = () => {

    const { data: users, isPending, error } = useFetch('http://searcheduapiii.searchedu.co.in:4112/sample') 

    console.log(users?.Result)

    return (
        <div className='home'>
            {error && <div>{error.message}</div>}
            { isPending && <div>Loading Users...</div>}
            {users?.Result && <UserList users={users.Result} title='All Users' />}
        </div>
    )
}

export default Home