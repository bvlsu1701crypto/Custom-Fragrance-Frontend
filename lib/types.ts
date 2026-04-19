export interface UserPreferences {
  occasion: string
  scent_preference: string[]
  longevity: string
  sillage: string
  concentration: string
  budget_level: string
  avoided_notes: string[]
  time_of_day: string
  free_description: string
}

export interface BiometricData {
  body_temperature: number
  heart_rate: number
  activity_level: string
}

export interface EnvironmentData {
  city: string
  temperature: number
  humidity: number
  condition: string
  season: string
}

export interface CityProfile {
  id: string
  name: string
  nameZh: string
  country: string
  geographyEn: string
  geographyZh: string
  historyEn: string
  historyZh: string
  characterEn: string
  characterZh: string
}

export interface RecommendationOutput {
  occasion: string
  scent_preference: string[]
  longevity: string
  sillage: string
  concentration: string
  budget_level: string
  avoided_notes: string[]
  time_of_day: string
  body_temperature: number
  heart_rate: number
  activity_level: string
  temperature: number
  humidity: number
  condition: string
  season: string
  city: string
  analysis_summary: string
  fragrance_notes: FragranceNotes
  fragrance_description: FragranceDescription
}

export const SCENT_FAMILIES = [
  { id: 'citrus', name: 'Citrus', nameZh: '柑橘调' },
  { id: 'floral', name: 'Floral', nameZh: '花香调' },
  { id: 'woody', name: 'Woody', nameZh: '木质调' },
  { id: 'oriental', name: 'Oriental', nameZh: '东方调' },
  { id: 'fresh', name: 'Fresh/Aquatic', nameZh: '水生调' },
  { id: 'herbal', name: 'Herbal', nameZh: '草本调' },
  { id: 'spicy', name: 'Spicy', nameZh: '辛辣调' },
  { id: 'sweet', name: 'Sweet/Gourmand', nameZh: '美食调' },
  { id: 'musky', name: 'Musky', nameZh: '麝香调' },
  { id: 'leather', name: 'Leather', nameZh: '皮革调' },
]

export const OCCASIONS = [
  { id: 'work', name: 'Work/Office', nameZh: '职场' },
  { id: 'date', name: 'Date Night', nameZh: '约会' },
  { id: 'sport', name: 'Sports/Active', nameZh: '运动' },
  { id: 'daily', name: 'Daily Casual', nameZh: '日常' },
  { id: 'social', name: 'Social Events', nameZh: '社交' },
  { id: 'formal', name: 'Formal/Special', nameZh: '正式' },
]

export const LONGEVITY_OPTIONS = [
  { id: 'short', name: 'Under 2 hours', nameZh: '2小时以内' },
  { id: 'medium', name: '2-4 hours', nameZh: '2-4小时' },
  { id: 'long', name: '4-6 hours', nameZh: '4-6小时' },
  { id: 'extended', name: '6+ hours', nameZh: '6小时以上' },
]

export const SILLAGE_OPTIONS = [
  { id: 'intimate', name: 'Intimate', nameZh: '贴身' },
  { id: 'close', name: 'Close Range', nameZh: '近距离' },
  { id: 'moderate', name: 'Moderate', nameZh: '中等扩散' },
  { id: 'strong', name: 'Strong Projection', nameZh: '强扩散' },
]

export const CONCENTRATION_OPTIONS = [
  { id: 'edt', name: 'Eau de Toilette', nameZh: '淡香水' },
  { id: 'edp', name: 'Eau de Parfum', nameZh: '香水' },
  { id: 'parfum', name: 'Parfum', nameZh: '浓香水' },
  { id: 'extrait', name: 'Extrait', nameZh: '香精' },
]

export const BUDGET_OPTIONS = [
  { id: 'budget', name: 'Budget', nameZh: '经济', range: '$30-60' },
  { id: 'midrange', name: 'Mid-Range', nameZh: '中档', range: '$60-120' },
  { id: 'premium', name: 'Premium', nameZh: '高档', range: '$120-250' },
  { id: 'luxury', name: 'Luxury', nameZh: '奢华', range: '$250+' },
]

