import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import useFetch from './useFetch'


const UserDetails = () => {

    const { id } = useParams();
    const [gender, setGender] = useState()
    const [dob, setDob] = useState()

    const { data: user, error, isPending } = useFetch('http://searcheduapiii.searchedu.co.in:4112/sample/' + id)
    const history = useHistory()
    const [isEditing, setIsEditing] = useState(false);
    
    console.log(user)

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
    let name =  document.querySelector('.user-name')
    let email =  document.querySelector('.user-email')


    const handleEdit = () => {
        name.contentEditable=true;
        email.contentEditable=true;
        setIsEditing(true)
    }

    const handleSave = () => {
        name.contentEditable=false;
        email.contentEditable=false;
        setIsEditing(false)
        
        const editedUser = {...user,
          Namee: name.textContent, 
          Email:email.textContent,
          DOB:user[0].DOB.split('T')[0] || dob, 
          Gender: user[0].Gender || gender
        } 
        console.log(editedUser);

        
        fetch('http://searcheduapiii.searchedu.co.in:4112/sample/'+ id,{
            method:'PACTH',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify(editedUser)
        })
        .then(() => {
            history.push('http://searcheduapiii.searchedu.co.in:4112/sample/'+id)
        }) 
    }

    return (
        <div className='blog-details'>
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {user?.length && (
                <article>
                    <h2 className='user-name'>{user[0].Namee}</h2>
                    <div className='user-email'>{user[0].Email}</div>
                    <div className='user-dob'>
                    <input disabled={!isEditing} value={user[0].DOB.split('T')[0]} type='date' onChange={e => setDob(e.target.value)}/>
                    </div>

                    <div className='user-gender'>{
                    <select disabled={!isEditing}
                        value={user[0].Gender}
                        onChange={(e) => setGender(e.target.value)}>
                            <option value="0">Female</option>
                            <option value="1">Male</option>
                    </select>
                    }</div>
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
                </article>
            )}
        </div>
    )
}

export default UserDetails