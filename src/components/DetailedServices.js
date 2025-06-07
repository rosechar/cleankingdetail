export const DetailedServices = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Professional Car Detailing Services
          </h2>
          <p className="text-xl text-gray-600">
            Premium auto care packages designed for every vehicle and budget
          </p>
        </div>
        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-12 text-center text-3xl font-bold">
              Comprehensive Auto Care Services
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
                      {`Hand wash and foam treatment to safely clean your
                      vehicle's exterior, removing dirt, grime, and road salt
                      that accumulates from daily driving.`}
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
                      Professional waxing and buffing to protect your paint from
                      harsh weather conditions while restoring that showroom
                      shine.
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
                      Deep cleaning of seats, carpets, dashboard, and all
                      interior surfaces. Perfect for removing stains and keeping
                      your vehicle fresh and comfortable.
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-2 text-lg font-semibold">
                      Window Tinting
                    </h4>
                    <p className="text-gray-600">
                      Professional ceramic window tint installation to reduce
                      heat, glare, and UV rays. Enhances comfort and protects
                      your interior from sun damage.
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-2 text-lg font-semibold">
                      Engine Bay Cleaning
                    </h4>
                    <p className="text-gray-600">
                      {`Thorough cleaning and degreasing of your engine bay,
                      helping maintain your vehicle's performance and resale
                      value.`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-600">
            All services include professional-grade products and attention to
            detail
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Custom packages available • Window tinting services • Free estimates
          </p>
        </div>
      </div>
    </section>
  );
};
