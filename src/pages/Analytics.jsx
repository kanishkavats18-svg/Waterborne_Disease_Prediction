import { useEffect, useState } from "react";
import API from "../services/api";

import Header from "../components/Header";

import DiseasePieChart from "../components/charts/DiseasePieChart";
import RiskBarChart from "../components/charts/RiskBarChart";
import MonthlyTrendChart from "../components/charts/MonthlyTrendChart";
import WaterSourceChart from "../components/charts/WaterSourceChart";

function Analytics() {

  const [analytics,setAnalytics]=useState([]);

  useEffect(()=>{

    API.get("/analytics")

      .then(res=>{

        setAnalytics(res.data);

      })

      .catch(err=>console.log(err));

  },[]);

  return(

    <div className="page">

      <Header
      title="Waterborne Disease Analytics"
      subtitle="AI Powered Monitoring & Insights"
      />

      <div className="stats-grid">

        <div className="stat-box">

          <h4>Total Cases</h4>

          <h2>{analytics.length}</h2>

        </div>

        <div className="stat-box">

          <h4>Disease Predictions</h4>

          <h2>

            {
              analytics.filter(
                x=>x.prediction_type==="Disease Predictor"
              ).length
            }

          </h2>

        </div>

        <div className="stat-box">

          <h4>Risk Predictions</h4>

          <h2>

            {
              analytics.filter(
                x=>x.prediction_type==="Risk Predictor"
              ).length
            }

          </h2>

        </div>

        <div className="stat-box">

          <h4>Unique Diseases</h4>

          <h2>

            {
              new Set(
                analytics.map(x=>x.disease)
              ).size
            }

          </h2>

        </div>

      </div>

      <div className="charts-grid">

        <DiseasePieChart analytics={analytics}/>

        <RiskBarChart analytics={analytics}/>

        <MonthlyTrendChart analytics={analytics}/>

        <WaterSourceChart analytics={analytics}/>

      </div>

    </div>

  );

}

export default Analytics;