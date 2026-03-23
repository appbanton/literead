import React from "react";

export interface Policy {
  key: "terms" | "privacy" | "refund";
  title: string;
  body: React.ReactNode;
}

export const policies: Policy[] = [
  {
    key: "terms",
    title: "Terms of Service",
    body: (
      <div className="space-y-6">
        <p className="text-xs text-gray-500">
          Effective Date: January 16, 2026 &nbsp;·&nbsp; Last Updated: January
          16, 2026
        </p>

        <section className="space-y-2">
          <h2 className="font-semibold text-sm text-white">
            1. Acceptance of Terms
          </h2>
          <p>
            Welcome to Literead (&ldquo;we,&rdquo; &ldquo;us,&rdquo;
            &ldquo;our,&rdquo; or &ldquo;the Service&rdquo;). By accessing or
            using Literead, you (&ldquo;User,&rdquo; &ldquo;you,&rdquo; or
            &ldquo;your&rdquo;) agree to be bound by these Terms of Service
            (&ldquo;Terms&rdquo;). If you do not agree, you may not access or
            use the Service.
          </p>
          <p>
            These Terms constitute a legally binding agreement between you and
            Literead, a service operated from Trinidad and Tobago.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-sm text-white">
            2. Description of Service
          </h2>
          <p>
            Literead provides an AI-powered reading coaching platform designed
            to help students (Pre-K through Grade 12) improve their reading
            comprehension skills. The Service includes access to a curated
            library of reading passages organized by grade level, AI voice
            coaching, progress tracking, and session history.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-sm text-white">
            3. Eligibility and Account Registration
          </h2>
          <div className="space-y-1">
            <h3 className="font-medium text-xs text-gray-300">
              3.1 Age Requirements
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Users under 13 years of age require verifiable parental or
                guardian consent to use the Service
              </li>
              <li>
                Users aged 13 through 17 must have parental or guardian consent
              </li>
              <li>
                Parents or guardians are responsible for monitoring and
                supervising minor users
              </li>
            </ul>
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-xs text-gray-300">
              3.2 Account Creation
            </h3>
            <p>
              To access the Service, you must provide accurate, current, and
              complete information during registration, select your appropriate
              grade level, maintain the security of your account credentials,
              and notify us immediately of any unauthorized account access at
              literead.ai@gmail.com.
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-xs text-gray-300">
              3.3 Account Responsibility
            </h3>
            <p>
              You are responsible for all activities that occur under your
              account. You may not share your credentials with others. Notify us
              immediately at literead.ai@gmail.com if you detect any
              unauthorized access.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-sm text-white">
            4. Subscription Plans and Billing
          </h2>
          <div className="space-y-1">
            <h3 className="font-medium text-xs text-gray-300">
              4.1 Available Plans
            </h3>
            <p>Literead offers three monthly subscription tiers:</p>
            <div className="mt-2 space-y-3">
              <div>
                <p className="font-medium text-gray-300">
                  Basic Plan — $20.00 USD per month
                </p>
                <ul className="list-disc pl-5 space-y-0.5">
                  <li>12 AI coaching sessions per month</li>
                  <li>5-minute maximum duration per session</li>
                  <li>Full access to grade-level reading passages</li>
                  <li>Progress tracking</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-300">
                  Core Plan — $30.00 USD per month
                </p>
                <ul className="list-disc pl-5 space-y-0.5">
                  <li>20 AI coaching sessions per month</li>
                  <li>5-minute maximum duration per session</li>
                  <li>Full access to grade-level reading passages</li>
                  <li>Progress tracking</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-300">
                  Pro Plan — $50.00 USD per month
                </p>
                <ul className="list-disc pl-5 space-y-0.5">
                  <li>30 AI coaching sessions per month</li>
                  <li>5-minute maximum duration per session</li>
                  <li>Full access to grade-level reading passages</li>
                  <li>Progress tracking</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-xs text-gray-300">
              4.2 Billing and Payment
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>All subscriptions are billed monthly in advance</li>
              <li>
                Payments are processed securely through our third-party payment
                processor
              </li>
              <li>
                By subscribing, you authorize recurring monthly charges to your
                payment method
              </li>
              <li>All fees are non-refundable as set out in Section 6</li>
              <li>
                Prices are subject to change with 30 days&apos; advance notice
              </li>
            </ul>
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-xs text-gray-300">
              4.3 Session Limits and Usage
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Sessions automatically terminate at the 5-minute mark</li>
              <li>Unused sessions do not roll over to the following month</li>
              <li>
                Attempting to circumvent session limits may result in account
                suspension
              </li>
            </ul>
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-xs text-gray-300">
              4.4 Automatic Renewal
            </h3>
            <p>
              Your subscription renews automatically each month on the
              anniversary of your initial subscription date unless you cancel
              before the renewal date.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-sm text-white">
            5. Cancellation and Termination
          </h2>
          <div className="space-y-1">
            <h3 className="font-medium text-xs text-gray-300">
              5.1 Cancellation by User
            </h3>
            <p>
              You may cancel your subscription at any time through your account
              settings. Upon cancellation:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                You will retain access to the Service through the end of your
                current billing period
              </li>
              <li>No refunds will be issued for the current period</li>
              <li>
                Your account will not be charged for subsequent billing periods
              </li>
            </ul>
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-xs text-gray-300">
              5.2 Termination by Literead
            </h3>
            <p>
              We reserve the right to suspend or terminate your account
              immediately if you:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Violate these Terms of Service</li>
              <li>Engage in fraudulent activity</li>
              <li>Attempt to hack, disrupt, or damage the Service</li>
              <li>Use the Service in any manner that harms minors</li>
              <li>Abuse or harass other users or our staff</li>
              <li>File a fraudulent chargeback or payment dispute</li>
            </ul>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-sm text-white">6. Refund Policy</h2>
          <div className="space-y-1">
            <h3 className="font-medium text-xs text-gray-300">
              6.1 No Refunds
            </h3>
            <p>
              All subscription fees are non-refundable. By subscribing, you
              acknowledge and agree that:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>No refunds will be issued for partial months of service</li>
              <li>No refunds will be issued for unused sessions</li>
              <li>No refunds will be issued upon cancellation</li>
              <li>All sales are final</li>
            </ul>
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-xs text-gray-300">
              6.2 Chargebacks and Payment Disputes
            </h3>
            <p>
              Filing a chargeback or payment dispute with your bank or card
              issuer in respect of a legitimate subscription charge is a
              violation of these Terms. We reserve the right to immediately
              suspend or permanently terminate any account where a fraudulent
              chargeback is filed, without refund of any amounts paid. If you
              have a billing concern, you must contact us at
              literead.ai@gmail.com before initiating any dispute with your
              payment provider. We will investigate and respond to all billing
              concerns within 30 days.
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-xs text-gray-300">
              6.3 Billing Errors
            </h3>
            <p>
              If you were charged an incorrect amount or charged after a
              confirmed cancellation, contact literead.ai@gmail.com with your
              transaction details. Confirmed billing errors will be corrected.
              This provision does not constitute a general refund window —
              non-use of the Service, change of mind, or dissatisfaction with
              features does not constitute a billing error.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-sm text-white">
            7. Intellectual Property Rights
          </h2>
          <div className="space-y-1">
            <h3 className="font-medium text-xs text-gray-300">7.1 Ownership</h3>
            <p>
              Literead and its licensors own all rights, title, and interest in
              and to the Service, including all reading passages and educational
              content, software and technology, trademarks, logos, and branding,
              and user interface design and layouts.
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-xs text-gray-300">
              7.2 Limited License
            </h3>
            <p>
              We grant you a limited, non-exclusive, non-transferable, revocable
              license to access and use the Service for personal, non-commercial
              educational purposes only.
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-xs text-gray-300">
              7.3 Restrictions
            </h3>
            <p>You may not:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Copy, modify, distribute, or reverse engineer any part of the
                Service
              </li>
              <li>Remove or alter any proprietary notices</li>
              <li>Use the Service to create a competing product</li>
              <li>Extract or scrape content for commercial purposes</li>
              <li>Share your account access with unauthorized users</li>
            </ul>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-sm text-white">
            8. User Content and Data
          </h2>
          <div className="space-y-1">
            <h3 className="font-medium text-xs text-gray-300">
              8.1 Voice Data
            </h3>
            <p>
              When you use the AI voice coaching features, voice data is
              processed in real-time for comprehension analysis. Voice
              recordings are not stored after your session ends. You grant us a
              license to use anonymized, non-identifiable session data to
              improve the Service.
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-xs text-gray-300">
              8.2 Student Progress Data
            </h3>
            <p>
              We collect and store reading session history, passage selections
              and completion rates, and progress metrics and performance
              analytics.
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-xs text-gray-300">
              8.3 Data Security
            </h3>
            <p>
              We implement reasonable security measures to protect your data. No
              method of transmission over the internet is 100% secure.
            </p>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-sm text-white">
            9. Privacy and Data Protection
          </h2>
          <p>
            Your privacy is governed by our Privacy Policy, which is
            incorporated into these Terms by reference. By using the Service,
            you consent to our data practices as described in the Privacy
            Policy.
          </p>
          <div className="space-y-1">
            <h3 className="font-medium text-xs text-gray-300">
              9.1 Third-Party Services
            </h3>
            <p>
              We use third-party service providers for the following functions:
              payment processing and subscription management; user
              authentication and account management; AI voice interaction
              technology; database and backend services; and error tracking and
              monitoring. Each provider operates under its own privacy policy
              and terms of use.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-sm text-white">
            10. Educational Disclaimer
          </h2>
          <div className="space-y-1">
            <h3 className="font-medium text-xs text-gray-300">
              10.1 Supplemental Tool
            </h3>
            <p>
              Literead is a supplemental educational tool. It is not intended to
              replace formal classroom instruction, professional educational
              assessment, special education services, or licensed tutoring or
              therapy services.
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-xs text-gray-300">
              10.2 No Guarantees
            </h3>
            <p>
              We make no guarantees regarding specific learning outcomes or
              grade improvements, reading level advancement timelines, academic
              performance results, or suitability for specific learning
              disabilities.
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-xs text-gray-300">
              10.3 Parental Involvement
            </h3>
            <p>
              Parents and guardians are encouraged to monitor their child&apos;s
              usage, review progress regularly, supplement the Service with
              traditional reading instruction, and consult educational
              professionals as needed.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-sm text-white">
            11. AI Technology Limitations
          </h2>
          <div className="space-y-1">
            <h3 className="font-medium text-xs text-gray-300">
              11.1 AI-Generated Content
            </h3>
            <p>
              Our Service uses artificial intelligence that may occasionally
              produce unexpected or incorrect responses, misinterpret
              pronunciation or comprehension, require multiple attempts to
              understand user input, or experience temporary outages or
              performance issues.
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-xs text-gray-300">
              11.2 No Human Supervision
            </h3>
            <p>
              AI coaching sessions are automated and not monitored by human
              educators in real-time. Users should not rely on the Service for
              emergency assistance, mental health support, crisis intervention,
              or medical or psychological advice.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-sm text-white">
            12. Limitation of Liability
          </h2>
          <div className="space-y-1">
            <h3 className="font-medium text-xs text-gray-300">
              12.1 Service Availability
            </h3>
            <p>
              We are not liable for temporary service interruptions, scheduled
              maintenance downtime, third-party service failures, or internet
              connectivity issues.
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-xs text-gray-300">
              12.2 Disclaimer of Warranties
            </h3>
            <p className="uppercase text-xs">
              The Service is provided &ldquo;as is&rdquo; and &ldquo;as
              available&rdquo; without warranties of any kind, either express or
              implied, including but not limited to warranties of
              merchantability, fitness for a particular purpose, or
              non-infringement.
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-xs text-gray-300">
              12.3 Limitation of Damages
            </h3>
            <p className="uppercase text-xs">
              To the maximum extent permitted by law, Literead shall not be
              liable for any indirect, incidental, special, consequential, or
              punitive damages, including loss of profits, data, use, or other
              intangible losses. In no event shall our total liability exceed
              the amount you paid for the Service in the three (3) months
              preceding the claim.
            </p>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-sm text-white">
            13. Indemnification
          </h2>
          <p>
            You agree to defend, indemnify, and hold harmless Literead, its
            officers, employees, contractors, and agents from any claims,
            damages, losses, liabilities, and expenses (including reasonable
            attorneys&apos; fees) arising from your violation of these Terms,
            your use or misuse of the Service, your violation of any third-party
            rights, or any content you submit through the Service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-sm text-white">
            14. Prohibited Conduct
          </h2>
          <div className="space-y-1">
            <h3 className="font-medium text-xs text-gray-300">
              14.1 Technical Abuse
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Use automated systems (bots, scrapers) without permission</li>
              <li>Introduce viruses, malware, or harmful code</li>
              <li>Overload or disrupt our servers</li>
            </ul>
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-xs text-gray-300">
              14.2 Content Violations
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Upload inappropriate, offensive, or illegal content</li>
              <li>Harass, threaten, or impersonate others</li>
              <li>Share content that violates intellectual property rights</li>
              <li>Post spam or unsolicited advertisements</li>
            </ul>
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-xs text-gray-300">
              14.3 Service Abuse
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Share account credentials with unauthorized users</li>
              <li>Create multiple accounts to circumvent usage limits</li>
              <li>Resell or redistribute access to the Service</li>
              <li>
                Use the Service for commercial purposes without authorization
              </li>
              <li>File fraudulent chargebacks or payment disputes</li>
            </ul>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-sm text-white">
            15. Dispute Resolution
          </h2>
          <div className="space-y-1">
            <h3 className="font-medium text-xs text-gray-300">
              15.1 Governing Law
            </h3>
            <p>
              These Terms are governed by and construed in accordance with the
              laws of Trinidad and Tobago, without regard to conflict of law
              principles.
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-xs text-gray-300">
              15.2 Informal Resolution
            </h3>
            <p>
              Before filing any formal claim, you agree to contact us at
              literead.ai@gmail.com to attempt informal resolution. We will
              attempt to resolve disputes within 30 days of notification.
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-xs text-gray-300">
              15.3 Arbitration
            </h3>
            <p>
              Any dispute arising from these Terms or your use of the Service
              shall be resolved through binding arbitration in Trinidad and
              Tobago, rather than in court, except that you may assert claims in
              small claims court if your claims qualify.
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-xs text-gray-300">
              15.4 Class Action Waiver
            </h3>
            <p>
              You agree to resolve disputes with us on an individual basis only.
              You waive any right to participate in class actions, class
              arbitrations, or representative proceedings.
            </p>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-sm text-white">
            16. Modifications to Terms
          </h2>
          <p>
            We reserve the right to modify these Terms at any time. Material
            changes will be communicated by posting updated Terms on our
            website, sending email notification to your registered address, and
            displaying an in-app notification upon your next login. Material
            changes take effect 30 days after posting. Changes required by law
            may take effect immediately. Continued use of the Service after
            changes become effective constitutes acceptance.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-sm text-white">
            17. General Provisions
          </h2>
          <div className="space-y-1">
            <h3 className="font-medium text-xs text-gray-300">
              17.1 Entire Agreement
            </h3>
            <p>
              These Terms, together with our Privacy Policy, constitute the
              entire agreement between you and Literead regarding the Service.
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-xs text-gray-300">
              17.2 Severability
            </h3>
            <p>
              If any provision of these Terms is found unenforceable, the
              remaining provisions continue in full force and effect.
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-xs text-gray-300">17.3 Waiver</h3>
            <p>
              Our failure to enforce any right or provision shall not constitute
              a waiver of that right or provision.
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-xs text-gray-300">
              17.4 Assignment
            </h3>
            <p>
              You may not assign or transfer these Terms or your account without
              our written consent. We may assign these Terms without
              restriction.
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-xs text-gray-300">
              17.5 Force Majeure
            </h3>
            <p>
              We shall not be liable for any failure or delay in performance due
              to circumstances beyond our reasonable control, including natural
              disasters, war, terrorism, pandemics, or government actions.
            </p>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-sm text-white">
            18. Contact Information
          </h2>
          <p>For questions about these Terms or account issues:</p>
          <p>
            Literead
            <br />
            Email: literead.ai@gmail.com
            <br />
            Website: www.literead.vercel.com
          </p>
          <p>
            We provide limited support on a best-effort basis. Response times
            are not guaranteed. Report technical issues with detailed
            information and screenshots where possible.
          </p>
        </section>

        <section className="space-y-2 border-t border-white/10 pt-4">
          <h2 className="font-semibold text-sm text-white">
            19. Acknowledgment
          </h2>
          <p className="uppercase text-xs">
            By clicking &ldquo;I agree,&rdquo; creating an account, or using the
            Service, you acknowledge that you have read, understood, and agree
            to be bound by these Terms of Service.
          </p>
        </section>
      </div>
    ),
  },

  {
    key: "privacy",
    title: "Privacy Policy",
    body: (
      <div className="space-y-6">
        <p className="text-xs text-gray-500">
          Effective Date: January 16, 2026 &nbsp;·&nbsp; Last Updated: January
          16, 2026
        </p>

        <section className="space-y-2">
          <h2 className="font-semibold text-sm text-white">1. Introduction</h2>
          <p>
            This Privacy Policy explains how Literead collects, uses, and
            protects your information. By creating an account or using the
            Service, you agree to this policy. If you do not agree, do not use
            the Service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-sm text-white">
            2. Information We Collect
          </h2>
          <div className="space-y-1">
            <h3 className="font-medium text-xs text-gray-300">
              2.1 Account Information
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Email address</li>
              <li>Encrypted password</li>
              <li>Grade level (Pre-K through Grade 12)</li>
              <li>Account creation and login timestamps</li>
            </ul>
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-xs text-gray-300">
              2.2 Voice and Session Data
            </h3>
            <p>
              Voice data is processed in real-time by our AI voice provider
              solely for comprehension analysis during your session. Voice
              recordings are not stored after session completion. We retain
              session history, duration, progress metrics, passage selections,
              and completion rates.
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-xs text-gray-300">
              2.3 Technical Data
            </h3>
            <p>
              We automatically collect IP address, browser and device type,
              operating system, and usage timestamps. This data is used for
              security, fraud prevention, and service maintenance.
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-xs text-gray-300">
              2.4 Payment Data
            </h3>
            <p>
              Payments are processed by a third-party payment processor. We do
              not store credit card or banking information. We receive only
              subscription status and transaction confirmation.
            </p>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-sm text-white">
            3. How We Use Your Information
          </h2>
          <p>We use your information to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Provide, maintain, and improve the Service</li>
            <li>Authenticate your account and verify identity</li>
            <li>Process payments and manage subscriptions</li>
            <li>Track reading progress and enforce session limits</li>
            <li>Improve AI coaching performance</li>
            <li>Detect and prevent fraud or abuse</li>
            <li>Comply with legal obligations</li>
            <li>Communicate about your account and Service updates</li>
          </ul>
          <p>We do not send marketing or promotional emails.</p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-sm text-white">
            4. How We Share Your Information
          </h2>
          <div className="space-y-1">
            <h3 className="font-medium text-xs text-gray-300">
              4.1 Service Providers
            </h3>
            <p>
              We use the following third-party providers to operate the Service.
              Each is contractually bound to protect your data and use it only
              to provide services to us:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Authentication and account management provider</li>
              <li>Payment processing and subscription billing provider</li>
              <li>
                AI voice technology and real-time speech processing provider
              </li>
              <li>Database storage and backend infrastructure provider</li>
              <li>Application monitoring and error tracking provider</li>
            </ul>
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-xs text-gray-300">
              4.2 Legal Requirements
            </h3>
            <p>
              We may disclose your information to comply with applicable law,
              respond to lawful requests from authorities, enforce our Terms of
              Service, protect our rights or safety, or investigate fraud.
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-xs text-gray-300">
              4.3 Business Transfers
            </h3>
            <p>
              In the event of a merger, acquisition, or asset sale, your
              information may be transferred. We will provide reasonable advance
              notice where practicable.
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-xs text-gray-300">
              4.4 No Sale of Data
            </h3>
            <p>
              We do not sell, rent, or trade your personal information to third
              parties for marketing purposes.
            </p>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-sm text-white">
            5. Data Retention
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Active accounts: Data retained for the duration of your active
              subscription
            </li>
            <li>Cancelled accounts: Data deleted 90 days after cancellation</li>
            <li>
              Voice recordings: Deleted immediately after real-time processing
            </li>
            <li>
              Legal holds: Data may be retained longer if required by applicable
              law
            </li>
          </ul>
          <p>
            You may request account deletion at any time by contacting
            literead.ai@gmail.com.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-sm text-white">6. Data Security</h2>
          <p>
            We implement reasonable technical and organizational security
            measures including encryption in transit and at rest, secure
            password hashing, and access controls. No method of transmission or
            storage is 100% secure, and we cannot guarantee absolute security.
            You are responsible for maintaining the confidentiality of your
            account credentials.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-sm text-white">
            7. Children&apos;s Privacy (COPPA Compliance)
          </h2>
          <p>
            Our Service is designed for students Pre-K through Grade 12,
            including children under 13. For U.S. users under 13, we comply with
            the Children&apos;s Online Privacy Protection Act (COPPA).
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Account registration for users under 13 requires verifiable
              parental consent
            </li>
            <li>
              Parents or legal guardians are responsible for monitoring their
              child&apos;s use of the Service
            </li>
            <li>
              We collect only the minimum information necessary to deliver the
              Service
            </li>
            <li>Voice data from minor users is not permanently stored</li>
          </ul>
          <p>
            Parental rights: Parents may review, correct, or request deletion of
            their child&apos;s data, or withdraw consent at any time by
            contacting literead.ai@gmail.com. We will respond within 30 days.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-sm text-white">8. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your account and associated data</li>
            <li>Withdraw consent and cancel your subscription</li>
            <li>Object to certain data processing activities</li>
          </ul>
          <p>
            To exercise any of these rights, email literead.ai@gmail.com. We
            will respond within 30 days.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-sm text-white">
            9. International Data Transfers
          </h2>
          <p>
            Your information may be transferred to and processed in countries
            outside Trinidad and Tobago by our third-party service providers. By
            using the Service, you consent to such transfers. Our providers
            implement appropriate safeguards for international data transfers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-sm text-white">
            10. Legal Basis for Processing (GDPR — EU/EEA Users)
          </h2>
          <p>
            If you are located in the EU or EEA, our lawful bases for processing
            your personal data are:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Contract performance — to provide the Service you have subscribed
              to
            </li>
            <li>Legal obligation — to comply with applicable law</li>
            <li>
              Legitimate interests — fraud prevention, security, and service
              improvement
            </li>
            <li>
              Consent — where explicitly provided (e.g., for optional features)
            </li>
          </ul>
          <p>
            EU/EEA users have the right to access, rectify, erase, restrict
            processing of, and port their data, and to object to processing. You
            may lodge a complaint with your local supervisory authority.
            Contact: literead.ai@gmail.com.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-sm text-white">
            11. California Residents (CCPA)
          </h2>
          <p>
            California residents have the right to know what personal
            information we collect, request deletion, and opt out of sale. We do
            not sell your personal information. To exercise your rights, contact
            literead.ai@gmail.com.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-sm text-white">12. Cookies</h2>
          <p>
            We use cookies for authentication and session management, security
            and fraud prevention, and service functionality. You may control
            cookies through your browser settings, but disabling certain cookies
            may limit Service functionality.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-sm text-white">
            13. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy at any time. Material changes will
            be communicated via email notification, in-app notification, or a
            posted update on our website at least 30 days before taking effect.
            Continued use of the Service after that period constitutes
            acceptance of the updated policy.
          </p>
        </section>

        <section className="space-y-2 border-t border-white/10 pt-4">
          <h2 className="font-semibold text-sm text-white">Acknowledgment</h2>
          <p className="uppercase text-xs">
            By creating an account or using the Service, you acknowledge that
            you have read, understood, and agree to this Privacy Policy.
          </p>
        </section>
      </div>
    ),
  },

  {
    key: "refund",
    title: "Refund Policy",
    body: (
      <div className="space-y-6">
        <p className="text-xs text-gray-500">
          Effective Date: January 16, 2026 &nbsp;·&nbsp; Last Updated: January
          16, 2026
        </p>

        <section className="space-y-3">
          <h2 className="font-semibold text-sm text-white">
            1. Subscription Plans
          </h2>
          <p>
            Literead is offered on three monthly subscription plans. Each plan
            includes a fixed number of AI coaching sessions per billing month.
            Each session runs for a maximum of 5 minutes.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 pr-4 text-gray-400 font-medium">
                    Plan
                  </th>
                  <th className="text-left py-2 pr-4 text-gray-400 font-medium">
                    Sessions / Month
                  </th>
                  <th className="text-left py-2 pr-4 text-gray-400 font-medium">
                    Session Length
                  </th>
                  <th className="text-left py-2 text-gray-400 font-medium">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">Basic</td>
                  <td className="py-2 pr-4">12</td>
                  <td className="py-2 pr-4">5 minutes</td>
                  <td className="py-2">$20.00 USD</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">Core</td>
                  <td className="py-2 pr-4">20</td>
                  <td className="py-2 pr-4">5 minutes</td>
                  <td className="py-2">$30.00 USD</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Pro</td>
                  <td className="py-2 pr-4">30</td>
                  <td className="py-2 pr-4">5 minutes</td>
                  <td className="py-2">$50.00 USD</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Sessions do not roll over. Any unused sessions at the end of your
            billing period expire. Your subscription renews automatically each
            month unless cancelled.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-sm text-white">2. No Refunds</h2>
          <p>All subscription fees are non-refundable. No exceptions.</p>
          <p>
            You are charged in advance for your billing month. The fee covers
            access to your plan&apos;s full session allocation for that period,
            regardless of how many sessions you actually use. There are no
            partial refunds, no prorated credits, and no refunds for unused
            sessions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-sm text-white">3. Cancellation</h2>
          <p>
            You may cancel at any time through your account settings. When you
            cancel:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>You will not be charged again</li>
            <li>
              You retain access to any remaining sessions in your current
              billing period
            </li>
            <li>No refund is issued for the current period</li>
            <li>Remaining sessions expire when the billing period ends</li>
          </ul>
          <p>
            Cancellation stops future billing. It does not reverse a charge
            already made.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-sm text-white">
            4. Chargebacks and Disputes
          </h2>
          <p>
            Filing a chargeback or payment dispute with your bank for a
            legitimate subscription charge is a violation of our Terms of
            Service. We reserve the right to suspend or permanently terminate
            accounts where fraudulent chargebacks are filed. If you have a
            billing concern, contact literead.ai@gmail.com before involving your
            payment provider.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-sm text-white">
            5. Billing Errors
          </h2>
          <p>
            If you were charged an incorrect amount or charged after a confirmed
            cancellation, contact literead.ai@gmail.com with your transaction
            details. We will investigate and correct any confirmed error within
            30 days.
          </p>
          <p>
            Not using your sessions, changing your mind, or dissatisfaction with
            the Service does not constitute a billing error.
          </p>
        </section>

        <section className="space-y-2 border-t border-white/10 pt-4">
          <h2 className="font-semibold text-sm text-white">Acknowledgment</h2>
          <p className="uppercase text-xs">
            By subscribing to Literead, you acknowledge that you have read and
            understood this Refund Policy and agree that all subscription fees
            are non-refundable except in the case of a verified billing error.
          </p>
        </section>
      </div>
    ),
  },
];
