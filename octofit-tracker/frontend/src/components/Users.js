import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const codespaceNameEnv = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
      let apiUrl;
      
      if (codespaceNameEnv === 'localhost') {
        apiUrl = 'http://localhost:8000/api/users/';
      } else {
        apiUrl = `https://${codespaceNameEnv}-8000.app.github.dev/api/users/`;
      }

      console.log('Fetching Users from:', apiUrl);
      
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Users fetched successfully:', data);
      
      // Handle both paginated (.results) and plain array responses
      const usersList = data.results || data;
      setUsers(Array.isArray(usersList) ? usersList : []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info" role="alert">
          <strong>Loading...</strong> Fetching users from API...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <strong>Error!</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid mt-4 mb-5">
      <div className="row mb-4">
        <div className="col-lg-10 mx-auto">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">👥 Users</h2>
            <button className="btn btn-primary" onClick={fetchUsers}>
              🔄 Refresh
            </button>
          </div>
          {users.length === 0 ? (
            <div className="card">
              <div className="card-body text-center">
                <div className="alert alert-warning mb-0" role="alert">
                  No users found
                </div>
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="card-header bg-dark text-white">
                <strong>Total Users: {users.length}</strong>
              </div>
              <div className="table-responsive">
                <table className="table table-striped table-hover mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Team</th>
                      <th>Role</th>
                      <th>Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td><span className="badge bg-secondary">{user.id}</span></td>
                        <td><strong>{user.name}</strong></td>
                        <td>{user.email}</td>
                        <td>{user.team || <span className="text-muted">N/A</span>}</td>
                        <td><span className="badge bg-info">{user.role || 'N/A'}</span></td>
                        <td>{new Date(user.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Users;
