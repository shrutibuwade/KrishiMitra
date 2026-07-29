export const cropsData = [
  {
    id: 1,
    name: 'Wheat',
    hindi: 'गेहूं',
    season: 'Rabi (Winter)',
    duration: '120-150 days',
    description: 'Wheat is a staple grain crop, primary source of carbohydrates and protein. Essential for Indian agriculture and food security.',
    soil: 'Well-drained, fertile, loamy soil',
    weather: 'Cool climate, moderate rainfall (400-1000mm)',
    yield: '40-50 quintals/hectare',
    region: 'Punjab, Haryana, Uttar Pradesh, Rajasthan',
    icon: '🌾',
    image: '/images/crops/wheat.jpg',
    irrigation: {
      method: 'Flood irrigation, Drip irrigation',
      frequency: '4-5 times per season',
      waterRequired: '400-600 mm',
      bestTime: 'CRI (21-35 days), Tillering, Flowering',
      schedule: [
        { stage: 'CRI (Crown Root Initiation)', days: '21-35 days', water: '5-6 cm' },
        { stage: 'Tillering', days: '60-90 days', water: '5-6 cm' },
        { stage: 'Flowering & Grain Filling', days: '100-120 days', water: '6-7 cm' }
      ]
    },
    varieties: [
      { name: 'HD 2967', yield: '50-55 q/ha', characteristics: 'High yield, disease resistant', maturity: '125-135 days', height: '95-100 cm' },
      { name: 'PBW 343', yield: '45-50 q/ha', characteristics: 'Good quality, drought tolerant', maturity: '120-130 days', height: '90-95 cm' },
      { name: 'DBW 17', yield: '48-52 q/ha', characteristics: 'Better protein, rust resistant', maturity: '125-135 days', height: '100-105 cm' },
      { name: 'HP 1633', yield: '40-45 q/ha', characteristics: 'Cold tolerant, hilly regions', maturity: '130-140 days', height: '95-100 cm' }
    ],
    fertilizer: {
      nitrogen: '100-120 kg/ha',
      phosphorus: '60-80 kg/ha',
      potassium: '40-60 kg/ha',
      schedule: [
        { stage: 'Basal', nutrients: 'All P & K + Half N' },
        { stage: 'Tillering (CRI)', nutrients: 'Half remaining N' }
      ]
    },
    pestsDiseases: [
      { name: 'Rust', type: 'Disease', control: 'Spray Propiconazole 25% EC @ 500 ml/ha' },
      { name: 'Armyworm', type: 'Pest', control: 'Spray Chlorpyrifos 20% EC @ 1000 ml/ha' },
      { name: 'Loose Smut', type: 'Disease', control: 'Treat seeds with Carboxin 37.5%' }
    ]
  },
  {
    id: 2,
    name: 'Rice',
    hindi: 'चावल',
    season: 'Kharif (Monsoon)',
    duration: '120-150 days',
    description: 'Rice is the primary staple food for Indians. Requires adequate water and warm climate for optimal growth.',
    soil: 'Clay loam, waterlogged, fertile soil',
    weather: 'Warm, humid, 150-250cm rainfall',
    yield: '50-60 quintals/hectare',
    region: 'West Bengal, Punjab, Tamil Nadu, Andhra Pradesh',
    icon: '🍚',
    image: '/images/crops/rice.jpg',
    irrigation: {
      method: 'Flood irrigation, Continuous submergence',
      frequency: '6-7 times per season',
      waterRequired: '800-1500 mm',
      bestTime: 'Continuous water needed, 5-7 cm standing water',
      schedule: [
        { stage: 'Land Preparation', days: '0-10 days', water: '10-15 cm' },
        { stage: 'Active Growth', days: '30-90 days', water: '5-7 cm continuous' },
        { stage: 'Grain Filling', days: '100-120 days', water: '5 cm' }
      ]
    },
    varieties: [
      { name: 'Basmati 1121', yield: '45-50 q/ha', characteristics: 'Aromatic, premium quality', maturity: '140-150 days', height: '90-95 cm' },
      { name: 'IR 64', yield: '50-60 q/ha', characteristics: 'High yielding, pest resistant', maturity: '120-130 days', height: '85-90 cm' },
      { name: 'Dhan 1', yield: '48-55 q/ha', characteristics: 'Drought tolerant, good taste', maturity: '125-135 days', height: '80-85 cm' },
      { name: 'PR 114', yield: '55-65 q/ha', characteristics: 'Hybrid, very high yield', maturity: '115-125 days', height: '85-90 cm' }
    ],
    fertilizer: {
      nitrogen: '120-150 kg/ha',
      phosphorus: '60-80 kg/ha',
      potassium: '40-60 kg/ha',
      schedule: [
        { stage: 'Basal', nutrients: 'All P & K + 1/3 N' },
        { stage: 'Active Tillering (30-45 DAS)', nutrients: '1/3 N' },
        { stage: 'Panicle Initiation (60-75 DAS)', nutrients: '1/3 N' }
      ]
    },
    pestsDiseases: [
      { name: 'Brown Spot', type: 'Disease', control: 'Spray Mancozeb 75% WP @ 2000 ml/ha' },
      { name: 'Stem Borer', type: 'Pest', control: 'Spray Chlorpyrifos 20% EC @ 1000 ml/ha' },
      { name: 'Blast', type: 'Disease', control: 'Use resistant varieties, spray Tricyclazole' }
    ]
  },
  {
    id: 3,
    name: 'Cotton',
    hindi: 'कपास',
    season: 'Kharif (Monsoon)',
    duration: '180-210 days',
    description: 'White gold of India. Cotton is a major cash crop used for textile production and generates significant revenue.',
    soil: 'Well-drained, black soil, fertile',
    weather: 'Warm climate, 600-1000mm rainfall',
    yield: '12-15 quintals/hectare',
    region: 'Gujarat, Maharashtra, Andhra Pradesh, Karnataka',
    icon: '🤍',
    image: '/images/crops/cotton.jpg',
    irrigation: {
      method: 'Drip irrigation, Flood irrigation',
      frequency: '8-12 times per season',
      waterRequired: '600-800 mm',
      bestTime: 'Flowering & Boll formation critical',
      schedule: [
        { stage: 'Vegetative Growth', days: '30-60 days', water: '4-5 cm' },
        { stage: 'Flowering', days: '90-120 days', water: '5-6 cm' },
        { stage: 'Boll Formation', days: '150-180 days', water: '6-7 cm' }
      ]
    },
    varieties: [
      { name: 'MCU 5', yield: '12-14 q/ha', characteristics: 'High lint%, pest resistant', maturity: '180-190 days', height: '120-130 cm' },
      { name: 'Bt Cotton', yield: '14-16 q/ha', characteristics: 'Insect resistant, high yield', maturity: '175-185 days', height: '125-135 cm' },
      { name: 'Nandi-95', yield: '13-15 q/ha', characteristics: 'Good quality, drought tolerant', maturity: '185-195 days', height: '115-125 cm' },
      { name: 'F-1378', yield: '12-14 q/ha', characteristics: 'Medium maturity, stable yield', maturity: '180-190 days', height: '120-130 cm' }
    ],
    fertilizer: {
      nitrogen: '100-120 kg/ha',
      phosphorus: '50-60 kg/ha',
      potassium: '40-50 kg/ha',
      schedule: [
        { stage: 'Basal', nutrients: 'All P & K + 1/3 N' },
        { stage: '40-45 DAS', nutrients: '1/3 N' },
        { stage: '70-75 DAS', nutrients: '1/3 N' }
      ]
    },
    pestsDiseases: [
      { name: 'Whitefly', type: 'Pest', control: 'Spray Imidacloprid 17.8% SL @ 600 ml/ha' },
      { name: 'Leaf Curl Virus', type: 'Disease', control: 'Control whitefly, use resistant varieties' },
      { name: 'Jassids', type: 'Pest', control: 'Spray Dimethoate 30% EC @ 1000 ml/ha' }
    ]
  },
  {
    id: 4,
    name: 'Sugarcane',
    hindi: 'गन्ना',
    season: 'Annual Crop',
    duration: '300-360 days',
    description: 'Sugarcane is a major cash crop used for sugar and ethanol production. High-value commercial crop.',
    soil: 'Deep, fertile, well-drained soil',
    weather: 'Warm, humid, 750-1250mm rainfall',
    yield: '500-600 tonnes/hectare',
    region: 'Uttar Pradesh, Maharashtra, Karnataka, Tamil Nadu',
    icon: '🎋',
    image: '/images/crops/sugarcane.jpg',
    irrigation: {
      method: 'Flood irrigation, Drip irrigation',
      frequency: '6-8 times per year',
      waterRequired: '2000-2500 mm',
      bestTime: 'Regular irrigation needed throughout growth',
      schedule: [
        { stage: 'Germination (0-30 days)', days: '0-30 days', water: '10-15 cm' },
        { stage: 'Shooting (30-120 days)', days: '30-120 days', water: '8-10 cm' },
        { stage: 'Grand Growth (120-300 days)', days: '120-300 days', water: '10-12 cm' }
      ]
    },
    varieties: [
      { name: 'Co-86032', yield: '600-700 t/ha', characteristics: 'High sugar%, disease resistant', maturity: '14 months', height: '200-220 cm' },
      { name: 'CoS-7605', yield: '550-650 t/ha', characteristics: 'Drought tolerant, good quality', maturity: '13 months', height: '190-210 cm' },
      { name: 'Deswari', yield: '500-600 t/ha', characteristics: 'Early maturing, high recoverable sugar', maturity: '12 months', height: '180-200 cm' },
      { name: 'M-134', yield: '550-650 t/ha', characteristics: 'Pest resistant, good ratoon', maturity: '13-14 months', height: '200-220 cm' }
    ],
    fertilizer: {
      nitrogen: '200-250 kg/ha',
      phosphorus: '80-100 kg/ha',
      potassium: '80-100 kg/ha',
      schedule: [
        { stage: 'Basal', nutrients: 'All P & K + 1/4 N before planting' },
        { stage: '30-45 DAS', nutrients: '1/4 N' },
        { stage: '90-120 DAS', nutrients: '1/4 N' },
        { stage: '150-180 DAS', nutrients: '1/4 N' }
      ]
    },
    pestsDiseases: [
      { name: 'Red Rot', type: 'Disease', control: 'Use resistant varieties, treat seed canes' },
      { name: 'Shoot Borer', type: 'Pest', control: 'Spray Chlorpyrifos 20% EC @ 1000 ml/ha' },
      { name: 'Smut', type: 'Disease', control: 'Hot water treatment 50°C for 2 hours' }
    ]
  },
  {
    id: 5,
    name: 'Maize',
    hindi: 'मक्का',
    season: 'Kharif/Rabi',
    duration: '80-120 days',
    description: 'Maize is a versatile cereal crop used for food, feed, and industrial purposes. High nutritional value.',
    soil: 'Well-drained, fertile, loamy soil',
    weather: 'Warm, 500-750mm rainfall',
    yield: '30-40 quintals/hectare',
    region: 'Karnataka, Rajasthan, Madhya Pradesh, Andhra Pradesh',
    icon: '🌽',
    image: '/images/crops/maize.jpg',
    irrigation: {
      method: 'Flood irrigation, Drip irrigation',
      frequency: '4-6 times per season',
      waterRequired: '500-600 mm',
      bestTime: 'Critical at V3-V6, Flowering stages',
      schedule: [
        { stage: 'Vegetative Growth (V3-V6)', days: '20-40 days', water: '4-5 cm' },
        { stage: 'Flowering & Silking', days: '50-75 days', water: '5-6 cm' },
        { stage: 'Grain Filling', days: '80-100 days', water: '4-5 cm' }
      ]
    },
    varieties: [
      { name: 'Pioneer 3396', yield: '35-40 q/ha', characteristics: 'High yield hybrid, pest resistant', maturity: '110-120 days', height: '200-210 cm' },
      { name: 'Syngenta NK 6240', yield: '32-38 q/ha', characteristics: 'Good starch content, drought tolerant', maturity: '100-110 days', height: '190-200 cm' },
      { name: 'Local Yellow', yield: '25-30 q/ha', characteristics: 'Traditional, low input', maturity: '80-90 days', height: '170-180 cm' },
      { name: 'HC-1', yield: '28-35 q/ha', characteristics: 'Composite variety, stable yield', maturity: '100-110 days', height: '180-190 cm' }
    ],
    fertilizer: {
      nitrogen: '100-120 kg/ha',
      phosphorus: '60-80 kg/ha',
      potassium: '40-50 kg/ha',
      schedule: [
        { stage: 'Basal/Pre-plant', nutrients: 'All P & K + 1/2 N' },
        { stage: 'V3-V6 (30-35 DAS)', nutrients: '1/2 N as top dressing' }
      ]
    },
    pestsDiseases: [
      { name: 'Armyworm', type: 'Pest', control: 'Spray Chlorpyrifos 20% EC @ 1000 ml/ha' },
      { name: 'Leaf Blight', type: 'Disease', control: 'Use resistant varieties, spray Mancozeb' },
      { name: 'Stem Borer', type: 'Pest', control: 'Spray Endosulfan 35% EC @ 1000 ml/ha' }
    ]
  },
  {
    id: 6,
    name: 'Potato',
    hindi: 'आलू',
    season: 'Rabi (Winter)',
    duration: '70-90 days',
    description: 'Potato is a staple vegetable crop, rich in carbohydrates and nutrients. One of the most cultivated crops.',
    soil: 'Sandy loam, well-drained, fertile',
    weather: 'Cool climate, 500-750mm rainfall',
    yield: '200-250 quintals/hectare',
    region: 'Uttar Pradesh, West Bengal, Bihar, Gujarat',
    icon: '🥔',
    image: '/images/crops/potato.jpg',
    irrigation: {
      method: 'Flood irrigation, Sprinkler irrigation',
      frequency: '4-6 times per season',
      waterRequired: '400-500 mm',
      bestTime: 'Tuber initiation & bulking critical',
      schedule: [
        { stage: 'Sprouting & Growth (0-30 days)', days: '0-30 days', water: '5-6 cm' },
        { stage: 'Tuber Initiation (30-50 days)', days: '30-50 days', water: '6-7 cm' },
        { stage: 'Bulking & Maturity (50-70 days)', days: '50-70 days', water: '5-6 cm' }
      ]
    },
    varieties: [
      { name: 'Kufri Chandramukhi', yield: '220-250 q/ha', characteristics: 'High yield, disease resistant', maturity: '75-85 days', height: '30-40 cm' },
      { name: 'Kufri Jyoti', yield: '200-230 q/ha', characteristics: 'Yellow flesh, good taste', maturity: '80-90 days', height: '35-45 cm' },
      { name: 'Kufri Neelamani', yield: '180-220 q/ha', characteristics: 'Purple color, high anthocyanin', maturity: '75-85 days', height: '30-40 cm' },
      { name: 'Lady Rosetta', yield: '210-240 q/ha', characteristics: 'Red skin, processing variety', maturity: '80-90 days', height: '35-45 cm' }
    ],
    fertilizer: {
      nitrogen: '100-150 kg/ha',
      phosphorus: '80-100 kg/ha',
      potassium: '150-200 kg/ha',
      schedule: [
        { stage: 'Basal (at planting)', nutrients: 'All P & K + 1/2 N' },
        { stage: '40-45 DAS (Earthing up)', nutrients: '1/2 N remaining' }
      ]
    },
    pestsDiseases: [
      { name: 'Late Blight', type: 'Disease', control: 'Spray Mancozeb 75% WP @ 2000 ml/ha every 7 days' },
      { name: 'Aphids', type: 'Pest', control: 'Spray Imidacloprid 17.8% SL @ 600 ml/ha' },
      { name: 'Scab', type: 'Disease', control: 'Maintain soil pH 5.0-5.5, improve drainage' }
    ]
  },
  {
    id: 7,
    name: 'Onion',
    hindi: 'प्याज',
    season: 'Kharif/Rabi',
    duration: '120-150 days',
    description: 'Onion is essential vegetable used in daily cooking. High demand in markets, good source of income.',
    soil: 'Well-drained, fertile, sandy loam',
    weather: 'Cool to warm, 500-750mm rainfall',
    yield: '250-300 quintals/hectare',
    region: 'Maharashtra, Andhra Pradesh, Karnataka, Gujarat',
    icon: '🧅',
    image: '/images/crops/onion.jpg',
    irrigation: {
      method: 'Flood irrigation, Drip irrigation',
      frequency: '6-8 times per season',
      waterRequired: '400-600 mm',
      bestTime: 'Avoid waterlogging, moisture needed regularly',
      schedule: [
        { stage: 'Vegetative (0-60 days)', days: '0-60 days', water: '4-5 cm' },
        { stage: 'Bulb Formation (60-100 days)', days: '60-100 days', water: '5-6 cm' },
        { stage: 'Maturity (100-120 days)', days: '100-120 days', water: '2-3 cm' }
      ]
    },
    varieties: [
      { name: 'Baswant 780', yield: '280-320 q/ha', characteristics: 'High yield, long storage', maturity: '130-140 days', height: '40-50 cm' },
      { name: 'N-53', yield: '260-300 q/ha', characteristics: 'Golden yellow, good quality', maturity: '120-130 days', height: '38-48 cm' },
      { name: 'Arka Niketan', yield: '250-290 q/ha', characteristics: 'Red onion, better taste', maturity: '130-140 days', height: '40-50 cm' },
      { name: 'Arka Kalyan', yield: '240-280 q/ha', characteristics: 'Early maturing, space efficient', maturity: '110-120 days', height: '35-45 cm' }
    ],
    fertilizer: {
      nitrogen: '100-150 kg/ha',
      phosphorus: '50-75 kg/ha',
      potassium: '80-120 kg/ha',
      schedule: [
        { stage: 'Basal', nutrients: 'All P & K + 1/3 N' },
        { stage: '40 DAS', nutrients: '1/3 N' },
        { stage: '70 DAS', nutrients: '1/3 N' }
      ]
    },
    pestsDiseases: [
      { name: 'Purple Blotch', type: 'Disease', control: 'Spray Mancozeb 75% WP @ 2000 ml/ha' },
      { name: 'Thrips', type: 'Pest', control: 'Spray Acephate 75% SP @ 1000 ml/ha' },
      { name: 'Basal Rot', type: 'Disease', control: 'Use resistant varieties, proper drainage' }
    ]
  },
  {
    id: 8,
    name: 'Tomato',
    hindi: 'टमाटर',
    season: 'Annual (Multiple cycles)',
    duration: '60-90 days',
    description: 'Tomato is high-value vegetable crop with year-round demand. Rich in vitamin C and antioxidants.',
    soil: 'Well-drained, fertile, loamy soil',
    weather: 'Warm to hot, 500-750mm rainfall',
    yield: '300-400 quintals/hectare',
    region: 'Karnataka, Andhra Pradesh, Tamil Nadu, Gujarat',
    icon: '🍅',
    image: '/images/crops/tomato.jpg',
    irrigation: {
      method: 'Drip irrigation, Sprinkler',
      frequency: '6-8 times per season',
      waterRequired: '400-600 mm',
      bestTime: 'Regular moisture needed for quality fruit',
      schedule: [
        { stage: 'Vegetative (0-30 days)', days: '0-30 days', water: '3-4 cm' },
        { stage: 'Flowering & Fruiting (30-70 days)', days: '30-70 days', water: '4-5 cm' },
        { stage: 'Maturity (70-90 days)', days: '70-90 days', water: '3-4 cm' }
      ]
    },
    varieties: [
      { name: 'Arka Vikas', yield: '350-400 q/ha', characteristics: 'High yield, disease resistant', maturity: '70-80 days', height: '150-170 cm' },
      { name: 'Abhinav', yield: '300-350 q/ha', characteristics: 'Medium size, good taste', maturity: '65-75 days', height: '140-160 cm' },
      { name: 'Pusa Ruby', yield: '280-320 q/ha', characteristics: 'Deep red, traditional variety', maturity: '75-85 days', height: '160-180 cm' },
      { name: 'Vaibhav', yield: '320-370 q/ha', characteristics: 'Hybrid, uniform fruiting', maturity: '68-78 days', height: '150-170 cm' }
    ],
    fertilizer: {
      nitrogen: '100-150 kg/ha',
      phosphorus: '60-80 kg/ha',
      potassium: '80-100 kg/ha',
      schedule: [
        { stage: 'Basal', nutrients: 'All P & K + 1/3 N' },
        { stage: '30 DAS', nutrients: '1/3 N' },
        { stage: '50 DAS', nutrients: '1/3 N' }
      ]
    },
    pestsDiseases: [
      { name: 'Early Blight', type: 'Disease', control: 'Spray Mancozeb 75% WP @ 2000 ml/ha' },
      { name: 'Whitefly', type: 'Pest', control: 'Spray Imidacloprid 17.8% SL @ 600 ml/ha' },
      { name: 'Septoria Leaf Spot', type: 'Disease', control: 'Remove infected leaves, spray Copper fungicide' }
    ]
  },
  {
    id: 9,
    name: 'Pulses (Chickpea)',
    hindi: 'दाल (चना)',
    season: 'Rabi (Winter)',
    duration: '100-120 days',
    description: 'Chickpea is primary pulse crop, rich in protein. Essential for vegetarian diet in India.',
    soil: 'Well-drained, fertile, black soil',
    weather: 'Cool climate, 400-600mm rainfall',
    yield: '15-20 quintals/hectare',
    region: 'Madhya Pradesh, Rajasthan, Maharashtra, Karnataka',
    icon: '🫘',
    image: '/images/crops/chickpea.jpg',
    irrigation: {
      method: 'Rainfed, Protective irrigation',
      frequency: '1-2 times if needed',
      waterRequired: '300-400 mm',
      bestTime: 'Flowering stage critical if drought',
      schedule: [
        { stage: 'Germination (0-20 days)', days: '0-20 days', water: '3-4 cm if needed' },
        { stage: 'Vegetative (20-60 days)', days: '20-60 days', water: '3-4 cm if needed' },
        { stage: 'Flowering & Pod Formation (60-100 days)', days: '60-100 days', water: '4-5 cm if needed' }
      ]
    },
    varieties: [
      { name: 'Jaki 9218', yield: '18-22 q/ha', characteristics: 'High yield, wilt resistant', maturity: '105-115 days', height: '40-50 cm' },
      { name: 'Kabuli 8', yield: '15-18 q/ha', characteristics: 'Large seed, good export quality', maturity: '100-110 days', height: '45-55 cm' },
      { name: 'ICCV 2', yield: '14-17 q/ha', characteristics: 'Early maturing, drought tolerant', maturity: '90-100 days', height: '35-45 cm' },
      { name: 'RSG 963', yield: '16-20 q/ha', characteristics: 'Bold seed, stable yield', maturity: '100-110 days', height: '40-50 cm' }
    ],
    fertilizer: {
      nitrogen: '20-25 kg/ha',
      phosphorus: '50-60 kg/ha',
      potassium: '20-30 kg/ha',
      schedule: [
        { stage: 'Basal', nutrients: 'All N, P, K at planting' }
      ]
    },
    pestsDiseases: [
      { name: 'Ascochyta Blight', type: 'Disease', control: 'Spray Mancozeb 75% WP @ 2000 ml/ha' },
      { name: 'Pod Borer', type: 'Pest', control: 'Spray Chlorpyrifos 20% EC @ 1000 ml/ha' },
      { name: 'Fusarium Wilt', type: 'Disease', control: 'Use resistant varieties, crop rotation' }
    ]
  },
  {
    id: 10,
    name: 'Mustard',
    hindi: 'सरसों',
    season: 'Rabi (Winter)',
    duration: '90-120 days',
    description: 'Mustard is oilseed crop used for oil extraction. Seeds used as spice, economically important.',
    soil: 'Well-drained, fertile, loamy soil',
    weather: 'Cool climate, 400-500mm rainfall',
    yield: '15-20 quintals/hectare',
    region: 'Rajasthan, Madhya Pradesh, Uttar Pradesh, Haryana',
    icon: '🌱',
    image: '/images/crops/mustard.jpg',
    irrigation: {
      method: 'Rainfed, Irrigation in deficit areas',
      frequency: '1-3 times per season',
      waterRequired: '400-500 mm',
      bestTime: 'Flowering & siliqua formation',
      schedule: [
        { stage: 'Germination (0-15 days)', days: '0-15 days', water: '3-4 cm' },
        { stage: 'Flowering (45-75 days)', days: '45-75 days', water: '4-5 cm' },
        { stage: 'Siliqua Formation (75-100 days)', days: '75-100 days', water: '3-4 cm' }
      ]
    },
    varieties: [
      { name: 'Pusa Mustard 25', yield: '18-22 q/ha', characteristics: 'High yielding, disease resistant', maturity: '110-120 days', height: '100-120 cm' },
      { name: 'RGN-73', yield: '16-20 q/ha', characteristics: 'Good oil quality, early', maturity: '95-105 days', height: '90-110 cm' },
      { name: 'Varuna', yield: '15-18 q/ha', characteristics: 'Erucic acid free, health benefits', maturity: '100-110 days', height: '95-115 cm' },
      { name: 'Alankar', yield: '14-17 q/ha', characteristics: 'Traditional, drought tolerant', maturity: '105-115 days', height: '100-120 cm' }
    ],
    fertilizer: {
      nitrogen: '60-80 kg/ha',
      phosphorus: '40-60 kg/ha',
      potassium: '30-40 kg/ha',
      schedule: [
        { stage: 'Basal', nutrients: 'All nutrients at planting' }
      ]
    },
    pestsDiseases: [
      { name: 'Alternaria Blight', type: 'Disease', control: 'Spray Mancozeb 75% WP @ 2000 ml/ha' },
      { name: 'Painted Bug', type: 'Pest', control: 'Spray Chlorpyrifos 20% EC @ 1000 ml/ha' },
      { name: 'White Rust', type: 'Disease', control: 'Spray Carbendazim 50% WP @ 1000 ml/ha' }
    ]
  },
  {
    id: 11,
    name: 'Soybean',
    hindi: 'सोयाबीन',
    season: 'Kharif (Monsoon)',
    duration: '90-120 days',
    description: 'Soybean is high-protein oilseed crop. Used for oil, meal, and animal feed production.',
    soil: 'Well-drained, fertile, loamy soil',
    weather: 'Warm, 500-750mm rainfall',
    yield: '18-22 quintals/hectare',
    region: 'Madhya Pradesh, Maharashtra, Rajasthan, Karnataka',
    icon: '🫛',
    image: '/images/crops/soybean.jpg',
    irrigation: {
      method: 'Drip, Rainfed agriculture',
      frequency: '2-3 times if needed',
      waterRequired: '400-600 mm',
      bestTime: 'Flowering & pod formation',
      schedule: [
        { stage: 'Vegetative (0-35 days)', days: '0-35 days', water: '3-4 cm' },
        { stage: 'Flowering & Podding (35-80 days)', days: '35-80 days', water: '5-6 cm' },
        { stage: 'Maturity (80-110 days)', days: '80-110 days', water: '3-4 cm' }
      ]
    },
    varieties: [
      { name: 'JS 95-60', yield: '20-24 q/ha', characteristics: 'High yield, disease resistant', maturity: '105-115 days', height: '70-80 cm' },
      { name: 'KBS 21', yield: '18-22 q/ha', characteristics: 'Medium seed size, stable', maturity: '100-110 days', height: '65-75 cm' },
      { name: 'RVS 2001-4', yield: '16-20 q/ha', characteristics: 'Early maturing, drought tolerant', maturity: '90-100 days', height: '60-70 cm' },
      { name: 'DSB 21', yield: '19-23 q/ha', characteristics: 'Bold seed, good protein content', maturity: '105-115 days', height: '70-80 cm' }
    ],
    fertilizer: {
      nitrogen: '30-40 kg/ha',
      phosphorus: '60-80 kg/ha',
      potassium: '40-50 kg/ha',
      schedule: [
        { stage: 'Basal', nutrients: 'All P & K + N at planting' }
      ]
    },
    pestsDiseases: [
      { name: 'Rust', type: 'Disease', control: 'Spray Propiconazole 25% EC @ 500 ml/ha' },
      { name: 'Girdle Beetle', type: 'Pest', control: 'Spray Chlorpyrifos 20% EC @ 1000 ml/ha' },
      { name: 'Leaf Folder', type: 'Pest', control: 'Spray Spinosad 45% SC @ 500 ml/ha' }
    ]
  },
  {
    id: 12,
    name: 'Groundnut',
    hindi: 'मूंगफली',
    season: 'Kharif (Monsoon)',
    duration: '100-130 days',
    description: 'Groundnut is legume and oilseed crop. High nutritional value, good source of protein and oil.',
    soil: 'Well-drained, sandy loam, fertile',
    weather: 'Warm, 400-600mm rainfall',
    yield: '20-25 quintals/hectare',
    region: 'Gujarat, Andhra Pradesh, Karnataka, Tamil Nadu',
    icon: '🥜',
    image: '/images/crops/groundnut.jpg',
    irrigation: {
      method: 'Drip, Rainfed',
      frequency: '2-3 times if needed',
      waterRequired: '400-600 mm',
      bestTime: 'Pod development critical',
      schedule: [
        { stage: 'Growth & Development (0-40 days)', days: '0-40 days', water: '3-4 cm' },
        { stage: 'Flowering & Pegging (40-80 days)', days: '40-80 days', water: '4-5 cm' },
        { stage: 'Pod Development (80-120 days)', days: '80-120 days', water: '5-6 cm' }
      ]
    },
    varieties: [
      { name: 'TAG 24', yield: '22-26 q/ha', characteristics: 'High yield, pest resistant', maturity: '120-130 days', height: '40-50 cm' },
      { name: 'TG 26', yield: '20-24 q/ha', characteristics: 'Bold kernels, good quality', maturity: '115-125 days', height: '38-48 cm' },
      { name: 'M 335', yield: '18-22 q/ha', characteristics: 'Early maturing, drought tolerant', maturity: '100-110 days', height: '35-45 cm' },
      { name: 'JL-24', yield: '19-23 q/ha', characteristics: 'Spanish type, high kernel%', maturity: '115-125 days', height: '40-50 cm' }
    ],
    fertilizer: {
      nitrogen: '25-30 kg/ha',
      phosphorus: '50-75 kg/ha',
      potassium: '40-50 kg/ha',
      schedule: [
        { stage: 'Basal', nutrients: 'All nutrients at planting' }
      ]
    },
    pestsDiseases: [
      { name: 'Leaf Spot', type: 'Disease', control: 'Spray Mancozeb 75% WP @ 2000 ml/ha' },
      { name: 'Rosette Virus', type: 'Disease', control: 'Control aphids, use resistant varieties' },
      { name: 'Aphids', type: 'Pest', control: 'Spray Imidacloprid 17.8% SL @ 600 ml/ha' }
    ]
  },
  {
    id: 13,
    name: 'Bajra',
    hindi: 'बाजरा',
    season: 'Kharif (Monsoon)',
    duration: '60-90 days',
    description: 'Bajra is drought-resistant millet crop. Nutritious cereal, suitable for dry regions.',
    soil: 'Well-drained, sandy loam, infertile',
    weather: 'Hot, dry, 300-500mm rainfall',
    yield: '8-12 quintals/hectare',
    region: 'Rajasthan, Gujarat, Haryana, Maharashtra',
    icon: '🌾',
    image: '/images/crops/bajra.jpg',
    irrigation: {
      method: 'Rainfed, Protective irrigation',
      frequency: '0-2 times',
      waterRequired: '300-500 mm',
      bestTime: 'Drought tolerant crop',
      schedule: [
        { stage: 'Germination & Growth (0-30 days)', days: '0-30 days', water: 'Rainfed' },
        { stage: 'Flowering (30-60 days)', days: '30-60 days', water: '3-4 cm if drought' },
        { stage: 'Grain Filling (60-80 days)', days: '60-80 days', water: 'Rainfed' }
      ]
    },
    varieties: [
      { name: 'ICMH 416', yield: '10-12 q/ha', characteristics: 'High yielding, pest resistant', maturity: '80-90 days', height: '150-160 cm' },
      { name: 'HB 3', yield: '9-11 q/ha', characteristics: 'Early maturing, drought tolerant', maturity: '70-80 days', height: '140-150 cm' },
      { name: 'Jaya', yield: '8-10 q/ha', characteristics: 'Traditional, stable', maturity: '75-85 days', height: '145-155 cm' },
      { name: 'ICMA 88004', yield: '9-11 q/ha', characteristics: 'Medium duration, good grain', maturity: '80-90 days', height: '150-160 cm' }
    ],
    fertilizer: {
      nitrogen: '40-60 kg/ha',
      phosphorus: '20-30 kg/ha',
      potassium: '20-30 kg/ha',
      schedule: [
        { stage: 'Basal', nutrients: 'All nutrients at planting' }
      ]
    },
    pestsDiseases: [
      { name: 'Downy Mildew', type: 'Disease', control: 'Treat seeds with Carboxin 37.5%' },
      { name: 'Armyworm', type: 'Pest', control: 'Spray Chlorpyrifos 20% EC @ 1000 ml/ha' },
      { name: 'Shoot Fly', type: 'Pest', control: 'Early planting, remove affected tillers' }
    ]
  },
  {
    id: 14,
    name: 'Jowar',
    hindi: 'ज्वार',
    season: 'Kharif (Monsoon)',
    duration: '120-150 days',
    description: 'Jowar is hardy cereal crop, drought-resistant. Used for food, feed, and fuel purposes.',
    soil: 'Well-drained, fertile, black soil',
    weather: 'Warm, 400-650mm rainfall',
    yield: '18-25 quintals/hectare',
    region: 'Maharashtra, Karnataka, Telangana, Andhra Pradesh',
    icon: '🌾',
    image: '/images/crops/jowar.jpg',
    irrigation: {
      method: 'Rainfed, Protective irrigation',
      frequency: '1-3 times if needed',
      waterRequired: '400-600 mm',
      bestTime: 'Flowering & grain formation',
      schedule: [
        { stage: 'Vegetative (0-50 days)', days: '0-50 days', water: 'Rainfed' },
        { stage: 'Flowering & Grain Formation (50-120 days)', days: '50-120 days', water: '4-5 cm if needed' }
      ]
    },
    varieties: [
      { name: 'CSH 13', yield: '22-28 q/ha', characteristics: 'High yield hybrid, pest resistant', maturity: '130-140 days', height: '180-190 cm' },
      { name: 'DSV-4', yield: '20-25 q/ha', characteristics: 'Drought tolerant, dual purpose', maturity: '125-135 days', height: '170-180 cm' },
      { name: 'Pusa 23', yield: '18-22 q/ha', characteristics: 'Traditional, stable yield', maturity: '120-130 days', height: '160-170 cm' },
      { name: 'Phule Vasudha', yield: '19-24 q/ha', characteristics: 'Bold grain, disease resistant', maturity: '125-135 days', height: '175-185 cm' }
    ],
    fertilizer: {
      nitrogen: '60-80 kg/ha',
      phosphorus: '40-60 kg/ha',
      potassium: '30-40 kg/ha',
      schedule: [
        { stage: 'Basal', nutrients: 'All P & K + 1/2 N at planting' },
        { stage: '35-40 DAS', nutrients: '1/2 N remaining' }
      ]
    },
    pestsDiseases: [
      { name: 'Anthracnose', type: 'Disease', control: 'Spray Mancozeb 75% WP @ 2000 ml/ha' },
      { name: 'Stem Borer', type: 'Pest', control: 'Spray Chlorpyrifos 20% EC @ 1000 ml/ha' },
      { name: 'Leaf Spot', type: 'Disease', control: 'Spray Copper Oxide 50% WP @ 2500 ml/ha' }
    ]
  },
  {
    id: 15,
    name: 'Sugarbeet',
    hindi: 'चुकंदर',
    season: 'Rabi (Winter)',
    duration: '150-180 days',
    description: 'Sugarbeet is alternate source of sugar. Growing importance in Indian agriculture.',
    soil: 'Well-drained, fertile, loamy soil',
    weather: 'Cool climate, 500-750mm rainfall',
    yield: '400-500 tonnes/hectare',
    region: 'Uttar Pradesh, Punjab, Haryana, Rajasthan',
    icon: '🫘',
    image: '/images/crops/sugarbeet.jpg',
    irrigation: {
      method: 'Flood irrigation, Drip irrigation',
      frequency: '8-10 times per season',
      waterRequired: '500-700 mm',
      bestTime: 'Regular moisture needed',
      schedule: [
        { stage: 'Germination (0-30 days)', days: '0-30 days', water: '4-5 cm' },
        { stage: 'Growth (30-90 days)', days: '30-90 days', water: '5-6 cm' },
        { stage: 'Storage Root Development (90-150 days)', days: '90-150 days', water: '6-7 cm' }
      ]
    },
    varieties: [
      { name: 'Hari 200', yield: '450-550 t/ha', characteristics: 'High sugar content, disease resistant', maturity: '160-170 days', height: '40-50 cm' },
      { name: 'Varin', yield: '400-480 t/ha', characteristics: 'Good quality, stable', maturity: '155-165 days', height: '38-48 cm' },
      { name: 'Kaveri', yield: '420-500 t/ha', characteristics: 'Drought tolerant, processing variety', maturity: '165-175 days', height: '40-50 cm' },
      { name: 'Neelam', yield: '380-460 t/ha', characteristics: 'Early maturing, good yield', maturity: '150-160 days', height: '35-45 cm' }
    ],
    fertilizer: {
      nitrogen: '100-150 kg/ha',
      phosphorus: '80-100 kg/ha',
      potassium: '100-150 kg/ha',
      schedule: [
        { stage: 'Basal', nutrients: 'All nutrients before planting' }
      ]
    },
    pestsDiseases: [
      { name: 'Leaf Spot', type: 'Disease', control: 'Spray Mancozeb 75% WP @ 2000 ml/ha' },
      { name: 'Rhizoctonia', type: 'Disease', control: 'Treat seeds with Trichoderma, improve drainage' },
      { name: 'Nematodes', type: 'Pest', control: 'Use resistant varieties, crop rotation' }
    ]
  },
  {
    id: 16,
    name: 'Cabbage',
    hindi: 'पत्तागोभी',
    season: 'Rabi/Summer',
    duration: '90-120 days',
    description: 'Cabbage is nutritious vegetable crop. Rich in vitamins, minerals, and fiber.',
    soil: 'Well-drained, fertile, loamy soil',
    weather: 'Cool to warm, 500-750mm rainfall',
    yield: '300-400 quintals/hectare',
    region: 'Karnataka, Himachal Pradesh, Maharashtra, Gujarat',
    icon: '🥬',
    image: '/images/crops/cabbage.jpg',
    irrigation: {
      method: 'Flood, Sprinkler irrigation',
      frequency: '6-8 times per season',
      waterRequired: '400-600 mm',
      bestTime: 'Head formation critical',
      schedule: [
        { stage: 'Seedling & Growth (0-40 days)', days: '0-40 days', water: '3-4 cm' },
        { stage: 'Vegetative & Head Formation (40-90 days)', days: '40-90 days', water: '4-5 cm' },
        { stage: 'Head Maturity (90-110 days)', days: '90-110 days', water: '3-4 cm' }
      ]
    },
    varieties: [
      { name: 'Golden Acre', yield: '350-400 q/ha', characteristics: 'Early maturing, compact head', maturity: '90-100 days', height: '30-40 cm' },
      { name: 'Pusa Dwarf', yield: '320-380 q/ha', characteristics: 'Dwarf plant, tender leaves', maturity: '95-105 days', height: '25-35 cm' },
      { name: 'Harris Model', yield: '300-350 q/ha', characteristics: 'Medium size, good quality', maturity: '100-110 days', height: '35-45 cm' },
      { name: 'Pride of India', yield: '330-390 q/ha', characteristics: 'Large head, long storage', maturity: '100-110 days', height: '38-48 cm' }
    ],
    fertilizer: {
      nitrogen: '120-150 kg/ha',
      phosphorus: '60-80 kg/ha',
      potassium: '60-80 kg/ha',
      schedule: [
        { stage: 'Basal', nutrients: 'All P & K + 1/3 N at transplanting' },
        { stage: '40-45 DAS', nutrients: '1/3 N' },
        { stage: '70-75 DAS', nutrients: '1/3 N' }
      ]
    },
    pestsDiseases: [
      { name: 'Damping Off', type: 'Disease', control: 'Treat seeds with Trichoderma before sowing' },
      { name: 'Diamondback Moth', type: 'Pest', control: 'Spray Spinosad 45% SC @ 500 ml/ha' },
      { name: 'Leaf Spot', type: 'Disease', control: 'Spray Mancozeb 75% WP @ 2000 ml/ha' }
    ]
  },
  {
    id: 17,
    name: 'Cauliflower',
    hindi: 'फूलगोभी',
    season: 'Rabi (Winter)',
    duration: '90-120 days',
    description: 'Cauliflower is premium vegetable crop. High nutritional value, good market demand.',
    soil: 'Well-drained, fertile, loamy soil',
    weather: 'Cool climate, 500-750mm rainfall',
    yield: '200-250 quintals/hectare',
    region: 'Uttar Pradesh, Himachal Pradesh, Haryana, Punjab',
    icon: '🥦',
    image: '/images/crops/cauliflower.jpg',
    irrigation: {
      method: 'Drip, Sprinkler irrigation',
      frequency: '6-8 times per season',
      waterRequired: '400-600 mm',
      bestTime: 'Curd formation critical',
      schedule: [
        { stage: 'Vegetative (0-50 days)', days: '0-50 days', water: '3-4 cm' },
        { stage: 'Curd Formation (50-90 days)', days: '50-90 days', water: '4-5 cm' },
        { stage: 'Curd Maturity (90-110 days)', days: '90-110 days', water: '3-4 cm' }
      ]
    },
    varieties: [
      { name: 'Pusa Snowball', yield: '220-250 q/ha', characteristics: 'White curds, compact', maturity: '100-110 days', height: '40-50 cm' },
      { name: 'Arka Nilachal', yield: '200-230 q/ha', characteristics: 'Purple color, unique', maturity: '95-105 days', height: '38-48 cm' },
      { name: 'Improved Japani', yield: '210-240 q/ha', characteristics: 'Heavy curd, good taste', maturity: '105-115 days', height: '42-52 cm' },
      { name: 'Pusa Shubhra', yield: '190-220 q/ha', characteristics: 'Early maturing, tender', maturity: '90-100 days', height: '35-45 cm' }
    ],
    fertilizer: {
      nitrogen: '130-160 kg/ha',
      phosphorus: '60-80 kg/ha',
      potassium: '60-80 kg/ha',
      schedule: [
        { stage: 'Basal', nutrients: 'All P & K + 1/3 N at transplanting' },
        { stage: '40-45 DAS', nutrients: '1/3 N' },
        { stage: '70-75 DAS', nutrients: '1/3 N' }
      ]
    },
    pestsDiseases: [
      { name: 'Black Rot', type: 'Disease', control: 'Use resistant varieties, improve drainage' },
      { name: 'Cabbage Butterfly', type: 'Pest', control: 'Spray Spinosad 45% SC @ 500 ml/ha' },
      { name: 'Bacterial Leaf Spot', type: 'Disease', control: 'Remove infected leaves, spray Copper' }
    ]
  },
  {
    id: 18,
    name: 'Carrot',
    hindi: 'गाजर',
    season: 'Rabi (Winter)',
    duration: '70-90 days',
    description: 'Carrot is nutritious root vegetable. Rich in beta-carotene and minerals.',
    soil: 'Well-drained, sandy loam, fertile',
    weather: 'Cool climate, 400-600mm rainfall',
    yield: '250-300 quintals/hectare',
    region: 'Punjab, Himachal Pradesh, Haryana, Uttar Pradesh',
    icon: '🥕',
    image: '/images/crops/carrot.jpg',
    irrigation: {
      method: 'Sprinkler, Drip irrigation',
      frequency: '5-7 times per season',
      waterRequired: '300-500 mm',
      bestTime: 'Regular moisture needed',
      schedule: [
        { stage: 'Germination & Growth (0-30 days)', days: '0-30 days', water: '2-3 cm' },
        { stage: 'Root Development (30-70 days)', days: '30-70 days', water: '4-5 cm' }
      ]
    },
    varieties: [
      { name: 'Pusa Kesar', yield: '280-320 q/ha', characteristics: 'Orange, sweet, good storage', maturity: '80-90 days', height: '20-30 cm' },
      { name: 'Nantes', yield: '260-300 q/ha', characteristics: 'Medium size, tender, smooth', maturity: '75-85 days', height: '18-28 cm' },
      { name: 'Red Cored Chantenay', yield: '240-280 q/ha', characteristics: 'Deep orange, short root', maturity: '70-80 days', height: '15-25 cm' },
      { name: 'Imperator', yield: '250-290 q/ha', characteristics: 'Long root, processing variety', maturity: '85-95 days', height: '22-32 cm' }
    ],
    fertilizer: {
      nitrogen: '80-100 kg/ha',
      phosphorus: '50-60 kg/ha',
      potassium: '60-80 kg/ha',
      schedule: [
        { stage: 'Basal', nutrients: 'All nutrients before planting' }
      ]
    },
    pestsDiseases: [
      { name: 'Leaf Blight', type: 'Disease', control: 'Spray Mancozeb 75% WP @ 2000 ml/ha' },
      { name: 'Carrot Fly', type: 'Pest', control: 'Use netting, crop rotation' },
      { name: 'Root Knot Nematode', type: 'Pest', control: 'Use resistant varieties, soil fumigation' }
    ]
  },
  {
    id: 19,
    name: 'Brinjal',
    hindi: 'बैंगन',
    season: 'Kharif/Summer',
    duration: '120-150 days',
    description: 'Brinjal is popular vegetable crop. High yielding, good market returns.',
    soil: 'Well-drained, fertile, loamy soil',
    weather: 'Warm, 500-750mm rainfall',
    yield: '200-250 quintals/hectare',
    region: 'Andhra Pradesh, Maharashtra, Karnataka, Gujarat',
    icon: '🍆',
    image: '/images/crops/brinjal.jpg',
    irrigation: {
      method: 'Drip, Flood irrigation',
      frequency: '6-8 times per season',
      waterRequired: '400-600 mm',
      bestTime: 'Flowering & fruiting critical',
      schedule: [
        { stage: 'Establishment (0-40 days)', days: '0-40 days', water: '3-4 cm' },
        { stage: 'Flowering & Fruiting (40-120 days)', days: '40-120 days', water: '4-5 cm' }
      ]
    },
    varieties: [
      { name: 'Pusa Purple Long', yield: '220-260 q/ha', characteristics: 'Long fruits, high yield', maturity: '120-130 days', height: '60-80 cm' },
      { name: 'Arka Neelam', yield: '200-240 q/ha', characteristics: 'Purple color, compact', maturity: '115-125 days', height: '55-75 cm' },
      { name: 'Pusa Shyamal', yield: '210-250 q/ha', characteristics: 'Round fruits, tender', maturity: '110-120 days', height: '50-70 cm' },
      { name: 'Green Marvel', yield: '190-230 q/ha', characteristics: 'Green variety, unique', maturity: '120-130 days', height: '60-80 cm' }
    ],
    fertilizer: {
      nitrogen: '100-120 kg/ha',
      phosphorus: '60-80 kg/ha',
      potassium: '80-100 kg/ha',
      schedule: [
        { stage: 'Basal', nutrients: 'All P & K + 1/3 N at transplanting' },
        { stage: '45-50 DAS', nutrients: '1/3 N' },
        { stage: '80-85 DAS', nutrients: '1/3 N' }
      ]
    },
    pestsDiseases: [
      { name: 'Shoot Borer', type: 'Pest', control: 'Spray Chlorpyrifos 20% EC @ 1000 ml/ha' },
      { name: 'Fruit Rot', type: 'Disease', control: 'Spray Copper Oxide 50% WP @ 2500 ml/ha' },
      { name: 'Wilt', type: 'Disease', control: 'Use resistant varieties, practice crop rotation' }
    ]
  },
  {
    id: 20,
    name: 'Chili',
    hindi: 'मिर्च',
    season: 'Kharif/Summer',
    duration: '150-180 days',
    description: 'Chili is high-value spice crop. Used in cooking and spice industry.',
    soil: 'Well-drained, fertile, loamy soil',
    weather: 'Warm, 500-750mm rainfall',
    yield: '80-100 quintals/hectare',
    region: 'Andhra Pradesh, Maharashtra, Karnataka, Rajasthan',
    icon: '🌶️',
    image: '/images/crops/chili.jpg',
    irrigation: {
      method: 'Drip, Sprinkler irrigation',
      frequency: '6-8 times per season',
      waterRequired: '400-600 mm',
      bestTime: 'Flowering & fruiting critical',
      schedule: [
        { stage: 'Establishment (0-50 days)', days: '0-50 days', water: '3-4 cm' },
        { stage: 'Flowering & Fruiting (50-150 days)', days: '50-150 days', water: '4-5 cm' }
      ]
    },
    varieties: [
      { name: 'Pusa Jwala', yield: '90-110 q/ha', characteristics: 'Hot chili, high yield', maturity: '160-170 days', height: '60-80 cm' },
      { name: 'Arka Meghna', yield: '80-100 q/ha', characteristics: 'Green chili variety', maturity: '150-160 days', height: '55-75 cm' },
      { name: 'Guntur', yield: '70-90 q/ha', characteristics: 'Premium red chili', maturity: '170-180 days', height: '65-85 cm' },
      { name: 'Kashmiri', yield: '60-80 q/ha', characteristics: 'Mild, good color', maturity: '175-185 days', height: '70-90 cm' }
    ],
    fertilizer: {
      nitrogen: '100-150 kg/ha',
      phosphorus: '60-80 kg/ha',
      potassium: '80-100 kg/ha',
      schedule: [
        { stage: 'Basal', nutrients: 'All P & K + 1/3 N at transplanting' },
        { stage: '45-50 DAS', nutrients: '1/3 N' },
        { stage: '90-100 DAS', nutrients: '1/3 N' }
      ]
    },
    pestsDiseases: [
      { name: 'Die Back', type: 'Disease', control: 'Spray Copper Oxide 50% WP @ 2500 ml/ha' },
      { name: 'Mites', type: 'Pest', control: 'Spray Sulfur dust 90% @ 25 kg/ha' },
      { name: 'Leaf Spot', type: 'Disease', control: 'Spray Mancozeb 75% WP @ 2000 ml/ha' }
    ]
  },
  {
    id: 21,
    name: 'Ginger',
    hindi: 'अदरक',
    season: 'Kharif (Monsoon)',
    duration: '240-270 days',
    description: 'Ginger is important spice and medicinal crop. High market value and demand.',
    soil: 'Well-drained, fertile, loamy soil',
    weather: 'Warm, humid, 1500-2250mm rainfall',
    yield: '200-250 quintals/hectare',
    region: 'Kerala, Odisha, Himachal Pradesh, Assam',
    icon: '🥡',
    image: '/images/crops/ginger.jpg',
    irrigation: {
      method: 'Drip irrigation, Mulching',
      frequency: '4-6 times per season',
      waterRequired: '1500-2000 mm',
      bestTime: 'Regular moisture needed',
      schedule: [
        { stage: 'Sprouting (0-60 days)', days: '0-60 days', water: '5-6 cm' },
        { stage: 'Growth (60-150 days)', days: '60-150 days', water: '6-7 cm' },
        { stage: 'Rhizome Bulking (150-240 days)', days: '150-240 days', water: '7-8 cm' }
      ]
    },
    varieties: [
      { name: 'Himachal', yield: '220-250 q/ha', characteristics: 'Bold rhizomes, good quality', maturity: '250-260 days', height: '40-50 cm' },
      { name: 'Megha', yield: '200-240 q/ha', characteristics: 'High yield, disease resistant', maturity: '240-250 days', height: '38-48 cm' },
      { name: 'Rio de Janeiro', yield: '190-230 q/ha', characteristics: 'Large rhizomes, processing', maturity: '260-270 days', height: '42-52 cm' },
      { name: 'Surromundo', yield: '180-220 q/ha', characteristics: 'Disease resistant, stable', maturity: '250-260 days', height: '40-50 cm' }
    ],
    fertilizer: {
      nitrogen: '100-120 kg/ha',
      phosphorus: '60-80 kg/ha',
      potassium: '100-150 kg/ha',
      schedule: [
        { stage: 'Basal', nutrients: 'All nutrients with FYM 25 t/ha' }
      ]
    },
    pestsDiseases: [
      { name: 'Leaf Blotch', type: 'Disease', control: 'Spray Mancozeb 75% WP @ 2000 ml/ha' },
      { name: 'Shoot Borer', type: 'Pest', control: 'Spray Chlorpyrifos 20% EC @ 1000 ml/ha' },
      { name: 'Rhizome Rot', type: 'Disease', control: 'Improve drainage, use disease-free seed' }
    ]
  },
  {
    id: 22,
    name: 'Turmeric',
    hindi: 'हल्दी',
    season: 'Kharif (Monsoon)',
    duration: '200-250 days',
    description: 'Turmeric is golden spice with medicinal properties. Important cash crop in India.',
    soil: 'Well-drained, fertile, loamy soil',
    weather: 'Warm, humid, 1500-2250mm rainfall',
    yield: '200-250 quintals/hectare',
    region: 'Telangana, Maharashtra, Odisha, Karnataka',
    icon: '🟡',
    image: '/images/crops/turmeric.jpg',
    irrigation: {
      method: 'Drip irrigation, Mulching',
      frequency: '4-6 times per season',
      waterRequired: '1500-2000 mm',
      bestTime: 'Regular moisture needed',
      schedule: [
        { stage: 'Sprouting (0-60 days)', days: '0-60 days', water: '5-6 cm' },
        { stage: 'Growth (60-150 days)', days: '60-150 days', water: '6-7 cm' },
        { stage: 'Rhizome Bulking (150-200 days)', days: '150-200 days', water: '7-8 cm' }
      ]
    },
    varieties: [
      { name: 'Suguna', yield: '220-250 q/ha', characteristics: 'High curcumin content', maturity: '220-240 days', height: '50-60 cm' },
      { name: 'Megha', yield: '200-240 q/ha', characteristics: 'Bold rhizomes, disease resistant', maturity: '200-220 days', height: '48-58 cm' },
      { name: 'Alleppey', yield: '180-220 q/ha', characteristics: 'Superior quality, high demand', maturity: '240-250 days', height: '52-62 cm' },
      { name: 'Salem', yield: '190-230 q/ha', characteristics: 'Processing variety, stable', maturity: '220-240 days', height: '50-60 cm' }
    ],
    fertilizer: {
      nitrogen: '100-120 kg/ha',
      phosphorus: '60-80 kg/ha',
      potassium: '100-150 kg/ha',
      schedule: [
        { stage: 'Basal', nutrients: 'All nutrients with FYM 25 t/ha' }
      ]
    },
    pestsDiseases: [
      { name: 'Leaf Spot', type: 'Disease', control: 'Spray Bordeaux Mixture 1% weekly' },
      { name: 'Shoot Borer', type: 'Pest', control: 'Spray Chlorpyrifos 20% EC @ 1000 ml/ha' },
      { name: 'Rhizome Rot', type: 'Disease', control: 'Improve drainage, crop rotation' }
    ]
  },
  {
    id: 23,
    name: 'Garlic',
    hindi: 'लहसुन',
    season: 'Rabi (Winter)',
    duration: '150-180 days',
    description: 'Garlic is popular spice and vegetable. Used in cooking and medicine.',
    soil: 'Well-drained, fertile, loamy soil',
    weather: 'Cool climate, 500-750mm rainfall',
    yield: '80-100 quintals/hectare',
    region: 'Gujarat, Madhya Pradesh, Rajasthan, Uttar Pradesh',
    icon: '🧄',
    image: '/images/crops/garlic.jpg',
    irrigation: {
      method: 'Flood irrigation, Drip',
      frequency: '5-7 times per season',
      waterRequired: '400-500 mm',
      bestTime: 'Bulb development critical',
      schedule: [
        { stage: 'Sprouting & Growth (0-60 days)', days: '0-60 days', water: '3-4 cm' },
        { stage: 'Bulb Formation (60-120 days)', days: '60-120 days', water: '4-5 cm' },
        { stage: 'Maturity (120-150 days)', days: '120-150 days', water: '2-3 cm' }
      ]
    },
    varieties: [
      { name: 'Rajendra Jyoti', yield: '90-110 q/ha', characteristics: 'Bold cloves, good storage', maturity: '160-170 days', height: '40-50 cm' },
      { name: 'Yamuna Safed', yield: '80-100 q/ha', characteristics: 'White color, long storage', maturity: '150-160 days', height: '38-48 cm' },
      { name: 'G-282', yield: '75-95 q/ha', characteristics: 'Purple tinge, disease resistant', maturity: '160-170 days', height: '40-50 cm' },
      { name: 'Bhima Purple', yield: '85-105 q/ha', characteristics: 'Purple garlic, unique', maturity: '165-175 days', height: '42-52 cm' }
    ],
    fertilizer: {
      nitrogen: '80-100 kg/ha',
      phosphorus: '50-60 kg/ha',
      potassium: '60-80 kg/ha',
      schedule: [
        { stage: 'Basal', nutrients: 'All P & K + 1/2 N at planting' },
        { stage: '60-75 DAS', nutrients: '1/2 N' }
      ]
    },
    pestsDiseases: [
      { name: 'Purple Blotch', type: 'Disease', control: 'Spray Mancozeb 75% WP @ 2000 ml/ha' },
      { name: 'Thrips', type: 'Pest', control: 'Spray Acephate 75% SP @ 1000 ml/ha' },
      { name: 'Basal Rot', type: 'Disease', control: 'Treat bulbs before planting, proper drainage' }
    ]
  },
  {
    id: 24,
    name: 'Cucumber',
    hindi: 'खीरा',
    season: 'Kharif/Summer',
    duration: '50-70 days',
    description: 'Cucumber is summer vegetable crop. Quick-growing, high-yielding crop.',
    soil: 'Well-drained, fertile, loamy soil',
    weather: 'Warm, 500-750mm rainfall',
    yield: '200-250 quintals/hectare',
    region: 'Karnataka, Gujarat, Maharashtra, Himachal Pradesh',
    icon: '🥒',
    image: '/images/crops/cucumber.jpg',
    irrigation: {
      method: 'Drip irrigation, Sprinkler',
      frequency: '6-8 times per season',
      waterRequired: '400-600 mm',
      bestTime: 'Regular moisture for quality fruit',
      schedule: [
        { stage: 'Growth (0-30 days)', days: '0-30 days', water: '3-4 cm' },
        { stage: 'Flowering & Fruiting (30-60 days)', days: '30-60 days', water: '4-5 cm' }
      ]
    },
    varieties: [
      { name: 'Poinsett', yield: '220-260 q/ha', characteristics: 'Long dark green, crispy', maturity: '55-65 days', height: 'Vining' },
      { name: 'Safed Puri', yield: '200-240 q/ha', characteristics: 'White cucumber, unique', maturity: '50-60 days', height: 'Vining' },
      { name: 'Green Cluster', yield: '210-250 q/ha', characteristics: 'Cluster fruiting, prolific', maturity: '55-65 days', height: 'Vining' },
      { name: 'Kuroda', yield: '190-230 q/ha', characteristics: 'Japanese hybrid, tender', maturity: '60-70 days', height: 'Vining' }
    ],
    fertilizer: {
      nitrogen: '100-120 kg/ha',
      phosphorus: '60-80 kg/ha',
      potassium: '80-100 kg/ha',
      schedule: [
        { stage: 'Basal', nutrients: 'All P & K + 1/2 N at planting' },
        { stage: '30-35 DAS', nutrients: '1/2 N' }
      ]
    },
    pestsDiseases: [
      { name: 'Powdery Mildew', type: 'Disease', control: 'Spray Sulfur dust 90% @ 25 kg/ha' },
      { name: 'Spider Mites', type: 'Pest', control: 'Spray Neem Oil 3% @ 1000 ml/ha' },
      { name: 'Anthracnose', type: 'Disease', control: 'Spray Copper Oxide 50% WP @ 2500 ml/ha' }
    ]
  },
  {
    id: 25,
    name: 'Melon',
    hindi: 'खरबूजा',
    season: 'Summer',
    duration: '80-100 days',
    description: 'Melon is summer fruit crop. Sweet taste, high nutritional value.',
    soil: 'Well-drained, sandy loam, fertile',
    weather: 'Hot, 400-600mm rainfall',
    yield: '200-250 quintals/hectare',
    region: 'Punjab, Haryana, Uttar Pradesh, Rajasthan',
    icon: '🍈',
    image: '/images/crops/melon.jpg',
    irrigation: {
      method: 'Drip irrigation, Furrow',
      frequency: '6-8 times per season',
      waterRequired: '400-600 mm',
      bestTime: 'Flowering & fruit development',
      schedule: [
        { stage: 'Growth (0-30 days)', days: '0-30 days', water: '4-5 cm' },
        { stage: 'Flowering & Fruiting (30-80 days)', days: '30-80 days', water: '5-6 cm' }
      ]
    },
    varieties: [
      { name: 'Hara Madhu', yield: '220-260 q/ha', characteristics: 'Green flesh, sweet, aromatic', maturity: '85-95 days', height: 'Vining' },
      { name: 'Pusa Madhuras', yield: '200-240 q/ha', characteristics: 'Golden color, high TSS', maturity: '80-90 days', height: 'Vining' },
      { name: 'Galia', yield: '190-230 q/ha', characteristics: 'Netted rind, tender flesh', maturity: '90-100 days', height: 'Vining' },
      { name: 'Honeydew', yield: '180-220 q/ha', characteristics: 'Yellow flesh, processing', maturity: '95-105 days', height: 'Vining' }
    ],
    fertilizer: {
      nitrogen: '80-100 kg/ha',
      phosphorus: '60-80 kg/ha',
      potassium: '80-100 kg/ha',
      schedule: [
        { stage: 'Basal', nutrients: 'All P & K + 1/2 N at planting' },
        { stage: '35-40 DAS', nutrients: '1/2 N' }
      ]
    },
    pestsDiseases: [
      { name: 'Powdery Mildew', type: 'Disease', control: 'Spray Sulfur dust 90% @ 25 kg/ha' },
      { name: 'Fruit Fly', type: 'Pest', control: 'Use fruit covers, remove affected fruits' },
      { name: 'Anthracnose', type: 'Disease', control: 'Spray Copper Oxide 50% WP @ 2500 ml/ha' }
    ]
  },
  {
    id: 26,
    name: 'Watermelon',
    hindi: 'तरबूज',
    season: 'Summer',
    duration: '70-90 days',
    description: 'Watermelon is refreshing summer fruit. High water content, cooling effect.',
    soil: 'Well-drained, sandy loam, fertile',
    weather: 'Hot, 400-600mm rainfall',
    yield: '250-300 quintals/hectare',
    region: 'Punjab, Haryana, Rajasthan, Uttar Pradesh',
    icon: '🍉',
    image: '/images/crops/watermelon.jpg',
    irrigation: {
      method: 'Drip irrigation, Furrow',
      frequency: '6-8 times per season',
      waterRequired: '400-600 mm',
      bestTime: 'Flowering & fruit development',
      schedule: [
        { stage: 'Growth (0-25 days)', days: '0-25 days', water: '4-5 cm' },
        { stage: 'Flowering & Fruiting (25-70 days)', days: '25-70 days', water: '5-6 cm' }
      ]
    },
    varieties: [
      { name: 'Arka Jyoti', yield: '280-320 q/ha', characteristics: 'Red flesh, crispy, sweet', maturity: '75-85 days', height: 'Vining' },
      { name: 'Pusa Bedana', yield: '260-300 q/ha', characteristics: 'Seedless, high quality', maturity: '80-90 days', height: 'Vining' },
      { name: 'Yellow King', yield: '240-280 q/ha', characteristics: 'Yellow flesh, unique', maturity: '75-85 days', height: 'Vining' },
      { name: 'Sugar Baby', yield: '220-260 q/ha', characteristics: 'Small, round, sweet', maturity: '70-80 days', height: 'Vining' }
    ],
    fertilizer: {
      nitrogen: '80-100 kg/ha',
      phosphorus: '60-80 kg/ha',
      potassium: '80-100 kg/ha',
      schedule: [
        { stage: 'Basal', nutrients: 'All P & K + 1/2 N at planting' },
        { stage: '35-40 DAS', nutrients: '1/2 N' }
      ]
    },
    pestsDiseases: [
      { name: 'Powdery Mildew', type: 'Disease', control: 'Spray Sulfur dust 90% @ 25 kg/ha' },
      { name: 'Fruit Fly', type: 'Pest', control: 'Use fruit covers, pheromone traps' },
      { name: 'Leaf Spot', type: 'Disease', control: 'Spray Mancozeb 75% WP @ 2000 ml/ha' }
    ]
  },
  {
    id: 27,
    name: 'Pumpkin',
    hindi: 'कद्दू',
    season: 'Kharif/Summer',
    duration: '100-120 days',
    description: 'Pumpkin is nutrient-rich vegetable crop. Used for food and animal feed.',
    soil: 'Well-drained, fertile, loamy soil',
    weather: 'Warm, 500-750mm rainfall',
    yield: '300-400 quintals/hectare',
    region: 'Uttar Pradesh, Bihar, Rajasthan, Gujarat',
    icon: '🎃',
    image: '/images/crops/pumpkin.jpg',
    irrigation: {
      method: 'Drip irrigation, Furrow',
      frequency: '5-7 times per season',
      waterRequired: '400-600 mm',
      bestTime: 'Flowering & fruit development',
      schedule: [
        { stage: 'Growth (0-40 days)', days: '0-40 days', water: '4-5 cm' },
        { stage: 'Flowering & Fruiting (40-100 days)', days: '40-100 days', water: '5-6 cm' }
      ]
    },
    varieties: [
      { name: 'Pusa Virat', yield: '350-400 q/ha', characteristics: 'Large fruits, high yield', maturity: '110-120 days', height: 'Vining' },
      { name: 'Arka Chitra', yield: '300-350 q/ha', characteristics: 'Orange flesh, good taste', maturity: '100-110 days', height: 'Vining' },
      { name: 'Sweetnut', yield: '280-330 q/ha', characteristics: 'Small, sweet, processing', maturity: '95-105 days', height: 'Vining' },
      { name: 'Pusa Kumhar', yield: '320-370 q/ha', characteristics: 'Gold colored, storage', maturity: '105-115 days', height: 'Vining' }
    ],
    fertilizer: {
      nitrogen: '80-100 kg/ha',
      phosphorus: '60-80 kg/ha',
      potassium: '80-100 kg/ha',
      schedule: [
        { stage: 'Basal', nutrients: 'All P & K + 1/2 N at planting' },
        { stage: '40-45 DAS', nutrients: '1/2 N' }
      ]
    },
    pestsDiseases: [
      { name: 'Powdery Mildew', type: 'Disease', control: 'Spray Sulfur dust 90% @ 25 kg/ha' },
      { name: 'Fruit Fly', type: 'Pest', control: 'Use fruit covers, remove infected fruits' },
      { name: 'Mosaic Virus', type: 'Disease', control: 'Control whitefly/aphids, use resistant varieties' }
    ]
  },
  {
    id: 28,
    name: 'Spinach',
    hindi: 'पालक',
    season: 'Rabi (Winter)',
    duration: '40-50 days',
    description: 'Spinach is leafy green vegetable. Rich in iron and minerals.',
    soil: 'Well-drained, fertile, loamy soil',
    weather: 'Cool climate, 400-600mm rainfall',
    yield: '150-200 quintals/hectare',
    region: 'Punjab, Haryana, Uttar Pradesh, Himachal Pradesh',
    icon: '🥬',
    image: '/images/crops/spinach.jpg',
    irrigation: {
      method: 'Sprinkler, Drip irrigation',
      frequency: '4-6 times per season',
      waterRequired: '300-400 mm',
      bestTime: 'Regular moisture needed',
      schedule: [
        { stage: 'Growth (0-40 days)', days: '0-40 days', water: '3-4 cm' }
      ]
    },
    varieties: [
      { name: 'Pusa Jyoti', yield: '180-220 q/ha', characteristics: 'Dark green, tender leaves', maturity: '45-50 days', height: '20-30 cm' },
      { name: 'Pusa Bhagirath', yield: '160-200 q/ha', characteristics: 'Smooth leaves, good taste', maturity: '40-45 days', height: '18-28 cm' },
      { name: 'Savoy', yield: '140-180 q/ha', characteristics: 'Curled leaves, traditional', maturity: '45-50 days', height: '20-30 cm' },
      { name: 'Long Standing', yield: '150-190 q/ha', characteristics: 'Bolt resistant, stable', maturity: '48-55 days', height: '22-32 cm' }
    ],
    fertilizer: {
      nitrogen: '80-100 kg/ha',
      phosphorus: '40-60 kg/ha',
      potassium: '40-60 kg/ha',
      schedule: [
        { stage: 'Basal', nutrients: 'All nutrients before planting' }
      ]
    },
    pestsDiseases: [
      { name: 'Damping Off', type: 'Disease', control: 'Treat seeds with Trichoderma before sowing' },
      { name: 'Leaf Spot', type: 'Disease', control: 'Spray Mancozeb 75% WP @ 2000 ml/ha' },
      { name: 'Aphids', type: 'Pest', control: 'Spray Imidacloprid 17.8% SL @ 600 ml/ha' }
    ]
  },
  {
    id: 29,
    name: 'Lettuce',
    hindi: 'लेटिस',
    season: 'Rabi (Winter)',
    duration: '45-60 days',
    description: 'Lettuce is salad vegetable crop. Growing popularity in Indian cities.',
    soil: 'Well-drained, fertile, loamy soil',
    weather: 'Cool climate, 400-600mm rainfall',
    yield: '200-250 quintals/hectare',
    region: 'Himachal Pradesh, Kashmir, Uttar Pradesh, Punjab',
    icon: '🥗',
    image: '/images/crops/lettuce.jpg',
    irrigation: {
      method: 'Sprinkler, Drip irrigation',
      frequency: '4-6 times per season',
      waterRequired: '300-400 mm',
      bestTime: 'Regular moisture needed',
      schedule: [
        { stage: 'Growth (0-50 days)', days: '0-50 days', water: '3-4 cm' }
      ]
    },
    varieties: [
      { name: 'Iceberg', yield: '220-260 q/ha', characteristics: 'Crisp head, light green', maturity: '55-60 days', height: '25-35 cm' },
      { name: 'Salad Bowl', yield: '200-240 q/ha', characteristics: 'Loose leaf, tender', maturity: '50-55 days', height: '20-30 cm' },
      { name: 'Buttercrunch', yield: '190-230 q/ha', characteristics: 'Butterhead type, smooth', maturity: '55-60 days', height: '22-32 cm' },
      { name: 'Red Oak', yield: '180-220 q/ha', characteristics: 'Red leaves, unique color', maturity: '50-55 days', height: '20-30 cm' }
    ],
    fertilizer: {
      nitrogen: '80-100 kg/ha',
      phosphorus: '40-60 kg/ha',
      potassium: '40-60 kg/ha',
      schedule: [
        { stage: 'Basal', nutrients: 'All nutrients before transplanting' }
      ]
    },
    pestsDiseases: [
      { name: 'Damping Off', type: 'Disease', control: 'Use sterilized seed bed, proper drainage' },
      { name: 'Leaf Spot', type: 'Disease', control: 'Spray Mancozeb 75% WP @ 2000 ml/ha' },
      { name: 'Aphids', type: 'Pest', control: 'Spray Neem Oil 3% @ 1000 ml/ha' }
    ]
  },
  {
    id: 30,
    name: 'Peas',
    hindi: 'मटर',
    season: 'Rabi (Winter)',
    duration: '60-75 days',
    description: 'Peas are nutrient-rich legume vegetable. Sweet taste, good market demand.',
    soil: 'Well-drained, fertile, loamy soil',
    weather: 'Cool climate, 400-600mm rainfall',
    yield: '100-120 quintals/hectare',
    region: 'Himachal Pradesh, Uttar Pradesh, Punjab, Haryana',
    icon: '🫛',
    image: '/images/crops/peas.jpg',
    irrigation: {
      method: 'Sprinkler, Flood irrigation',
      frequency: '3-4 times per season',
      waterRequired: '300-400 mm',
      bestTime: 'Flowering & pod formation',
      schedule: [
        { stage: 'Growth (0-40 days)', days: '0-40 days', water: '2-3 cm' },
        { stage: 'Flowering & Podding (40-70 days)', days: '40-70 days', water: '3-4 cm' }
      ]
    },
    varieties: [
      { name: 'Pusa Pragati', yield: '110-130 q/ha', characteristics: 'High yield, sweet taste', maturity: '65-75 days', height: '60-80 cm' },
      { name: 'Arkel', yield: '100-120 q/ha', characteristics: 'Bold peas, good quality', maturity: '70-75 days', height: '70-90 cm' },
      { name: 'Arka Samrat', yield: '95-115 q/ha', characteristics: 'Dwarf plant, processing', maturity: '60-70 days', height: '50-70 cm' },
      { name: 'Lincoln', yield: '90-110 q/ha', characteristics: 'Traditional, stable yield', maturity: '65-75 days', height: '65-85 cm' }
    ],
    fertilizer: {
      nitrogen: '40-60 kg/ha',
      phosphorus: '50-60 kg/ha',
      potassium: '30-40 kg/ha',
      schedule: [
        { stage: 'Basal', nutrients: 'All nutrients at planting' }
      ]
    },
    pestsDiseases: [
      { name: 'Powdery Mildew', type: 'Disease', control: 'Spray Sulfur dust 90% @ 25 kg/ha' },
      { name: 'Pod Borer', type: 'Pest', control: 'Spray Chlorpyrifos 20% EC @ 1000 ml/ha' },
      { name: 'Leaf Spot', type: 'Disease', control: 'Spray Mancozeb 75% WP @ 2000 ml/ha' }
    ]
  },
  {
    id: 31,
    name: 'Beans',
    hindi: 'सेम',
    season: 'Kharif (Monsoon)',
    duration: '60-80 days',
    description: 'Beans are protein-rich legume vegetable. Quick-growing, good market returns.',
    soil: 'Well-drained, fertile, loamy soil',
    weather: 'Warm, 500-750mm rainfall',
    yield: '80-100 quintals/hectare',
    region: 'Maharashtra, Karnataka, Gujarat, Andhra Pradesh',
    icon: '🫘',
    image: '/images/crops/beans.jpg',
    irrigation: {
      method: 'Drip, Sprinkler irrigation',
      frequency: '4-6 times per season',
      waterRequired: '400-500 mm',
      bestTime: 'Flowering & pod formation',
      schedule: [
        { stage: 'Growth (0-30 days)', days: '0-30 days', water: '3-4 cm' },
        { stage: 'Flowering & Podding (30-70 days)', days: '30-70 days', water: '4-5 cm' }
      ]
    },
    varieties: [
      { name: 'Pusa 707', yield: '95-110 q/ha', characteristics: 'Long pods, tender, high yield', maturity: '70-80 days', height: '60-80 cm' },
      { name: 'Contender', yield: '85-100 q/ha', characteristics: 'Dwarf bush, compact', maturity: '60-70 days', height: '40-50 cm' },
      { name: 'Yard Long', yield: '80-95 q/ha', characteristics: 'Very long pods, unique', maturity: '75-85 days', height: '80-100 cm' },
      { name: 'Pant Anupama', yield: '90-105 q/ha', characteristics: 'Pod variety, processing', maturity: '70-80 days', height: '60-80 cm' }
    ],
    fertilizer: {
      nitrogen: '40-60 kg/ha',
      phosphorus: '50-60 kg/ha',
      potassium: '40-50 kg/ha',
      schedule: [
        { stage: 'Basal', nutrients: 'All nutrients at planting' }
      ]
    },
    pestsDiseases: [
      { name: 'Pod Borer', type: 'Pest', control: 'Spray Chlorpyrifos 20% EC @ 1000 ml/ha' },
      { name: 'Anthracnose', type: 'Disease', control: 'Spray Copper Oxide 50% WP @ 2500 ml/ha' },
      { name: 'Leaf Spot', type: 'Disease', control: 'Spray Mancozeb 75% WP @ 2000 ml/ha' }
    ]
  },
  {
    id: 32,
    name: 'Okra',
    hindi: 'भिंडी',
    season: 'Kharif/Summer',
    duration: '90-120 days',
    description: 'Okra is popular summer vegetable. Nutritious, high-yielding crop.',
    soil: 'Well-drained, fertile, loamy soil',
    weather: 'Warm, 500-750mm rainfall',
    yield: '100-120 quintals/hectare',
    region: 'Bihar, Uttar Pradesh, Punjab, Gujarat',
    icon: '🌿',
    image: '/images/crops/okra.jpg',
    irrigation: {
      method: 'Drip, Flood irrigation',
      frequency: '6-8 times per season',
      waterRequired: '400-600 mm',
      bestTime: 'Regular moisture for quality fruit',
      schedule: [
        { stage: 'Growth (0-40 days)', days: '0-40 days', water: '3-4 cm' },
        { stage: 'Flowering & Fruiting (40-100 days)', days: '40-100 days', water: '4-5 cm' }
      ]
    },
    varieties: [
      { name: 'Pusa Sawani', yield: '115-130 q/ha', characteristics: 'High yield, tender pods', maturity: '100-110 days', height: '100-120 cm' },
      { name: 'Clemson Spineless', yield: '100-115 q/ha', characteristics: 'Spineless, smooth, soft', maturity: '95-105 days', height: '90-110 cm' },
      { name: 'Arka Anamika', yield: '105-120 q/ha', characteristics: 'Green variety, good quality', maturity: '100-110 days', height: '100-120 cm' },
      { name: 'Pusa Green', yield: '95-110 q/ha', characteristics: 'Traditional, stable', maturity: '105-115 days', height: '110-130 cm' }
    ],
    fertilizer: {
      nitrogen: '80-100 kg/ha',
      phosphorus: '60-80 kg/ha',
      potassium: '80-100 kg/ha',
      schedule: [
        { stage: 'Basal', nutrients: 'All P & K + 1/2 N at planting' },
        { stage: '40-45 DAS', nutrients: '1/2 N' }
      ]
    },
    pestsDiseases: [
      { name: 'Shoot Borer', type: 'Pest', control: 'Spray Chlorpyrifos 20% EC @ 1000 ml/ha' },
      { name: 'Leaf Hopper', type: 'Pest', control: 'Spray Dimethoate 30% EC @ 1000 ml/ha' },
      { name: 'Yellow Vein Mosaic', type: 'Disease', control: 'Control whitefly, use resistant varieties' }
    ]
  },
  {
    id: 33,
    name: 'Coconut',
    hindi: 'नारियल',
    season: 'Perennial',
    duration: '4-6 years to maturity',
    description: 'Coconut is versatile perennial crop. Used for oil, fiber, food, and animal feed.',
    soil: 'Well-drained, sandy, fertile soil',
    weather: 'Warm, humid, 1000-2500mm rainfall',
    yield: '80-100 nuts/tree/year',
    region: 'Kerala, Tamil Nadu, Odisha, Andhra Pradesh',
    icon: '🥥',
    image: '/images/crops/coconut.jpg',
    irrigation: {
      method: 'Drip irrigation, Rainfed',
      frequency: '4-6 times per year',
      waterRequired: '1000-2000 mm',
      bestTime: 'Regular irrigation in dry season',
      schedule: [
        { stage: 'Year 1-3', days: 'Establishment', water: '6-8 cm monthly' },
        { stage: 'Year 4-6', days: 'Bearing', water: '8-10 cm monthly' },
        { stage: 'Year 6+', days: 'Full bearing', water: '10-12 cm monthly' }
      ]
    },
    varieties: [
      { name: 'West Coast Tall', yield: '100-120 nuts/tree/year', characteristics: 'Tall variety, disease resistant', maturity: '6-8 years', height: '20-25 m' },
      { name: 'East Coast Tall', yield: '90-110 nuts/tree/year', characteristics: 'Tall, prolific bearing', maturity: '6-8 years', height: '20-25 m' },
      { name: 'Dwarf Hybrids', yield: '80-100 nuts/tree/year', characteristics: 'Dwarf, early bearing', maturity: '3-4 years', height: '8-10 m' },
      { name: 'Sri Lanka Dwarf', yield: '70-90 nuts/tree/year', characteristics: 'Dwarf, compact, processing', maturity: '4-5 years', height: '7-9 m' }
    ],
    fertilizer: {
      nitrogen: '150-200 kg/ha/year',
      phosphorus: '80-100 kg/ha/year',
      potassium: '200-250 kg/ha/year',
      schedule: [
        { stage: 'Establishment', nutrients: '50-75 kg N, P, K per tree in splits' },
        { stage: 'Bearing', nutrients: '100-150 kg N, P, K per tree annually' }
      ]
    },
    pestsDiseases: [
      { name: 'Leaf Spot', type: 'Disease', control: 'Spray Bordeaux Mixture 1% quarterly' },
      { name: 'Rhinoceros Beetle', type: 'Pest', control: 'Manual removal, pheromone traps' },
      { name: 'Stem Rot', type: 'Disease', control: 'Remove affected plants, improve drainage' }
    ]
  },
  {
    id: 34,
    name: 'Banana',
    hindi: 'केला',
    season: 'Perennial',
    duration: '9-12 months to first harvest',
    description: 'Banana is popular fruit crop. High nutritional value, year-round production.',
    soil: 'Well-drained, fertile, loamy soil',
    weather: 'Warm, humid, 750-2250mm rainfall',
    yield: '50-60 tonnes/hectare',
    region: 'Tamil Nadu, Maharashtra, Andhra Pradesh, Karnataka',
    icon: '🍌',
    image: '/images/crops/banana.jpg',
    irrigation: {
      method: 'Drip irrigation, Flood',
      frequency: '6-8 times per season',
      waterRequired: '1200-1800 mm',
      bestTime: 'Regular moisture needed throughout',
      schedule: [
        { stage: 'Establishment (0-6 months)', days: '0-6 months', water: '8-10 cm monthly' },
        { stage: 'Growth (6-9 months)', days: '6-9 months', water: '10-12 cm monthly' },
        { stage: 'Flowering & Fruiting (9-12 months)', days: '9-12 months', water: '12-14 cm monthly' }
      ]
    },
    varieties: [
      { name: 'Cavendish', yield: '55-65 t/ha', characteristics: 'Export quality, yellow fruit', maturity: '11-12 months', height: '2-2.5 m' },
      { name: 'Robusta', yield: '50-60 t/ha', characteristics: 'Disease resistant, good quality', maturity: '10-11 months', height: '2-2.2 m' },
      { name: 'Rasthali', yield: '40-50 t/ha', characteristics: 'Small fruit, local variety', maturity: '9-10 months', height: '1.5-2 m' },
      { name: 'Grand Naine', yield: '48-58 t/ha', characteristics: 'Hybrid, disease resistant', maturity: '10-12 months', height: '2-2.3 m' }
    ],
    fertilizer: {
      nitrogen: '200-300 kg/ha/year',
      phosphorus: '100-150 kg/ha/year',
      potassium: '300-400 kg/ha/year',
      schedule: [
        { stage: 'Establishment', nutrients: 'Split into 3-4 applications' },
        { stage: 'Production', nutrients: 'Split into 4-5 applications' }
      ]
    },
    pestsDiseases: [
      { name: 'Leaf Spot', type: 'Disease', control: 'Spray Mancozeb 75% WP @ 2000 ml/ha' },
      { name: 'Stem Borer', type: 'Pest', control: 'Remove affected pseudostems' },
      { name: 'Panama Wilt', type: 'Disease', control: 'Use resistant varieties, soil sterilization' }
    ]
  },
  {
    id: 35,
    name: 'Mango',
    hindi: 'आम',
    season: 'Perennial',
    duration: '3-4 years to first fruit',
    description: 'Mango is king of fruits. High commercial value, grown across India.',
    soil: 'Well-drained, fertile, loamy soil',
    weather: 'Warm, 500-2250mm rainfall',
    yield: '40-80 tonnes/hectare',
    region: 'Uttar Pradesh, Andhra Pradesh, Karnataka, Maharashtra',
    icon: '🥭',
    image: '/images/crops/mango.jpg',
    irrigation: {
      method: 'Drip irrigation, Flood',
      frequency: '4-6 times per year',
      waterRequired: '800-1500 mm',
      bestTime: 'Regular irrigation in dry season',
      schedule: [
        { stage: 'Establishment (Year 1-3)', days: '1-3 years', water: '6-8 cm monthly' },
        { stage: 'Flowering (Feb-April)', days: 'Feb-April', water: 'Restricted' },
        { stage: 'Fruit Development (May-Sept)', days: 'May-Sept', water: '10-12 cm monthly' }
      ]
    },
    varieties: [
      { name: 'Alphonso', yield: '50-70 t/ha', characteristics: 'Premium variety, high price', maturity: '3-4 years to fruit', height: '10-12 m' },
      { name: 'Dashehari', yield: '45-65 t/ha', characteristics: 'Long shelf life, good taste', maturity: '4-5 years to fruit', height: '12-15 m' },
      { name: 'Langra', yield: '40-60 t/ha', characteristics: 'Golden color, popular', maturity: '4-5 years to fruit', height: '12-15 m' },
      { name: 'Kesar', yield: '35-55 t/ha', characteristics: 'Saffron color, unique taste', maturity: '4-5 years to fruit', height: '10-12 m' }
    ],
    fertilizer: {
      nitrogen: '200-300 kg/ha/year',
      phosphorus: '80-120 kg/ha/year',
      potassium: '200-300 kg/ha/year',
      schedule: [
        { stage: 'Young Trees', nutrients: '50-100 kg N, P, K per tree split annually' },
        { stage: 'Bearing Trees', nutrients: '150-250 kg N, P, K per tree split annually' }
      ]
    },
    pestsDiseases: [
      { name: 'Powdery Mildew', type: 'Disease', control: 'Spray Sulfur dust 90% @ 25 kg/ha during flowering' },
      { name: 'Fruit Fly', type: 'Pest', control: 'Bagging fruits, removal of fallen fruits' },
      { name: 'Anthracnose', type: 'Disease', control: 'Spray Copper Oxide 50% WP @ 2500 ml/ha' }
    ]
  }
];

export default cropsData;