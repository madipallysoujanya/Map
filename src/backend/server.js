import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import PDFDocument from "pdfkit";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// =========================
// MongoDB Connection
// =========================
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/risk_assessment_db";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected successfully"))
.catch((error) => console.error("❌ MongoDB connection error:", error));

// =========================
// MongoDB Schemas
// =========================
const ageEffectSchema = new mongoose.Schema({
  age_group: {
    type: String,
    required: true
  },
  percentage: {
    type: Number,
    required: true
  }
});

const locationImpactSchema = new mongoose.Schema({
  location_name: {
    type: String,
    required: true
  },
  impacted_exposure: {
    type: Number,
    required: true
  },
  death_toll: {
    type: Number,
    default: 0
  }
});

const riskAssessmentSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  risk_type: {
    type: String,
    required: true
  },
  pandemic_name: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  return_period: {
    type: String,
    default: "1"
  },
  age_effects: [ageEffectSchema],
  location_impacts: [locationImpactSchema]
}, {
  timestamps: true
});

const RiskAssessment = mongoose.model("RiskAssessment", riskAssessmentSchema);

// =========================
// API Routes
// =========================

// POST - Create new risk assessment
app.post("/api/risk-assessments", async (req, res) => {
  try {
    const {
      country,
      region,
      state,
      risk_type,
      pandemic_name,
      year,
      return_period,
      age_effects,
      location_impacts
    } = req.body;

    if (!country || !region || !state || !risk_type || !pandemic_name || !year) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const returnPeriodValue = return_period ? String(return_period).trim() : "1";

    const riskAssessment = new RiskAssessment({
      country,
      region,
      state,
      risk_type,
      pandemic_name,
      year,
      return_period: returnPeriodValue,
      age_effects: age_effects || [],
      location_impacts: location_impacts || []
    });

    const savedAssessment = await riskAssessment.save();

    res.status(201).json({
      message: "Risk assessment created successfully",
      id: savedAssessment._id,
      data: savedAssessment
    });
  } catch (error) {
    console.error("❌ Error creating risk assessment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET - Risk Assessment by Year and Return Period
app.get("/api/risk-assessment", async (req, res) => {
  try {
    const { year, returnPeriod } = req.query;

    if (!year) {
      return res.status(400).json({ error: "Year is required" });
    }

    const yearNumber = parseInt(year);
    
    // Handle both "1" and "1 year" formats
    let effectiveReturnPeriod;
    if (returnPeriod === "1 year" || returnPeriod === "1") {
      effectiveReturnPeriod = "1";
    } else if (returnPeriod === "5 years" || returnPeriod === "5") {
      effectiveReturnPeriod = "5";
    } else if (returnPeriod === "10 years" || returnPeriod === "10") {
      effectiveReturnPeriod = "10";
    } else {
      effectiveReturnPeriod = returnPeriod || "1";
    }

    console.log("🔍 Searching for:", {
      year: yearNumber,
      returnPeriod: effectiveReturnPeriod,
      originalReturnPeriod: returnPeriod
    });

    // Find risk assessment
    const riskAssessment = await RiskAssessment.findOne({
      year: yearNumber,
      return_period: effectiveReturnPeriod
    }).sort({ createdAt: -1 });

    if (!riskAssessment) {
      // Get available data for helpful error message
      const availableData = await RiskAssessment.aggregate([
        {
          $group: {
            _id: null,
            years: { $addToSet: "$year" },
            returnPeriods: { $addToSet: "$return_period" }
          }
        }
      ]);

      return res.status(404).json({ 
        message: "No risk assessment found for this year and return period",
        searched: { 
          year: yearNumber, 
          returnPeriod: effectiveReturnPeriod 
        },
        availableData: availableData[0] || { years: [], returnPeriods: [] }
      });
    }

    // Calculate total exposure
    const totalExposure = riskAssessment.location_impacts.reduce(
      (sum, loc) => sum + Number(loc.impacted_exposure || 0),
      0
    );

    // Construct response for Frontend
    const response = {
      year: yearNumber,
      returnPeriod: effectiveReturnPeriod,
      pandemicName: riskAssessment.pandemic_name,
      totalExposure: totalExposure,
      ageDemographics: riskAssessment.age_effects.map((a) => ({
        age_group: a.age_group,
        percentage: parseFloat(a.percentage),
      })),
      locationImpacts: riskAssessment.location_impacts.map((l) => ({
        location_name: l.location_name,
        impacted_exposure: parseInt(l.impacted_exposure),
        death_toll: parseInt(l.death_toll || 0),
      })),
    };

    console.log("✅ Sending response");
    res.json(response);
  } catch (error) {
    console.error("❌ Error fetching risk assessment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET - Get all risk assessments
app.get("/api/risk-assessments", async (req, res) => {
  try {
    const assessments = await RiskAssessment.find().sort({ createdAt: -1 });

    res.json({
      count: assessments.length,
      data: assessments
    });
  } catch (error) {
    console.error("Error fetching risk assessments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET - Get risk assessment by ID
app.get("/api/risk-assessments/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const assessment = await RiskAssessment.findById(id);

    if (!assessment) {
      return res.status(404).json({ error: "Risk assessment not found" });
    }

    res.json(assessment);
  } catch (error) {
    console.error("Error fetching risk assessment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET - Search risk assessments by filters
app.get("/api/risk-assessments/search/filter", async (req, res) => {
  try {
    const { country, region, state, risk_type, year } = req.query;
    
    const filter = {};
    
    if (country) filter.country = new RegExp(country, 'i');
    if (region) filter.region = new RegExp(region, 'i');
    if (state) filter.state = new RegExp(state, 'i');
    if (risk_type) filter.risk_type = new RegExp(risk_type, 'i');
    if (year) filter.year = parseInt(year);

    const assessments = await RiskAssessment.find(filter).sort({ createdAt: -1 });

    res.json({
      count: assessments.length,
      data: assessments
    });
  } catch (error) {
    console.error("Error searching risk assessments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE - Delete risk assessment by ID
app.delete("/api/risk-assessments/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const result = await RiskAssessment.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ error: "Risk assessment not found" });
    }

    res.json({ message: "Risk assessment deleted successfully" });
  } catch (error) {
    console.error("Error deleting risk assessment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT - Update risk assessment by ID
app.put("/api/risk-assessments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const updatedAssessment = await RiskAssessment.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedAssessment) {
      return res.status(404).json({ error: "Risk assessment not found" });
    }

    res.json({
      message: "Risk assessment updated successfully",
      data: updatedAssessment
    });
  } catch (error) {
    console.error("Error updating risk assessment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST - Export PDF
app.post("/api/export-pdf", (req, res) => {
  const { locationImpacts, totalExposure, pandemicName } = req.body;
  console.log("📄 Generating PDF for:", pandemicName);

  try {
    const doc = new PDFDocument({ margin: 40, size: "A4" });
    res.setHeader("Content-Disposition", "attachment; filename=pandemic_impact.pdf");
    res.setHeader("Content-Type", "application/pdf");

    doc.pipe(res);

    // Title
    doc.fontSize(20).text("Pandemic Impact Report", { align: "center" });
    doc.moveDown();

    doc.fontSize(12).text(`Pandemic Name: ${pandemicName}`);
    doc.text(`Total Exposure: US$ ${totalExposure} Million`);
    doc.moveDown();

    // Table Header
    doc.fontSize(14).text("Location Impacts", { underline: true });
    doc.moveDown(0.5);

    doc.fontSize(11).text("Location Impacted", 50, doc.y, { continued: true });
    doc.text(" | Impacted Exposure (US$ Million)", { continued: true });
    doc.text(" | Death Toll (Lives)", { continued: true });
    doc.text(" | Pandemic Name");
    doc.moveDown(0.3);

    // Table Rows
    locationImpacts.forEach((loc) => {
      doc.text(`${loc.location_name}`, 50, doc.y, { continued: true });
      doc.text(` | US$ ${loc.impacted_exposure}`, { continued: true });
      doc.text(` | ${loc.death_toll || 50}`, { continued: true });
      doc.text(` | ${pandemicName}`);
    });

    doc.end();
  } catch (error) {
    console.error("❌ Error generating PDF:", error);
    res.status(500).send("Error generating PDF");
  }
});

// GET - Filter Risk Assessments by multiple parameters
app.get("/api/risk-assessments/filter", async (req, res) => {
  try {
    const { country, region, state, risk_type, year, return_period } = req.query;

    if (!country || !region || !state || !risk_type) {
      return res.status(400).json({ error: "Missing required filters" });
    }

    const filter = {
      country: new RegExp(`^${country}$`, 'i'),
      region: new RegExp(`^${region}$`, 'i'),
      state: new RegExp(`^${state}$`, 'i'),
      risk_type: new RegExp(`^${risk_type}$`, 'i')
    };

    if (year) filter.year = parseInt(year);
    if (return_period) filter.return_period = return_period;

    console.log("🔍 MongoDB Filter:", filter);

    const riskAssessment = await RiskAssessment.findOne(filter).sort({ createdAt: -1 });

    if (!riskAssessment) {
      return res.status(404).json({ 
        message: "No risk assessment found", 
        searched: req.query 
      });
    }

    const totalExposure = riskAssessment.location_impacts.reduce(
      (sum, loc) => sum + Number(loc.impacted_exposure || 0),
      0
    );

    res.json({
      success: true,
      country: riskAssessment.country,
      region: riskAssessment.region,
      state: riskAssessment.state,
      riskType: riskAssessment.risk_type,
      pandemicName: riskAssessment.pandemic_name,
      year: riskAssessment.year,
      returnPeriod: riskAssessment.return_period,
      totalExposure,
      ageDemographics: riskAssessment.age_effects.map(a => ({
        age_group: a.age_group,
        percentage: parseFloat(a.percentage),
      })),
      locationImpacts: riskAssessment.location_impacts.map(l => ({
        location_name: l.location_name,
        impacted_exposure: parseFloat(l.impacted_exposure),
        death_toll: parseInt(l.death_toll),
      })),
    });
  } catch (error) {
    console.error("❌ Error filtering risk assessment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// =========================
// Health Check
// =========================
app.get("/health", (req, res) => {
  res.json({ 
    status: "OK", 
    database: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
    timestamp: new Date().toISOString()
  });
});

// =========================
// Error Handling Middleware
// =========================
app.use((error, req, res, next) => {
  console.error("Unhandled error:", error);
  res.status(500).json({ error: "Internal server error" });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// =========================
// Server Start
// =========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});














// import express from "express";
// import mysql from "mysql2/promise";
// import dotenv from "dotenv";
// import axios from "axios";
// import cors from "cors";
// import PDFDocument from "pdfkit";
// import fs from "fs";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // =========================
// // MySQL Connection Pool
// // =========================
// const pool = mysql.createPool({
//   host: process.env.DB_HOST || "localhost",
//   user: process.env.DB_USER || "root",
//   password: process.env.DB_PASSWORD || "",
//   database: process.env.DB_NAME || "risk_assessment_db",
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// // =========================
// // Initialize Database Tables
// // =========================
// async function initializeDatabase() {
//   try {
//     const connection = await pool.getConnection();
    
//     // Create risk_assessments table
//     await connection.execute(`
//       CREATE TABLE IF NOT EXISTS risk_assessments (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         country VARCHAR(100) NOT NULL,
//         region VARCHAR(100) NOT NULL,
//         state VARCHAR(100) NOT NULL,
//         risk_type VARCHAR(100) NOT NULL,
//         pandemic_name VARCHAR(100) NOT NULL,
//         year INT NOT NULL,
//         return_period VARCHAR(10) DEFAULT '1',
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//       )
//     `);

//     // Create age_effects table
//     await connection.execute(`
//       CREATE TABLE IF NOT EXISTS age_effects (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         risk_assessment_id INT,
//         age_group VARCHAR(50) NOT NULL,
//         percentage DECIMAL(5,2) NOT NULL,
//         FOREIGN KEY (risk_assessment_id) REFERENCES risk_assessments(id) ON DELETE CASCADE
//       )
//     `);

//     // Create location_impacts table
//     await connection.execute(`
//       CREATE TABLE IF NOT EXISTS location_impacts (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         risk_assessment_id INT,
//         location_name VARCHAR(100) NOT NULL,
//         impacted_exposure INT NOT NULL,
//         death_toll INT DEFAULT 0,
//         FOREIGN KEY (risk_assessment_id) REFERENCES risk_assessments(id) ON DELETE CASCADE
//       )
//     `);

//     console.log("✅ Database tables initialized successfully");
//     connection.release();
//   } catch (error) {
//     console.error("❌ Database initialization error:", error);
//   }
// }

// // =========================
// // API Routes
// // =========================

// // POST - Create new risk assessment
// // POST - Create new risk assessment
// // app.post("/api/risk-assessments", async (req, res) => {
// //   try {
// //     const {
// //       country,
// //       region,
// //       state,
// //       risk_type,
// //       pandemic_name,
// //       year,
// //       return_period, // new field
// //       age_effects,
// //       location_impacts,
// //     } = req.body;

// //     if (!country || !region || !state || !risk_type || !pandemic_name || !year) {
// //       return res.status(400).json({
// //         error: "Missing required fields: country, region, state, risk_type, pandemic_name, year",
// //       });
// //     }

// //     const connection = await pool.getConnection();

// //     try {
// //       await connection.beginTransaction();

// //       // ✅ Default return_period to "1" if not provided
// //       const returnPeriodValue = return_period || "1";

// //       // 1️⃣ Insert into risk_assessments
// //       const [riskResult] = await connection.execute(
// //         `INSERT INTO risk_assessments 
// //          (country, region, state, risk_type, pandemic_name, year, return_period) 
// //          VALUES (?, ?, ?, ?, ?, ?, ?)`,
// //         [country, region, state, risk_type, pandemic_name, year, returnPeriodValue]
// //       );

// //       const riskAssessmentId = riskResult.insertId;

// //       // 2️⃣ Insert age_effects
// //       if (age_effects && Array.isArray(age_effects)) {
// //         for (const ageEffect of age_effects) {
// //           await connection.execute(
// //             `INSERT INTO age_effects (risk_assessment_id, age_group, percentage) 
// //              VALUES (?, ?, ?)`,
// //             [riskAssessmentId, ageEffect.age_group, ageEffect.percentage]
// //           );
// //         }
// //       }

// //       // 3️⃣ Insert location_impacts
// //       if (location_impacts && Array.isArray(location_impacts)) {
// //         for (const locationImpact of location_impacts) {
// //           await connection.execute(
// //             `INSERT INTO location_impacts (risk_assessment_id, location_name, impacted_exposure, death_toll) 
// //              VALUES (?, ?, ?, ?)`,
// //             [
// //               riskAssessmentId,
// //               locationImpact.location_name,
// //               locationImpact.impacted_exposure,
// //               locationImpact.death_toll || null,
// //             ]
// //           );
// //         }
// //       }

// //       await connection.commit();

// //       res.status(201).json({
// //         message: "Risk assessment created successfully",
// //         id: riskAssessmentId,
// //         data: {
// //           country,
// //           region,
// //           state,
// //           risk_type,
// //           pandemic_name,
// //           year,
// //           return_period: returnPeriodValue,
// //           age_effects,
// //           location_impacts,
// //         },
// //       });
// //     } catch (error) {
// //       await connection.rollback();
// //       throw error;
// //     } finally {
// //       connection.release();
// //     }
// //   } catch (error) {
// //     console.error("Error creating risk assessment:", error);
// //     res.status(500).json({
// //       error: "Internal server error",
// //       details: error.message,
// //     });
// //   }
// // });
// app.post("/api/risk-assessments", async (req, res) => {
//   try {
//     const { country, region, state, risk_type, pandemic_name, year, return_period, age_effects, location_impacts } = req.body;

//     if (!country || !region || !state || !risk_type || !pandemic_name || !year) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     const connection = await pool.getConnection();
//     try {
//       await connection.beginTransaction();

//       const returnPeriodValue = return_period ? String(return_period).trim() : "1";

//       const [riskResult] = await connection.execute(
//         `INSERT INTO risk_assessments 
//          (country, region, state, risk_type, pandemic_name, year, return_period)
//          VALUES (?, ?, ?, ?, ?, ?, ?)`,
//         [country, region, state, risk_type, pandemic_name, year, returnPeriodValue]
//       );

//       const riskId = riskResult.insertId;

//       if (Array.isArray(age_effects)) {
//         for (const a of age_effects) {
//           await connection.execute(
//             `INSERT INTO age_effects (risk_assessment_id, age_group, percentage) VALUES (?, ?, ?)`,
//             [riskId, a.age_group, a.percentage]
//           );
//         }
//       }

//       if (Array.isArray(location_impacts)) {
//         for (const l of location_impacts) {
//           await connection.execute(
//             `INSERT INTO location_impacts (risk_assessment_id, location_name, impacted_exposure, death_toll) VALUES (?, ?, ?, ?)`,
//             [riskId, l.location_name, l.impacted_exposure, l.death_toll || 0]
//           );
//         }
//       }

//       await connection.commit();
//       connection.release();

//       res.status(201).json({ message: "Risk assessment created successfully", id: riskId });
//     } catch (error) {
//       await connection.rollback();
//       throw error;
//     }
//   } catch (error) {
//     console.error("❌ Error creating risk assessment:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });
// // GET - Risk Assessment by Year and Return Period (FIXED)
// app.get("/api/risk-assessment", async (req, res) => {
//   try {
//     const { year, returnPeriod } = req.query;

//     if (!year) {
//       return res.status(400).json({ error: "Year is required" });
//     }

//     const connection = await pool.getConnection();
    
//     // Convert year to number
//     const yearNumber = parseInt(year);
    
//     // Handle both "1" and "1 year" formats
//     let effectiveReturnPeriod;
//     if (returnPeriod === "1 year" || returnPeriod === "1") {
//       effectiveReturnPeriod = "1";
//     } else if (returnPeriod === "5 years" || returnPeriod === "5") {
//       effectiveReturnPeriod = "5";
//     } else if (returnPeriod === "10 years" || returnPeriod === "10") {
//       effectiveReturnPeriod = "10";
//     } else {
//       effectiveReturnPeriod = returnPeriod || "1";
//     }

//     console.log("🔍 Searching for:", {
//       year: yearNumber,
//       returnPeriod: effectiveReturnPeriod,
//       originalReturnPeriod: returnPeriod
//     });

//     // Fetch risk assessment
//     const [riskRows] = await connection.execute(
//       `SELECT * FROM risk_assessments WHERE year = ? AND return_period = ? ORDER BY created_at DESC LIMIT 1`,
//       [yearNumber, effectiveReturnPeriod]
//     );

//     console.log("📊 Found records:", riskRows.length);

//     if (riskRows.length === 0) {
//       connection.release();
//       return res.status(404).json({ 
//         message: "No risk assessment found for this year and return period",
//         searched: { 
//           year: yearNumber, 
//           returnPeriod: effectiveReturnPeriod,
//           availableData: await getAvailableData(connection) // Helper function
//         }
//       });
//     }

//     const risk = riskRows[0];

//     // Fetch age effects
//     const [ageEffects] = await connection.execute(
//       `SELECT age_group, percentage FROM age_effects WHERE risk_assessment_id = ?`,
//       [risk.id]
//     );

//     // Fetch location impacts
//     const [locationImpacts] = await connection.execute(
//       `SELECT location_name, impacted_exposure, COALESCE(death_toll, 0) AS death_toll FROM location_impacts WHERE risk_assessment_id = ?`,
//       [risk.id]
//     );

//     // Calculate total exposure
//     const totalExposure = locationImpacts.reduce(
//       (sum, loc) => sum + Number(loc.impacted_exposure || 0),
//       0
//     );

//     connection.release();

//     // Construct response for Frontend
//     const response = {
//       year: yearNumber,
//       returnPeriod: effectiveReturnPeriod,
//       pandemicName: risk.pandemic_name,
//       totalExposure: totalExposure,
//       ageDemographics: ageEffects.map((a) => ({
//         age_group: a.age_group,
//         percentage: parseFloat(a.percentage),
//       })),
//       locationImpacts: locationImpacts.map((l) => ({
//         location_name: l.location_name,
//         impacted_exposure: parseInt(l.impacted_exposure),
//         death_toll: parseInt(l.death_toll || 0),
//       })),
//     };

//     console.log("✅ Sending response:", response);
//     res.json(response);
//   } catch (error) {
//     console.error("❌ Error fetching risk assessment:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Helper function to see what data exists
// async function getAvailableData(connection) {
//   try {
//     const [available] = await connection.execute(
//       `SELECT DISTINCT year, return_period FROM risk_assessments ORDER BY year DESC, return_period`
//     );
//     return available;
//   } catch (error) {
//     return [];
//   }
// }
// // GET - Get all risk assessments
// app.get("/api/risk-assessments", async (req, res) => {
//   try {
//     const connection = await pool.getConnection();
    
//     // Get all risk assessments
//     const [assessments] = await connection.execute(`
//       SELECT * FROM risk_assessments ORDER BY created_at DESC
//     `);

//     // For each assessment, get age effects and location impacts
//     const result = [];
//     for (const assessment of assessments) {
//       const [ageEffects] = await connection.execute(
//         `SELECT * FROM age_effects WHERE risk_assessment_id = ?`,
//         [assessment.id]
//       );

//       const [locationImpacts] = await connection.execute(
//         `SELECT * FROM location_impacts WHERE risk_assessment_id = ?`,
//         [assessment.id]
//       );

//       result.push({
//         ...assessment,
//         age_effects: ageEffects,
//         location_impacts: locationImpacts
//       });
//     }

//     connection.release();

//     res.json({
//       count: result.length,
//       data: result
//     });

//   } catch (error) {
//     console.error("Error fetching risk assessments:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // GET - Get risk assessment by ID
// app.get("/api/risk-assessments/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     const connection = await pool.getConnection();
    
//     // Get risk assessment
//     const [assessments] = await connection.execute(
//       `SELECT * FROM risk_assessments WHERE id = ?`,
//       [id]
//     );

//     if (assessments.length === 0) {
//       connection.release();
//       return res.status(404).json({ error: "Risk assessment not found" });
//     }

//     const assessment = assessments[0];

//     // Get age effects
//     const [ageEffects] = await connection.execute(
//       `SELECT * FROM age_effects WHERE risk_assessment_id = ?`,
//       [id]
//     );

//     // Get location impacts
//     const [locationImpacts] = await connection.execute(
//       `SELECT * FROM location_impacts WHERE risk_assessment_id = ?`,
//       [id]
//     );

//     connection.release();

//     res.json({
//       ...assessment,
//       age_effects: ageEffects,
//       location_impacts: locationImpacts
//     });

//   } catch (error) {
//     console.error("Error fetching risk assessment:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // GET - Search risk assessments by filters
// app.get("/api/risk-assessments/search/filter", async (req, res) => {
//   try {
//     const { country, region, state, risk_type, year } = req.query;
    
//     let query = `SELECT * FROM risk_assessments WHERE 1=1`;
//     const params = [];

//     if (country) {
//       query += ` AND country = ?`;
//       params.push(country);
//     }
//     if (region) {
//       query += ` AND region = ?`;
//       params.push(region);
//     }
//     if (state) {
//       query += ` AND state = ?`;
//       params.push(state);
//     }
//     if (risk_type) {
//       query += ` AND risk_type = ?`;
//       params.push(risk_type);
//     }
//     if (year) {
//       query += ` AND year = ?`;
//       params.push(year);
//     }

//     query += ` ORDER BY created_at DESC`;

//     const connection = await pool.getConnection();
//     const [assessments] = await connection.execute(query, params);
//     connection.release();

//     res.json({
//       count: assessments.length,
//       data: assessments
//     });

//   } catch (error) {
//     console.error("Error searching risk assessments:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // DELETE - Delete risk assessment by ID
// app.delete("/api/risk-assessments/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     const connection = await pool.getConnection();
    
//     const [result] = await connection.execute(
//       `DELETE FROM risk_assessments WHERE id = ?`,
//       [id]
//     );

//     connection.release();

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: "Risk assessment not found" });
//     }

//     res.json({ message: "Risk assessment deleted successfully" });

//   } catch (error) {
//     console.error("Error deleting risk assessment:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });
// // =========================
// // GET - Risk Assessment by Year and Return Period (for Exposure.jsx)
// // =========================
// app.get("/api/risk-assessment", async (req, res) => {
//   try {
//     const { year, returnPeriod } = req.query;

//     if (!year) {
//       return res.status(400).json({ error: "Year is required" });
//     }

//     const connection = await pool.getConnection();

//     // Example: fetch the latest matching record
//     const [riskRows] = await connection.execute(
//       `SELECT * FROM risk_assessments WHERE year = ? ORDER BY created_at DESC LIMIT 1`,
//       [year]
//     );

//     if (riskRows.length === 0) {
//       connection.release();
//       return res.status(404).json({ message: "No risk assessment found for this year" });
//     }

//     const risk = riskRows[0];

//     // Fetch related age demographics (age_effects)
//     const [ageEffects] = await connection.execute(
//       `SELECT age_group, percentage FROM age_effects WHERE risk_assessment_id = ?`,
//       [risk.id]
//     );

//     // Fetch related location impacts
//     const [locationImpacts] = await connection.execute(
//       `SELECT location_name, impacted_exposure, COALESCE(death_toll, 0) AS death_toll FROM location_impacts WHERE risk_assessment_id = ?`,
//       [risk.id]
//     );

//     // Calculate total exposure
//     const totalExposure = locationImpacts.reduce(
//       (sum, loc) => sum + Number(loc.impacted_exposure || 0),
//       0
//     );

//     connection.release();

//     // Construct response for Exposure.jsx
//     const response = {
//       year,
//       returnPeriod: returnPeriod || "N/A",
//       pandemicName: risk.pandemic_name,
//       totalExposure,
//       ageDemographics: ageEffects.map((a) => ({
//         age_group: a.age_group,
//         percentage: parseFloat(a.percentage),
//       })),
//       locationImpacts: locationImpacts.map((l) => ({
//         location_name: l.location_name,
//         impacted_exposure: parseFloat(l.impacted_exposure),
//         death_toll: l.death_toll,
//       })),
//     };

//     res.json(response);
//   } catch (error) {
//     console.error("❌ Error fetching risk assessment by year:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });
// app.post("/api/export-pdf", (req, res) => {
//   const { locationImpacts, totalExposure, pandemicName } = req.body;
//   console.log("📄 Generating PDF for:", pandemicName);

//   try {
//     const doc = new PDFDocument({ margin: 40, size: "A4" });
//     res.setHeader("Content-Disposition", "attachment; filename=pandemic_impact.pdf");
//     res.setHeader("Content-Type", "application/pdf");

//     doc.pipe(res);

//     // Title
//     doc.fontSize(20).text("Pandemic Impact Report", { align: "center" });
//     doc.moveDown();

//     doc.fontSize(12).text(`Pandemic Name: ${pandemicName}`);
//     doc.text(`Total Exposure: US$ ${totalExposure} Million`);
//     doc.moveDown();

//     // Table Header
//     doc.fontSize(14).text("Location Impacts", { underline: true });
//     doc.moveDown(0.5);

//     doc.fontSize(11).text("Location Impacted", 50, doc.y, { continued: true });
//     doc.text(" | Impacted Exposure (US$ Million)", { continued: true });
//     doc.text(" | Death Toll (Lives)", { continued: true });
//     doc.text(" | Pandemic Name");
//     doc.moveDown(0.3);

//     // Table Rows
//     locationImpacts.forEach((loc) => {
//       doc.text(`${loc.location_name}`, 50, doc.y, { continued: true });
//       doc.text(` | US$ ${loc.impacted_exposure}`, { continued: true });
//       doc.text(` | ${loc.death_toll || 50}`, { continued: true });
//       doc.text(` | ${pandemicName}`);
//     });

//     doc.end();
//   } catch (error) {
//     console.error("❌ Error generating PDF:", error);
//     res.status(500).send("Error generating PDF");
//   }
// });

// // GET - Filter Risk Assessments by multiple parameters
// // app.get("/api/risk-assessments/filter", async (req, res) => {
// //   try {
// //     const { country, region, state, risk_type, year, return_period } = req.query;

// //     if (!country || !region || !state || !risk_type) {
// //       return res.status(400).json({
// //         error: "Missing required filters: country, region, state, and risk_type are mandatory",
// //       });
// //     }

// //     const connection = await pool.getConnection();

// //     // ✅ Normalize inputs: trim + lowercase for strings
// //     const c = country.trim().toLowerCase();
// //     const r = region.trim().toLowerCase();
// //     const s = state.trim().toLowerCase();
// //     const rt = risk_type.trim().toLowerCase();
// //     const y = year ? Number(year) : null;
// //     const rp = return_period ? String(return_period).trim() : null;

// //     // Build dynamic SQL query with LOWER for case-insensitive matching
// //     let query = `
// //       SELECT * FROM risk_assessments
// //       WHERE LOWER(country) = ?
// //         AND LOWER(region) = ?
// //         AND LOWER(state) = ?
// //         AND LOWER(risk_type) = ?
// //     `;
// //     const params = [c, r, s, rt];

// //     if (y !== null) {
// //       query += " AND year = ?";
// //       params.push(y);
// //     }
// //     if (rp !== null) {
// //       query += " AND return_period = ?";
// //       params.push(rp);
// //     }

// //     query += " ORDER BY created_at DESC LIMIT 1";

// //     console.log("🔍 SQL Query:", query, "Params:", params);

// //     const [rows] = await connection.execute(query, params);

// //     if (rows.length === 0) {
// //       connection.release();
// //       return res.status(404).json({
// //         message: "No matching risk assessment found for the given filters",
// //         searched: { country, region, state, risk_type, year, return_period },
// //       });
// //     }

// //     const risk = rows[0];

// //     // Fetch age effects
// //     const [ageEffects] = await connection.execute(
// //       "SELECT age_group, percentage FROM age_effects WHERE risk_assessment_id = ?",
// //       [risk.id]
// //     );

// //     // Fetch location impacts
// //     const [locationImpacts] = await connection.execute(
// //       `SELECT location_name, impacted_exposure, COALESCE(death_toll, 0) AS death_toll
// //        FROM location_impacts WHERE risk_assessment_id = ?`,
// //       [risk.id]
// //     );

// //     connection.release();

// //     const totalExposure = locationImpacts.reduce(
// //       (sum, loc) => sum + Number(loc.impacted_exposure || 0),
// //       0
// //     );

// //     res.json({
// //       success: true,
// //       country: risk.country,
// //       region: risk.region,
// //       state: risk.state,
// //       riskType: risk.risk_type,
// //       pandemicName: risk.pandemic_name,
// //       year: risk.year,
// //       returnPeriod: risk.return_period,
// //       totalExposure,
// //       ageDemographics: ageEffects.map(a => ({
// //         age_group: a.age_group,
// //         percentage: parseFloat(a.percentage),
// //       })),
// //       locationImpacts: locationImpacts.map(l => ({
// //         location_name: l.location_name,
// //         impacted_exposure: parseFloat(l.impacted_exposure),
// //         death_toll: parseInt(l.death_toll),
// //       })),
// //     });
// //   } catch (error) {
// //     console.error("Error filtering risk assessment:", error);
// //     res.status(500).json({ error: "Internal server error" });
// //   }
// // });


// app.get("/api/risk-assessments/filter", async (req, res) => {
//   try {
//     const { country, region, state, risk_type, year, return_period } = req.query;

//     if (!country || !region || !state || !risk_type) {
//       return res.status(400).json({ error: "Missing required filters" });
//     }

//     const connection = await pool.getConnection();

//     const c = country.trim().toLowerCase();
//     const r = region.trim().toLowerCase();
//     const s = state.trim().toLowerCase();
//     const rt = risk_type.trim().toLowerCase();
//     const y = year ? Number(year) : null;
//     const rp = return_period ? String(return_period).trim() : null;

//     let query = `
//       SELECT * FROM risk_assessments
//       WHERE LOWER(country) = ?
//         AND LOWER(region) = ?
//         AND LOWER(state) = ?
//         AND LOWER(risk_type) = ?
//     `;
//     const params = [c, r, s, rt];

//     if (y !== null) { query += " AND year = ?"; params.push(y); }
//     if (rp !== null) { query += " AND return_period = ?"; params.push(rp); }

//     query += " ORDER BY created_at DESC LIMIT 1";

//     const [rows] = await connection.execute(query, params);

//     if (rows.length === 0) {
//       connection.release();
//       return res.status(404).json({ message: "No risk assessment found", searched: req.query });
//     }

//     const risk = rows[0];

//     const [ageEffects] = await connection.execute(
//       `SELECT age_group, percentage FROM age_effects WHERE risk_assessment_id = ?`,
//       [risk.id]
//     );

//     const [locationImpacts] = await connection.execute(
//       `SELECT location_name, impacted_exposure, COALESCE(death_toll, 0) AS death_toll
//        FROM location_impacts WHERE risk_assessment_id = ?`,
//       [risk.id]
//     );

//     connection.release();

//     const totalExposure = locationImpacts.reduce((sum, l) => sum + Number(l.impacted_exposure || 0), 0);

//     res.json({
//       success: true,
//       country: risk.country,
//       region: risk.region,
//       state: risk.state,
//       riskType: risk.risk_type,
//       pandemicName: risk.pandemic_name,
//       year: risk.year,
//       returnPeriod: risk.return_period,
//       totalExposure,
//       ageDemographics: ageEffects.map(a => ({ age_group: a.age_group, percentage: parseFloat(a.percentage) })),
//       locationImpacts: locationImpacts.map(l => ({
//         location_name: l.location_name,
//         impacted_exposure: parseFloat(l.impacted_exposure),
//         death_toll: parseInt(l.death_toll),
//       })),
//     });
//   } catch (error) {
//     console.error("❌ Error filtering risk assessment:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });




// // =========================
// // Server Start
// // =========================
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, async () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
//   await initializeDatabase();
// });