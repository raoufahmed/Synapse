// Committees content (bilingual: [English, Arabic]) + accent colours + images.
// To change a head: edit the `leads` entry; `imgKey` must exist in LEAD_IMGS below
// (leave imgKey out to show an initials badge, like the open positions).
export const COMS=[
  {name:["Media Committee","لجنة الميديا"],desc:["Creating visual content, managing digital platforms, and communicating SYNAPSE’s identity and activities through creative media, photography, videography, and design.","إنتاج المحتوى المرئي، وإدارة المنصات الرقمية، والتعبير عن هويتنا وأنشطتنا من خلال الإعلام الإبداعي والتصوير والمونتاج والتصميم."],leads:[{role:["Head","هيد"],name:["Abdelraouf Mansour","عبد الرؤوف منصور"],imgKey:"media_head"},{role:["Co-Head","كو-هيد"],name:["Mazen Abdulhamid","مازن عبد الحميد"],imgKey:"media_cohead"}]},
  {name:["Scientific Committee","اللجنة العلمية"],desc:["Organizing scientific sessions, academic workshops, and educational opportunities that strengthen students’ medical knowledge and clinical thinking.","تنظيم الجلسات العلمية وورش العمل الأكاديمية والفرص التعليمية التي تعزز المعرفة الطبية والتفكير الإكلينيكي لدى الطلاب."],leads:[{role:["Head","هيد"],name:["Mostafa Ibrahim","مصطفى إبراهيم"],imgKey:"scientific_head"},{role:["Co-Head","كو-هيد"],name:["Mohamed Saleh","محمد صالح"],imgKey:"scientific_cohead"}]},
  {name:["Visits & Conferences Committee","لجنة الزيارات والمؤتمرات"],desc:["Connecting students with real clinical and professional environments through hospital visits, medical conferences, and field exposure beyond the classroom.","ربط الطلاب بالبيئات الطبية والمهنية الحقيقية من خلال الزيارات الميدانية للمستشفيات والمؤتمرات الطبية لاكتساب خبرة عملية خارج قاعة الدراسة."],leads:[{role:["Head","هيد"],name:["Open Position","مكان شاغر"]},{role:["Co-Head","كو-هيد"],name:["Open Position","مكان شاغر"]}]},
  {name:["Campaigns Committee","لجنة الحملات"],desc:["Planning and executing on-campus and community health awareness campaigns that address critical medical and public health issues.","التخطيط لحملات التوعية الصحية داخل الجامعة وفي المجتمع وتنفيذها لمعالجة القضايا الطبية والصحية المؤثرة."],leads:[{role:["Head","هيد"],name:["Rana Abu-Alkhir","رنا أبو الخير"],imgKey:"campaigns_head"},{role:["Co-Head","كو-هيد"],name:["Eman Abdelbaset","إيمان عبد الباسط"],imgKey:"campaigns_cohead"}]},
  {name:["HR Committee","لجنة الموارد البشرية"],desc:["Supporting recruitment, member onboarding, performance tracking, internal communication, and building a healthy, productive team culture.","دعم التوظيف واستقطاب الأعضاء، ومتابعة الأداء، وتعزيز التواصل الداخلي، وبناء ثقافة عمل صحية ومنتجة داخل الفريق."],leads:[{role:["Head","هيد"],name:["Mazen Abdulhamid","مازن عبد الحميد"],imgKey:"hr_head"},{role:["Co-Head","كو-هيد"],name:["Rahaf Medhat","رهف مدحت"],imgKey:"hr_cohead"}]},
  {name:["Humanitarian & Charity Initiatives Committee","لجنة المبادرات الإنسانية والخيرية"],desc:["Leading humanitarian outreach and charitable initiatives that promote compassion, student volunteerism, and direct community service.","قيادة المبادرات الإنسانية والأنشطة الخيرية التي تعزز روح التكافل والتطوع الطلابي وخدمة المجتمع بشكل مباشر."],leads:[{role:["Head","هيد"],name:["Najat Khalid","نجاة خالد"],imgKey:"humanitarian_head"},{role:["Co-Head","كو-هيد"],name:["Rahaf Medhat","رهف مدحت"],imgKey:"humanitarian_cohead"}]},
  {name:["Logistics & Coordination Committee","لجنة اللوجستيات والتنسيق"],desc:["Managing venue setup, operational workflows, supplies, and on-ground coordination to ensure smooth execution of every event and campaign.","إدارة التجهيزات اللوجستية وسير العمليات والموارد والتنسيق الميداني لضمان تنفيذ جميع الفعاليات والحملات بأعلى كفاءة."],leads:[{role:["Head","هيد"],name:["Ali Adel","علي عادل"],imgKey:"logistics_head"},{role:["Co-Head","كو-هيد"],name:["Diaa Ashraf","ضياء أشرف"],imgKey:"logistics_cohead"}]},
  {name:["PR Committee","لجنة العلاقات العامة"],desc:["Building institutional relationships, managing external communications, and securing strategic partnerships and sponsorships with organizations and experts.","بناء العلاقات المؤسسية، وإدارة التواصل الخارجي، وعقد الشراكات الاستراتيجية والرعايات مع الهيئات والخبراء."],leads:[{role:["Head","هيد"],name:["John Hazem","جون حازم"],imgKey:"pr_head"},{role:["Co-Head","كو-هيد"],name:["Anwar Ahmed","أنور أحمد"],imgKey:"pr_cohead"}]},
  {name:["Scientific Research Committee","لجنة البحث العلمي"],desc:["Fostering academic research culture, training students in medical statistics and methodology, and mentoring student research teams.","نشر ثقافة البحث العلمي، وتدريب الطلاب على الإحصاء الطبي ومنهجية البحث، وتوجيه الفرق البحثية الطلابية."],leads:[{role:["Head","هيد"],name:["Ahmed Fayez","أحمد فايز"],imgKey:"research_head"},{role:["Co-Head","كو-هيد"],name:["Fady Ehab","فادي إيهاب"],imgKey:"research_cohead"}]}
];

