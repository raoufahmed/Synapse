/* ==========================================================================
   SYNAPSE — Website Content & Data
   Edit this file to update photos, committees, events, or YouTube videos.
   Every text field is a pair: ['English text', 'النص العربي']
   ========================================================================== */

const LOGO_SRC = 'assets/logo.webp';

// Helper to build consecutive photo lists, e.g. photoRange('assets/events/blood-donation/b', 103)
function photoRange(prefix, count, ext = 'webp') {
  return Array.from({ length: count }, (_, i) => `${prefix}${i}.${ext}`);
}

/* 1. Hero Scrolling Photo Rail */
const HERO_RAIL = {
  row1: [
    'assets/events/blood-donation/b0.webp',
    'assets/events/hospital-awareness/p0.webp',
    'assets/events/research-achievement/r1.webp',
    'assets/events/blood-donation/b2.webp',
    'assets/events/hospital-awareness/p1.webp',
    'assets/events/blood-donation/b4.webp',
    'assets/events/research-achievement/r2.webp',
    'assets/events/blood-donation/b5.webp'
  ],
  row2: [
    'assets/events/blood-donation/b1.webp',
    'assets/events/research-achievement/r0.webp',
    'assets/events/blood-donation/b3.webp',
    'assets/events/hospital-awareness/p2.webp',
    'assets/events/blood-donation/b6.webp',
    'assets/events/research-achievement/r3.webp',
    'assets/events/blood-donation/b7.webp',
    'assets/events/blood-donation/b8.webp'
  ]
};

/* 2. Committees (9 Committees) */
const COMMITTEES = [
  {
    name: ['Media Committee', 'لجنة الميديا'],
    desc: [
      'Creating visual content, managing digital platforms, and communicating our identity and activities through creative media.',
      'إنتاج المحتوى المرئي، وإدارة المنصات الرقمية، والتعبير عن هويتنا وأنشطتنا من خلال إعلام إبداعي.'
    ],
    color: '#a78bfa',
    image: 'assets/committees/committee-01.jpg'
  },
  {
    name: ['Scientific Committee', 'اللجنة العلمية'],
    desc: [
      'Organizing scientific activities and educational opportunities that enhance students’ medical knowledge and academic development.',
      'تنظيم الأنشطة العلمية والفرص التعليمية التي تعزز المعرفة الطبية للطلاب وتطورهم الأكاديمي.'
    ],
    color: '#60a5fa',
    image: 'assets/committees/committee-02.jpg'
  },
  {
    name: ['Visits & Conferences Committee', 'لجنة الزيارات والمؤتمرات'],
    desc: [
      'Providing students with opportunities to explore professional environments, attend conferences, and gain exposure beyond the classroom.',
      'إتاحة فرص للطلاب لاستكشاف بيئات العمل المهنية وحضور المؤتمرات واكتساب خبرات خارج قاعة الدراسة.'
    ],
    color: '#5fbf73',
    image: 'assets/committees/committee-03.jpg'
  },
  {
    name: ['Campaigns Committee', 'لجنة الحملات'],
    desc: [
      'Planning and executing awareness campaigns that address important medical and social issues.',
      'التخطيط لحملات التوعية وتنفيذها لمعالجة قضايا طبية ومجتمعية مهمة.'
    ],
    color: '#f0594e',
    image: 'assets/committees/committee-04.jpg'
  },
  {
    name: ['HR Committee', 'لجنة الموارد البشرية'],
    desc: [
      'Supporting team development, recruitment, performance, internal communication, and building a productive team culture.',
      'دعم تطوير الفريق والتوظيف والأداء والتواصل الداخلي، وبناء ثقافة عمل منتجة.'
    ],
    color: '#fb923c',
    image: 'assets/committees/committee-05.jpg'
  },
  {
    name: ['Humanitarian & Charity Initiatives Committee', 'لجنة المبادرات الإنسانية والخيرية'],
    desc: [
      'Organizing humanitarian activities and charitable initiatives that encourage compassion, volunteerism, and social responsibility.',
      'تنظيم أنشطة إنسانية ومبادرات خيرية تعزز الرحمة والتطوع والمسؤولية المجتمعية.'
    ],
    color: '#2dd4bf',
    image: 'assets/committees/committee-06.jpg'
  },
  {
    name: ['Logistics & Coordination Committee', 'لجنة اللوجستيات والتنسيق'],
    desc: [
      'Managing operational arrangements and coordinating the resources needed to ensure the smooth execution of events and activities.',
      'إدارة الترتيبات التشغيلية وتنسيق الموارد اللازمة لتنفيذ الفعاليات والأنشطة بسلاسة.'
    ],
    color: '#a3c24a',
    image: 'assets/committees/committee-07.jpg'
  },
  {
    name: ['PR Committee', 'لجنة العلاقات العامة'],
    desc: [
      'Building relationships, managing external communication, and establishing partnerships with organizations, institutions, and potential collaborators.',
      'بناء العلاقات، وإدارة التواصل الخارجي، وعقد شراكات مع المؤسسات والجهات والمتعاونين المحتملين.'
    ],
    color: '#6f8fef',
    image: 'assets/committees/committee-08.jpg'
  },
  {
    name: ['Scientific Research Committee', 'لجنة البحث العلمي'],
    desc: [
      'Encouraging scientific research, developing students’ research skills, and introducing them to the principles of academic research and evidence-based thinking.',
      'تشجيع البحث العلمي وتنمية مهارات الطلاب البحثية وتعريفهم بمبادئ البحث الأكاديمي والتفكير القائم على الدليل.'
    ],
    color: '#b58af5',
    image: 'assets/committees/committee-09.jpg'
  }
];

