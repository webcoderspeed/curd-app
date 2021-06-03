import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import useFetch from './useFetch'


const UserDetails = () => {

    const { id } = useParams();
    
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [dob, setDob] = useState();
    const [gender, setGender] = useState();

    const { data: user, error, isPending } = useFetch('http://searcheduapiii.searchedu.co.in:4112/sample/' + id)
    const history = useHistory()
    const [isEditing, setIsEditing] = useState(false);
    
    // Handle Delete
    const handleDelete = () => {
        fetch('http://searcheduapiii.searchedu.co.in:4112/sample/'+ id,
        {
            method:'DELETE'
        })
        .then(() => {
            history.push('/')
        })
    }

    // Handle Edit And Save

    const handleEdit = () => {
        setIsEditing(true)
    }

    const handleSave = () => {
        setIsEditing(false)
        
        const editedUser = {...user,
          Namee:name || user[0].Namee , 
          Email: email || user[0].Email,
          DOB:dob || user[0].DOB.split('T')[0], 
          Gender: gender || user[0].Gender
        } 
        console.log(editedUser);

    
        fetch('http://searcheduapiii.searchedu.co.in:4112/sample/'+ id,{
            method:'PUT',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify(editedUser)
        })
        .then(() => {
            history.push('/')
        }) 
    }
    return (
        <div className='blog-details'>
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {user?.length && (
                <form onSubmit={handleSave} style={{
                    lineHeight:'3rem',
                    marginLeft:'2rem'
                }}>
                    Name: <input type='text' disabled={!isEditing}
                    value={name || user[0].Namee}
                    onChange={e => setName(e.target.value)} />
                    <br />
                    Email: <input type='email' disabled={!isEditing}
                    value={email || user[0].Email}
                    onChange={e => setEmail(e.target.value)} />
                    <br />
                     DOB: <input disabled={!isEditing} value={user[0].DOB.split('T')[0]} type='date' onChange={e => setDob(e.target.value)}/>
                     <br />
                    Gender: {
                    <select disabled={!isEditing}
                        value={user[0].Gender}
                        onChange={(e) => setGender(e.target.value)}>
                            <option value="0">Female</option>
                            <option value="1">Male</option>
                    </select>
}                   <br />
                    <button onClick={handleDelete}>Delete user</button>
                    {!isEditing && <button
                    style={{
                        marginLeft:'25px'
                    }}
                    onClick={handleEdit}
                    >Edit User</button>}
                    {isEditing && <button onClick={handleSave}
                    style={{
                        marginLeft:'25px'
                    }}
                    >Save</button>}
                </form>
            )}
        </div>
    )
}

export default UserDetails