// One accent colour per committee, same order as COMS.
export const COM_META=[{color:'#a78bfa'},{color:'#60a5fa'},{color:'#5fbf73'},{color:'#f0594e'},{color:'#fb923c'},{color:'#2dd4bf'},{color:'#a3c24a'},{color:'#6f8fef'},{color:'#b58af5'}];

// Card/dialog cover per committee, same order as COMS.
export const COM_IMG = [
  'assets/images/committees/01-media.jpg',
  'assets/images/committees/02-scientific.jpg',
  'assets/images/committees/03-visits-conferences.jpg',
  'assets/images/committees/04-campaigns.jpg',
  'assets/images/committees/05-hr.jpg',
  'assets/images/committees/06-humanitarian-charity.jpg',
  'assets/images/committees/07-logistics.jpg',
  'assets/images/committees/08-pr.jpg',
  'assets/images/committees/09-scientific-research.jpg'
];

// Leader portraits by imgKey.
export const LEAD_IMGS = {
  media_head: 'assets/images/leaders/abdelraouf-mansour.jpg',
  research_head: 'assets/images/leaders/ahmed-fayez.jpg',
  logistics_head: 'assets/images/leaders/ali-adel.jpg',
  pr_cohead: 'assets/images/leaders/anwar-ahmed.jpg',
  logistics_cohead: 'assets/images/leaders/diaa-ashraf.jpg',
  campaigns_cohead: 'assets/images/leaders/eman-abdelbaset.jpg',
  research_cohead: 'assets/images/leaders/fady-ehab.jpg',
  pr_head: 'assets/images/leaders/john-hazem.jpg',
  hr_head: 'assets/images/leaders/mazen-abdulhamid.jpg',
  media_cohead: 'assets/images/leaders/mazen-abdulhamid.jpg',
  scientific_head: 'assets/images/leaders/mostafa-ibrahim.jpg',
  scientific_cohead: 'assets/images/leaders/mohamed-saleh.jpg',
  humanitarian_head: 'assets/images/leaders/najat-khalid.jpg',
  campaigns_head: 'assets/images/leaders/rana-abu-alkhir.jpg',
  hr_cohead: 'assets/images/leaders/rahaf-medhat.jpg'
};
LEAD_IMGS.humanitarian_cohead = LEAD_IMGS.hr_cohead; // same person leads both
