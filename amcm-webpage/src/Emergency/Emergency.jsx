import React from 'react'

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
                            <h3><strong>ER Triage System - Prioritizing Patient Care</strong></h3>
                        </div>

                        <div id="triage-system-description">
                            <p>Upon arrival at the ER, patients undergo <strong>triage</strong>, a process where ouor healthcare team assesses the urgency of medical conditions and prioritizes 
                            care accordingly.</p>
                        </div>


                        <div id="type-of-patient-care">
                            <ul>
                                <li><strong>Emergency (Critical)</strong> - Immediate treatment required (e.g. , heart attack, stroke, severe, traruma)</li>
                                <li><strong>Urgent (Serious but Stable)</strong> - Quick intervention needed (e.g., fractures, high fever with seizures)</li>
                                <li><strong>Non-Urgent (Stable Conditions)</strong> - Can wait for treatment (e.g., mild injurires, minor illnesses)</li>
                            </ul>
                        </div>

                        <div id="steps-in-the-emergency-process">
                            <ol>
                                <li><strong>Arrival & Registration</strong></li>
                                <p>Patients or their companions provide basic information at the ER reception.</p>
                                <li><strong>Triage Assessment</strong></li>
                                <p>A nurse evaluates the patient's condition based on symptoms, vital signs, and medical history 
                                    to determine priority level.
                                </p>
                                <li><strong>Initial Medical Evaluation</strong></li>
                                <p>A doctor conducts an assessment order necessary test (e.g., X-rays, blood work) and provides immediate treatment.</p>
                                <li><strong>Treatment and Monitoring</strong></li>
                                <p>Depending on the severity, patients may receive treatment in the ER or be transferred to an appropriate departmentfor further care.</p>
                                <li><strong>Admission or Discharge</strong></li>
                                <p>Patients requireing extended care may be admitted to the hospital, while others may be discharged with follow-up instructions and prescriptions.</p>
                            </ol>
                        </div>

                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Emergency