/* 3. Events & Activities
   Valid categories: 'community' | 'awareness' | 'research' | 'education' */
const EVENTS = [
  {
    category: 'community',
    tag: ['Merit University', 'جامعة ميريت'],
    title: ['Blood Donation Campaign', 'حملة التبرع بالدم'],
    tagline: [
      'Turning a humanitarian idea into a real-life impact.',
      'تحويل فكرة إنسانية إلى أثر حقيقي في حياة الناس.'
    ],
    paragraphs: [
      [
        'As part of our commitment to spreading medical awareness and promoting social responsibility, the SYNAPSE Media Team organized a blood donation campaign at Merit University, aiming to encourage students to take part in an initiative that can make a real difference in people’s lives.',
        'في إطار التزامنا بنشر الوعي الطبي وتعزيز المسؤولية المجتمعية، نظّم فريق الميديا في SYNAPSE حملة للتبرع بالدم في جامعة ميريت، بهدف تشجيع الطلاب على المشاركة في مبادرة قادرة على إحداث فرق حقيقي في حياة الناس.'
      ],
      [
        'Beyond raising awareness about the importance of blood donation, our team worked to turn awareness into action. We coordinated with the Blood Bank to provide dedicated blood donation vehicles on campus, making it easier and more accessible for students to participate.',
        'ولم نكتفِ بالتوعية بأهمية التبرع بالدم، بل عملنا على تحويلها إلى فعل حقيقي. فقد نسّقنا مع بنك الدم لتوفير سيارات تبرع مخصصة داخل الحرم الجامعي، لتسهيل مشاركة الطلاب.'
      ],
      [
        'The campaign saw a strong response, with many students joining and donating blood, showing the power of student engagement and collective action in serving the community.',
        'وشهدت الحملة إقبالًا كبيرًا، إذ شارك عدد كبير من الطلاب وتبرعوا بالدم، مما يعكس قوة التفاعل الطلابي وأهمية العمل الجماعي في خدمة المجتمع.'
      ]
    ],
    roleHeading: ['Our Role', 'دورنا'],
    roles: [
      ['Planning and organizing the campaign.', 'التخطيط للحملة وتنظيمها.'],
      ['Coordinating with the Blood Bank to provide donation vehicles on campus.', 'التنسيق مع بنك الدم لتوفير سيارات التبرع داخل الجامعة.'],
      ['Creating awareness content and campaign visuals.', 'إعداد محتوى التوعية والتصميمات الخاصة بالحملة.'],
      ['Encouraging students to participate and contribute.', 'تشجيع الطلاب على المشاركة والمساهمة.'],
      ['Turning an awareness initiative into real community engagement.', 'تحويل مبادرة توعوية إلى تفاعل مجتمعي حقيقي.']
    ],
    quote: {
      heading: ['Our Mission', 'رسالتنا'],
      text: [
        'At SYNAPSE, we believe that media is more than just delivering messages. It is a tool for inspiring action and creating meaningful change.',
        'في SYNAPSE نؤمن أن الإعلام أكثر من مجرد توصيل رسائل، فهو أداة لإلهام الفعل وصناعة تغيير حقيقي.'
      ]
    },
    highlight: [
      'On-campus blood donation vehicles were coordinated with the Blood Bank, making participation easier for students.',
      'تم التنسيق مع بنك الدم لتوفير سيارات تبرع داخل الحرم الجامعي، لتسهيل مشاركة الطلاب.'
    ],
    byline: [
      'SYNAPSE Media Team · Raising Awareness. Creating Impact.',
      'فريق الميديا SYNAPSE · نرفع الوعي. نصنع الأثر.'
    ],
    photos: photoRange('assets/events/blood-donation/b', 103)
  },
  {
    category: 'awareness',
    tag: ['One-Day Hospital, Sohag', 'مستشفى اليوم الواحد، سوهاج'],
    title: [
      'Antibiotics & Painkillers Awareness Campaign',
      'حملة التوعية بالمسكنات والمضادات الحيوية'
    ],
    tagline: [
      'Raising awareness. Promoting safer healthcare.',
      'نرفع الوعي. ونعزز الرعاية الصحية الآمنة.'
    ],
    paragraphs: [
      [
        'As part of our commitment to promoting health awareness and responsible medical practices, the SYNAPSE Media Team organized an awareness campaign at One-Day Hospital in Sohag, focusing on the risks of using antibiotics and painkillers without consulting a qualified healthcare professional.',
        'في إطار التزامنا بتعزيز الوعي الصحي والممارسات الطبية المسؤولة، نظّم فريق الميديا في SYNAPSE حملة توعية في مستشفى اليوم الواحد بسوهاج، ركّزت على مخاطر استخدام المضادات الحيوية والمسكنات دون استشارة مختص.'
      ],
      [
        'The campaign aimed to educate patients about the dangers of self-medication, including antibiotic misuse, antibiotic resistance, and the risks of taking painkillers without medical guidance.',
        'هدفت الحملة إلى توعية المرضى بمخاطر العلاج الذاتي، ومنها إساءة استخدام المضادات الحيوية ومقاومتها، ومخاطر تناول المسكنات دون إرشاد طبي.'
      ],
      [
        'Our team visited the hospital and engaged directly with patients, delivering clear health information, answering questions, and stressing the importance of consulting doctors before using medications.',
        'زار فريقنا المستشفى وتواصل مباشرة مع المرضى، وقدّم معلومات صحية واضحة وبسيطة، وأجاب عن الأسئلة، وأكد أهمية استشارة الطبيب قبل استخدام أي دواء.'
      ],
      [
        'The campaign received positive feedback and acceptance from patients, creating meaningful interactions and greater awareness of safe medication practices.',
        'وحظيت الحملة بتفاعل وتقبّل إيجابي من المرضى، وخلقت حوارات مؤثرة ساهمت في نشر ثقافة الاستخدام الآمن للدواء.'
      ]
    ],
    roleHeading: ['Our Role', 'دورنا'],
    roles: [
      ['Planning and organizing the awareness campaign.', 'التخطيط للحملة التوعوية وتنظيمها.'],
      ['Visiting One-Day Hospital in Sohag to engage directly with patients.', 'زيارة مستشفى اليوم الواحد بسوهاج والتواصل المباشر مع المرضى.'],
      ['Delivering educational messages about the risks of medication misuse.', 'تقديم رسائل توعوية حول مخاطر إساءة استخدام الأدوية.'],
      ['Raising awareness about antibiotic resistance and improper painkiller use.', 'التوعية بمقاومة المضادات الحيوية والاستخدام الخاطئ للمسكنات.'],
      ['Encouraging patients to consult healthcare professionals before taking medication.', 'تشجيع المرضى على استشارة المختصين قبل تناول أي دواء.']
    ],
    quote: {
      heading: ['Our Impact', 'أثرنا'],
      text: [
        'Through direct communication and patient engagement, we helped bring an important healthcare issue closer to the community, reinforcing responsible medication use and informed health decisions.',
        'من خلال التواصل المباشر مع المرضى، قرّبنا قضية صحية مهمة من المجتمع، وعززنا الاستخدام المسؤول للدواء والقرارات الصحية الواعية.'
      ]
    },
    highlight: [
      'Direct conversations with patients helped communicate the risks of medication misuse and safer practices.',
      'ساهم التواصل المباشر مع المرضى في توضيح مخاطر إساءة استخدام الأدوية وممارسات الاستخدام الآمن.'
    ],
    byline: [
      'SYNAPSE Media Team · Raising Awareness. Creating Impact.',
      'فريق الميديا SYNAPSE · نرفع الوعي. نصنع الأثر.'
    ],
    photos: photoRange('assets/events/hospital-awareness/p', 27)
  },
  {
    category: 'research',
    tag: ['5th Upper Egypt Conference', 'المؤتمر الخامس لصعيد مصر'],
    title: ['Student Research Achievement', 'إنجاز بحثي طلابي'],
    tagline: [
      'Recognizing research. Celebrating excellence.',
      'نقدّر البحث العلمي. ونحتفي بالتميز.'
    ],
    paragraphs: [
      [
        'The SYNAPSE Media Team proudly celebrates student members who earned Third Place for their scientific research at the 5th Upper Egypt Conference, held at Merit University.',
        'يفخر فريق الميديا في SYNAPSE بالاحتفاء بأعضائنا من الطلاب الذين حصلوا على المركز الثالث عن أبحاثهم العلمية في المؤتمر الخامس لصعيد مصر، الذي أُقيم في جامعة ميريت.'
      ],
      [
        'This recognition reflects the students’ dedication, research efforts, and commitment to academic excellence, and shows why encouraging scientific research and supporting young researchers matters.',
        'يعكس هذا التقدير تفاني الطلاب وجهودهم البحثية والتزامهم بالتميز الأكاديمي، ويبرز أهمية تشجيع البحث العلمي ودعم الباحثين الشباب.'
      ],
      [
        'We are proud to celebrate this achievement and recognize the hard work behind it.',
        'نفخر بهذا الإنجاز ونقدّر الجهد الكبير وراءه.'
      ]
    ],
    roleHeading: ['Achievement Highlights', 'أبرز الإنجازات'],
    roles: [
      ['Third Place in the 5th Upper Egypt Conference.', 'المركز الثالث في المؤتمر الخامس لصعيد مصر.'],
      ['Scientific research presented by student members of the family.', 'أبحاث علمية قدّمها طلاب من أعضاء الأسرة.'],
      ['Conference hosted at Merit University.', 'المؤتمر أُقيم في جامعة ميريت.'],
      ['Recognition of student research and academic excellence.', 'تقدير للبحث الطلابي والتميز الأكاديمي.']
    ],
    highlight: [
      'SYNAPSE student members earned Third Place for their scientific research at the 5th Upper Egypt Conference.',
      'حصل أعضاء من طلاب SYNAPSE على المركز الثالث بأبحاثهم العلمية في المؤتمر الخامس لصعيد مصر.'
    ],
    byline: [
      'SYNAPSE Media Team · Supporting Talent. Celebrating Achievement.',
      'فريق الميديا SYNAPSE · ندعم المواهب. نحتفي بالإنجاز.'
    ],
    photos: photoRange('assets/events/research-achievement/r', 9)
  },
  {
    category: 'education',
    tag: ['Educational Session · Sep 17, 2026', 'جلسة تعليمية · 17 سبتمبر 2026'],
    title: ['Introduction to Medical Statistics', 'مقدمة في الإحصاء الطبي'],
    tagline: [
      'Building research skills. Empowering future researchers.',
      'نبني المهارات البحثية. ونمكّن باحثي المستقبل.'
    ],
    paragraphs: [
      [
        'As part of its commitment to academic development and scientific research, the Scientific Research Committee at SYNAPSE organized an educational session titled “Introduction to Medical Statistics”, introducing students to the fundamentals of medical statistics and why they matter in scientific research.',
        'في إطار التزامها بالتطوير الأكاديمي والبحث العلمي، نظّمت لجنة البحث العلمي في SYNAPSE جلسة تعليمية بعنوان «مقدمة في الإحصاء الطبي»، تعرّف الطلاب بأساسيات الإحصاء الطبي وأهميته في البحث العلمي.'
      ],
      [
        'The session was delivered by Dr. Ahmed Fayez on Thursday, September 17, 2026, giving students a chance to explore the basics of statistical analysis and its role in interpreting medical data and conducting evidence-based research.',
        'قدّم الجلسة د. أحمد فايز يوم الخميس 17 سبتمبر 2026، وأتاحت للطلاب فرصة استكشاف أساسيات التحليل الإحصائي ودوره في تفسير البيانات الطبية وإجراء الأبحاث القائمة على الدليل.'
      ],
      [
        'This initiative reflects our commitment to equipping medical students with essential research skills, encouraging scientific thinking, and preparing them to become more confident and effective researchers.',
        'تعكس هذه المبادرة التزامنا بتزويد طلاب الطب بمهارات البحث الأساسية، وتشجيع التفكير العلمي، وإعدادهم ليكونوا باحثين أكثر ثقة وكفاءة.'
      ]
    ],
    roleHeading: ['Session Highlights', 'أبرز محاور الجلسة'],
    roles: [
      ['Introduction to the fundamentals of medical statistics.', 'مقدمة في أساسيات الإحصاء الطبي.'],
      ['Understanding the role of statistics in medical research.', 'فهم دور الإحصاء في البحث الطبي.'],
      ['Developing students’ research and analytical skills.', 'تنمية المهارات البحثية والتحليلية للطلاب.'],
      ['Promoting evidence-based thinking among medical students.', 'تعزيز التفكير القائم على الدليل لدى طلاب الطب.']
    ],
    highlight: [
      'A session led by Dr. Ahmed Fayez introduced students to medical statistics and its role in research.',
      'قدّم د. أحمد فايز جلسة عرّفت الطلاب بالإحصاء الطبي ودوره في البحث العلمي.'
    ],
    byline: [
      'Organized by SYNAPSE · Scientific Research Committee · Learning. Researching. Advancing.',
      'تنظيم SYNAPSE · لجنة البحث العلمي · نتعلم. نبحث. نتقدم.'
    ],
    photos: ['assets/events/medical-statistics/s0.webp']
  }
];

