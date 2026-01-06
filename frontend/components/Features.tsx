'use client';

const features = [
  {
    icon: '⚡',
    title: 'Zero Emissions',
    description: 'Reduce your carbon footprint with 100% electric power. Drive clean, drive green.'
  },
  {
    icon: '🚀',
    title: 'Instant Acceleration',
    description: 'Experience instant torque and breathtaking acceleration that traditional cars can\'t match.'
  },
  {
    icon: '🤖',
    title: 'Autopilot Technology',
    description: 'Advanced self-driving capabilities make your journey safer and more convenient.'
  },
  {
    icon: '💰',
    title: 'Lower Costs',
    description: 'Save money on fuel and maintenance with fewer moving parts and electric efficiency.'
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-12 bg-gradient-to-br from-gray-100 to-white text-center">
      <h2 className="text-5xl font-bold mb-16 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
        Why Choose Electric?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div key={index} className="py-10 px-5">
            <div className="text-7xl mb-5">{feature.icon}</div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
            <p className="text-gray-800 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
