"use client";

export default function TermsSection() {
  return (
    <>
      <section className='section-padding'>
        <div className='container custom-container mx-auto'>
          <div className='bg-[#FAF9F8] rounded-[20px] px-[24px] py-[60px] lg:px-[70px] lg:py-[70px]'>
            <div className='space-y-[50px]'>
              {/* INTRODUCTION */}
              <div>
                <h1 className='text-[26px] md:text-3xl font-semibold mb-12'>
                  Privacy Policy
                </h1>

                <article className='space-y-8'>
                  <div>
                    <h3 className='text-[20px] md:text-2xl font-semibold mb-4 text-[#0D060C]'>
                      <span className='text-[#D6866B]'>1.</span> Introduction
                    </h3>

                    <p className='text-[#3A3D42] text-[16px] md:text-[18px]'>
                      Nora Health values your privacy and is committed to
                      protecting your personal and health-related information.
                      This Privacy Policy explains how we collect, use, store,
                      and safeguard your data in compliance with the UK General
                      Data Protection Regulation (UK GDPR) and applicable data
                      protection laws.
                    </p>
                  </div>

                  {/* INFORMATION WE COLLECT */}
                  <div>
                    <h3 className='text-[20px] md:text-2xl font-semibold mb-4 text-[#0D060C]'>
                      <span className='text-[#D6866B]'>2.</span> Information We
                      Collect
                    </h3>
                    <p className='pb-5 text-[#3A3D42] text-[16px] md:text-[20px]'>
                      We may collect:{" "}
                    </p>

                    <ul className='list-none pl-6 space-y-4 text-[#3A3D42] text-[16px] md:text-[18px]'>
                      <li className='flex items-start gap-2'>
                        <img src='/tick-circle.svg' className='w-5 h-5 mt-1' />
                        <span>
                          <strong>Personal Identification:</strong> Name, date
                          of birth, address, phone number, and email address.
                        </span>
                      </li>
                      <li className='flex items-start gap-2'>
                        <img src='/tick-circle.svg' className='w-5 h-5 mt-1' />
                        <span>
                          <strong>Health Information:</strong> Medical history,
                          prescriptions, treatment details, and questionnaire
                          responses.
                        </span>
                      </li>
                      <li className='flex items-start gap-2'>
                        <img src='/tick-circle.svg' className='w-5 h-5 mt-1' />
                        <span>
                          <strong>Technical Data:</strong> IP address, browser
                          type, device information, and website usage analytics.
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* HOW WE USE DATA */}
                  <div>
                    <h3 className='text-[20px] md:text-2xl font-semibold mb-4 text-[#0D060C]'>
                      <span className='text-[#D6866B]'>3.</span> How We Use Your
                      Information
                    </h3>

                    <ul className='list-none pl-6 space-y-4 text-[#3A3D42] text-[16px] md:text-[18px]'>
                      <li className='flex items-start gap-2'>
                        <img src='/tick-circle.svg' className='w-5 h-5 mt-1' />
                        <span>
                          To provide healthcare services and manage patient
                          records.
                        </span>
                      </li>
                      <li className='flex items-start gap-2'>
                        <img src='/tick-circle.svg' className='w-5 h-5 mt-1' />
                        <span>
                          To communicate with you regarding appointments,
                          prescriptions, and health-related updates.
                        </span>
                      </li>
                      <li className='flex items-start gap-2'>
                        <img src='/tick-circle.svg' className='w-5 h-5 mt-1' />
                        <span>
                          To comply with legal, regulatory, and professional
                          obligations.
                        </span>
                      </li>
                      <li className='flex items-start gap-2'>
                        <img src='/tick-circle.svg' className='w-5 h-5 mt-1' />
                        <span>
                          To comply with legal, regulatory, and professional
                          obligations.
                        </span>
                      </li>
                      <li className='flex items-start gap-2'>
                        <img src='/tick-circle.svg' className='w-5 h-5 mt-1' />
                        <span>
                          To improve our website, services, and patient
                          experience.
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* COOKIES */}
                  <div>
                    <h3 className='text-[20px] md:text-2xl font-semibold mb-4 text-[#0D060C]'>
                      <span className='text-[#D6866B]'>4.</span> Cookies and
                      Tracking
                    </h3>

                    <p className='text-[#3A3D42] text-[16px] md:text-[20px] mb-4'>
                      Our website uses cookies and similar technologies to:
                    </p>

                    <ul className='list-none pl-6 space-y-4 text-[#3A3D42] text-[16px] md:text-[18px]'>
                      <li className='flex items-start gap-2'>
                        <img src='/tick-circle.svg' className='w-5 h-5 mt-1' />
                        <span>
                          <strong>User Experience:</strong> Remembering
                          preferences and settings.
                        </span>
                      </li>
                      <li className='flex items-start gap-2'>
                        <img src='/tick-circle.svg' className='w-5 h-5 mt-1' />
                        <span>
                          <strong>Analytics:</strong> Understanding website
                          traffic and usage patterns.
                        </span>
                      </li>
                    </ul>

                    <p className='text-[#3A3D42] text-[16px] md:text-[18px] mt-4'>
                      You can manage or disable cookies through your browser
                      settings. Please note that disabling cookies may affect
                      site functionality.
                    </p>
                  </div>

                  {/* DATA SHARING */}
                  <div>
                    <h3 className='text-[20px] md:text-2xl font-semibold mb-4 text-[#0D060C]'>
                      <span className='text-[#D6866B]'>5.</span> Data Sharing
                    </h3>

                    <p className='text-[#3A3D42] text-[16px] md:text-[20px] mb-4'>
                      We do not sell patient data. We may share information
                      only:
                    </p>

                    <ul className='list-none pl-6 space-y-4 text-[#3A3D42] text-[16px] md:text-[18px]'>
                      <li className='flex items-start gap-2'>
                        <img src='/tick-circle.svg' className='w-5 h-5 mt-1' />
                        <span>
                          With healthcare professionals involved in your care.
                        </span>
                      </li>
                      <li className='flex items-start gap-2'>
                        <img src='/tick-circle.svg' className='w-5 h-5 mt-1' />
                        <span>
                          With authorised third-party service providers
                          operating under strict confidentiality agreements.
                        </span>
                      </li>
                      <li className='flex items-start gap-2'>
                        <img src='/tick-circle.svg' className='w-5 h-5 mt-1' />
                        <span>
                          When required by law or for public health and
                          regulatory purposes.
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* DATA SECURITY */}
                  <div>
                    <h3 className='text-[20px] md:text-2xl font-semibold mb-4 text-[#0D060C]'>
                      <span className='text-[#D6866B]'>6.</span> Data Security
                    </h3>

                    <p className='text-[#3A3D42] text-[16px] md:text-[20px] mb-4'>
                      We implement:
                    </p>

                    <ul className='list-none pl-6 space-y-4 text-[#3A3D42] text-[16px] md:text-[18px]'>
                      <li className='flex items-start gap-2'>
                        <img src='/tick-circle.svg' className='w-5 h-5 mt-1' />
                        <span>
                          <strong>Encryption:</strong> Data is encrypted both in
                          transit and at rest.
                        </span>
                      </li>
                      <li className='flex items-start gap-2'>
                        <img src='/tick-circle.svg' className='w-5 h-5 mt-1' />
                        <strong>Access Controls:</strong> Role-based access is
                        applied to ensure only authorised staff can access
                        patient information.
                      </li>
                    </ul>
                  </div>

                  {/* USER RIGHTS */}
                  <div>
                    <h3 className='text-[20px] md:text-2xl font-semibold mb-4 text-[#0D060C]'>
                      <span className='text-[#D6866B]'>7.</span> Your Rights
                    </h3>
                    <p className='text-[#3A3D42] text-[16px] md:text-[20px] mb-4'>
                      Patients have the right to:
                    </p>
                    <ul className='list-none pl-6 space-y-4 text-[#3A3D42] text-[16px] md:text-[18px]'>
                      <li className='flex items-start gap-2'>
                        <img src='/tick-circle.svg' className='w-5 h-5 mt-1' />
                        <span>Access your personal data.</span>
                      </li>
                      <li className='flex items-start gap-2'>
                        <img src='/tick-circle.svg' className='w-5 h-5 mt-1' />
                        <span>
                          Request corrections or deletion of your data.
                        </span>
                      </li>
                      <li className='flex items-start gap-2'>
                        <img src='/tick-circle.svg' className='w-5 h-5 mt-1' />
                        <span>Withdraw consent for data processing.</span>
                      </li>

                      <li className='flex items-start gap-2'>
                        <img src='/tick-circle.svg' className='w-5 h-5 mt-1' />
                        <span>
                          File complaints with regulatory authorities.
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* DATA RETENTION */}
                  <div>
                    <h3 className='text-[20px] md:text-2xl font-semibold mb-4 text-[#0D060C]'>
                      <span className='text-[#D6866B]'>8.</span> Data Retention
                    </h3>

                    <p className='text-[#3A3D42] text-[16px] md:text-[18px]'>
                      We retain patient data only as long as necessary for
                      medical and legal purposes, after which it is securely
                      deleted.
                    </p>
                  </div>

                  {/* CONTACT */}
                  <div>
                    <h3 className='text-[20px] md:text-2xl font-semibold mb-4 text-[#0D060C]'>
                      <span className='text-[#D6866B]'>9.</span> Contact Us
                    </h3>

                    <p className='text-[#3A3D42] text-[16px] md:text-[18px]'>
                      If you have any questions or concerns about this Privacy
                      Policy, please contact Nora Health at:
                    </p>

                    <p className='text-[#3A3D42] text-[16px] md:text-[18px] mt-2'>
                      Phone: 0208 679 7198
                      <br />
                      Email: pharmacy.fap80@nhs.net
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
