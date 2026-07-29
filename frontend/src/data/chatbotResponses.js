// Chatbot knowledge base with farming solutions
export const chatbotResponses = {
  // Greetings
  greeting: [
    "नमस्ते! 👋 मैं आपका कृषि सहायक हूँ। कृपया मुझे बताएं कि आपको क्या मदद चाहिए? (Tell me how I can help you with your farming!)",
    "स्वागत है! 🌾 मैं आपकी फसल से संबंधित किसी भी समस्या में मदद कर सकता हूँ।",
    "नमस्ते किसान भाई/बहन! 👨‍🌾 आपकी सेवा में हूँ। क्या कोई समस्या है?"
  ],

  // Crop Information
  crop_info: {
    wheat: {
      name: "Wheat (गेहूँ)",
      season: "Rabi (सर्दी)",
      plantingTime: "October-November",
      harvestTime: "March-April",
      waterNeeds: "3-4 irrigations",
      fertilizer: "100-120 kg Nitrogen per hectare",
      yield: "40-50 quintals/hectare"
    },
    rice: {
      name: "Rice (चावल/तांदूळ)",
      season: "Kharif (बारिश)",
      plantingTime: "June-July",
      harvestTime: "September-October",
      waterNeeds: "Flooded fields (5cm water)",
      fertilizer: "60-100 kg Nitrogen per hectare",
      yield: "50-60 quintals/hectare"
    },
    cotton: {
      name: "Cotton (कपास)",
      season: "Kharif",
      plantingTime: "May-June",
      harvestTime: "November-January",
      waterNeeds: "6-8 irrigations",
      fertilizer: "100-120 kg Nitrogen per hectare",
      yield: "15-20 quintals/hectare"
    },
    potato: {
      name: "Potato (आलू)",
      season: "Rabi",
      plantingTime: "September-October",
      harvestTime: "December-January",
      waterNeeds: "4-5 irrigations",
      fertilizer: "100-120 kg Nitrogen per hectare",
      yield: "200-250 quintals/hectare"
    },
    tomato: {
      name: "Tomato (टमाटर)",
      season: "Year-round",
      plantingTime: "February-March / June-July",
      harvestTime: "May-July / September-November",
      waterNeeds: "Every 7-10 days",
      fertilizer: "80-100 kg Nitrogen per hectare",
      yield: "30-40 tonnes/hectare"
    }
  },

  // Disease Solutions
  diseases: {
    "wheat_rust": {
      crop: "Wheat",
      disease: "Rust (रस्ट/गेहूँ का लाल रंग)",
      symptoms: "Reddish-brown pustules on leaves and stems",
      cause: "Fungal infection (Puccinia species)",
      solution: [
        "🔴 Spray Propiconazole 1ml per liter of water",
        "🔴 Use resistant varieties like WH 1105, DBW 187",
        "🔴 Spray at first sign of disease",
        "🔴 Repeat spraying after 10-15 days if needed",
        "🔴 Ensure good drainage and air circulation"
      ],
      prevention: "Use disease-free seeds, crop rotation, early planting"
    },

    "rice_blast": {
      crop: "Rice",
      disease: "Blast (चावल की खैरा बीमारी)",
      symptoms: "Oval lesions on leaves, whitish appearance, grain infection",
      cause: "Fungal infection (Magnaporthe oryzae)",
      solution: [
        "🔴 Spray Tricyclazole 75% WP at 1g per liter",
        "🔴 Spray Azoxystrobin alternative",
        "🔴 Drain fields for 5-7 days before flowering",
        "🔴 Use blast-resistant varieties",
        "🔴 Maintain proper spacing for air circulation"
      ],
      prevention: "Use resistant varieties, balanced nitrogen application, avoid excess water"
    },

    "cotton_wilt": {
      crop: "Cotton",
      disease: "Fusarium Wilt (कपास में सड़न/मुरझाना)",
      symptoms: "Yellow leaves, wilting of branches, brown discoloration in stem",
      cause: "Soil fungus (Fusarium oxysporum)",
      solution: [
        "🔴 Uproot and burn infected plants immediately",
        "🔴 Use wilt-resistant varieties",
        "🔴 Practice crop rotation for 2-3 years",
        "🔴 Use certified disease-free seeds",
        "🔴 Improve soil drainage, avoid waterlogging"
      ],
      prevention: "Seed treatment with fungicide, crop rotation, resistant varieties"
    },

    "potato_blight": {
      crop: "Potato",
      disease: "Late Blight (आलू का लेट ब्लाइट)",
      symptoms: "Water-soaked lesions on leaves and tubers, white mold on underside",
      cause: "Oomycete (Phytophthora infestans)",
      solution: [
        "🔴 Spray Metalaxyl 8% + Mancozeb 64% at 2.5g per liter",
        "🔴 Spray Bordeaux mixture 1% alternatively",
        "🔴 Remove infected leaves immediately",
        "🔴 Improve air circulation and drainage",
        "🔴 Avoid overhead irrigation"
      ],
      prevention: "Use resistant varieties, seed treatment, avoid excess water, proper spacing"
    },

    "tomato_early_blight": {
      crop: "Tomato",
      disease: "Early Blight (टमाटर का अर्लीब्लाइट)",
      symptoms: "Brown spots with concentric rings on lower leaves",
      cause: "Fungal infection (Alternaria solani)",
      solution: [
        "🔴 Remove infected leaves and burn them",
        "🔴 Spray Mancozeb 2.5g per liter water",
        "🔴 Spray Copper fungicide alternatively",
        "🔴 Ensure proper spacing between plants",
        "🔴 Avoid wetting foliage, irrigate at base"
      ],
      prevention: "Use resistant varieties, crop rotation, proper spacing, remove debris"
    }
  },

  // Pest Solutions
  pests: {
    "stem_borer": {
      crop: "Multiple (Wheat, Maize, Rice, Cotton)",
      pest: "Stem Borer (तना छेदक कीट)",
      symptoms: "White ears, deadhearts, holes in stems, damaged tillers",
      damage: "Larvae tunnel inside stems, causing plant death",
      solution: [
        "🔴 Spray Chlorpyrifos 2ml per liter at boot stage",
        "🔴 Spray Monocrotophos 36 SL at 45, 90, 120 days",
        "🔴 Remove infected shoots and burn them",
        "🔴 Use pheromone traps",
        "🔴 Light traps to attract and kill adults"
      ],
      prevention: "Early sowing, resistant varieties, crop rotation, remove crop residue"
    },

    "whitefly": {
      crop: "Multiple (Cotton, Tomato, Brinjal, Cabbage)",
      pest: "Whitefly (सफेद मक्खी)",
      symptoms: "Yellowing of leaves, sticky residue (honeydew), stunting",
      damage: "Sap sucking, virus transmission, blackening of leaves",
      solution: [
        "🔴 Spray Imidacloprid 17.8 SL at 0.5ml per liter",
        "🔴 Use yellow sticky traps (25-30 per hectare)",
        "🔴 Spray Neem oil 3% (30ml per liter)",
        "🔴 Remove and destroy heavily infested plants",
        "🔴 Use blue mulch to confuse adults"
      ],
      prevention: "Yellow sticky traps, resistant varieties, spray when population is low"
    },

    "armyworm": {
      crop: "Wheat, Maize, Crops",
      pest: "Armyworm (फौज कीट)",
      symptoms: "Irregular holes in leaves, skeletonization, seedling damage",
      damage: "Larvae feed on leaves, causing severe defoliation",
      solution: [
        "🔴 Spray Chlorpyrifos 2ml per liter",
        "🔴 Spray Spinosad 45 SC at 1ml per liter",
        "🔴 Install light traps to monitor population",
        "🔴 Hand-pick affected plants if population is low",
        "🔴 Spray early morning or late evening"
      ],
      prevention: "Resistant varieties, monitoring, early spraying when seen"
    },

    "pod_borer": {
      crop: "Cotton, Chickpea, Pigeon Pea",
      pest: "Pod Borer (फली छेदक कीट)",
      symptoms: "Holes in pods, damaged seeds, larval droppings",
      damage: "Larvae feed inside pods, reducing seed quality and quantity",
      solution: [
        "🔴 Spray Chlorpyrifos 2ml per liter at pod formation",
        "🔴 Use pheromone traps (4-5 per hectare)",
        "🔴 Install light traps",
        "🔴 Remove and destroy affected pods",
        "🔴 Spray Spinosad alternatively"
      ],
      prevention: "Resistant varieties, pheromone traps from start, monitoring"
    },

    "aphid": {
      crop: "Multiple (All vegetables, cereals)",
      pest: "Aphid (माहू कीट)",
      symptoms: "Curled leaves, yellowing, sticky residue, stunted growth",
      damage: "Sap sucking, virus transmission, honeydew attracts sooty mold",
      solution: [
        "🔴 Spray Imidacloprid 17.8 SL at 0.5ml per liter",
        "🔴 Spray Neem oil 3% (30ml per liter)",
        "🔴 Use yellow sticky traps",
        "🔴 Spray water forcefully to dislodge aphids",
        "🔴 Promote natural enemies (ladybugs, lacewings)"
      ],
      prevention: "Resistant varieties, yellow sticky traps, regular monitoring"
    }
  },

  // General Advice
  general_advice: {
    irrigation: {
      title: "Irrigation Tips (सिंचाई की जानकारी)",
      advice: [
        "💧 Water in early morning or late evening to reduce evaporation",
        "💧 For most crops: 1 irrigation every 7-10 days in summer",
        "💧 Wheat: 3-4 irrigations (crown root, tillering, boot, milk stage)",
        "💧 Rice: Maintain 5cm standing water throughout season",
        "💧 Cotton: 6-8 irrigations with proper drainage",
        "💧 Check soil moisture before irrigation - soil should be moist at 15cm depth",
        "💧 Use drip irrigation for 30% water saving"
      ]
    },

    fertilizer: {
      title: "Fertilizer Management (खाद प्रबंधन)",
      advice: [
        "🧪 Apply half nitrogen at basal, remaining in splits",
        "🧪 All phosphorus and potassium at basal application",
        "🧪 Wheat: 100-120 kg N, 50-60 kg P, 40-50 kg K per hectare",
        "🧪 Rice: 60-100 kg N, 40-50 kg P, 30-40 kg K per hectare",
        "🧪 Use organic manure 10-15 tonnes per hectare for soil health",
        "🧪 Apply Zinc 5kg/hectare for deficiency symptoms",
        "🧪 Foliar spray of micronutrients at flowering stage"
      ]
    },

    weather: {
      title: "Weather Management (मौसम प्रबंधन)",
      advice: [
        "🌦️ Avoid spraying pesticides if rain is expected",
        "🌦️ High humidity > 75%: Monitor for fungal diseases",
        "🌦️ Low humidity < 40%: Increase irrigation frequency",
        "🌦️ Strong winds: Postpone spraying (pesticides will be blown away)",
        "🌦️ Cold temperature < 15°C: Growth slows, delay operations",
        "🌦️ High temperature > 35°C: Increase watering, use shade crops",
        "🌦️ Check weather forecast daily for farming decisions"
      ]
    },

    harvesting: {
      title: "Harvesting Tips (कटाई की सलाह)",
      advice: [
        "🌾 Wheat: Harvest when 80% grains are golden yellow",
        "🌾 Rice: Harvest when 80% grains are golden",
        "🌾 Cotton: Harvest when 60-70% bolls mature",
        "🌾 Potato: Harvest when foliage dies down completely",
        "🌾 Tomato: Pick when fully red for better quality",
        "🌾 Harvest in early morning when dew is present",
        "🌾 Use sharp tools to avoid plant damage"
      ]
    }
  },

  // Quick Questions
  quick_answers: {
    "yellow_leaves": "पीली पत्तियां आमतौर पर नाइट्रोजन की कमी से होती हैं। स्प्रे यूरिया (2%) या पत्ती पर खाद का अनुप्रयोग करें। अगर नीचे की पत्तियां पीली हो रहीं हैं तो यह सामान्य है।",
    
    "wilting": "पौधों का सूखना सिंचाई की समस्या हो सकती है। तुरंत सिंचाई करें। अगर फंगल विल्ट है (तना भी गहरे रंग का), तो पौधे को निकालकर जला दें।",
    
    "spots_on_leaves": "पत्तियों पर धब्बे फंगल रोग हो सकते हैं। 2.5g/लीटर Mancozeb स्प्रे करें। प्रभावित पत्तियां तोड़ दें।",
    
    "holes_in_leaves": "पत्तियों में छेद कीटों के कारण हो सकते हैं। 2ml/लीटर Chlorpyrifos स्प्रे करें। सूर्यास्त के समय स्प्रे करें।",
    
    "no_flowering": "फूल न आना सिंचाई/खाद की समस्या हो सकती है। पोटेशियम का अनुप्रयोग बढ़ाएं। अतिरिक्त नाइट्रोजन कम करें।",
    
    "low_yield": "कम पैदावार कई कारणों से हो सकती है: (1) सही समय पर बुवाई न होना (2) बीमारियां/कीट (3) पानी/खाद की कमी। सभी बातों की जांच करें।",
    
    "weeds": "खरपतवार हटाने के लिए: (1) हाथ से निराई करें (2) शाकनाशी (Herbicide) का छिड़काव करें (3) गीली घास की परत लगाएं।"
  }
};

