import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const codespaceNameEnv = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
      let apiUrl;
      
      if (codespaceNameEnv === 'localhost') {
        apiUrl = 'http://localhost:8000/api/leaderboard/';
      } else {
        apiUrl = `https://${codespaceNameEnv}-8000.app.github.dev/api/leaderboard/`;
      }

      console.log('Fetching Leaderboard from:', apiUrl);
      
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Leaderboard fetched successfully:', data);
      
      // Handle both paginated (.results) and plain array responses
      const leaderboardList = data.results || data;
      setLeaderboard(Array.isArray(leaderboardList) ? leaderboardList : []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info" role="alert">
          <strong>Loading...</strong> Fetching leaderboard from API...
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
        <div className="col-lg-8 mx-auto">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">🏆 Leaderboard</h2>
            <button className="btn btn-primary" onClick={fetchLeaderboard}>
              🔄 Refresh
            </button>
          </div>
          {leaderboard.length === 0 ? (
            <div className="card">
              <div className="card-body text-center">
                <div className="alert alert-warning mb-0" role="alert">
                  No leaderboard entries found
                </div>
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="card-header bg-dark text-white">
                <strong>Top {leaderboard.length} Competitors</strong>
              </div>
              <div className="table-responsive">
                <table className="table table-striped table-hover mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th>Rank</th>
                      <th>User</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((entry, index) => {
                      let badgeColor = 'bg-secondary';
                      let medal = index + 1;
                      if (index === 0) {
                        badgeColor = 'bg-warning text-dark';
                        medal = '🥇';
                      } else if (index === 1) {
                        badgeColor = 'bg-secondary';
                        medal = '🥈';
                      } else if (index === 2) {
                        badgeColor = 'bg-danger';
                        medal = '🥉';
                      }
                      return (
                        <tr key={entry.id} className={index < 3 ? 'table-active' : ''}>
                          <td><span className={`badge ${badgeColor} fs-6`}>{medal}</span></td>
                          <td><strong>{entry.user || 'N/A'}</strong></td>
                          <td><span className="badge bg-success fs-6">{entry.score}</span></td>
                        </tr>
                      );
                    })}
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

export default Leaderboard;
