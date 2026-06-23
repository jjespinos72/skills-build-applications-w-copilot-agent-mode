import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const codespaceNameEnv = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
      let apiUrl;
      
      if (codespaceNameEnv === 'localhost') {
        apiUrl = 'http://localhost:8000/api/workouts/';
      } else {
        apiUrl = `https://${codespaceNameEnv}-8000.app.github.dev/api/workouts/`;
      }

      console.log('Fetching Workouts from:', apiUrl);
      
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Workouts fetched successfully:', data);
      
      // Handle both paginated (.results) and plain array responses
      const workoutsList = data.results || data;
      setWorkouts(Array.isArray(workoutsList) ? workoutsList : []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching workouts:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info" role="alert">
          <strong>Loading...</strong> Fetching workouts from API...
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
            <h2 className="mb-0">💪 Workouts</h2>
            <button className="btn btn-primary" onClick={fetchWorkouts}>
              🔄 Refresh
            </button>
          </div>
          {workouts.length === 0 ? (
            <div className="card">
              <div className="card-body text-center">
                <div className="alert alert-warning mb-0" role="alert">
                  No workouts found
                </div>
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="card-header bg-dark text-white">
                <strong>Total Workouts: {workouts.length}</strong>
              </div>
              <div className="table-responsive">
                <table className="table table-striped table-hover mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>User</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Date</th>
                      <th>Duration (min)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workouts.map((workout) => (
                      <tr key={workout.id}>
                        <td><span className="badge bg-secondary">{workout.id}</span></td>
                        <td><strong>{workout.user || 'N/A'}</strong></td>
                        <td>{workout.name}</td>
                        <td>{workout.description || <span className="text-muted">N/A</span>}</td>
                        <td>{new Date(workout.date).toLocaleDateString()}</td>
                        <td>{workout.duration_minutes}</td>
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

export default Workouts;
