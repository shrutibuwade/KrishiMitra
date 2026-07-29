import React, { useState } from 'react';
import '../styles/GovernmentSchemes.css';

const GovernmentSchemes = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const schemes = [
    {
      id: 1,
      name: 'PM-KISAN',
      fullName: 'Pradhan Mantri Kisan Samman Nidhi',
      category: 'Income Support',
      budget: '₹2 Lakh Crore',
      description: 'Direct income support of ₹6,000 per year in 3 equal installments to all farmers',
      eligibility: 'All landholding farmers',
      icon: '💰',
      url: 'https://pmkisan.gov.in/'
    },
    {
      id: 2,
      name: 'Fasal Bima Yojana',
      fullName: 'Pradhan Mantri Fasal Bima Yojana',
      category: 'Crop Insurance',
      budget: '₹16,000 Crore',
      description: 'Comprehensive crop insurance against natural calamities and risks',
      eligibility: 'All farmers growing notified crops',
      icon: '🛡️',
      url: 'https://pmfby.gov.in/'
    },
    {
      id: 3,
      name: 'Soil Health Card',
      fullName: 'Soil Health Card Scheme',
      category: 'Soil Management',
      budget: '₹500 Crore',
      description: 'Free soil testing and personalized nutrient recommendations for crops',
      eligibility: 'All farmers',
      icon: '🌱',
      url: 'https://soilhealth.dac.gov.in/'
    },
    {
      id: 4,
      name: 'Krishi Sinchayee',
      fullName: 'Pradhan Mantri Krishi Sinchayee Yojana',
      category: 'Irrigation',
      budget: '₹93,068 Crore',
      description: 'Micro irrigation and water conservation schemes for efficient farming',
      eligibility: 'Farmers with irrigable land',
      icon: '💧',
      url: 'https://pmksy.gov.in/'
    },
    {
      id: 5,
      name: 'Organic Farming',
      fullName: 'Paramparagat Krishi Vikas Yojana',
      category: 'Organic Farming',
      budget: '₹500 Crore',
      description: 'Promotion of organic farming without use of chemicals and pesticides',
      eligibility: 'Farmers interested in organic farming',
      icon: '🍃',
      url: 'https://pgsindia-ncof.gov.in/'
    },
    {
      id: 6,
      name: 'e-NAM',
      fullName: 'National Agriculture Market',
      category: 'Marketing',
      budget: '₹200 Crore',
      description: 'Online market platform for direct farmer-to-buyer agricultural trade',
      eligibility: 'All farmers and traders',
      icon: '📱',
      url: 'https://www.enam.gov.in/'
    },
    {
      id: 7,
      name: 'Kisan Credit Card',
      fullName: 'Kisan Credit Card Scheme',
      category: 'Credit Support',
      budget: '₹1 Lakh Crore+',
      description: 'Easy credit access for agricultural activities at low interest rates',
      eligibility: 'All farmers with land documents',
      icon: '💳',
      url: 'https://www.nabard.org/kcc'
    },
    {
      id: 8,
      name: 'Agri Infrastructure',
      fullName: 'Agriculture Infrastructure Fund',
      category: 'Infrastructure',
      budget: '₹1 Lakh Crore',
      description: 'Funding for agricultural infrastructure like storage and processing units',
      eligibility: 'Farmers, FPOs, cooperatives',
      icon: '🏭',
      url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=1586040'
    },
    {
      id: 9,
      name: 'Per Drop More Crop',
      fullName: 'Per Drop More Crop Initiative',
      category: 'Water Management',
      budget: '₹2,100 Crore',
      description: 'Micro irrigation promotion for water-scarce regions and sustainability',
      eligibility: 'Farmers in water-scarce areas',
      icon: '💦',
      url: 'https://pmksy.gov.in/Public/PDMC'
    },
    {
      id: 10,
      name: 'PM-AASHA',
      fullName: 'Pradhan Mantri Annadata Aay SanRakshan Abhiyaan',
      category: 'Price Support',
      budget: '₹8,000 Crore',
      description: 'Minimum Support Price and price deficiency support for farmers',
      eligibility: 'All farmers selling notified crops',
      icon: '📊',
      url: 'https://farmer.gov.in/'
    },
    {
      id: 11,
      name: 'Sustainable Agriculture',
      fullName: 'National Mission for Sustainable Agriculture',
      category: 'Sustainability',
      budget: '₹1,000 Crore',
      description: 'Promotion of climate-smart and sustainable agriculture practices',
      eligibility: 'All farmers',
      icon: '🌍',
      url: 'https://nmsa.dac.gov.in/'
    },
    {
      id: 12,
      name: 'Kisan Pension',
      fullName: 'Pradhan Mantri Kisan Maandhan Yojana',
      category: 'Social Security',
      budget: '₹10,774 Crore',
      description: 'Pension scheme providing ₹3,000/month for small and marginal farmers',
      eligibility: 'Farmers aged 18-40 years with land < 2 hectares',
      icon: '👴',
      url: 'https://maandhan.in/'
    },
    {
      id: 13,
      name: 'Interest Subvention',
      fullName: 'Interest Subvention Scheme',
      category: 'Credit Support',
      budget: '₹7,500 Crore',
      description: '4% interest subvention on agricultural short-term loans for farmers',
      eligibility: 'Farmers with KCC availing loans up to ₹3 lakh',
      icon: '📉',
      url: 'https://farmer.gov.in/'
    },
    {
      id: 14,
      name: 'Livestock Mission',
      fullName: 'National Livestock Mission',
      category: 'Livestock',
      budget: '₹3,000 Crore',
      description: 'Support for dairy, meat, wool, and poultry production activities',
      eligibility: 'Farmers involved in livestock rearing',
      icon: '🐄',
      url: 'https://dahd.gov.in/'
    },
    {
      id: 15,
      name: 'Gokul Mission',
      fullName: 'Rashtriya Gokul Mission',
      category: 'Livestock',
      budget: '₹750 Crore',
      description: 'Conservation and development of indigenous cattle breed varieties',
      eligibility: 'Farmers and breeders of indigenous cattle',
      icon: '🐮',
      url: 'https://dahd.gov.in/about-us/divisions/cattle-breeding'
    },
    {
      id: 16,
      name: 'Matsya Sampada',
      fullName: 'Pradhan Mantri Matsya Sampada Yojana',
      category: 'Fisheries',
      budget: '₹20,050 Crore',
      description: 'Development of fisheries sector and aquaculture infrastructure',
      eligibility: 'Fish farmers and aquaculture entrepreneurs',
      icon: '🐟',
      url: 'https://pmmsy.dahi.gov.in/'
    },
    {
      id: 17,
      name: 'Mechanization',
      fullName: 'Sub Mission on Agricultural Mechanization',
      category: 'Equipment',
      budget: '₹5,000 Crore',
      description: 'Subsidy on agricultural machinery and equipment for farming',
      eligibility: 'Farmers and Agricultural Machinery Custom Hiring Centers',
      icon: '🚜',
      url: 'https://smam.gov.in/'
    },
    {
      id: 18,
      name: 'Horticulture',
      fullName: 'Pradhan Mantri Horticulture Mission',
      category: 'Horticulture',
      budget: '₹2,500 Crore',
      description: 'Support for fruits, vegetables, and spices cultivation programs',
      eligibility: 'Farmers interested in horticulture',
      icon: '🍎',
      url: 'https://midh.gov.in/'
    },
    {
      id: 19,
      name: 'Beekeeping',
      fullName: 'National Beekeeping and Honey Mission',
      category: 'Apiculture',
      budget: '₹500 Crore',
      description: 'Support and incentives for beekeeping and honey production',
      eligibility: 'Farmers and beekeeping entrepreneurs',
      icon: '🐝',
      url: 'https://beekeeping.dac.gov.in/'
    },
    {
      id: 20,
      name: 'Atma Nirbhar',
      fullName: 'Atma Nirbhar Bharat Agri Scheme',
      category: 'Development',
      budget: '₹1,30,000 Crore',
      description: 'Infrastructure and technology for agricultural development and growth',
      eligibility: 'All farmers and agricultural entities',
      icon: '🇮🇳',
      url: 'https://pib.gov.in/'
    },
    {
      id: 21,
      name: 'Gram Sinchai',
      fullName: 'Pradhan Mantri Gram Sinchai Yojana',
      category: 'Irrigation',
      budget: '₹93,000 Crore',
      description: 'Focus on farm-level water management and irrigation efficiency',
      eligibility: 'Farmers with cultivable land',
      icon: '🌾',
      url: 'https://pmksy.gov.in/'
    },
    {
      id: 22,
      name: 'Distressed Farmers',
      fullName: 'Special Assistance Scheme for Distressed Farmers',
      category: 'Debt Relief',
      budget: '₹12,000 Crore',
      description: 'Relief and support for farmers facing financial hardship and debt',
      eligibility: 'Farmers in debt or distress',
      icon: '🤝',
      url: 'https://farmer.gov.in/'
    }
  ];

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'Income Support', name: 'Income Support' },
    { id: 'Crop Insurance', name: 'Crop Insurance' },
    { id: 'Credit Support', name: 'Credit Support' },
    { id: 'Irrigation', name: 'Irrigation' },
    { id: 'Soil Management', name: 'Soil Management' },
    { id: 'Marketing', name: 'Marketing' },
    { id: 'Infrastructure', name: 'Infrastructure' },
    { id: 'Livestock', name: 'Livestock' },
    { id: 'Fisheries', name: 'Fisheries' }
  ];

  const filteredSchemes = schemes.filter(scheme => {
    const matchesCategory = selectedCategory === 'all' || scheme.category === selectedCategory;
    const matchesSearch = scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         scheme.fullName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="government-schemes-page">
      {/* HERO SECTION */}
      <section className="schemes-hero-section">
        <h1> Government Schemes for Farmers</h1>
      </section>

      {/* SEARCH & FILTERS */}
      <div className="schemes-search-section">
  <form className="schemes-search-form" onSubmit={(e) => e.preventDefault()}>
    <input
      type="text"
      placeholder="Search scheme by name..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="schemes-search-input"
    />
    <button type="submit" className="schemes-search-btn">
      🔍 Search
    </button>
  </form>
</div>


        <div className="schemes-filters">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* SCHEMES CARDS */}
        <div className="schemes-cards-container">
          {filteredSchemes.length > 0 ? (
            filteredSchemes.map(scheme => (
              <div key={scheme.id} className="scheme-item">
                <div className="scheme-image-container">
                   <img
      src={`/images/schemes/${scheme.name.toLowerCase().replace(/\s+/g, '-')}.jpg`}
      alt={scheme.name}
      className="scheme-image"
      onError={(e) => {
        e.target.style.display = 'none';
      }}
    />
  </div>
                <div className="scheme-info">
                  <h3>{scheme.name}</h3>
                  <p className="scheme-category">{scheme.category}</p>
                  <p className="scheme-desc">{scheme.description}</p>
                  <div className="scheme-meta">
                    <span className="meta-label">Budget:</span>
                    <span className="meta-value">{scheme.budget}</span>
                  </div>
                  <div className="scheme-meta">
                    <span className="meta-label">Eligibility:</span>
                    <span className="meta-value">{scheme.eligibility}</span>
                  </div>
                  <button
                    className="scheme-btn"
                    onClick={() => window.open(scheme.url, '_blank')}
                  >
                    Learn More →
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-schemes">
              <p>No schemes found for your search</p>
            </div>
          )}
        </div>
    </div>  
  );
};

export default GovernmentSchemes;
