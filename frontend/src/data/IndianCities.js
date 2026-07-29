export const indianCities = [
  // Madhya Pradesh
  'Indore',
  'Bhopal',
  'Jabalpur',
  'Gwalior',
  'Ujjain',
  'Sagar',
  'Ratlam',
  'Seoni',
  'Khandwa',
  'Burhanpur',
  'Mhow',
  'Dewas',
  
  // Maharashtra
  'Pune',
  'Mumbai',
  'Nagpur',
  'Nashik',
  'Aurangabad',
  'Amravati',
  'Solapur',
  'Kolhapur',
  'Sangli',
  'Satara',
  'Chandrapur',
  'Wardha',
  
  // Karnataka
  'Bengaluru',
  'Mysore',
  'Hubli',
  'Belgaum',
  'Kolar',
  'Mangalore',
  'Udupi',
  'Bijapur',
  'Shimoga',
  'Hassan',
  
  // Uttar Pradesh
  'Lucknow',
  'Kanpur',
  'Agra',
  'Meerut',
  'Varanasi',
  'Allahabad',
  'Bareilly',
  'Moradabad',
  'Mathura',
  'Firozabad',
  'Ghaziabad',
  'Noida',
  
  // Tamil Nadu
  'Chennai',
  'Coimbatore',
  'Madurai',
  'Salem',
  'Trichy',
  'Tiruppur',
  'Vellore',
  'Erode',
  'Thanjavur',
  'Kanyakumari',
  
  // Punjab
  'Ludhiana',
  'Amritsar',
  'Patiala',
  'Jalandhar',
  'Bathinda',
  'Mohali',
  'Pathankot',
  'Hoshiarpur',
  
  // Rajasthan
  'Jaipur',
  'Jodhpur',
  'Ajmer',
  'Udaipur',
  'Kota',
  'Bikaner',
  'Alwar',
  'Bhilwara',
  'Pali',
  'Sikar',
  
  // Haryana
  'Faridabad',
  'Gurgaon',
  'Hisar',
  'Rohtak',
  'Panipat',
  'Ambala',
  'Yamunanagar',
  
  // Telangana
  'Hyderabad',
  'Secunderabad',
  'Warangal',
  'Karimnagar',
  'Khammam',
  'Nizamabad',
  
  // Andhra Pradesh
  'Visakhapatnam',
  'Vijayawada',
  'Tirupati',
  'Nellore',
  'Kurnool',
  'Anantapur',
  
  // Gujarat
  'Ahmedabad',
  'Surat',
  'Vadodara',
  'Rajkot',
  'Gandhinagar',
  'Junagadh',
  'Bhavnagar',
  'Jamnagar',
  
  // West Bengal
  'Kolkata',
  'Asansol',
  'Siliguri',
  'Durgapur',
  'Burdwan',
  'Jhargram',
  
  // Assam
  'Guwahati',
  'Dibrugarh',
  'Silchar',
  'Barpeta',
  'Nagaon',
  
  // Bihar
  'Patna',
  'Gaya',
  'Bhagalpur',
  'Darbhanga',
  'Muzaffarpur',
  'Purnia',
  
  // Odisha
  'Bhubaneswar',
  'Cuttack',
  'Rourkela',
  'Sambalpur',
  'Angul',
  'Balasore',
  
  // Kerala
  'Kochi',
  'Thiruvananthapuram',
  'Kozhikode',
  'Thrissur',
  'Kannur',
  'Alappuzha',
  
  // Himachal Pradesh
  'Shimla',
  'Solan',
  'Mandi',
  'Kangra',
  'Palampur',
  'Kullu',
];

export const getMatchingCities = (searchTerm) => {
  if (!searchTerm) return [];
  return indianCities.filter(city =>
    city.toLowerCase().startsWith(searchTerm.toLowerCase())
  );
};