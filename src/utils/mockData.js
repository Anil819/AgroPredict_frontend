// ============================================
// AgroPredict AI — Mock Data
// Used for frontend development (Phase 1)
// Will be replaced by real API responses later
// ============================================

export const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80',
  farmer: 'https://images.unsplash.com/photo-1593113630400-ea4288922497?w=800&q=80',
  wheat: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80',
  rice: 'https://images.unsplash.com/photo-1536054953991-e2aa5765be09?w=800&q=80',
  soil: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80',
  irrigation: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=800&q=80',
  drone: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&q=80',
  greenhouse: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80',
  harvest: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80',
  field: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
  tractor: 'https://images.unsplash.com/photo-1530267981375-f0de937f5f13?w=800&q=80',
  sunrise: 'https://images.unsplash.com/photo-1501004318855-73174763311b?w=800&q=80',
  leaves: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&q=80',
  corn: 'https://images.unsplash.com/photo-1601329614571-759f8c8e6b96?w=800&q=80',
  organic: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80',
  loginBg: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=80',
  registerBg: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80',
  contactBg: 'https://images.unsplash.com/photo-1501004318855-73174763311b?w=1200&q=80',
  aboutBg: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1200&q=80',
  logoutBg: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&q=80',
}

export const weatherData = {
  current: {
    city: 'Indore',
    country: 'India',
    temperature: 28,
    feelsLike: 30,
    condition: 'Partly Cloudy',
    icon: 'cloud-sun',
    humidity: 60,
    wind: 12,
    rainChance: 20,
    uv: 6,
    visibility: 10,
    pressure: 1013,
    sunrise: '06:12 AM',
    sunset: '06:45 PM',
  },
  forecast: [
    { day: 'Today', icon: 'cloud-sun', high: 28, low: 19, rain: 20 },
    { day: 'Sat', icon: 'sun', high: 31, low: 20, rain: 5 },
    { day: 'Sun', icon: 'sun', high: 32, low: 21, rain: 0 },
    { day: 'Mon', icon: 'cloud', high: 27, low: 18, rain: 40 },
    { day: 'Tue', icon: 'cloud-rain', high: 24, low: 17, rain: 70 },
    { day: 'Wed', icon: 'cloud-drizzle', high: 25, low: 18, rain: 55 },
    { day: 'Thu', icon: 'sun', high: 29, low: 19, rain: 10 },
  ],
  farmingAdvice: [
    {
      title: 'Irrigation Advisory',
      message: 'Rain expected on Tuesday. Consider delaying irrigation until Wednesday to conserve water.',
      type: 'info',
    },
    {
      title: 'Crop Protection',
      message: 'High humidity on Monday may increase fungal disease risk. Monitor crops closely.',
      type: 'warning',
    },
    {
      title: 'Optimal Spraying',
      message: 'Saturday and Sunday offer ideal conditions for pesticide application — low wind, no rain.',
      type: 'success',
    },
  ],
}

export const soilData = {
  healthScore: 87,
  status: 'Excellent',
  parameters: [
    { name: 'Nitrogen', value: 78, status: 'Good', color: 'green' },
    { name: 'Phosphorus', value: 92, status: 'Excellent', color: 'green' },
    { name: 'Potassium', value: 55, status: 'Moderate', color: 'yellow' },
    { name: 'pH Level', value: 88, status: 'Excellent', color: 'green' },
    { name: 'Moisture', value: 72, status: 'Good', color: 'green' },
  ],
  recommendations: [
    {
      title: 'Potassium Improvement',
      description: 'Potassium levels are moderate. Add potassium-rich fertilizer (MOP) before the next crop cycle.',
      priority: 'medium',
    },
    {
      title: 'Maintain Nitrogen',
      description: 'Nitrogen levels are good. Continue current fertilization schedule.',
      priority: 'low',
    },
    {
      title: 'Organic Matter',
      description: 'Consider adding organic compost to further improve soil structure and water retention.',
      priority: 'low',
    },
  ],
}

