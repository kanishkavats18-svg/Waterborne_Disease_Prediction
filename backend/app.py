from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd
import numpy as np
import os
from datetime import datetime

app = FastAPI(title="Waterborne Disease API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================
# LOAD MODELS
# ==========================

disease_model = joblib.load(
    "Models/disease_symptom_rf.pkl"
)

disease_encoder = joblib.load(
    "Models/disease_encoder.pkl"
)

risk_model = joblib.load(
    "Models/waterborne_risk_xgb.pkl"
)

risk_encoders = joblib.load(
    "Models/risk_encoders.pkl"
)

# ==========================
# ANALYTICS CSV
# ==========================

ANALYTICS_FILE = "analytics.csv"

if not os.path.exists(ANALYTICS_FILE):

    analytics_df = pd.DataFrame(columns=[
        "timestamp",
        "prediction_type",
        "disease",
        "state",
        "district",
        "water_source",
        "water_treatment",
        "water_quality_index",
        "ph",
        "turbidity_ntu",
        "dissolved_oxygen_mg_l",
        "risk_prediction"
    ])

    analytics_df.to_csv(
        ANALYTICS_FILE,
        index=False
    )

def save_prediction(data, prediction_type, disease, risk):

    row = {

        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),

        "prediction_type": prediction_type,

        "disease": disease,

        "state": data.get("state", ""),

        "district": data.get("district", ""),

        "water_source": data.get("water_source", ""),

        "water_treatment": data.get("water_treatment", ""),

        "water_quality_index": data.get("water_quality_index", ""),

        "ph": data.get("ph", ""),

        "turbidity_ntu": data.get("turbidity_ntu", ""),

        "dissolved_oxygen_mg_l": data.get("dissolved_oxygen_mg_l", ""),

        "risk_prediction": risk

    }

    pd.DataFrame([row]).to_csv(

        ANALYTICS_FILE,

        mode="a",

        header=False,

        index=False

    )

@app.get("/")
def home():
    return {
        "message": "Waterborne Disease Prediction API Running"
    }

@app.post("/predict-disease")
def predict_disease(data: dict):

    df = pd.DataFrame([data])

    prediction = disease_model.predict(df)[0]
    probabilities = disease_model.predict_proba(df)[0]
    confidence = round(max(probabilities) * 100, 2)

    disease_name = disease_encoder.inverse_transform(
        [prediction]
    )[0]
    save_prediction(
    data,
    "Disease Predictor",
    disease_name,
    ""
)

    return {
        "predicted_disease": disease_name,
        "confidence": confidence
    }
@app.post("/predict-risk")
def predict_risk(data: dict):
    print("\n===== RAW REQUEST =====")
    print(data)
    default_values = {
    "latitude": 28.61,
    "longitude": 77.20,
    "is_urban": 1,
    "population_density": 1000,

    "bod_mg_l": 1000,
    "fecal_coliform_per_100ml": 10000,
    "total_coliform_per_100ml": 1000000,

    "tds_mg_l": 5000,
    "fluoride_mg_l": 10,
    "arsenic_ug_l": 500,

    "open_defecation_rate": 100,
    "toilet_access": 0,
    "sewage_treatment_pct": 0,

    "handwashing_practice": "Never",
    "month": 7,
    "season": "Monsoon",

    "avg_temperature_c": 45,
    "avg_rainfall_mm": 500,
    "avg_humidity_pct": 95
}

    for key, value in default_values.items():
        if key not in data:
            data[key] = value

    df = pd.DataFrame([data])
    df["flooding"] = df["flooding"].astype(int)

    for col, encoder in risk_encoders.items():

        if col != "disease":

            if col in df.columns:

                try:
                    df[col] = encoder.transform(df[col])
                except:
                    df[col] = 0


    df = df[ risk_model.feature_names_in_ ]
    print(df.dtypes)
    print(df.head())
    print("\n===== INPUT DATA =====")
    print(df.iloc[0].to_dict())

    pred = risk_model.predict(df)[0]
    print("RAW PRED =", pred)
    disease_name = risk_encoders["disease"].inverse_transform([pred])[0]
    print("DISEASE =", disease_name)
    save_prediction(
    data,
    "Risk Predictor",
    disease_name,
    disease_name
)

    return {
        "risk_prediction": disease_name
    }
@app.get("/analytics")
def analytics():

    df = pd.read_csv(ANALYTICS_FILE)

    return df.fillna("").to_dict(orient="records")