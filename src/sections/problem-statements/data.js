export const domainList = [
  {
    name: "Fintech",
    code: "FINTECH",
    tagline: "Decentralized finance, automated micro-settlements & risk scoring",
    problems: [
      {
        problemNum: "01",
        name: "Decentralized Micro-Payment Escrow",
        summary:
          "Build a seamless, low-latency micro-payment gateway for peer transactions.",
        challenge:
          "Traditional payment networks introduce high transaction fees and settlement delays for micro-transactions. Create a lightweight escrow pipeline that batches transactions with cryptographically verified settlements.",
        deliverables: [
          "Fast payment initiation & escrow verification interface.",
          "Batch transaction settling simulator with transaction receipt generation.",
          "Fraud anomaly detector flagging suspicious transaction bursts.",
        ],
        demo:
          "Execute a micro-payment across fictional student accounts and display verified escrow release.",
      },
      {
        problemNum: "02",
        name: "AI Credit & Financial Risk Assessor",
        summary:
          "Democratize credit scoring for students and unbanked individuals using transparent alternative data.",
        challenge:
          "Individuals without extensive credit histories face high barriers to loans and financial services. Build an explainable risk scoring system evaluating utility payments, savings streaks, and academic achievements.",
        deliverables: [
          "Multi-metric credit profile assessment dashboard.",
          "Explainable risk factor breakdown with improvement recommendations.",
          "Interactive loan simulation portal with simulated lending terms.",
        ],
        demo:
          "Input sample student financial behaviors and generate an explainable credit score and eligibility assessment.",
      },
    ],
  },
  {
    name: "Legal",
    code: "LEGAL",
    tagline: "Contract analysis, predatory clause detection & proof registries",
    problems: [
      {
        problemNum: "01",
        name: "Autonomous Contract Analyzer & Clause Sentinel",
        summary:
          "Protect users by detecting predatory terms and hidden obligations in standard contracts.",
        challenge:
          "Everyday consumers and freelancers sign complex contracts without understanding liabilities, non-competes, or IP traps. Develop an intelligent legal document analyzer that highlights high-risk clauses and suggests fair alternatives in plain English.",
        deliverables: [
          "PDF / Document upload parser with clause extraction.",
          "Color-coded risk assessment heat-map highlighting predatory clauses.",
          "Plain-language clause translator with recommended revisions.",
        ],
        demo:
          "Upload a sample freelance contract, flag an unfair liability clause, and preview a balanced replacement clause.",
      },
      {
        problemNum: "02",
        name: "Decentralized Evidence & IP Registry",
        summary:
          "Establish tamper-proof timestamps and ownership proofs for creative works and digital evidence.",
        challenge:
          "Artists, inventors, and legal parties struggle to definitively prove first-creation dates and chain-of-custody in court. Build an immutable evidence ledger that issues cryptographic verification certificates.",
        deliverables: [
          "File hashing and metadata cryptographic timestamp engine.",
          "Public verification portal to validate evidence authenticity.",
          "Certificate generator with QR verification codes.",
        ],
        demo:
          "Register a creative design, generate an immutable proof certificate, and verify it on the public lookup terminal.",
      },
    ],
  },
  {
    name: "Healthcare",
    code: "HEALTHCARE",
    tagline: "Emergency triage, patient records & hospital resource coordination",
    problems: [
      {
        problemNum: "01",
        name: "Smart Emergency Triage & Bed Allocation",
        summary:
          "Optimize emergency room intake and real-time hospital resource coordination.",
        challenge:
          "Hospitals experience severe intake bottlenecks during peak hours, delaying critical care. Build a predictive intake terminal that analyzes patient symptoms, assigns urgency tiers, and synchronizes real-time bed availability.",
        deliverables: [
          "Symptom intake triage form with automated urgency classification.",
          "Live multi-department bed and equipment allocation dashboard.",
          "Emergency ambulance transit beacon with live patient telemetry.",
        ],
        demo:
          "Submit a high-urgency patient case and observe automatic triage prioritization and hospital bed dispatch.",
      },
      {
        problemNum: "02",
        name: "Universal Medical Records Vault",
        summary:
          "Enable secure, patient-owned health record exchange across care providers.",
        challenge:
          "Patient medical histories are siloed across disconnected clinics, leading to redundant tests and delayed diagnosis. Design a zero-knowledge encrypted vault where patients grant granular, time-bound access to verified doctors.",
        deliverables: [
          "Patient records dashboard with biometric encryption keys.",
          "Granular consent management interface for doctors and labs.",
          "Audit trail logging every medical history access event.",
        ],
        demo:
          "Grant a temporary 24-hour medical history access pass to a doctor and verify automatic revocation.",
      },
    ],
  },
  {
    name: "Spacetech",
    code: "SPACETECH",
    tagline: "Orbital collision tracking, autonomous rovers & telemetry queues",
    problems: [
      {
        problemNum: "01",
        name: "Orbital Debris Tracking & Collision Avoidance",
        summary:
          "Forecast space debris trajectories to protect satellite constellations and orbital stations.",
        challenge:
          "Thousands of defunct rocket bodies and debris fragments orbit Earth, threatening active satellites. Develop a real-time orbit propagation and collision risk engine that recommends evasive thruster maneuvers.",
        deliverables: [
          "Interactive orbital trajectory viewer with debris cluster mapping.",
          "Conjunction risk alert matrix calculating collision probabilities.",
          "Automated delta-V maneuver planner optimizing fuel conservation.",
        ],
        demo:
          "Simulate a close-approach debris event, compute collision probability, and execute a simulated avoidance burn.",
      },
      {
        problemNum: "02",
        name: "Autonomous Deep-Space Rover Telemetry System",
        summary:
          "Coordinate remote rover exploration under extreme communication lag and packet loss.",
        challenge:
          "Signal delays of up to 20 minutes make direct joystick rover control impossible on Mars. Build an autonomous waypoint task scheduler that allows rovers to self-navigate terrain hazards and queue priority science experiments.",
        deliverables: [
          "Terrain waypoint planner with autonomous obstacle bypass simulation.",
          "Compressed packet telemetry queue with store-and-forward sync.",
          "Science target prioritization engine scheduling drill and camera samples.",
        ],
        demo:
          "Queue a multi-waypoint science traverse, simulate 15-minute comms blackout, and observe autonomous task execution.",
      },
    ],
  },
  {
    name: "Agritech",
    code: "AGRITECH",
    tagline: "Precision crop diagnosis, smart irrigation & sustainable farming",
    problems: [
      {
        problemNum: "01",
        name: "AI Precision Crop Health & Disease Sentinel",
        summary:
          "Detect crop pests and fungal infections early through automated spectral imagery.",
        challenge:
          "Crop blights can decimate entire harvests before visible symptoms spread across fields. Engineer a computer vision diagnostic tool that classifies crop leaf diseases from sample photos and prescribes organic remediation.",
        deliverables: [
          "Image upload and field camera disease classification scanner.",
          "Localized remediation advice with dosage and weather precautions.",
          "Outbreak risk map visualizing regional pest spread alerts.",
        ],
        demo:
          "Scan a sample diseased leaf photo, detect early blight with confidence score, and review treatment instructions.",
      },
      {
        problemNum: "02",
        name: "Smart Soil Moisture & Automated Irrigation Grid",
        summary:
          "Maximize agricultural yields while cutting water waste via IoT micro-climate forecasting.",
        challenge:
          "Over-watering depletes scarce groundwater, while under-watering stunts crop yields. Build an IoT sensor telemetry controller that combines soil moisture readings, evapotranspiration rates, and weather forecasts to automate drip irrigation.",
        deliverables: [
          "Simulated sensor telemetry stream (soil moisture, temperature, humidity).",
          "Predictive valve control automation scheduling irrigation cycles.",
          "Water conservation analytics dashboard comparing savings vs traditional schedules.",
        ],
        demo:
          "Trigger a low soil moisture alert, incorporate incoming rain forecast, and execute optimized water delivery.",
      },
    ],
  },
];

export const sampleProblems = domainList.flatMap((d) => d.problems);