export const cropPredictionResult = {
  crop: 'Wheat',
  confidence: 94,
  matchQuality: 'Excellent Match',
  details: [
    { label: 'Suitable soil', status: true },
    { label: 'Suitable temperature', status: true },
    { label: 'Suitable rainfall', status: true },
    { label: 'Good growth potential', status: true },
  ],
  alternativeCrops: [
    { name: 'Rice', confidence: 82 },
    { name: 'Maize', confidence: 76 },
    { name: 'Soybean', confidence: 71 },
  ],
}

export const diseasePredictionResult = {
  disease: 'Tomato Early Blight',
  confidence: 96.4,
  severity: 'Moderate',
  description: 'Early blight is a common fungal disease caused by Alternaria solani that affects tomato plants.',
  recommendations: [
    'Remove and destroy infected leaves immediately',
    'Improve air circulation around plants',
    'Apply copper-based fungicide as preventive measure',
    'Avoid overhead watering to reduce leaf wetness',
    'Follow crop rotation practices',
  ],
}

export const yieldPredictionResult = {
  expectedYield: '3.2 tons/acre',
  range: { min: '2.8', max: '3.6', unit: 'tons/acre' },
  confidence: 89,
  factors: [
    { name: 'Soil Quality', impact: 'positive', detail: 'Good nitrogen and phosphorus levels' },
    { name: 'Weather', impact: 'positive', detail: 'Favorable temperature range' },
    { name: 'Rainfall', impact: 'neutral', detail: 'Adequate rainfall expected' },
    { name: 'Historical', impact: 'positive', detail: 'Region has good yield history for this crop' },
  ],
}

export const profitPredictionResult = {
  revenue: 184500,
  totalCost: 39200,
  estimatedProfit: 145300,
  roi: 370.7,
  breakdown: {
    revenue: 184500,
    costs: {
      fertilizer: 12000,
      labor: 15000,
      irrigation: 5200,
      seeds: 3500,
      other: 3500,
    },
  },
}

export const irrigationResult = {
  recommendation: 'Delay Irrigation',
  reason: 'Rain expected within 24 hours. Current soil moisture is adequate.',
  waterQuantity: '18 L/m²',
  bestTime: 'After rainfall — reassess soil moisture',
  details: [
    { label: 'Current Soil Moisture', value: '68%' },
    { label: 'Required Moisture', value: '70%' },
    { label: 'Rain Probability', value: '70% (Tuesday)' },
    { label: 'Estimated Savings', value: '~2,400 liters' },
  ],
}

export const dashboardStats = [
  {
    title: 'Crop Recommendation',
    value: 'Wheat',
    subtitle: '94% — Excellent Match',
    icon: 'wheat',
    color: 'green',
  },
  {
    title: 'Soil Health',
    value: '87%',
    subtitle: 'Excellent',
    icon: 'layers',
    color: 'amber',
  },
  {
    title: 'Weather',
    value: '28°C',
    subtitle: 'Optimal',
    icon: 'cloud-sun',
    color: 'blue',
  },
  {
    title: 'Irrigation',
    value: '18 L/m²',
    subtitle: 'Recommended',
    icon: 'droplets',
    color: 'cyan',
  },
]

export const cropGrowthData = [
  { day: 'Week 1', growth: 12 },
  { day: 'Week 2', growth: 28 },
  { day: 'Week 3', growth: 45 },
  { day: 'Week 4', growth: 58 },
  { day: 'Week 5', growth: 72 },
  { day: 'Week 6', growth: 83 },
  { day: 'Week 7', growth: 91 },
  { day: 'Week 8', growth: 96 },
]

export const predictionHistory = [
  {
    id: 'pred_001',
    type: 'Crop',
    result: 'Wheat — 94% Confidence',
    date: '2024-07-10',
    status: 'completed',
  },
  {
    id: 'pred_002',
    type: 'Disease',
    result: 'Tomato Early Blight — 96.4%',
    date: '2024-07-08',
    status: 'completed',
  },
  {
    id: 'pred_003',
    type: 'Yield',
    result: '3.2 tons/acre',
    date: '2024-07-05',
    status: 'completed',
  },
  {
    id: 'pred_004',
    type: 'Profit',
    result: '₹1,45,300 Est. Profit',
    date: '2024-07-03',
    status: 'completed',
  },
  {
    id: 'pred_005',
    type: 'Soil',
    result: '87% — Excellent Health',
    date: '2024-07-01',
    status: 'completed',
  },
  {
    id: 'pred_006',
    type: 'Crop',
    result: 'Rice — 88% Confidence',
    date: '2024-06-28',
    status: 'completed',
  },
]