/* 4. Videos & Reels (YouTube 3D Carousel)
   To add a video, duplicate any block below and paste its YouTube video ID & link. */
const VIDEOS = [
  {
    id: 'yu3nl-_dNNY',
    url: 'https://youtube.com/shorts/yu3nl-_dNNY',
    color: '#00B4E6',
    tag: ['Neuroscience · Hebb’s Law', 'علم الأعصاب · قانون هيب'],
    title: [
      'Cells That Fire Together, Wire Together 🔥',
      'الخلايا اللي بتـ Fire مع بعض بتـ Wire مع بعض 🔥'
    ],
    desc: [
      'How repeated neural activation strengthens synaptic connections and turns daily habits and active recall into lasting memory.',
      'إزاي التفعيل المتكرر للخلايا العصبية بيقوّي التشابكات العصبية ويحوّل العادات والمذاكرة النشطة لذاكرة طويلة المدى.'
    ]
  },
  {
    id: 'AC5vZo504wg',
    url: 'https://youtube.com/shorts/AC5vZo504wg',
    color: '#00B4C4',
    tag: ['Study & Focus · Productivity', 'المذاكرة والتركيز · الإنتاجية'],
    title: [
      'Zero Productivity After Hours of Exhaustion 📉',
      'زيرو إنتاجية بعد ساعات من التعب 📉'
    ],
    desc: [
      'Why long study hours without deep focus drain your energy and how to work smarter instead of burning out.',
      'ليه ساعات المذاكرة الطويلة من غير تركيز حقيقي بتستنزف طاقتك وإزاي تذاكر بذكاء بدل الإرهاق.'
    ]
  },
  {
    id: 'yt5XHHCVsho',
    url: 'https://youtube.com/shorts/yt5XHHCVsho',
    color: '#10B981',
    tag: ['Digital Habits · Dopamine', 'العادات الرقمية · الدوبامين'],
    title: [
      'Does Your Phone Make Everything Slower Than Reels Feel Boring?',
      'موبايلك بيحسسك إن أي حاجة أبطأ من الريلز مملة؟'
    ],
    desc: [
      'How rapid short-form scrolling rewires your attention span and what you can do to reclaim real focus.',
      'إزاي التصفح السريع للريلز بيأثر على تركيزك وإيه الخطوات اللي ترجعلك قدرتك على التركيز العميق.'
    ]
  },
  {
    id: 'z4I0Pq_q1oQ',
    url: 'https://youtube.com/shorts/z4I0Pq_q1oQ',
    color: '#3B82F6',
    tag: ['Psychology · Mental Energy', 'علم النفس · الطاقة الذهنية'],
    title: [
      'Avoiding Long Conversations and Calling Yourself an Introvert?',
      'بتهرب من أي نقاش طويل وتصنّف نفسك انطوائي لمجرد إن مخك مكسل يفكر؟'
    ],
    desc: [
      'The difference between true introversion and mental fatigue from overstimulation and low cognitive stamina.',
      'الفرق بين الانطوائية الحقيقية وبين الإرهاق الذهني وكسل التفكير بسبب التشتت المستمر.'
    ]
  },
  {
    id: 'JyftnW4cEvk',
    url: 'https://youtu.be/JyftnW4cEvk',
    color: '#0EA5E9',
    tag: ['Health Awareness · Prevention', 'الوعي الصحي · الوقاية'],
    title: [
      'Awareness Is the First Step to Safety, Knowledge Is the First Shield',
      'الوعي هو أولى خطوات الأمان، والمعرفة هي الحصن الأول'
    ],
    desc: [
      'An awareness episode highlighting how early medical knowledge protects individuals and communities.',
      'حلقة توعوية بتسلط الضوء على دور المعرفة الطبية المبكرة في حماية الفرد والمجتمع.'
    ]
  },
  {
    id: 'JwDqo9g9YoA',
    url: 'https://youtu.be/JwDqo9g9YoA',
    color: '#8B5CF6',
    tag: ['Medical Genetics · Premarital Screening', 'الوراثة الطبية · فحوصات ما قبل الزواج'],
    title: [
      'Would You Go Ahead With Marriage If Your Child Could Face a Lifelong Genetic Disease?',
      'تكمل الجوازة حتى لو طفلك ممكن يتولد بمرض وراثي طول العمر؟'
    ],
    desc: [
      'Why premarital genetic screening and medical counseling matter before taking one of life’s biggest decisions.',
      'أهمية الفحوصات الوراثية والاستشارة الطبية قبل الزواج لحماية أطفال المستقبل من الأمراض الوراثية المزمنة.'
    ]
  }
];
