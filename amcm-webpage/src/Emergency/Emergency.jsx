import "./Emergency.css"
const Emergency = () => {
    return (
        <>

            <div id="emergency-container">
                <div id="emergency-wrapper">
                    {/* Title */}
                    <div id="emergency-title">
                        <h3>Emergency Room</h3>
                    </div>

                    <div id="emergency-description">
                        <p><strong>Our Emergency Room (ER)</strong> operates <strong>24/7</strong>, ensuring <strong>immediate and expert medical attention</strong> for patients in critical
                            or urgent situations. Our dedicated team of doctors, nurses, and emergency responders are ready to provide <strong>compassionate, life-saving care</strong> at any time.
                        </p>
                    </div>

                    <div id="emergency-content">
                        <div id="triage-system-content">
                            <h3><strong>🏥 ER Triage System - Prioritizing Patient Care</strong></h3>
                        </div>

                        <div id="triage-system-description">
                            <p>Upon arrival at the ER, patients undergo <strong>triage</strong>, a process where ouor healthcare team assesses the urgency of medical conditions and prioritizes
                                care accordingly.</p>
                        </div>


                        <div id="type-of-patient-care">
                            <ul id="type-of-patient-care-list">
                                <li><strong>🔴 Emergency (Critical)</strong> </li>
                                <p> Immediate treatment required (e.g. , heart attack, stroke, severe, traruma)</p>
                                <li><strong>🟠 Urgent (Serious but Stable)</strong></li>
                                 <p> Quick intervention needed (e.g., fractures, high fever with seizures)</p>
                                <li><strong>🟡 Non-Urgent (Stable Conditions)</strong></li>
                                <p> Can wait for treatment (e.g., mild injurires, minor illnesses)</p>
                            </ul>
                        </div>

                        <div id="steps-in-the-emergency-process">
                            <h3><strong>📌 Steps in the Emergency Process</strong></h3>
                            <ol id="steps-in-the-emergency-process-list">
                                <li><strong>Arrival & Registration</strong></li>
                                <p>Patients or their companions provide basic information at the ER reception.</p>
                                <li><strong>Triage Assessment</strong></li>
                                <p>A nurse evaluates the patient's condition based on symptoms, vital signs, and medical history
                                    to determine priority level.
                                </p>
                                <li><strong>Initial Medical Evaluation</strong></li>
                                <p>A doctor conducts an assessment order necessary test (e.g., X-rays, blood work) and provides immediate treatment.</p>
                                <li><strong>Treatment and Monitoring</strong></li>
                                <p>Depending on the severity, patients may receive treatment in the ER or be transferred to an appropriate department for further care.</p>
                                <li><strong>Admission or Discharge</strong></li>
                                <p>Patients requiring extended care may be admitted to the hospital, while others may be discharged with follow-up instructions and prescriptions.</p>
                            </ol>
                        </div>

                        <div id="when-to-go-to-the-er">
                            <h3><strong> 📌 When to Go to the ER</strong></h3>
                        </div>

                        <div id="er-situations">
                            <ul id="er-situations-list">
                                <li>✔ Severe chest pain or difficulty breathing</li>
                                <li>✔ Stroke symptoms (numbness, slurred speech, confusion)</li>
                                <li>✔ Severe bleeding or deep wounds</li>
                                <li>✔ Sudden loss of consciousness or seizures</li>
                                <li>✔ Major accidents, fractures, or burns</li>
                                <li>✔ Severe allergic reactions or poisoning</li>
                            </ul>
                        </div>

                        <div id="what-to-bring-er">
                            <h3><strong> 📝 What to Bring to the ER</strong></h3>
                            <ul>
                                <li>✅ Valid ID (if available)</li>
                                <li>✅ Medical history or medications list</li>
                                <li>✅ PhilHealth/Insurance details (if applicable)</li>
                                <li>✅ Contact details of next of kin</li>
                            </ul>
                        </div>
                    </div>

                    <div id="give-us-your-feedback">
                        {/* For the meantime because the feedback page is still on development. */}
                        <p>Your health and safety are our top priorities. In a medical emergency, don't wait-seek help immediately.</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Emergency;
