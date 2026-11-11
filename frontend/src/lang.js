// One language at a time: 'ta' or 'en'. Never both.
export const getLang = () => (typeof document !== 'undefined' && document.body.dataset.lang === 'en' ? 'en' : 'ta')
export const t = (ta, en) => (getLang() === 'en' ? en : ta)

export const loadLang = () => {
  try { const q = new URLSearchParams(location.search).get('lang'); if (q === 'en' || q === 'ta') return q } catch {}
  try { return localStorage.getItem('cp_lang') === 'en' ? 'en' : 'ta' } catch { return 'ta' }
}
export const saveLang = (l) => { try { localStorage.setItem('cp_lang', l) } catch {} }

// Tamil for values that come from the database in English.
const TA = {
  Government: 'அரசு', Private: 'தனியார்', Aided: 'அரசு உதவி பெறும்', 'Tamil Nadu': 'தமிழ்நாடு',
  Chennai: 'சென்னை', Madurai: 'மதுரை', Salem: 'சேலம்', Coimbatore: 'கோயம்புத்தூர்', Tiruchirappalli: 'திருச்சிராப்பள்ளி', Cuddalore: 'கடலூர்',
  'Free Guidance': 'இலவச வழிகாட்டல்', 'Job Opportunities': 'வேலை வாய்ப்புகள்',
  'How to become a Nurse': 'செவிலியர் ஆவது எப்படி', 'Government Exam Preparation': 'அரசுத் தேர்வு தயாரிப்பு',
  'Best Courses After 12th': '12-க்குப் பிறகு சிறந்த படிப்புகள்', 'Engineering Admission Guide': 'பொறியியல் சேர்க்கை வழிகாட்டி',
  'Scholarships for Village Students': 'கிராம மாணவர்களுக்கான உதவித்தொகை', 'How to Choose the Right College': 'சரியான கல்லூரியைத் தேர்ந்தெடுப்பது எப்படி',
  Medicine: 'மருத்துவம்', 'Govt Jobs': 'அரசு வேலை', Guidance: 'வழிகாட்டல்', Engineering: 'பொறியியல்', Scholarship: 'உதவித்தொகை',
  'Top govt medical college': 'சிறந்த அரசு மருத்துவக் கல்லூரி', '90% placement': '90% வேலைவாய்ப்பு', 'Top recruiters visit': 'முன்னணி நிறுவனங்கள் வருகை',
  'Job in 3 years': '3 ஆண்டில் வேலை', 'Govt officer jobs': 'அரசு அதிகாரி வேலைகள்', 'IT placements': 'ஐடி வேலைவாய்ப்பு',
  'Bank exam coaching': 'வங்கித் தேர்வுப் பயிற்சி', '85% placement': '85% வேலைவாய்ப்பு', 'Good bar placement': 'நல்ல வழக்கறிஞர் வாய்ப்பு',
  'TET coaching': 'TET பயிற்சி', 'Top campus jobs': 'வளாக வேலைவாய்ப்பு', 'Software jobs': 'மென்பொருள் வேலைகள்',
  'Choose your career. See course, exam and fees.': 'உன் தொழிலைத் தேர்ந்தெடு.',
  'Design and build machines, buildings and electronics. Strong jobs in core companies and IT.': 'இயந்திரங்கள், கட்டடங்கள், மின்னணுவியல் வடிவமைத்து உருவாக்கு. நல்ல வேலை வாய்ப்புகள்.',
  'Serve people as a doctor, nurse or pharmacist. Nursing has excellent job demand in India and abroad.': 'மருத்துவர், செவிலியர், மருந்தாளுநராகச் சேவை செய். செவிலியர் பணிக்கு இந்தியாவிலும் வெளிநாட்டிலும் பெரிய தேவை உள்ளது.',
  'Stable, respected jobs in the state and central government. Start preparing early.': 'மாநில, மத்திய அரசில் நிலையான, மதிப்புமிக்க வேலைகள். முன்கூட்டியே தயாராகு.',
  'Shape the next generation. Government school teacher jobs through TET exams.': 'அடுத்த தலைமுறையை உருவாக்கு. TET தேர்வு மூலம் அரசுப் பள்ளி ஆசிரியர் வேலை.',
  'Creative careers in design, media, animation, literature and fine arts.': 'வடிவமைப்பு, ஊடகம், அனிமேஷன், இலக்கியம், நுண்கலை ஆகிய படைப்புத் தொழில்கள்.',
  'Accounts, banking, finance and starting your own business.': 'கணக்கு, வங்கி, நிதி மற்றும் சொந்தத் தொழில் தொடங்குதல்.',
  'Modern farming, agri-business and government agriculture officer jobs.': 'நவீன விவசாயம், வேளாண் வணிகம், அரசு வேளாண் அலுவலர் வேலைகள்.',
  'Software, web and data jobs. You can even learn online for free.': 'மென்பொருள், இணையம், தரவு வேலைகள். இலவசமாக இணையத்திலேயே கற்கலாம்.',
  'Quick way to a job after 10th. Many diploma courses allow lateral entry into degree.': '10-க்குப் பிறகு விரைவாக வேலை பெறும் வழி. பல டிப்ளமா படிப்புகள் பட்டப்படிப்பில் நேரடிச் சேர்க்கை தரும்.',
  'Become a lawyer, judge or legal advisor.': 'வழக்கறிஞர், நீதிபதி அல்லது சட்ட ஆலோசகர் ஆகு.',
}
export const tr = (s) => (getLang() === 'ta' && TA[s]) || s
// Fee strings like "₹30,000 – ₹2,00,000 / year"
export const feeText = (s) => (getLang() === 'ta' ? String(s).replace('/ year', '/ ஆண்டு') : s)
