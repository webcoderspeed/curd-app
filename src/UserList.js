import React from 'react'
import { Link } from 'react-router-dom'

const BlogList = ({users, title}) => {

  console.log(users)

    return (
        <div className='blog-list'>
            <h2>{title}</h2>
            {users.map(user => (
                <div className="blog-preview" key={user.Id}>
                 <Link to={`/user/${user.Id}`}>
                    <h2>Name: {user.Namee}</h2>
                    <p>Email: {user.Email}</p>
                    <p>DoB: {user.DOB.split('T')[0]}</p>
                    <p>Gender: {
                      (user.Gender === 1) ? 'Male' : 'Female' 
                      }</p>
                 </Link>
                </div>
            ))}
        </div>
    )
}

export default BlogList