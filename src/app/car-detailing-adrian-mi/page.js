import Link from 'next/link';

export const metadata = {
  title:
    'Car Detailing Adrian MI | Auto Wash & Window Tinting Near Me - Clean King',
  description:
    'Professional car detailing in Adrian, MI from $35-$160. Interior/exterior detailing, clay bar, wax, buff, window tinting. Serving Adrian, Lenawee County. Call (517) 682-1919.',
  keywords:
    'car detailing Adrian MI, car wash Adrian Michigan, auto detailing Adrian, window tinting Adrian MI, clay bar Adrian, car wax Adrian, car buff Adrian, mobile car wash Adrian, best car detailing Adrian',
  openGraph: {
    title: 'Car Detailing Adrian MI - Clean King Detailing Services',
    description:
      'Professional car wash, detailing & window tinting in Adrian, MI. Clay bar, wax, buff services from $35-$160.',
    url: 'https://cleankingdetail.com/car-detailing-adrian-mi',
  },
  alternates: {
    canonical: 'https://cleankingdetail.com/car-detailing-adrian-mi',
  },
};

export default function CarDetailingAdrianMI() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-customRed to-pink-800 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">
              Professional Car Detailing in Adrian, MI
            </h1>
            <p className="mb-8 text-xl md:text-2xl">
              Expert Auto Wash, Detailing & Window Tinting Services from
              $35-$160
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/appointment"
                className="rounded-lg bg-yellow-500 px-8 py-3 font-bold text-black transition duration-300 hover:bg-yellow-600"
              >
                Book Appointment
              </Link>
              <a
                href="tel:5176821919"
                className="rounded-lg border-2 border-white bg-transparent px-8 py-3 font-bold text-white transition duration-300 hover:bg-white hover:text-blue-900"
              >
                Call (517) 682-1919
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Location Info */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-gray-900">
                Serving Adrian, Tecumseh, Lenawee & Surrounding Areas
              </h2>
              <p className="text-lg text-gray-700">
                Clean King Detailing proudly serves Adrian, Michigan and the
                entire Lenawee County area. Located just minutes away in
                Blissfield, we bring professional car wash, auto detailing, and
                window tinting services directly to Adrian, Tecumseh, and
                Lenawee County residents and businesses.
              </p>
            </div>
            <div className="rounded-lg bg-gray-100 p-6">
              <h3 className="mb-4 text-xl font-bold">Visit Us Today</h3>
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>Clean King Detailing</strong>
                </p>
                <p>610 W Adrian St</p>
                <p>Blissfield, MI 49228</p>
                <p className="font-semibold text-blue-600">(517) 682-1919</p>
                <p className="mt-3 text-sm text-gray-600">
                  Just 15 minutes from Adrian via US-223
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Car Detailing Services for Adrian, MI
            </h2>
            <p className="text-xl text-gray-600">
              Professional auto care services tailored for Adrian vehicle owners
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Spiffy Detail */}
            <div className="rounded-lg bg-white p-6 text-center shadow-lg">
              <div className="mb-4 text-4xl">🚗</div>
              <h3 className="mb-2 text-xl font-bold">Spiffy Detail</h3>
              <p className="mb-3 text-3xl font-bold text-blue-600">$35</p>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>Interior vacuum</li>
                <li>Exterior wash</li>
                <li>Windows cleaned</li>
                <li>Quick & affordable</li>
              </ul>
            </div>

            {/* Interior Detail */}
            <div className="rounded-lg bg-white p-6 text-center shadow-lg">
              <div className="mb-4 text-4xl">🧽</div>
              <h3 className="mb-2 text-xl font-bold">Interior Detail</h3>
              <p className="mb-3 text-3xl font-bold text-blue-600">$110</p>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>Deep interior cleaning</li>
                <li>Seat & carpet cleaning</li>
                <li>Dashboard detailing</li>
                <li>Leather treatment</li>
              </ul>
            </div>

            {/* Full Detail */}
            <div className="rounded-lg border-2 border-yellow-400 bg-white p-6 text-center shadow-lg">
              <div className="mb-4 text-4xl">⭐</div>
              <h3 className="mb-2 text-xl font-bold">Full Detail</h3>
              <p className="mb-3 text-3xl font-bold text-blue-600">$140</p>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>Complete interior detail</li>
                <li>Exterior wash & wax</li>
                <li>Clay bar treatment</li>
                <li>Most popular!</li>
              </ul>
            </div>

            {/* Deluxe Detail */}
            <div className="rounded-lg bg-white p-6 text-center shadow-lg">
              <div className="mb-4 text-4xl">💎</div>
              <h3 className="mb-2 text-xl font-bold">Deluxe Detail</h3>
              <p className="mb-3 text-3xl font-bold text-blue-600">$160</p>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>Premium full detail</li>
                <li>Engine bay cleaning</li>
                <li>Paint correction</li>
                <li>Ultimate protection</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Services */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Comprehensive Auto Care Services in Adrian
          </h2>

          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h3 className="mb-6 text-2xl font-bold text-blue-900">
                Car Wash & Exterior Services
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="mb-2 text-lg font-semibold">
                    Professional Car Wash
                  </h4>
                  <p className="text-gray-600">
                    {`Hand wash and foam treatment to safely clean your vehicle's
                    exterior, removing dirt, grime, and road salt common on
                    Adrian area roads.`}
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 text-lg font-semibold">
                    Clay Bar Treatment
                  </h4>
                  <p className="text-gray-600">
                    {`Remove embedded contaminants from your paint surface that
                    regular washing can't eliminate, leaving your car's paint
                    smooth and ready for wax protection.`}
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 text-lg font-semibold">
                    Wax & Buff Services
                  </h4>
                  <p className="text-gray-600">
                    {`Professional waxing and buffing to protect your paint from
                    Michigan's harsh weather conditions while restoring that
                    showroom shine.`}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-6 text-2xl font-bold text-blue-900">
                Interior & Specialty Services
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="mb-2 text-lg font-semibold">
                    Interior Detailing
                  </h4>
                  <p className="text-gray-600">
                    {`Deep cleaning of seats, carpets, dashboard, and all interior
                    surfaces. Perfect for removing winter salt stains and
                    keeping your Adrian vehicle fresh.`}
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 text-lg font-semibold">Window Tinting</h4>
                  <p className="text-gray-600">
                    {`Professional ceramic window tint installation to reduce
                    heat, glare, and UV rays. Especially beneficial for Adrian's
                    sunny summer days and winter glare.`}
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 text-lg font-semibold">
                    Engine Bay Cleaning
                  </h4>
                  <p className="text-gray-600">
                    {`Thorough cleaning and degreasing of your engine bay, helping
                    maintain your vehicle's performance and resale value.`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-blue-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Why Adrian Residents Choose Clean King Detailing
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-blue-600 text-2xl text-white">
                🏆
              </div>
              <h3 className="mb-3 text-xl font-bold">Local Expertise</h3>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-blue-600 text-2xl text-white">
                💰
              </div>
              <h3 className="mb-3 text-xl font-bold">Transparent Pricing</h3>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-blue-600 text-2xl text-white">
                ⭐
              </div>
              <h3 className="mb-3 text-xl font-bold">5-Star Service</h3>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            Ready to Detail Your Vehicle in Adrian?
          </h2>
          <p className="mb-8 text-xl text-blue-100">
            Book your appointment today or call for a custom quote
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/appointment"
              className="rounded-lg bg-yellow-500 px-8 py-4 text-lg font-bold text-black transition duration-300 hover:bg-yellow-600"
            >
              Schedule Online
            </Link>
            <a
              href="tel:5176821919"
              className="rounded-lg border-2 border-white bg-transparent px-8 py-4 text-lg font-bold text-white transition duration-300 hover:bg-white hover:text-blue-900"
            >
              Call (517) 682-1919
            </a>
          </div>

          <div className="mt-12 border-t border-blue-700 pt-8">
            <h3 className="mb-4 text-lg font-semibold">
              Serving These Adrian Area Communities:
            </h3>
            <div className="flex flex-wrap justify-center gap-4 text-blue-200">
              <span>Adrian, MI</span>
              <span>•</span>
              <span>Blissfield, MI</span>
              <span>•</span>
              <span>Tecumseh, MI</span>
              <span>•</span>
              <span>Monroe, MI</span>
              <span>•</span>
              <span>Lenawee County</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
