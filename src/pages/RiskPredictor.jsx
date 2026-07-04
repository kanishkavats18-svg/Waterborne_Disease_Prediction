import { useState } from "react";
import API from "../services/api";

function RiskPredictor() {

  const [formData, setFormData] = useState({
    state: "Delhi",
    district: "New Delhi",
    region: "North",
    age: 25,
    gender: "Male",
    water_source: "Piped",
    water_treatment: "Filtered",
    water_quality_index: 80,
    ph: 7,
    turbidity_ntu: 2,
    dissolved_oxygen_mg_l: 8,
    nitrate_mg_l: 10,
    flooding: 0
  });

  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "number"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const predictRisk = async () => {
    try {

      const response = await API.post(
        "/predict-risk",
        formData
      );

      setResult(
        response.data.risk_prediction
      );

    } catch (error) {

      console.error(error);
      alert("Risk Prediction Failed");

    }
  };

  return (
    <div className="page">

      <h1 className="title">
        Risk Predictor
      </h1>

      <div className="glass-box">

        <div className="form-grid">

          <div className="form-group">
            <label>State</label>
            <input
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>District</label>
            <input
              name="district"
              value={formData.district}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Region</label>
            <select
              name="region"
              value={formData.region}
              onChange={handleChange}
            >
              <option>North</option>
              <option>South</option>
              <option>East</option>
              <option>West</option>
              <option>Central</option>
              <option>Northeast</option>
            </select>
          </div>

          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          <div className="form-group">
            <label>Water Source</label>
            <select
              name="water_source"
              value={formData.water_source}
              onChange={handleChange}
            >
              <option>Piped</option>
              <option>Borewell</option>
              <option>River</option>
              <option>Pond</option>
              <option>Rainwater</option>
              <option>Open Well</option>
              <option>Tanker</option>
            </select>
          </div>

          <div className="form-group">
            <label>Water Treatment</label>
            <select
              name="water_treatment"
              value={formData.water_treatment}
              onChange={handleChange}
            >
              <option>Filtered</option>
              <option>Boiled</option>
              <option>Chlorinated</option>
              <option>Untreated</option>
            </select>
          </div>

          <div className="form-group">
            <label>Water Quality Index</label>
            <input
              type="number"
              name="water_quality_index"
              value={formData.water_quality_index}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>pH</label>
            <input
              type="number"
              step="0.1"
              name="ph"
              value={formData.ph}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Turbidity (NTU)</label>
            <input
              type="number"
              name="turbidity_ntu"
              value={formData.turbidity_ntu}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Dissolved Oxygen</label>
            <input
              type="number"
              name="dissolved_oxygen_mg_l"
              value={formData.dissolved_oxygen_mg_l}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Nitrate</label>
            <input
              type="number"
              name="nitrate_mg_l"
              value={formData.nitrate_mg_l}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Flooding</label>
            <select
              name="flooding"
              value={formData.flooding}
              onChange={handleChange}
            >
              <option value={0}>No Flooding</option>
              <option value={1}>Flooding Present</option>
            </select>
          </div>

        </div>

        <button
          className="btn"
          onClick={predictRisk}
        >
          Predict Risk
        </button>

        {result && (
          <div className="result-box">
            <h2>Risk Prediction</h2>
            <h1>{result}</h1>
          </div>
        )}

      </div>

    </div>
  );
}

export default RiskPredictor;