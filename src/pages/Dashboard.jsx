import { useEffect, useState } from "react";
import API from "../services/api";

import Header from "../components/Header";
import StatCard from "../components/StatCard";

function Dashboard() {

  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {

    API.get("/analytics")
      .then((res) => {
        setAnalytics(res.data);
      })
      .catch((err) => console.log(err));

  }, []);

  const latest = analytics.length > 0
    ? analytics[analytics.length - 1]
    : null;

  return (

    <div className="page">

      <Header
        title="Waterborne Disease Intelligence Platform"
        subtitle="AI Powered Disease Monitoring Dashboard"
      />

      {/* ================= Stats ================= */}

      <div className="cards-grid">

        <StatCard
          title="Total Predictions"
          value={analytics.length}
        />

        <StatCard
          title="Disease Predictions"
          value={
            analytics.filter(
              x => x.prediction_type === "Disease Predictor"
            ).length
          }
        />

        <StatCard
          title="Risk Predictions"
          value={
            analytics.filter(
              x => x.prediction_type === "Risk Predictor"
            ).length
          }
        />

        <StatCard
          title="Unique Diseases"
          value={
            new Set(
              analytics.map(x => x.disease)
            ).size
          }
        />

      </div>

      {/* ================= Top Cards ================= */}

      <div className="dashboard-grid">

        <div className="glass-box">

          <h2>Latest Prediction</h2>

          {
            latest ? (

              <>

                <p>
                  <strong>Disease : </strong>
                  {latest.disease}
                </p>

                <p>
                  <strong>Prediction Type : </strong>
                  {latest.prediction_type}
                </p>

                <p>
                  <strong>State : </strong>
                  {latest.state || "-"}
                </p>

                <p>
                  <strong>District : </strong>
                  {latest.district || "-"}
                </p>

                <p>
                  <strong>Water Source : </strong>
                  {latest.water_source || "-"}
                </p>

                <p>
                  <strong>Water Treatment : </strong>
                  {latest.water_treatment || "-"}
                </p>

                <p>
                  <strong>Time : </strong>
                  {latest.timestamp}
                </p>

              </>

            ) : (

              <p>No Prediction Available</p>

            )
          }

        </div>

        <div className="glass-box">

          <h2>System Health</h2>

          <p>🟢 Backend Connected</p>

          <p>🟢 Disease Prediction Model Loaded</p>

          <p>🟢 Risk Prediction Model Loaded</p>

          <p>🟢 Analytics Logging Active</p>

          <p>🟢 CSV Database Connected</p>

        </div>

      </div>

      {/* ================= Recent Activity ================= */}

      <div className="glass-box">

        <h2>Recent Prediction History</h2>

        <table className="activity-table">

          <thead>

            <tr>

              <th>Timestamp</th>

              <th>Disease</th>

              <th>Prediction</th>

              <th>State</th>

              <th>District</th>

            </tr>

          </thead>

          <tbody>

            {

              analytics
                .slice()
                .reverse()
                .slice(0, 5)
                .map((item, index) => (

                  <tr key={index}>

                    <td>{item.timestamp}</td>

                    <td>{item.disease}</td>

                    <td>{item.prediction_type}</td>

                    <td>{item.state || "-"}</td>

                    <td>{item.district || "-"}</td>

                  </tr>

                ))

            }

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default Dashboard;