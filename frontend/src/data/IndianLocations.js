export const indianLocations = {
  Maharashtra: {
    Pune: ['Pune', 'Pimpri-Chinchwad', 'Nashik', 'Baramati', 'Indapur'],
    Nashik: ['Nashik', 'Sinnar', 'Niphad', 'Igatpuri', 'Trimbakeshwar'],
    Nagpur: ['Nagpur', 'Kamptee', 'Saoner', 'Narkhed', 'Hingna'],
    Aurangabad: ['Aurangabad', 'Paithan', 'Khuldabad', 'Kannad', 'Phulambri'],
    Amravati: ['Amravati', 'Morshi', 'Daryapur', 'Chandur', 'Teosa'],
  },
  Karnataka: {
    Bengaluru: ['Bengaluru', 'Anekal', 'Bannerghatta', 'Kanakapura', 'Ramnagara'],
    Mysore: ['Mysore', 'Srirangapatna', 'Mandya', 'Chamarajanagar', 'Hunsur'],
    Hubli: ['Hubli', 'Dharwad', 'Belgaum', 'Bailhongal', 'Londa'],
    Belagavi: ['Belagavi', 'Soundatti', 'Bailhongal', 'Londa', 'Ramdurg'],
    Kolar: ['Kolar', 'Mulbagal', 'Bangarpet', 'Srinivaspur', 'Chikballapur'],
  },
  'Uttar Pradesh': {
    Lucknow: ['Lucknow', 'Kanpur', 'Jajmau', 'Unnao', 'Rae Bareli'],
    Kanpur: ['Kanpur', 'Jajmau', 'Akbarpur', 'Bilhaur', 'Fatehpur'],
    Agra: ['Agra', 'Firozabad', 'Mathura', 'Mainpuri', 'Etah'],
    Meerut: ['Meerut', 'Hapur', 'Baghpat', 'Muzaffarnagar', 'Shamli'],
    Varanasi: ['Varanasi', 'Ghazipur', 'Chandauli', 'Bhadohi', 'Sarnath'],
  },
  'Tamil Nadu': {
    Chennai: ['Chennai', 'Kanchipuram', 'Tiruvallur', 'Chengalpattu', 'Ranipet'],
    Coimbatore: ['Coimbatore', 'Tiruppur', 'Nilgiris', 'Erode', 'Kodaikanal'],
    Madurai: ['Madurai', 'Theni', 'Dindigul', 'Virudhunagar', 'Tirunelveli'],
    Salem: ['Salem', 'Dharmapuri', 'Krishnagiri', 'Tirupathur', 'Mettur'],
    Trichy: ['Trichy', 'Perambalur', 'Karur', 'Thanjavur', 'Namakkal'],
  },
  Punjab: {
    Ludhiana: ['Ludhiana', 'Jagraon', 'Raikot', 'Khanna', 'Samrala'],
    Amritsar: ['Amritsar', 'Tarn Taran', 'Batala', 'Jandiala', 'Guru Har Sahai'],
    Patiala: ['Patiala', 'Sangrur', 'Barnala', 'Fatehgarh Sahib', 'Mohali'],
    Jalandhar: ['Jalandhar', 'Kapurthala', 'Hoshiarpur', 'Nawanshahr', 'Phillaur'],
    Bathinda: ['Bathinda', 'Mansa', 'Abohar', 'Rampura', 'Bhakra'],
  },
};

export const soilTypes = [
  'Loamy',
  'Sandy',
  'Clayey',
  'Silty',
  'Unknown'
];

export const irrigationTypes = [
  'Rain Fed',
  'Well',
  'Canal',
  'Drip',
  'Sprinkler'
];

export const getStates = () => Object.keys(indianLocations).sort();

export const getDistricts = (state) => {
  return Object.keys(indianLocations[state] || {}).sort();
};

export const getVillages = (state, district) => {
  return indianLocations[state]?.[district] || [];
};