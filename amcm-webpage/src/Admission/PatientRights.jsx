import React from 'react'
import './PatientRights.css'

const PatientRights = () => {
  return (
    <>
      <div id="patient-rights-container">
        <div id="patient-rights-wrapper">
          <div id="heading-title">
            <h3>Patient's Right</h3>
          </div>

          <div id="description">
            <h6>Adventist Medical Center and College Manila, Inc.  is committed to upholding the highest standards of medical care, ethics, and patient safety. As a patient, you have the following rights, in accordance with Philippine laws and hospital policies:</h6>

          </div>

          <div id="patient-rights-content-wrapper">
            <div id="patient-rights-content">
              <ol>
                <div>
                  <li><h4><strong>Right to Quality Healthcare</strong></h4></li>
                  <p>You have the right to receive timely, appropriate, and high-quality medical care, free from discrimination based on race, gender, religion, nationality, or financial status.</p>
                  <i>Legal Reference: Republic Act No. 8344 – Prohibiting hospitals from refusing treatment in emergency cases.</i>
                </div>
                <br />
                <div>
                  <li><h4><strong>Right to Informed Consent</strong></h4></li>
                  <p>You have the right to be fully informed about your medical condition, available treatment options, potential risks, and alternative procedures before making healthcare decisions. Your consent is required before any medical procedure, except in emergencies.</p>
                  <i>Legal Reference: DOH Patient’s Bill of Rights and Obligations.</i>
                </div>
                <br />
                <div>
                  <li><h4><strong>Right to Privacy and Confidentiality</strong></h4></li>
                  <p>Your medical records and personal health information will be kept confidential and will only be shared with authorized personnel, with your consent, or as required by law.</p>
                  <i>Legal Reference: Data Privacy Act of 2012 (RA 10173).</i>
                </div>
                <br />
                <div>
                  <li><h4><strong>Right to Access Medical Records</strong></h4></li>
                  <p>You have the right to review your medical records and obtain copies upon request. You may also authorize another person to access your records on your behalf.</p>
                  <i>Hospital Policy: Requests for medical records must be submitted in writing to the Medical Records Section, subject to hospital procedures and legal guidelines.</i>
                </div>
                <br />
                <div>
                  <li><h4><strong>Right to Choose Your Healthcare Provider</strong></h4></li>
                  <p>You have the right to select your attending physician, seek a second opinion, or transfer to another hospital when medically feasible.</p>
                  <i>Hospital Policy: Transfers will be coordinated through the Patient Relations Office to ensure continuity of care.</i>
                </div>
                <br />
                <div>
                  <li><h4><strong>Right to Refuse Treatment</strong></h4></li>
                  <p>You have the right to refuse any medical treatment, as long as you are mentally competent and fully informed of the risks. However, this right does not apply in cases of communicable diseases that pose a public health risk.</p>
                  <i>Legal Reference: DOH Guidelines on Patient Autonomy.</i>
                </div>
                <br />
                <div>
                  <li><h4><strong>Right to Emergency Care</strong></h4></li>
                  <p>You have the right to receive emergency medical care at any time, regardless of your financial capacity or hospital deposit requirements.</p>
                  <i>Legal Reference: Republic Act No. 8344.</i>
                </div>
                <br />
                <div>
                  <li><h4><strong>Right to Respect and Dignity</strong></h4></li>
                  <p>You will be treated with dignity, respect, and compassion by our healthcare team, regardless of your medical condition or personal circumstances.</p>
                </div>
                <br />
                <div>
                  <li><h4><strong>Right to a Safe and Clean Environment</strong></h4></li>
                  <p>You have the right to receive care in a safe, clean, and well-maintained facility that adheres to hospital safety protocols and infection control measures.</p>
                </div>
                <br />
                <div>
                  <li><h4><strong>Right to File Complaints and Seek Redress</strong></h4></li>
                  <p>If you have concerns regarding your treatment or hospital experience, you may file a complaint with the Patient Experience Office or the Hospital Administrator. Your concerns will be addressed promptly and fairly.</p>
                  <i>Legal Reference: The Philippine Medical Act & DOH Patient’s Bill of Rights.</i>
                </div>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PatientRights;