export const TIME_OPTIONS = [
  { id: 'morning', name: 'Morning', nameZh: '早晨' },
  { id: 'afternoon', name: 'Afternoon', nameZh: '下午' },
  { id: 'evening', name: 'Evening', nameZh: '晚间' },
  { id: 'allday', name: 'All Day', nameZh: '全天' },
]

export const ACTIVITY_LEVELS = [
  { id: 'resting', name: 'Resting', nameZh: '静息' },
  { id: 'light', name: 'Light Activity', nameZh: '轻度活动' },
  { id: 'moderate', name: 'Moderate Activity', nameZh: '中度活动' },
  { id: 'intense', name: 'Intense Exercise', nameZh: '剧烈运动' },
]

export const WEATHER_CONDITIONS = [
  { id: 'sunny', name: 'Sunny', nameZh: '晴天' },
  { id: 'cloudy', name: 'Cloudy', nameZh: '阴天' },
  { id: 'rainy', name: 'Rainy', nameZh: '雨天' },
]

export const SEASONS = [
  { id: 'spring', name: 'Spring', nameZh: '春' },
  { id: 'summer', name: 'Summer', nameZh: '夏' },
  { id: 'autumn', name: 'Autumn', nameZh: '秋' },
  { id: 'winter', name: 'Winter', nameZh: '冬' },
]

