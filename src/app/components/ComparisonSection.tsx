export function ComparisonSection() {
  return (
    <section className='py-20 px-6 bg-gradient-to-b from-white to-green-50/20'>
      <div className='max-w-6xl mx-auto'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-light text-gray-900 mb-4'>
            📸 Famima vs. Instagram
          </h2>
        </div>

        <div className='bg-white rounded-3xl shadow-lg overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-green-50'>
                <tr>
                  <th className='px-6 py-4 text-left text-lg font-medium text-gray-900 w-1/2'>
                    Famima
                  </th>
                  <th className='px-6 py-4 text-left text-lg font-medium text-gray-900 w-1/2'>
                    Instagram
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-100'>
                <tr>
                  <td className='px-6 py-4 text-gray-600'>
                    Calm, minimalist grid built for peace of mind
                  </td>
                  <td className='px-6 py-4 text-gray-600'>
                    Addictive feed designed to keep you scrolling
                  </td>
                </tr>
                <tr className='bg-green-50/30'>
                  <td className='px-6 py-4 text-gray-600'>
                    No ads. No algorithms. Ever.
                  </td>
                  <td className='px-6 py-4 text-gray-600'>
                    Ads, sponsored posts, algorithms
                  </td>
                </tr>
                <tr>
                  <td className='px-6 py-4 text-gray-600'>
                    100% private, family-only space
                  </td>
                  <td className='px-6 py-4 text-gray-600'>
                    NSFW content, strangers, bots
                  </td>
                </tr>
                <tr className='bg-green-50/30'>
                  <td className='px-6 py-4 text-gray-600'>
                    No followers. No likes. No social pressure.
                  </td>
                  <td className='px-6 py-4 text-gray-600'>
                    Follower counts, likes, comments, clout chasing
                  </td>
                </tr>
                <tr>
                  <td className='px-6 py-4 text-gray-600'>
                    Owned by you. Your data stays in your hands.
                  </td>
                  <td className='px-6 py-4 text-gray-600'>
                    Owned by a giant corporation that mines your data
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className='text-center mt-12'>
          <h3 className='text-2xl md:text-3xl font-light text-gray-900 mb-4'>
            🖤 Why choose Famima?
          </h3>
          <p className='text-lg text-gray-600'>
            Because family memories deserve better than an algorithm.
          </p>
        </div>
      </div>
    </section>
  );
}