export const reportsData = [
  {
    id: 'rpt_001',
    title: 'Crop Prediction Report',
    type: 'Crop',
    date: '2024-07-10',
    status: 'Ready',
  },
  {
    id: 'rpt_002',
    title: 'Disease Analysis Report',
    type: 'Disease',
    date: '2024-07-08',
    status: 'Ready',
  },
  {
    id: 'rpt_003',
    title: 'Yield Prediction Report',
    type: 'Yield',
    date: '2024-07-05',
    status: 'Ready',
  },
]

export const videosData = [
  {
    id: 'vid_001',
    title: 'Smart Farming Techniques',
    category: 'Modern Farming',
    duration: '12:45',
    thumbnail: IMAGES.drone,
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id: 'vid_002',
    title: 'Soil Analysis in Action',
    category: 'Soil Health',
    duration: '8:30',
    thumbnail: IMAGES.soil,
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id: 'vid_003',
    title: 'Modern Irrigation Methods',
    category: 'Irrigation',
    duration: '15:20',
    thumbnail: IMAGES.irrigation,
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id: 'vid_004',
    title: 'Crop Management Best Practices',
    category: 'Crop Management',
    duration: '10:15',
    thumbnail: IMAGES.harvest,
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id: 'vid_005',
    title: 'Disease Prevention Guide',
    category: 'Disease Prevention',
    duration: '9:50',
    thumbnail: IMAGES.leaves,
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id: 'vid_006',
    title: 'Organic Farming 101',
    category: 'Organic Farming',
    duration: '14:30',
    thumbnail: IMAGES.organic,
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
]

export const chatMessages = [
  {
    id: 1,
    role: 'assistant',
    content: 'Hello! I\'m your AgroPredict AI Assistant. How can I help you with your farming today?',
    timestamp: '10:00 AM',
  },
]

export const suggestedQuestions = [
  'Which crop should I grow?',
  'Why are my leaves turning yellow?',
  'When should I irrigate?',
  'How can I improve soil fertility?',
  'What should I do after heavy rainfall?',
  'How can I prevent crop diseases?',
]

export const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
]

export const cropsList = [
  'Wheat', 'Rice', 'Maize', 'Soybean', 'Cotton', 'Sugarcane',
  'Barley', 'Millet', 'Groundnut', 'Sunflower', 'Mustard', 'Lentil',
  'Chickpea', 'Potato', 'Tomato', 'Onion', 'Chilli', 'Turmeric',
]

export const seasonsList = ['Kharif', 'Rabi', 'Zaid']

export const soilTypes = ['Alluvial', 'Black', 'Red', 'Laterite', 'Sandy', 'Clay', 'Loamy']

export const languages = ['English', 'Hindi', 'Hinglish']

export const notificationSettings = [
  { key: 'weather', label: 'Weather Alerts', description: 'Get notified about weather changes affecting your farm', enabled: true },
  { key: 'disease', label: 'Disease Alerts', description: 'Receive alerts about potential crop diseases in your area', enabled: true },
  { key: 'prediction', label: 'Prediction Alerts', description: 'Notifications when new AI predictions are available', enabled: false },
  { key: 'sms', label: 'SMS Alerts', description: 'Receive important alerts via SMS', enabled: false },
]

export const techStack = [
  { name: 'Python', icon: '🐍' },
  { name: 'Machine Learning', icon: '🤖' },
  { name: 'Deep Learning', icon: '🧠' },
  { name: 'Computer Vision', icon: '👁️' },
  { name: 'React', icon: '⚛️' },
  { name: 'FastAPI', icon: '⚡' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'Weather API', icon: '🌤️' },
]
