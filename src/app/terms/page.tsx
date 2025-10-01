import { AppHeader } from "../components/AppHeader";
import { Footer } from "../components/Footer";

export default function TermsPage() {
  return (
    <div className='bg-white  min-h-screen'>
      <AppHeader showSignIn fixed />

      <main className='pt-32 pb-20 px-6'>
        <div className='max-w-4xl mx-auto space-y-12'>
          <div className='text-center space-y-4'>
            <h1 className='text-5xl md:text-6xl font-light text-gray-900 '>
              Terms & Conditions
            </h1>
            <p className='text-lg text-gray-600 '>
              Last updated: October 1, 2025
            </p>
          </div>

          <div className='space-y-8 text-gray-700  leading-relaxed'>
            <section className='space-y-4'>
              <h2 className='text-2xl font-light text-gray-900 '>
                1. What Famima Is
              </h2>
              <p>
                Famima is a private photo-sharing platform for families and
                close friends. We&apos;re not social media. We don&apos;t sell
                ads. We don&apos;t manipulate your feed. We simply provide a
                peaceful space to share and view photos with the people who
                matter most.
              </p>
            </section>

            <section className='space-y-4'>
              <h2 className='text-2xl font-light text-gray-900 '>
                2. Acceptable Use
              </h2>
              <p>By using Famima, you agree to:</p>
              <ul className='list-disc pl-6 space-y-2'>
                <li>Only upload content you own or have permission to share</li>
                <li>
                  Keep content appropriate for all ages (no NSFW material)
                </li>
                <li>Respect the privacy of others in your photos</li>
                <li>Not use Famima for commercial purposes or spam</li>
                <li>
                  Not upload content that is hateful, violent, or promotes
                  illegal activity
                </li>
              </ul>
            </section>

            <section className='space-y-4'>
              <h2 className='text-2xl font-light text-gray-900 '>
                3. Your Content
              </h2>
              <p>
                You retain full ownership of all photos and content you upload.
                We don&apos;t claim any rights to your photos. We store them
                solely to provide the service to you and your family.
              </p>
              <p>
                You can delete your photos at any time, and we&apos;ll remove
                them from our systems.
              </p>
            </section>

            <section className='space-y-4'>
              <h2 className='text-2xl font-light text-gray-900 '>
                4. What We Don&apos;t Do
              </h2>
              <ul className='list-disc pl-6 space-y-2'>
                <li>We don&apos;t sell your data</li>
                <li>We don&apos;t show you advertisements</li>
                <li>We don&apos;t use your photos to train AI models</li>
                <li>We don&apos;t share your content with third parties</li>
                <li>
                  We don&apos;t use algorithms designed to keep you scrolling
                </li>
              </ul>
            </section>

            <section className='space-y-4'>
              <h2 className='text-2xl font-light text-gray-900 '>
                5. Account Security
              </h2>
              <p>
                You&apos;re responsible for keeping your account secure. Use a
                strong password and don&apos;t share your login credentials. Let
                us know immediately if you suspect unauthorized access.
              </p>
            </section>

            <section className='space-y-4'>
              <h2 className='text-2xl font-light text-gray-900 '>
                6. Service Availability
              </h2>
              <p>
                We work hard to keep Famima running smoothly, but we can&apos;t
                guarantee 100% uptime. We may occasionally need to perform
                maintenance or updates.
              </p>
            </section>

            <section className='space-y-4'>
              <h2 className='text-2xl font-light text-gray-900 '>
                7. Termination
              </h2>
              <p>
                You can delete your account at any time. We may suspend or
                terminate accounts that violate these terms, particularly those
                posting inappropriate content or abusing the service.
              </p>
            </section>

            <section className='space-y-4'>
              <h2 className='text-2xl font-light text-gray-900 '>
                8. Changes to Terms
              </h2>
              <p>
                We may update these terms occasionally. If we make significant
                changes, we&apos;ll notify you. Continued use of Famima means
                you accept the updated terms.
              </p>
            </section>

            <section className='space-y-4'>
              <h2 className='text-2xl font-light text-gray-900 '>
                9. Limitation of Liability
              </h2>
              <p>
                Famima is provided &quot;as is&quot;. While we take care to
                protect your photos, we recommend keeping backups of important
                images. We&apos;re not liable for any loss of data or damages
                arising from use of the service.
              </p>
            </section>

            <section className='space-y-4'>
              <h2 className='text-2xl font-light text-gray-900 '>
                10. Contact Us
              </h2>
              <p>
                Questions about these terms? We&apos;re here to help. Reach out
                to us at support@famima.com
              </p>
            </section>

            <div className='pt-8 border-t border-gray-200 text-center'>
              <p className='text-gray-600  font-light'>
                These terms reflect our commitment to keeping Famima simple,
                safe, and respectful of your privacy.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
