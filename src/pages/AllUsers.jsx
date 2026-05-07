import { useEffect, useState } from 'react'
import axios from 'axios'
import { FaUser } from 'react-icons/fa'
import '../css/AllUsers.css'

const AllUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users')
        setUsers(response.data)
      } catch {
        setError('Unable to fetch users at the moment.')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) {
    return (
      <section className="all-users-page all-users-page--status">
        <p>Loading users...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="all-users-page all-users-page--status">
        <p className="all-users-page__error">{error}</p>
      </section>
    )
  }

  return (
    <section className="all-users-page">
      <header className="all-users-page__hero">
        <p className="all-users-page__eyebrow">JSONPlaceholder</p>
        <h1>All Users</h1>
        <p className="all-users-page__subtitle">
          User directory fetched with Axios and displayed in a responsive card layout.
        </p>
      </header>

      <div className="all-users-grid">
        {users.map((user) => (
          <article className="user-card" key={user.id}>
            <h2 className="user-card__name">{user.name}</h2>
            <p className="user-card__username">
              <FaUser className="user-card__icon" />
              @{user.username}
            </p>

            <div className="user-card__info">
              <p>
                <span>Email:</span> {user.email}
              </p>
              <p>
                <span>Phone:</span> {user.phone}
              </p>
              <p>
                <span>Website:</span> {user.website}
              </p>
              <p>
                <span>Company:</span> {user.company?.name}
              </p>
              <p>
                <span>Address:</span> {user.address?.city}, {user.address?.zipcode}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default AllUsers
