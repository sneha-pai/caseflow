import React from 'react';

class IntakeHelp extends React.Component {

  render() {
    /* eslint-disable max-len */
    return <div className="cf-help-content">

      <h1 id="#top">Welcome to the Intake Help page!</h1>

      <p>Here you will find <a href="#training-videos"> Training Videos</a> and <a href="#faq">Frequently Asked Questions (FAQs)</a> for Intake, as well as links to the <a target="_blank" rel="noopener noreferrer" href="/assets/Intake_Training_Guide.pdf">Training Guide</a> and the <a target="_blank" rel="noopener noreferrer" href="/assets/Intake_Quick_Reference_Guide.pdf">Quick Reference Guide</a>. These items are provided to assist you as you access and use Intake. If you require further assistance after reviewing these items, please contact the Caseflow Product Support Team by phone (1-844-876-5548) or email <a href="mailto:caseflow@va.gov">(caseflow@va.gov)</a>. We look forward to assisting you.
      </p>

      <h1 id="training-videos">Training Videos</h1>
      <div className="cf-help-divider"></div>

      <div className="cf-lead-paragraph">Coming Soon!</div>

      <h1 id="faq">Frequently Asked Questions</h1>

      <div className="cf-help-divider"></div>

      <ul id="toc" className="usa-unstyled-list">
        <li><a href="#what-is-caseflow-intake">What is Caseflow Intake?</a></li>
        <li><a href="#how-was-intake-developed">How was Intake developed?</a></li>
        <li><a href="#how-to-access-intake">How do I access Intake?</a></li>
        <li><a href="#launch-intake">How do I launch Intake?</a></li>
        <li><a href="#web-browser">Which web browser can I use with Intake?</a></li>
        <li><a href="#telecommuting">Does Intake work while I am telecommuting?</a></li>
        <li><a href="#lob-bva-appeal">What should I do if my line of business receives a Board Appeal?</a></li>
        <li><a href="#encounter-problems">What should I do if I encounter problems?</a></li>
        <li><a href="#suggestions">How can I share my suggestions for improving Intake?</a></li>
        <li><a></a><a href="#still-need-help">What if I still need help? </a></li>
      </ul>

      <div className="cf-help-divider"></div>

      <h2 id="what-is-caseflow-intake">What is Caseflow Intake?</h2>
      <p>Caseflow Intake (Intake) is a web-based application designed to support the Appeals Modernization Act (AMA). It is used to process decision reviews for Veterans who have chosen the new Supplemental Claim (SC) or Higher-Level Review (HLR) options as well as those who have chosen to appeal directly to the Board through a Notice of Disagreement (NOD). Intake serves as the single data input system for this process, providing a source of truth for AMA statutory metrics. For VBMS users, Intake creates an End Product (EP) and closes the VACOLS record automatically for eligible legacy opt-ins. Intake also guides Claims Assistants (CAs) through the process of notifying Veterans, updating necessary systems, and creating EPs. 
      </p>
      
      <p>
For non-VBMS users, Intake provides a decision review task list with functionality to mark dispositions, closing the loop on appeals issues and assuring an end-to-end collection of AMA metrics. Across the board, Intake performs numerous issue-level validations, matching, and error checking, to capture the best possible data and reduce processing overhead.
      </p>

      <h2 id="how-was-intake-developed">How was Intake developed?</h2>
      <p>The DSVA team worked closely with stakeholders across the VA to develop, test, and improve Caseflow Intake.
      </p>

      <h2 id="how-to-access-intake">How do I access Intake?</h2>
      <p>To gain access to Intake, you must submit a request to your Information Security Officer (ISO) and/or Information Resources Management (IRM) team to adjust your Common Security Employee Manager (CSEM) permissions. To initiate the request, draft an email requesting your current permissions be updated as follows:
      </p>

      <p className="cf-help-image-wrapper">
        <img className="cf-help-image" alt="Intake Access" src="/assets/help/intake-access.jpg" />
      </p>

      <p>Once the email is drafted, attach a copy of your latest “VA Privacy and Information Security Awareness and Rules of Behavior” training certificate and forward the email to your supervisor for approval. If approved, your supervisor should forward the request to your station’s IRM team and/or ISO for entry into CSEM. You will receive an email notice once access is granted.
      </p>

      <h2 id="launch-intake">How do I launch Intake?</h2>
      <p>To launch Intake, open your web browser and paste the following URL into the address bar: <a href="https://appeals.cf.ds.va.gov/intake" >https://appeals.cf.ds.va.gov/intake</a>. Hit the Enter button and sign in using your VA credentials. You will be taken to the Intake Welcome page.
      </p>

      <h2 id="web-browser">Which web browser can I use with Intake?</h2>
      <p>Intake is compatible with most modern web browsers, such as Chrome, Firefox, Safari, and Internet Explorer 9 (or later).
      </p>

      <h2 id="telecommuting">Does Intake work while I am telecommuting?</h2>
      <p>Yes, you can use Intake while connected to the VA network via VPN.
      </p>
      
      <h2 id="lob-bva-appeal">What should I do if my Line of Business receives a Board Appeal</h2>
      <p>If your business receives a Board Appeal (VA Form 10182 Notice of Disagreement), you should not attempt to intake it, but instead forward it immediately to the Board at:<br>
        <br>
        Board of Veterans' Appeals<br>
        P.O. Box 27063<br>
        Washington, DC 20038<br>
        FAX: 844-678-8979
      </p>

      <h2 id="encounter-problems">What should I do if I encounter problems?</h2>
      <p>If you encounter any problems while using Intake, contact the Caseflow Product Support Team by calling 1-844-876-5548 or send an email to <a href="mailto: caseflow@va.gov">caseflow@va.gov</a>. They can be reached from 8:00AM to 8:00PM EST, Monday through Friday.
      </p>

      <p className="cf-help-image-wrapper">
        <img className="cf-help-image" alt="Send Intake Feedback" src="/assets/help/intake-feedback.jpg" />
      </p>

      <h2 id="suggestions">How can I share my suggestions for improving Intake?</h2>
      <p>You can use the "Send feedback" link located in the dropdown menu next to your username or the “Send feedback” link located at the bottom right-hand corner of the screen to share your ideas for improving Intake or to report an issue.
      </p>

      <h2 id="still-need-help">What if I still need help?</h2>
      <p>If you require further assistance after reviewing the <a href="#faq">FAQs</a>, <a target="_blank" rel="noopener noreferrer" href="/assets/Intake_Quick_Reference_Guide.pdf">Quick Reference Guide</a>, or <a target="_blank" rel="noopener noreferrer" href="/assets/Intake_Training_Guide.pdf">Training Guide</a>, please contact the Caseflow Product Support Team by phone (1-844-876-5548) or email <a href="mailto: caseflow@va.gov">(caseflow@va.gov)</a>. We look forward to assisting you.
      </p>

    </div>;
    /* eslint-disable max-len */
  }
}

export default IntakeHelp;
