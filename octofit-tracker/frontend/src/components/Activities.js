import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const codespaceNameEnv = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
      let apiUrl;
      
      if (codespaceNameEnv === 'localhost') {
        apiUrl = 'http://localhost:8000/api/activities/';
      } else {
        apiUrl = `https://${codespaceNameEnv}-8000.app.github.dev/api/activities/`;
      }

      console.log('Fetching Activities from:', apiUrl);
      
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Activities fetched successfully:', data);
      
      // Handle both paginated (.results) and plain array responses
      const activitiesList = data.results || data;
      setActivities(Array.isArray(activitiesList) ? activitiesList : []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching activities:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info" role="alert">
          <strong>Loading...</strong> Fetching activities from API...
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
        <div className="col-lg-12 mx-auto">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">🏃 Activities</h2>
            <button className="btn btn-primary" onClick={fetchActivities}>
              🔄 Refresh
            </button>
          </div>
          {activities.length === 0 ? (
            <div className="card">
              <div className="card-body text-center">
                <div className="alert alert-warning mb-0" role="alert">
                  No activities found
                </div>
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="card-header bg-dark text-white">
                <strong>Total Activities: {activities.length}</strong>
              </div>
              <div className="table-responsive">
                <table className="table table-striped table-hover mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>User</th>
                      <th>Type</th>
                      <th>Duration (min)</th>
                      <th>Distance (km)</th>
                      <th>Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activities.map((activity) => (
                      <tr key={activity.id}>
                        <td><span className="badge bg-secondary">{activity.id}</span></td>
                        <td><strong>{activity.user || 'N/A'}</strong></td>
                        <td><span className="badge bg-success">{activity.activity_type}</span></td>
                        <td>{activity.duration_minutes}</td>
                        <td>{activity.distance_km || <span className="text-muted">N/A</span>}</td>
                        <td>{new Date(activity.timestamp).toLocaleDateString()}</td>
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

export default Activities;
