import { useState } from "react";
import API from "../services/api";


function DiseasePredictor() {

  const [formData, setFormData] = useState({
    symptom_diarrhea: 0,
    symptom_vomiting: 0,
    symptom_fever: 0,
    symptom_abdominal_pain: 0,
    symptom_dehydration: 0,
    symptom_jaundice: 0,
    symptom_bloody_stool: 0,
    symptom_skin_rash: 0,
  });

  const [result, setResult] = useState("");
  const [confidence, setConfidence] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: Number(e.target.value),
    });
  };

  const predictDisease = async () => {
    try {
      const response = await API.post("/predict-disease", formData);

      setResult(response.data.predicted_disease);
      setConfidence(response.data.confidence);

    } catch (error) {
      console.log(error);
      alert("Prediction Failed");
    }
  };

  return (
    <div className="page">

      <h1>Disease Predictor</h1>

      <div className="form-card">

        <div className="grid">

          <label>
            Diarrhea
            <select
              name="symptom_diarrhea"
              onChange={handleChange}
            >
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </label>

          <label>
            Vomiting
            <select
              name="symptom_vomiting"
              onChange={handleChange}
            >
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </label>

          <label>
            Fever
            <select
              name="symptom_fever"
              onChange={handleChange}
            >
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </label>

          <label>
            Abdominal Pain
            <select
              name="symptom_abdominal_pain"
              onChange={handleChange}
            >
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </label>

          <label>
            Dehydration
            <select
              name="symptom_dehydration"
              onChange={handleChange}
            >
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </label>

          <label>
            Jaundice
            <select
              name="symptom_jaundice"
              onChange={handleChange}
            >
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </label>

          <label>
            Bloody Stool
            <select
              name="symptom_bloody_stool"
              onChange={handleChange}
            >
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </label>

          <label>
            Skin Rash
            <select
              name="symptom_skin_rash"
              onChange={handleChange}
            >
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </label>

        </div>

        <button
          className="predict-btn"
          onClick={predictDisease}
        >
          Predict Disease
        </button>

        {result && (
          <div className="result-card">
            <h2>Prediction Result</h2>
            <h1>{result}</h1>
            <h3>
               AI Confidence: {confidence}%
               </h3>
          </div>
        )}

      </div>

    </div>
  );
}

export default DiseasePredictor;