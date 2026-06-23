import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const codespaceNameEnv = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
      let apiUrl;
      
      if (codespaceNameEnv === 'localhost') {
        apiUrl = 'http://localhost:8000/api/teams/';
      } else {
        apiUrl = `https://${codespaceNameEnv}-8000.app.github.dev/api/teams/`;
      }

      console.log('Fetching Teams from:', apiUrl);
      
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Teams fetched successfully:', data);
      
      // Handle both paginated (.results) and plain array responses
      const teamsList = data.results || data;
      setTeams(Array.isArray(teamsList) ? teamsList : []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching teams:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info" role="alert">
          <strong>Loading...</strong> Fetching teams from API...
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
            <h2 className="mb-0">🏢 Teams</h2>
            <button className="btn btn-primary" onClick={fetchTeams}>
              🔄 Refresh
            </button>
          </div>
          {teams.length === 0 ? (
            <div className="card">
              <div className="card-body text-center">
                <div className="alert alert-warning mb-0" role="alert">
                  No teams found
                </div>
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="card-header bg-dark text-white">
                <strong>Total Teams: {teams.length}</strong>
              </div>
              <div className="table-responsive">
                <table className="table table-striped table-hover mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teams.map((team) => (
                      <tr key={team.id}>
                        <td><span className="badge bg-secondary">{team.id}</span></td>
                        <td><strong>{team.name}</strong></td>
                        <td>{team.description || <span className="text-muted">N/A</span>}</td>
                        <td>{new Date(team.created_at).toLocaleDateString()}</td>
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

export default Teams;
