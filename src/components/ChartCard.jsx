import { motion } from "framer-motion";

function ChartCard({ title, children }) {
  return (
    <motion.div
      className="chart-card"
      whileHover={{
        y: -6,
        scale: 1.01,
      }}
      transition={{
        duration: 0.25,
      }}
    >
      <h3>{title}</h3>

      {children}
    </motion.div>
  );
}

export default ChartCard;