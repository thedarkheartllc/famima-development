import { AppHeader } from "../components/AppHeader";
import { Footer } from "../components/Footer";

export default function PrivacyPage() {
  return (
    <div className='bg-white min-h-screen'>
      <AppHeader showSignIn fixed />

      <main className='pt-32 pb-20 px-6'>
        <div className='max-w-4xl mx-auto space-y-12'>
          <div className='text-center space-y-4'>
            <h1 className='text-5xl md:text-6xl font-light text-gray-900'>
              Privacy Policy
            </h1>
            <p className='text-lg text-gray-600'>
              Last updated: October 1, 2025
            </p>
          </div>

          <div className='bg-green-50/50 rounded-2xl p-8 text-center space-y-3'>
            <div className='text-4xl'>🔒</div>
            <h2 className='text-2xl font-light text-gray-900'>
              Privacy First, Always
            </h2>
            <p className='text-gray-700'>
              Your photos belong to you. Not to advertisers. Not to data
              brokers. Just you.
            </p>
          </div>

          <div className='space-y-8 text-gray-700 leading-relaxed'>
            <section className='space-y-4'>
              <h2 className='text-2xl font-light text-gray-900'>
                1. What We Collect
              </h2>
              <p>We collect only what&apos;s necessary to run the service:</p>
              <ul className='list-disc pl-6 space-y-2'>
                <li>
                  <strong>Account information:</strong> Email address, name, and
                  password (encrypted)
                </li>
                <li>
                  <strong>Photos:</strong> Images you upload and basic metadata
                  (upload date, file name)
                </li>
                <li>
                  <strong>Usage data:</strong> Basic analytics to improve the
                  service (not tied to your identity)
                </li>
              </ul>
              <p className='pt-2'>
                That&apos;s it. No tracking pixels. No behavioral profiling. No
                third-party analytics harvesters.
              </p>
            </section>

            <section className='space-y-4'>
              <h2 className='text-2xl font-light text-gray-900'>
                2. How We Use Your Data
              </h2>
              <p>We use your information to:</p>
              <ul className='list-disc pl-6 space-y-2'>
                <li>Store and display your photos to you and your family</li>
                <li>Send you important service updates (sparingly)</li>
                <li>Improve Famima based on how it&apos;s used</li>
                <li>Provide customer support when needed</li>
              </ul>
              <p className='pt-4 font-light text-lg'>
                <strong>We will never:</strong>
              </p>
              <ul className='list-disc pl-6 space-y-2'>
                <li>Sell your data to anyone</li>
                <li>Show you targeted advertisements</li>
                <li>Use your photos for AI training or facial recognition</li>
                <li>Share your content with third parties for marketing</li>
                <li>Build a profile of you to manipulate your behavior</li>
              </ul>
            </section>

            <section className='space-y-4'>
              <h2 className='text-2xl font-light text-gray-900'>
                3. Who Can See Your Photos
              </h2>
              <p>
                Only people you choose to share with can see your photos. We
                don&apos;t have a public feed, discovery page, or recommendation
                engine.
              </p>
              <p>
                Your photos are private by default. You control who has access.
              </p>
            </section>

            <section className='space-y-4'>
              <h2 className='text-2xl font-light text-gray-900'>
                4. How We Protect Your Data
              </h2>
              <ul className='list-disc pl-6 space-y-2'>
                <li>All data is encrypted in transit (HTTPS)</li>
                <li>
                  Passwords are securely hashed and never stored in plain text
                </li>
                <li>
                  Photos are stored in secure cloud storage with access controls
                </li>
                <li>We use industry-standard security practices</li>
                <li>Regular security audits and updates</li>
              </ul>
              <p className='pt-2'>
                While we take security seriously, no system is perfect. We
                recommend keeping backups of important photos.
              </p>
            </section>

            <section className='space-y-4'>
              <h2 className='text-2xl font-light text-gray-900'>
                5. Third-Party Services
              </h2>
              <p>We use a minimal set of trusted services to run Famima:</p>
              <ul className='list-disc pl-6 space-y-2'>
                <li>
                  <strong>Firebase:</strong> For authentication and secure cloud
                  storage
                </li>
                <li>
                  <strong>Vercel:</strong> For hosting the application
                </li>
              </ul>
              <p className='pt-2'>
                These services have their own privacy policies. We chose them
                because they align with our privacy-first values.
              </p>
            </section>

            <section className='space-y-4'>
              <h2 className='text-2xl font-light text-gray-900'>
                6. Your Rights
              </h2>
              <p>You have complete control over your data:</p>
              <ul className='list-disc pl-6 space-y-2'>
                <li>
                  <strong>Access:</strong> View all your data at any time
                </li>
                <li>
                  <strong>Delete:</strong> Remove individual photos or your
                  entire account
                </li>
                <li>
                  <strong>Export:</strong> Download your photos whenever you
                  want
                </li>
                <li>
                  <strong>Correct:</strong> Update your account information
                </li>
              </ul>
            </section>

            <section className='space-y-4'>
              <h2 className='text-2xl font-light text-gray-900'>
                7. Data Retention
              </h2>
              <p>
                We keep your data only as long as you want us to. When you
                delete photos or your account, we remove them from our systems
                within 30 days.
              </p>
              <p>
                Backups may retain deleted data for up to 90 days for disaster
                recovery purposes.
              </p>
            </section>

            <section className='space-y-4'>
              <h2 className='text-2xl font-light text-gray-900'>
                8. Children&apos;s Privacy
              </h2>
              <p>
                Famima is a family service, but users must be 13 or older to
                create an account. If you&apos;re sharing photos of children,
                you&apos;re responsible for ensuring you have the right to do
                so.
              </p>
            </section>

            <section className='space-y-4'>
              <h2 className='text-2xl font-light text-gray-900'>
                9. Cookies and Tracking
              </h2>
              <p>
                We use minimal cookies necessary for the site to function
                (authentication, preferences). We don&apos;t use tracking
                cookies or third-party advertising cookies.
              </p>
            </section>

            <section className='space-y-4'>
              <h2 className='text-2xl font-light text-gray-900'>
                10. Changes to This Policy
              </h2>
              <p>
                If we update this policy, we&apos;ll notify you via email and
                post the new version here. We&apos;ll never make changes that
                compromise your privacy without your consent.
              </p>
            </section>

            <section className='space-y-4'>
              <h2 className='text-2xl font-light text-gray-900'>
                11. Contact Us
              </h2>
              <p>
                Questions about privacy? Concerns about your data? We&apos;re
                here to help.
              </p>
              <p>Email us at: privacy@famima.com</p>
            </section>

            <div className='pt-8 border-t border-gray-200 text-center space-y-4'>
              <p className='text-xl text-gray-800 font-light'>
                Our Promise to You
              </p>
              <p className='text-gray-600 max-w-2xl mx-auto'>
                Famima exists to give you a peaceful place to share memories
                with loved ones. We make money from subscriptions, not from your
                data. Your privacy isn&apos;t a feature—it&apos;s our
                foundation.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
