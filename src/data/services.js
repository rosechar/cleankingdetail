const services = [
    {
      id: "interior-detail",
      name: 'Interior Detail',
      price: '$110',
      description: 'Deep cleaning of all interior surfaces',
      details: [
        'Upholstery Vacuumed & Shampooed',
        'Carpets Vacuumed & Shampooed',
        'Dashboard Cleaned & Conditioned',
        'Door Panels Cleaned & Conditioned',
        'Instrument Panel Cleaned',
        'Air Vents Cleaned',
        'Leather Seats Cleaned & Conditioned',
        'All Glass Cleaned (Interior Only)',
        'Vacuum Interior & Trunk'
      ]
    },
    {
      id: "full-detail",
      name: 'Full Detail',
      price: '$140',
      description: 'Complete interior and exterior detailing',
      details: ['Exterior Wash','Chamois Dry','Clean Door Jambs','Clean & Condition Tires','Clean Wheels','All Glass Cleaned (Interior & Exterior)','Spray Wax'],
      includes: "Includes all interior detail services PLUS..."
    },
    {
      id: "deluxe-detail",
      name: 'Deluxe Detail',
      price: '$160',
      description: 'Premium detail with trunk and engine bay cleaning',
      details: ['Vacuum Trunk','Clean Trunk Channels','Clean & Condition Engine Bay'],
      includes: "Includes all full detail services PLUS..."

    },
    {
      id: "spiffy-detail",
      name: 'Spiffy Detail',
      price: '$35',
      description: 'Quick but thorough cleaning service',
      details: ['Exterior Wash','Interior Vacuum','Interior Glass Cleaned'],
    },
    {
      id: "a-la-carte",
      name: 'A La Carte',
      price: '$70/$110',
      description: 'Clay Bar / Buff / Wax',
      details: ['Clay Bar / Wax', 'Clay Bar / Buff / Wax',],
    }
  ];

  export default services;