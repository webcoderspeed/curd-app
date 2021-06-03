import React,{ useState } from 'react'
import { useHistory } from 'react-router-dom'

const CreateUser = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');

    const [isPending, setIsPending] = useState(false)
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        const user = {Namee:name, Email:email, DOB:dob, Gender:gender}
        console.log(user)

        setIsPending(true)
        
        fetch('http://searcheduapiii.searchedu.co.in:4112/sample',{
            method:'POST',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify(user)
        })
        .then(() => {
            console.log('New User Added!')
            setIsPending(false)
            history.push('/')
        })

    }

    return (
        <div className='create'>
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Name: </label>
                <input type="text" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                <label>Email: </label>
                <input type='text' required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <label>Gender </label>
                <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}>
                    <option value="0">Female</option>
                    <option value="1">Male</option>
                </select>
                <input type='date' onChange={e => setDob(e.target.value)}/>
                {!isPending && <button>Add User</button>}
                {isPending && <button disabled>Adding User...</button>}
            </form>
        </div>
    )
}

export default CreateUser