export const WORLD_CITIES: CityProfile[] = [
  { id: 'shanghai', name: 'Shanghai', nameZh: '上海', country: 'China', geographyEn: 'a river-and-sea port at the mouth of the Yangtze', geographyZh: '一座位于长江入海口的江海交汇港城', historyEn: 'its treaty-port history shaped a cosmopolitan modern identity', historyZh: '近代开埠史塑造了它中西交汇的现代气质', characterEn: 'fast, polished, fashion-conscious, and quietly ambitious', characterZh: '节奏明快、精致摩登，带着克制的野心感' },
  { id: 'beijing', name: 'Beijing', nameZh: '北京', country: 'China', geographyEn: 'an inland capital framed by plains and northern mountains', geographyZh: '一座平原与北方山脉相接的内陆都城', historyEn: 'centuries of imperial history give it ritual, depth, and gravitas', historyZh: '延续数百年的都城史赋予它秩序感、厚度与庄重感', characterEn: 'measured, stately, intellectual, and ceremonial', characterZh: '稳重、庄严、理性，带有仪式感' },
  { id: 'hongkong', name: 'Hong Kong', nameZh: '香港', country: 'China', geographyEn: 'a humid harbor city of steep hills, islands, and dense waterfront districts', geographyZh: '一座由山地、岛屿与高密度海港城区构成的湿热港城', historyEn: 'its entrepot past and East-West exchange made it intensely global', historyZh: '转口贸易与东西文化交汇让它长期保持高度国际化', characterEn: 'vertical, electric, efficient, and sharply urban', characterZh: '立体、明亮、效率极高，都市感强烈' },
  { id: 'tokyo', name: 'Tokyo', nameZh: '东京', country: 'Japan', geographyEn: 'a vast coastal metropolis facing Tokyo Bay', geographyZh: '一座面向东京湾的超大型沿海都市', historyEn: 'from Edo heritage to contemporary design culture, it balances tradition with precision', historyZh: '从江户传统到当代设计文化，它始终在传统与精确之间保持平衡', characterEn: 'clean-lined, meticulous, understated, and futuristic', characterZh: '线条干净、细节严谨、低调而带未来感' },
  { id: 'singapore', name: 'Singapore', nameZh: '新加坡', country: 'Singapore', geographyEn: 'an equatorial island city shaped by heat, humidity, and sea air', geographyZh: '一座受热带湿热与海风影响的赤道岛国城市', historyEn: 'its trading-port history built a multicultural and highly ordered urban culture', historyZh: '港口贸易史造就了它多元且高度有序的城市文化', characterEn: 'precise, tropical, immaculate, and contemporary', characterZh: '精确、热带、整洁，充满当代感' },
  { id: 'seoul', name: 'Seoul', nameZh: '首尔', country: 'South Korea', geographyEn: 'a basin city cut by the Han River and ringed by mountains', geographyZh: '一座被汉江穿过、群山环抱的盆地城市', historyEn: 'royal heritage and rapid modernization coexist in tight contrast', historyZh: '王朝遗产与高速现代化在这里强烈并存', characterEn: 'crisp, trend-aware, youthful, and high-energy', characterZh: '清爽、敏锐、年轻，能量感很强' },
  { id: 'bangkok', name: 'Bangkok', nameZh: '曼谷', country: 'Thailand', geographyEn: 'a tropical river plain city threaded by waterways and monsoon air', geographyZh: '一座被水网与季风空气塑造的热带平原城市', historyEn: 'royal, mercantile, and spiritual histories overlap throughout its neighborhoods', historyZh: '王权、商业与宗教历史在街区里层层重叠', characterEn: 'warm, vibrant, ornate, and socially alive', characterZh: '温暖、热烈、繁复，社交氛围浓厚' },
  { id: 'dubai', name: 'Dubai', nameZh: '迪拜', country: 'UAE', geographyEn: 'a desert-edge coastal city facing the Arabian Gulf', geographyZh: '一座临阿拉伯湾、沙漠与海岸交界的城市', historyEn: 'from pearl-diving port to global luxury hub, its rise is recent and dramatic', historyZh: '从采珠港到全球奢华中心，它的崛起快速而戏剧性', characterEn: 'radiant, opulent, expansive, and highly polished', characterZh: '明亮、华丽、张力外放，质感强烈' },
  { id: 'paris', name: 'Paris', nameZh: '巴黎', country: 'France', geographyEn: 'a river city organized around the Seine', geographyZh: '一座围绕塞纳河展开的河岸城市', historyEn: 'its artistic and perfumery legacy makes refinement feel native rather than staged', historyZh: '艺术与香水传统让精致感在这里显得天然，而非刻意', characterEn: 'elegant, soft-spoken, cultured, and romantic', characterZh: '优雅、克制、有文化感，也带浪漫气息' },
  { id: 'london', name: 'London', nameZh: '伦敦', country: 'UK', geographyEn: 'a temperate river metropolis shaped by the Thames and shifting weather', geographyZh: '一座受泰晤士河与多变天气影响的温带河城', historyEn: 'imperial history and modern creative culture sit side by side', historyZh: '帝国历史与现代创意文化在这里并置共存', characterEn: 'reserved, tailored, literary, and textured', characterZh: '克制、剪裁感强、文学气质浓，层次丰富' },
  { id: 'milan', name: 'Milan', nameZh: '米兰', country: 'Italy', geographyEn: 'a northern Italian plain city near the Alps', geographyZh: '一座靠近阿尔卑斯山的意大利北部平原城市', historyEn: 'commerce, craftsmanship, and fashion have long shaped its identity', historyZh: '商业、工艺与时装传统共同定义了它的城市形象', characterEn: 'sleek, tailored, elegant, and design-led', characterZh: '利落、讲究、优雅，设计导向鲜明' },
  { id: 'newyork', name: 'New York', nameZh: '纽约', country: 'USA', geographyEn: 'a coastal harbor metropolis built on islands and estuaries', geographyZh: '一座由岛屿与河口构成的海港大都会', historyEn: 'its immigrant history and financial-cultural centrality make it relentlessly expressive', historyZh: '移民历史与金融文化中心地位让它始终充满表达欲', characterEn: 'direct, ambitious, magnetic, and restless', characterZh: '直接、雄心勃勃、极具吸引力，也永不停歇' },
  { id: 'losangeles', name: 'Los Angeles', nameZh: '洛杉矶', country: 'USA', geographyEn: 'a sunlit basin between ocean, hills, and desert influence', geographyZh: '一座位于海岸、丘陵与沙漠气候交界处的阳光城市', historyEn: 'film culture and car-spread modernity define its dreamlike scale', historyZh: '影视工业与汽车城市结构塑造了它松弛而梦幻的尺度感', characterEn: 'bright, casual, sensual, and image-aware', characterZh: '明亮、松弛、感性，同时非常重视形象' },
  { id: 'sydney', name: 'Sydney', nameZh: '悉尼', country: 'Australia', geographyEn: 'a harbor city of coves, surf, and clear coastal light', geographyZh: '一座拥有海港、海湾与清澈海岸光线的城市', historyEn: 'its colonial past evolved into an outdoor, coastal cosmopolitanism', historyZh: '殖民历史逐渐演化成开放的海岸型国际都市气质', characterEn: 'airy, outdoorsy, relaxed, and sun-washed', characterZh: '通透、户外感强、松弛，被阳光洗亮' },
  { id: 'mumbai', name: 'Mumbai', nameZh: '孟买', country: 'India', geographyEn: 'a humid Arabian Sea metropolis on a narrow peninsula', geographyZh: '一座位于狭长半岛上的阿拉伯海湿热都市', historyEn: 'port trade, cinema, and finance make it layered and kinetic', historyZh: '港口贸易、电影工业与金融中心身份让它复杂而充满动能', characterEn: 'dense, cinematic, vivid, and emotionally charged', characterZh: '密度高、戏剧性强、鲜活而情绪饱满' },
  { id: 'taipei', name: 'Taipei', nameZh: '台北', country: 'Taiwan', geographyEn: 'a humid basin city backed by mountains and hot springs', geographyZh: '一座背山、潮湿并带温泉地貌特征的盆地城市', historyEn: 'its layered Japanese, Chinese, and local histories create a subtle urban memory', historyZh: '日治、中国与本地文化叠加出细腻的城市记忆', characterEn: 'gentle, refined, rain-softened, and quietly contemporary', characterZh: '柔和、细致、被雨水打磨过，也有安静的当代感' },
  { id: 'shenzhen', name: 'Shenzhen', nameZh: '深圳', country: 'China', geographyEn: 'a southern coastal city facing the Pearl River estuary', geographyZh: '一座面向珠江口的华南沿海城市', historyEn: 'its special economic zone history made reinvention central to its identity', historyZh: '经济特区历史让“快速重塑”成为它的核心气质', characterEn: 'lean, innovative, sharp, and future-facing', characterZh: '轻快、创新、敏捷，面向未来' },
  { id: 'guangzhou', name: 'Guangzhou', nameZh: '广州', country: 'China', geographyEn: 'a humid delta city rooted in the Pearl River system', geographyZh: '一座扎根于珠江水系的湿热三角洲城市', historyEn: 'as a historic trading gateway, it carries deep mercantile memory', historyZh: '作为传统通商门户，它有很深的商业与航运记忆', characterEn: 'grounded, pragmatic, warm, and richly textured', characterZh: '务实、稳健、温润，层次很足' },
  { id: 'chengdu', name: 'Chengdu', nameZh: '成都', country: 'China', geographyEn: 'an inland basin city with fertile plains and a softer climate rhythm', geographyZh: '一座位于内陆盆地、气候节奏相对柔和的平原城市', historyEn: 'its long literary and leisure history values ease as much as cultivation', historyZh: '悠长的文人传统与休闲气质让它重视松弛与品味并存', characterEn: 'unhurried, mellow, intimate, and quietly confident', characterZh: '从容、柔和、贴近生活，也有不张扬的自信' },
  { id: 'hangzhou', name: 'Hangzhou', nameZh: '杭州', country: 'China', geographyEn: 'a lake-and-hill city shaped by West Lake and Jiangnan humidity', geographyZh: '一座由西湖、丘陵与江南湿润气候塑造的城市', historyEn: 'poetic heritage and scholar culture give it a refined softness', historyZh: '诗意传统与士人文化让它自带柔润而讲究的气质', characterEn: 'poetic, polished, calm, and subtly luxurious', characterZh: '诗性、精致、平静，也有含蓄的华丽感' },
]

export interface FragranceNotes {
  topNotes: string[]
  middleNotes: string[]
  baseNotes: string[]
}

export interface FragranceDescription {
  zh: string
  en: string
}