// Keyword matching function
export const findAnswer = (userMessage) => {
  const message = userMessage.toLowerCase();
  
  // Check for disease keywords
  for (const [key, disease] of Object.entries(chatbotResponses.diseases)) {
    if (message.includes(disease.disease.toLowerCase()) || 
        message.includes(disease.crop.toLowerCase()) && message.includes('disease')) {
      return {
        type: 'disease',
        data: disease,
        title: `${disease.crop} - ${disease.disease}`
      };
    }
  }

  // Check for pest keywords
  for (const [key, pest] of Object.entries(chatbotResponses.pests)) {
    if (message.includes(pest.pest.toLowerCase()) || 
        message.includes(pest.crop.toLowerCase()) && message.includes('pest')) {
      return {
        type: 'pest',
        data: pest,
        title: `${pest.crop} - ${pest.pest}`
      };
    }
  }

  // Check for general advice keywords
  if (message.includes('water') || message.includes('irrigat')) {
    return {
      type: 'advice',
      data: chatbotResponses.general_advice.irrigation,
      title: "Irrigation Tips"
    };
  }

  if (message.includes('fertilizer') || message.includes('khad') || message.includes('nitrogen') || message.includes('potassium')) {
    return {
      type: 'advice',
      data: chatbotResponses.general_advice.fertilizer,
      title: "Fertilizer Management"
    };
  }

  if (message.includes('weather') || message.includes('rain') || message.includes('temperature') || message.includes('humidity')) {
    return {
      type: 'advice',
      data: chatbotResponses.general_advice.weather,
      title: "Weather Management"
    };
  }

  if (message.includes('harvest') || message.includes('reap') || message.includes('gather')) {
    return {
      type: 'advice',
      data: chatbotResponses.general_advice.harvesting,
      title: "Harvesting Tips"
    };
  }

  // Check for quick answers
  for (const [key, answer] of Object.entries(chatbotResponses.quick_answers)) {
    if (message.includes(key.replace(/_/g, ' '))) {
      return {
        type: 'quick',
        data: answer,
        title: key.replace(/_/g, ' ').toUpperCase()
      };
    }
  }

  // Check for crop info
  if (message.includes('wheat') || message.includes('gehu')) {
    return { type: 'crop', data: chatbotResponses.crop_info.wheat };
  }
  if (message.includes('rice') || message.includes('chawal')) {
    return { type: 'crop', data: chatbotResponses.crop_info.rice };
  }
  if (message.includes('cotton') || message.includes('kapas')) {
    return { type: 'crop', data: chatbotResponses.crop_info.cotton };
  }
  if (message.includes('potato') || message.includes('aloo')) {
    return { type: 'crop', data: chatbotResponses.crop_info.potato };
  }
  if (message.includes('tomato') || message.includes('tamaatar')) {
    return { type: 'crop', data: chatbotResponses.crop_info.tomato };
  }

  // Default response
  return null;
};

// Suggested questions - PROPERLY EXPORTED
export const suggestedQuestions = [
  "🌾 What about wheat farming?",
  "🍚 Tell me about rice",
  "🧪 How to manage fertilizer?",
  "💧 Irrigation tips",
  "🐛 Help with pests",
  "🦠 Disease solutions",
  "🌦️ Weather advice",
  "🌾 Harvesting tips",
  "⚠️ Yellow leaves problem",
  "❓ How to prevent diseases?"
];