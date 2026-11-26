export interface ProgramItem {
  id: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
  deliverables: string[];
  impactFocus: string;
  ctaLabel: string;
}

export interface StoryItem {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  imageUrl: string;
  beneficiaryName: string;
  beneficiaryMeta: string;
  pullquote: string;
  paragraphs: string[];
  stats: { value: string; label: string }[];
  tags: string[];
  gallery?: string[];
}

export interface Trustee {
  name: string;
  role: string;
  image: string;
}

export interface DonationTier {
  amount: number;
  formatted: string;
  shortLabel: string;
  description: string;
  programmeLink: string;
}

export const JOF_CONTACT = {
  shortName: 'JOF',
  fullName: 'Janet Owieadolor Foundation',
  tagline: 'Restoring Hope & Dignity',
  address: '22 Eromosele Street, Off College Road, Ekewan Road, Benin City, Edo State',
  phoneDisplay: '+234 703 324 4322',
  phoneHref: 'tel:+2347033244322',
  whatsappNumber: '2347033244322',
  whatsappUrl:
    'https://wa.me/2347033244322?text=Hello%20Janet%20Owieadolor%20Foundation%2C%20I%20would%20like%20to%20inquire%20about...',
  email: 'info@janetowieadolorfoundation.com',
  facebookUrl: 'https://facebook.com/janetowieadolorfoundation',
};

export const MISSION_DATA = {
  vision: 'To be a foremost platform for the empowerment of widows and single mothers in Nigeria.',
  mission:
    "To reach out to and support widows and single mothers by strengthening their capacity to overcome life's challenges and achieve success.",
  narrative:
    'Founded by Mama Janet Owieadolor in Benin City, JOF uplifts vulnerable and indigent widows across Edo State and Nigeria through community-based outreach, seasonal welfare packages, free medical interventions, pro-bono legal advocacy, and sustainable enterprise grants.',
  pillars: [
    {
      title: 'Direct Welfare',
      description:
        'Delivering essential foodstuffs, including rice, beans, salt, tomato paste, and cooking oils, directly to vulnerable households.',
    },
    {
      title: 'Free Medical Interventions',
      description:
        'Providing vital general health screenings, blood pressure checks, eye examinations, and free prescription medications.',
    },
    {
      title: 'Economic & Family Support',
      description:
        'Distributing agricultural tools, seed capital micro-grants, legal rights advocacy, and educational scholarships for children.',
    },
  ],
};

export const IMPACT_METRICS = [
  {
    target: 500,
    suffix: '+',
    label: 'Widows Reached in Single Outreaches',
    detail: 'Such as our Abumwenre Community outreach across Edo State.',
  },
  {
    target: 8,
    suffix: '+',
    label: 'Years of Continuous Service',
    detail: 'Sustained grassroots presence across urban and rural communities.',
  },
  {
    target: 100,
    suffix: '%',
    label: 'Community-Focused Relief',
    detail: 'Food supplies, optical care, and grants reaching real households.',
  },
  {
    target: 98.4,
    suffix: '%',
    decimals: 1,
    label: 'Long-Term Independence Rate',
    detail: 'Among micro-grant recipients building lasting self-reliance.',
  },
];

export const CHRONICLE_FRAMES = [
  {
    src: '/assets/campaign/food-bags-distribution.jpg',
    caption: 'Super Woman Outreach · Household food parcels',
  },
  {
    src: '/assets/campaign/medical-checkup.jpg',
    caption: 'Quarterly Medical Clinic · Blood pressure & optical screenings',
  },
  {
    src: '/assets/campaign/agricultural-market.jpg',
    caption: 'Abumwenre Community · Market & livelihood trade support',
  },
  {
    src: '/assets/campaign/crowd-tent-1.jpg',
    caption: 'Edo State Gathering · 500+ widows convened under one canopy',
  },
];

export const CORE_PROGRAMS: ProgramItem[] = [
  {
    id: 'super-woman-relief',
    title: 'Super Woman Relief Outreach',
    summary:
      'Seasonal distributions of essential foodstuffs, rice, beans, salt, cooking oil, and tomato paste, relieving acute economic pressure on indigent widows and their dependents.',
    image: '/assets/campaign/food-bags-distribution.jpg',
    imageAlt: 'JOF volunteers and widows holding distributed relief food packages',
    deliverables: [
      'Seasonal food essentials',
      'Direct household delivery',
      'Community-based outreach drives',
    ],
    impactFocus: 'Abumwenre & Benin City Outreaches',
    ctaLabel: 'Sponsor a Food Parcel',
  },
  {
    id: 'medical-optical-care',
    title: 'Medical Check-ups & Optical Care',
    summary:
      'Free general health assessments, blood pressure monitoring, eye examinations, prescription medications, and grief-counselling referrals led by qualified medical volunteers.',
    image: '/assets/campaign/medical-checkup.jpg',
    imageAlt: 'Volunteer doctor checking blood pressure during a JOF medical outreach',
    deliverables: [
      'Free general health screenings',
      'Optical & eye examinations',
      'Prescription medications & follow-up',
    ],
    impactFocus: 'Quarterly Mobile Clinics',
    ctaLabel: 'Fund a Medical Screening',
  },
  {
    id: 'agricultural-livelihood',
    title: 'Agricultural & Livelihood Support',
    summary:
      'Equipping hardworking women in farming communities like Abumwenre with agricultural tools, commercial training, and ₦50,000–₦75,000 seed capital micro-grants.',
    image: '/assets/campaign/agricultural-market.jpg',
    imageAlt: 'Women market traders speaking with JOF coordinators in Edo State',
    deliverables: [
      'Agricultural tool distribution',
      'Market women micro-grants',
      'Business fundamentals coaching',
    ],
    impactFocus: '98.4% Long-Term Independence',
    ctaLabel: "Fund a Widow's Business",
  },
  {
    id: 'family-scholarships',
    title: 'Family Support & Child Scholarships',
    summary:
      'Educational tuition stipends for children of widows alongside pro-bono legal advocacy to defend inheritance and land rights against eviction.',
    image: '/assets/campaign/event-hall-2.jpg',
    imageAlt: 'JOF programme leaders addressing widows during a community empowerment assembly',
    deliverables: [
      'Secondary & primary tuition stipends',
      'Pro-bono inheritance & land advocacy',
      'Child protection & family welfare',
    ],
    impactFocus: 'Intergenerational Protection',
    ctaLabel: "Sponsor a Child's Tuition",
  },
];

export const BASELINE_STORIES: StoryItem[] = [
  {
    slug: 'adaeze-garment-business',
    title: 'From Eviction Threat to Thriving Garment Business',
    category: 'Micro-Grants',
    excerpt:
      'After losing her husband and facing land eviction with three children, Adaeze secured her home through JOF legal aid and built a tailoring enterprise that mentors ten widows.',
    imageUrl: '/assets/beneficiaries/beneficiary-adaeze.jpg',
    beneficiaryName: 'Adaeze O.',
    beneficiaryMeta: 'Micro-Grant Beneficiary & Business Owner · Enugu State',
    pullquote:
      "Through JOF's legal advocacy and a tailoring grant, I built a flourishing garment business. Today, all my children are in school, and I mentor 10 other widows.",
    paragraphs: [
      "When Adaeze's husband passed away suddenly, she was left to care for three young children with no income and no safety net. Within months, extended family members contested the family's land, and Adaeze found herself facing eviction from the only home her children had known.",
      '"I didn\'t know where to turn," she recalls. "I had no money for a lawyer, and I had three children depending on me." A neighbor referred her to JOF\'s legal advocacy program, which took on her land rights case at no cost.',
      "While the legal team worked to secure her family's home, Adaeze enrolled in JOF's vocational training program, learning tailoring and garment production. A ₦75,000 micro-grant covered her first sewing machine and starter fabric inventory.",
      'Eighteen months later, Adaeze runs a full garment business out of her home, employing two apprentices and supplying uniforms to a local school. All three of her children are enrolled in school, and she now volunteers as a peer mentor, walking ten other widows through the same legal and vocational process that changed her life.',
    ],
    stats: [
      { value: '₦75,000', label: 'Micro-Grant Received' },
      { value: '3', label: 'Children in School' },
      { value: '10', label: 'Widows Mentored' },
    ],
    tags: ['100% Self-Sufficient', '3 Children Enrolled'],
  },
  {
    slug: 'ngozi-market-stall',
    title: 'From a Wheelbarrow to a Thriving Market Stall',
    category: 'Micro-Enterprise',
    excerpt:
      'Pushing peppers from a roadside wheelbarrow left Ngozi losing unsold stock each night. A ₦50,000 micro-grant transformed her trade into a stall employing two fellow widows.',
    imageUrl: '/assets/beneficiaries/beneficiary-ngozi.jpg',
    beneficiaryName: 'Ngozi A.',
    beneficiaryMeta: 'Micro-Enterprise Beneficiary & Market Trader · Ogun State',
    pullquote:
      "With a micro-grant and business training from JOF, I now run a stall that supplies three local restaurants. I've helped two other widows set up their own stalls.",
    paragraphs: [
      "For two years after her husband's death, Ngozi sold peppers and tomatoes from a wheelbarrow she pushed between her local market and the roadside, earning barely enough to feed her household each day.",
      '"I had no stall, no storage, nowhere to keep my produce overnight," she says. "Everything I didn\'t sell by evening, I lost." JOF\'s economic empowerment team identified Ngozi through a community outreach visit and enrolled her in a business fundamentals course alongside a ₦50,000 micro-grant.',
      "With the grant, Ngozi secured a proper stall in Ogun State's central market, invested in storage crates, and began buying produce in bulk directly from farmers, cutting her costs significantly. Within a year, she was supplying fresh produce to three local restaurants on standing weekly orders.",
      "Today, Ngozi's stall employs two other widows from her community, both of whom she trained herself using the same business principles JOF taught her.",
    ],
    stats: [
      { value: '₦50,000', label: 'Micro-Grant Received' },
      { value: '3', label: 'Restaurant Clients' },
      { value: '2', label: 'Widows Employed' },
    ],
    tags: ['Stall Fully Owned', 'Employs 2 Widows'],
  },
  {
    slug: 'chiamaka-healthcare-recovery',
    title: 'A Second Chance at Health, and at Life',
    category: 'Healthcare',
    excerpt:
      'An untreated chronic illness left Chiamaka barely able to stand before a JOF screening intervened, covering her full treatment and connecting her with grief counseling.',
    imageUrl: '/assets/campaign/medical-checkup.jpg',
    beneficiaryName: 'Chiamaka E.',
    beneficiaryMeta: 'Healthcare Program Beneficiary · Anambra State',
    pullquote:
      "JOF's healthcare program covered my treatment and connected me to a grief counselor. I'm healthy again, and now volunteer at their quarterly medical clinics.",
    paragraphs: [
      "In the months after her husband's death, Chiamaka noticed her health declining but couldn't afford to see a doctor. What began as fatigue and occasional pain progressed for nearly a year before a JOF community health screening caught a serious, treatable condition that had gone undiagnosed.",
      '"By the time I was screened, I could barely stand for long," Chiamaka says. "I had been putting my children first, telling myself I would deal with my health later. Later almost never came."',
      "JOF's healthcare program covered the full cost of her treatment and connected her with a grief counselor to help her process the loss of her husband alongside her health scare. Over eight months, Chiamaka made a full recovery.",
      "She now volunteers at JOF's quarterly medical outreach clinics, encouraging other widows in her community not to delay care, sharing her own story as a reminder of what's at stake.",
    ],
    stats: [
      { value: '8', label: 'Months to Recovery' },
      { value: '100%', label: 'Treatment Covered' },
      { value: '4x', label: 'Clinics Volunteered' },
    ],
    tags: ['Full Recovery', 'Clinic Volunteer'],
  },
  {
    slug: 'blessing-daughter-education',
    title: "Keeping a Daughter's Education Alive",
    category: 'Education & Relief',
    excerpt:
      'Faced with withdrawing her eldest daughter from secondary school, Blessing received three months of emergency household groceries and an ongoing tuition stipend.',
    imageUrl: '/assets/campaign/crowd-tent-1.jpg',
    beneficiaryName: 'Blessing U.',
    beneficiaryMeta: 'Emergency Relief & Education Beneficiary · Lagos State',
    pullquote:
      'An emergency relief package kept my children fed during our hardest months, and a tuition stipend meant my daughter never had to drop out of school.',
    paragraphs: [
      "When Blessing lost her husband, the family's income disappeared overnight. With three children to feed and school fees due within weeks, she made the painful decision to withdraw her eldest daughter from secondary school to save money.",
      '"She cried for days," Blessing remembers. "She was one of the best students in her class, and I felt like I had taken her future away." A local church connected Blessing with JOF\'s emergency relief program just weeks later.',
      "An emergency relief package covered groceries and household essentials for three months, giving Blessing breathing room. A tuition stipend from the Foundation's education support fund then covered her daughter's school fees for the remainder of the academic year, and has continued since.",
      'Blessing has since rebuilt a stable income from home, running a small provisions business. Her daughter is now in her final year of secondary school, with plans to sit for university entrance exams next year.',
    ],
    stats: [
      { value: '3', label: 'Months Relief Covered' },
      { value: '1', label: 'Daughter Back in School' },
      { value: 'Final Yr', label: 'Secondary School' },
    ],
    tags: ['Daughter in School', 'Stable Housing'],
  },
  {
    slug: 'december-2022-christmas-outreach-scholarship',
    title: 'Christmas Widows Outreach & Scholarship Award in Benin City',
    category: 'Field Dispatch',
    excerpt:
      'On December 17, 2022, Mama Janet Owieadolor welcomed over 50 widows to her home for Christmas worship, foodstuffs, and a child scholarship award to Eghosa Favour.',
    imageUrl: '/assets/outreach/dec-2022-scholarship-cover.jpg',
    beneficiaryName: 'December 17, 2022 · Benin City Outreach',
    beneficiaryMeta: '50+ Widows Welcomed · Scholarship Presented to Eghosa Favour',
    pullquote:
      'Mama Janet Owieadolor opened the doors of her home and welcomed more than 50 widows to share Christmas with them — culminating in prayers, foodstuffs, and a scholarship award.',
    paragraphs: [
      'Every December, the Janet Owieadolor Foundation gathers widows across Benin City to celebrate Christmas with dignity and shared warmth. On December 17, 2022, Mama Janet Owieadolor opened the doors of her home and welcomed more than 50 widows for a day of fellowship, worship, and practical relief.',
      'The gathering opened with praise, worship, and prayer, followed by a message from Pastor (Mrs.) Iyoha Juliet and personal words of encouragement from Mama Janet, who drew on her own life journey to remind every widow present that she is neither forgotten nor alone.',
      'During the outreach, Mama Janet presented an educational scholarship to Eghosa Favour — received on the child’s behalf by her mother — alongside individual testimonies from widows recounting how JOF’s ongoing support has sustained their households.',
      'Before departing, every widow received Christmas food essentials including rice, beans, salt, and tomato paste, along with refreshments shared together as one community.',
    ],
    stats: [
      { value: '50+', label: 'Widows Hosted' },
      { value: '1', label: 'Child Scholarship Awarded' },
      { value: 'Dec 2022', label: 'Outreach Date' },
    ],
    tags: ['Christmas Outreach', 'Child Scholarship', 'Food Relief'],
    gallery: [
      '/assets/outreach/dec-2022-mama-janet.jpg',
      '/assets/outreach/dec-2022-pastor-iyoha.jpg',
      '/assets/outreach/dec-2022-gathering-1.jpg',
      '/assets/outreach/dec-2022-gathering-2.jpg',
      '/assets/outreach/dec-2022-gathering-3.jpg',
      '/assets/outreach/dec-2022-gathering-4.jpg',
      '/assets/outreach/dec-2022-gathering-5.jpg',
    ],
  },
  {
    slug: 'april-2022-80th-birthday-medical-outreach',
    title: "Mama Janet's 80th Birthday Medical & Optical Care Outreach",
    category: 'Medical Care',
    excerpt:
      'Marking Mama Janet Owieadolor’s 80th birthday on April 23, 2022, JOF convened volunteer physicians and optometrists for free blood pressure checks, eye exams, and prescriptions.',
    imageUrl: '/assets/outreach/apr-2022-medical-cover.jpg',
    beneficiaryName: 'April 23, 2022 · 80th Birthday Medical Clinic',
    beneficiaryMeta: 'Dr. Charles Eguaveon Optical Team & Dr. Austin Medical Team · Benin City',
    pullquote:
      'To mark Mama Janet’s 80th birthday, JOF paired welfare packages with full general medical examinations, optical screenings, and free prescription medications.',
    paragraphs: [
      'On April 23, 2022, the Janet Owieadolor Foundation marked the 80th birthday of founder Mama Janet Owieadolor by turning celebration into service — hosting an annual widows outreach expanded to include free general medical examinations and optical care.',
      'Following an opening prayer by JOF Coordinator Mrs. Ekhor Iyoha and a hygiene and safety briefing, attendees received numbered check-in tags for smooth triage. Blood pressure and temperature checks led directly into one-on-one consultations with Dr. Austin and his medical team, who prescribed and dispensed medications on-site at zero cost.',
      'Widows experiencing vision challenges were guided to Dr. Charles Eguaveon and his optical team for thorough eye screenings. Afterward, refreshments were served and JOF Chairman Dr. Francis Owieadolor delivered a welcome address.',
      'The afternoon closed with a preventive health talk by Dr. Austin, an exhortation on uplifting the vulnerable by Pastor John Ehiwere, encouraging remarks from Mama Janet, a vote of thanks from Engr. Osariemen Owieadolor, and welfare package distribution to every attendee.',
    ],
    stats: [
      { value: '80th', label: 'Founder Milestone' },
      { value: '2', label: 'Specialist Medical Teams' },
      { value: '100%', label: 'Free Prescriptions & Care' },
    ],
    tags: ['Medical Clinic', 'Optical Care', '80th Birthday'],
    gallery: [
      '/assets/outreach/apr-2022-optical-check.jpg',
      '/assets/outreach/apr-2022-doctors-team.jpg',
      '/assets/outreach/apr-2022-welfare-packages.jpg',
      '/assets/outreach/apr-2022-address.jpg',
    ],
  },
  {
    slug: 'december-2021-meet-their-needs-abumwenre',
    title: 'Meet Their Needs 2021: Abumwenre Community Christmas Outreach',
    category: 'Field Dispatch',
    excerpt:
      'On December 18, 2021, JOF partnered with Widows Help Rendezvous in Abumwenre Community, Ovia North East LGA, distributing rice, salt, and groundnut oil to rural widows.',
    imageUrl: '/assets/outreach/dec-2021-abumwenre-cover.jpg',
    beneficiaryName: 'December 18, 2021 · Abumwenre Community',
    beneficiaryMeta: 'Ovia North East LGA, Edo State · With Widows Help Rendezvous',
    pullquote:
      'The widows all went home with rice, salt, and groundnut oil amidst smiles and joy across Abumwenre Community.',
    paragraphs: [
      'Continuing its annual Christmas tradition on December 18, 2021, the Janet Owieadolor Foundation collaborated with Widows Help Rendezvous to bring the Meet Their Needs outreach to widows in Abumwenre Community, Ovia North East Local Government Area, Edo State.',
      'The gathering began with a message on God’s love from the guest minister, followed by JOF Coordinator Mrs. Iyoha sharing the story of how the Foundation began and why rural widows remain central to its mission.',
      'Pastor (Mrs.) Esther Igbinehi of Widows Help Rendezvous encouraged mothers and grandmothers on raising children in faith, resilience, and community care.',
      'To close the day, JOF volunteers distributed household food packs containing rice, salt, and groundnut oil to every widow present, ensuring families across Abumwenre entered the Christmas season with full kitchens.',
    ],
    stats: [
      { value: 'Dec 2021', label: 'Outreach Date' },
      { value: 'Abumwenre', label: 'Ovia North East LGA' },
      { value: '2', label: 'Partner Organisations' },
    ],
    tags: ['Rural Outreach', 'Abumwenre', 'Food Relief'],
    gallery: [
      '/assets/outreach/dec-2021-abumwenre-2.jpg',
      '/assets/outreach/dec-2021-abumwenre-3.jpg',
      '/assets/outreach/dec-2021-abumwenre-4.jpg',
      '/assets/outreach/dec-2021-abumwenre-5.jpg',
    ],
  },
  {
    slug: 'december-2020-super-woman-useh-outreach',
    title: 'December 2020 Super Woman Outreach at Useh Branch, Benin City',
    category: 'Food Relief',
    excerpt:
      'On December 16, 2020, JOF visited widows at Christ Chosen Church of God, Useh branch in Benin City with rice, salt, tomato paste, and pasta packages.',
    imageUrl: '/assets/outreach/dec-2020-useh-cover.jpg',
    beneficiaryName: 'December 16, 2020 · Useh Branch, Benin City',
    beneficiaryMeta: 'Christ Chosen Church of God · Super Woman Outreach',
    pullquote:
      'It’s not about what you have or even what you’ve accomplished — it’s about who you’ve lifted up and what you’ve given back.',
    paragraphs: [
      'On December 16, 2020, the Janet Owieadolor Foundation brought its December Super Woman Outreach to the widows of Christ Chosen Church of God, Useh branch, in Benin City.',
      'Guided by JOF’s multi-pillar commitment to community welfare, skill acquisition, and educational stipends, volunteers spent the day listening to widows, sharing fellowship, and presenting essential Christmas staples including rice, salt, tomato paste, and pasta.',
      'Deeply moved by the visit, recipients offered heartfelt prayers of gratitude for Mama Janet Owieadolor and the donors and volunteers who made the outreach possible at the close of a challenging year.',
    ],
    stats: [
      { value: 'Dec 2020', label: 'Outreach Date' },
      { value: 'Useh', label: 'Benin City Community' },
      { value: '4 Staples', label: 'Per Household Pack' },
    ],
    tags: ['Super Woman Outreach', 'Useh', 'Food Relief'],
    gallery: [
      '/assets/outreach/dec-2020-useh-2.jpg',
      '/assets/outreach/dec-2020-useh-3.jpg',
      '/assets/outreach/dec-2020-useh-4.jpg',
      '/assets/outreach/dec-2020-useh-5.jpg',
    ],
  },
  {
    slug: 'may-2020-covid-pandemic-relief-ugbighoko',
    title: 'Pandemic Food Relief Across Ugbighoko & Forestry Road',
    category: 'Food Relief',
    excerpt:
      'During the May 2020 COVID-19 lockdowns, JOF delivered customized bags of beans, rice, tin tomatoes, and onions across Ugbighoko quarters and Forestry Road in Benin City.',
    imageUrl: '/assets/outreach/may-2020-covid-cover.jpg',
    beneficiaryName: 'May 28, 2020 · COVID-19 Emergency Outreach',
    beneficiaryMeta: 'Ugbighoko Quarters & Forestry Road · Benin City, Edo State',
    pullquote:
      'Amidst the pandemic lockdown and halted economic activity, JOF adapted its Super Woman Outreach to deliver customized food packs safely to widows.',
    paragraphs: [
      'When COVID-19 lockdowns brought informal trade and daily wages to a standstill in May 2020, widows and single mothers were among the hardest hit. On May 28, 2020, JOF mobilized its Super Woman Outreach across two Benin City hubs: Redeemed Christian Church of God (Arise and Shine Parish, Ugbighoko quarters) and Gift of Life Ministries International (Forestry Road).',
      'Each customized JOF relief bag was packed with beans, rice, tin tomatoes, and onions to carry households through weeks of restricted movement.',
      'In strict compliance with public health directives limiting gathering sizes, volunteers distributed parcels directly to widows on-site and entrusted remaining bags to local parish hosts so absentee widows received their supplies safely at home.',
    ],
    stats: [
      { value: '2', label: 'Benin City Parishes' },
      { value: 'May 2020', label: 'Lockdown Response' },
      { value: '100%', label: 'Direct Household Packs' },
    ],
    tags: ['COVID-19 Relief', 'Emergency Aid', 'Benin City'],
    gallery: [
      '/assets/outreach/may-2020-covid-2.jpg',
      '/assets/outreach/may-2020-covid-3.jpg',
      '/assets/outreach/may-2020-covid-4.jpg',
      '/assets/outreach/may-2020-covid-5.jpg',
    ],
  },
  {
    slug: 'december-2019-christmas-widows-celebration',
    title: 'Christmas Celebration for 50 Widows in Edo State',
    category: 'Field Dispatch',
    excerpt:
      'On December 28, 2019, JOF hosted 50 widows at Christ Apostolic Church of God Mission in Edo State for an afternoon of celebration, fellowship, and Christmas gifts.',
    imageUrl: '/assets/outreach/dec-2019-christmas-cover.jpg',
    beneficiaryName: 'December 28, 2019 · Year-End Outreach',
    beneficiaryMeta: 'Christ Apostolic Church of God Mission · Edo State',
    pullquote:
      'Fifty widows gathered for an afternoon of worship, encouragement, and shared gifts to close out 2019 with dignity.',
    paragraphs: [
      'On December 28, 2019, Janet Owieadolor Foundation coordinators Joy Oboite and Iyoha Juliet joined volunteers at Christ Apostolic Church of God Mission in Edo State to host 50 widows for the Foundation’s year-end Christmas celebration.',
      'The gathering brought women together across denominations for shared meals, music, mutual encouragement, and take-home household gifts funded by JOF donors and community sponsors.',
      'Reflecting on the close of 2019, the team committed to expanding both seasonal relief and sustained year-round medical and livelihood support entering 2020.',
    ],
    stats: [
      { value: '50', label: 'Widows Hosted' },
      { value: 'Dec 2019', label: 'Outreach Date' },
      { value: 'Edo State', label: 'Host Region' },
    ],
    tags: ['Christmas Party', '2019 Archive', 'Community'],
    gallery: [
      '/assets/outreach/dec-2019-christmas-2.jpg',
      '/assets/outreach/dec-2019-christmas-3.jpg',
      '/assets/outreach/dec-2019-christmas-4.jpg',
      '/assets/outreach/dec-2019-christmas-5.jpg',
    ],
  },
  {
    slug: 'june-2019-international-widows-day-medical',
    title: "International Widows' Day Medical Outreach & Tuition Scholarships",
    category: 'Medical Care',
    excerpt:
      'Marking International Widows’ Day on June 23, 2019, JOF delivered free medical care to over 100 widows and awarded school scholarships to two widows’ children.',
    imageUrl: '/assets/outreach/jun-2019-medical-cover.jpg',
    beneficiaryName: "June 23, 2019 · International Widows' Day",
    beneficiaryMeta: '100+ Widows Screened · 2 Child Scholarships Awarded',
    pullquote:
      'Over one hundred widows received free medical care while two widows’ children received full educational scholarships on International Widows’ Day.',
    paragraphs: [
      'In commemoration of International Widows’ Day on June 23, 2019, the Janet Owieadolor Foundation organized a full-day community health outreach serving more than 100 widows in Edo State.',
      'Volunteer medical practitioners offered vital sign checks, clinical consultations, and essential medications so mothers who regularly defer their own healthcare for their children’s sake could receive prompt attention.',
      'Alongside the medical clinic, JOF awarded educational scholarships to two children of widows, pairing immediate health relief with long-term academic continuity.',
    ],
    stats: [
      { value: '100+', label: 'Widows Treated' },
      { value: '2', label: 'Child Scholarships' },
      { value: 'Jun 2019', label: 'Widows Day Outreach' },
    ],
    tags: ['International Widows Day', 'Medical Care', 'Scholarships'],
    gallery: [
      '/assets/outreach/jun-2019-medical-2.jpg',
      '/assets/outreach/jun-2019-medical-3.jpg',
      '/assets/outreach/jun-2019-medical-4.jpg',
      '/assets/outreach/jun-2019-medical-5.jpg',
    ],
  },
  {
    slug: 'abumwenre-500-widows-farm-tools-2018',
    title: 'Empowering 500+ Widows with Foodstuffs & Farm Tools in Abumwenre',
    category: 'Agricultural Support',
    excerpt:
      'In 2018, JOF partnered with Widows Help Rendezvous in Abumwenre Community, Ovia North East LGA, reaching over 500 widows with foodstuffs and agricultural tools.',
    imageUrl: '/assets/outreach/2018-abumwenre-cover.jpg',
    beneficiaryName: '2018 Field Season · Abumwenre Community',
    beneficiaryMeta: 'Ovia North East LGA, Edo State · 500+ Widows Reached',
    pullquote:
      'Collaborating with Widows Help Rendezvous, JOF reached over 500 hardworking rural widows with both household foodstuffs and durable farm tools.',
    paragraphs: [
      'In one of the Foundation’s largest single rural deployments, JOF coordinators Uwangue Laura, Iyoha Juliet, and the volunteer team partnered with Widows Help Rendezvous in Abumwenre Community, Ovia North East LGA, Edo State.',
      'Over 500 widows convened under community canopies to receive both immediate household food supplies and practical agricultural implements designed to boost crop yields and household income.',
      'By pairing food security with farming equipment, the outreach strengthened women’s capacity to cultivate independently and feed their families year-round.',
    ],
    stats: [
      { value: '500+', label: 'Widows Reached' },
      { value: 'Farm Tools', label: 'Livelihood Equipment' },
      { value: 'Ovia NE', label: 'Edo State LGA' },
    ],
    tags: ['Agriculture', 'Abumwenre', '500+ Widows'],
    gallery: [
      '/assets/outreach/2018-abumwenre-2.jpg',
      '/assets/outreach/2018-abumwenre-3.jpg',
      '/assets/outreach/2018-abumwenre-4.jpg',
      '/assets/outreach/2018-abumwenre-5.jpg',
    ],
  },
  {
    slug: 'april-2018-igbanke-outreach-market-visitation',
    title: 'Igbanke Community Outreach & Market Visitation for 200 Widows',
    category: 'Micro-Enterprise',
    excerpt:
      'On April 27, 2018, JOF reached 200 widows in Igbanke Community and walked the Igbanke market stalls to assess direct trade and anti-poverty empowerment needs.',
    imageUrl: '/assets/outreach/apr-2018-igbanke-cover.jpg',
    beneficiaryName: 'April 27, 2018 · Igbanke Community & Market',
    beneficiaryMeta: 'Edo State · 200 Widows Reached · Field Market Survey',
    pullquote:
      'Edo women are strong, bold, and hardworking. When widows are economically empowered, their children are shielded from poverty and exploitation.',
    paragraphs: [
      'On April 27, 2018, the Janet Owieadolor Foundation traveled to Igbanke Community in Edo State for a Superwoman Outreach that reached 200 widows through the support of partners, donors, and field volunteers.',
      'Following the community assembly, JOF leaders Joy Oboite and Iyoha Juliet conducted a direct market visitation across Igbanke’s trading stalls — sitting beside market women to listen to their day-to-day inventory, credit, and family schooling realities.',
      'Those conversations directly shaped JOF’s thesis on grassroots economic sovereignty: empowering hardworking widows in local markets keeps children in school and protects vulnerable families from poverty and trafficking.',
    ],
    stats: [
      { value: '200', label: 'Widows Reached' },
      { value: 'Apr 2018', label: 'Outreach Date' },
      { value: 'Igbanke', label: 'Market Survey' },
    ],
    tags: ['Igbanke', 'Market Empowerment', '2018 Archive'],
    gallery: [
      '/assets/outreach/apr-2018-igbanke-2.jpg',
      '/assets/outreach/apr-2018-igbanke-3.jpg',
      '/assets/outreach/apr-2018-igbanke-4.jpg',
      '/assets/outreach/apr-2018-igbanke-5.jpg',
    ],
  },
];

export const BOARD_OF_TRUSTEES: Trustee[] = [
  {
    name: 'Dr. Francis Owieadolor',
    role: 'Chairman, Board of Trustees',
    image: '/assets/founders/francis-owieadolor.jpg',
  },
  {
    name: 'Chief Edionwe Oliha',
    role: 'Board of Trustees',
    image: '/assets/founders/edionwe-oliha.jpg',
  },
  {
    name: 'Dr. Stella Osemwegie',
    role: 'Board of Trustees',
    image: '/assets/founders/stella-osemwegie.jpg',
  },
  {
    name: 'Prof. Osahon Omoruyi',
    role: 'Board of Trustees',
    image: '/assets/founders/osahon-omoruyi.jpg',
  },
  {
    name: 'Engr. Osa Owieadolor',
    role: 'Board of Trustees',
    image: '/assets/founders/osa-owieadolor.jpg',
  },
  {
    name: 'Engr. Osarieme Osakue',
    role: 'Board of Trustees',
    image: '/assets/founders/osarieme-osakue.jpg',
  },
  {
    name: 'Mrs. Monique Ovuehor',
    role: 'Board of Trustees',
    image: '/assets/founders/monique-ovuehor.jpg',
  },
];

export const COORDINATOR_MESSAGE = {
  name: 'Joy Oboite',
  role: 'Editor & Programme Coordinator',
  image: '/assets/founders/joy-oboite.jpg',
  paragraphs: [
    "Dear Readers, it is my pleasure to present my message for the Janet Owieadolor Foundation's outreach chronicle. It is an even greater privilege to be part of a cause that brings tangible hope to the indigent and practical relief to widows in our society.",
    'JOF has reached out to hundreds of widows across both rural and urban communities in Edo State, partnering with Glorious Widows Fellowship and Widows Help Rendezvous to carry out our Superwoman outreaches.',
    'Special gratitude goes to JOF donors and our Board of Trustees, especially our Chairman, Dr. Francis Owieadolor, for his relentless motivation and active support.',
  ],
};

export const FOUNDATION_INITIATIVES = [
  {
    title: 'Skill Acquisition',
    detail: 'Tailoring, trading, and vocational craft workshops turning raw talent into steady household income.',
  },
  {
    title: 'Counselling',
    detail: 'Structured grief support, peer mentoring circles, and trauma-informed community accompaniment.',
  },
  {
    title: 'Superwoman Outreach',
    detail: 'Large-scale seasonal community gatherings distributing rice, beans, cooking oils, and wrappers.',
  },
  {
    title: 'Education',
    detail: 'Primary and secondary school tuition stipends keeping the children of widows enrolled.',
  },
  {
    title: 'Research Support',
    detail: 'Documenting economic barriers facing Nigerian widows to guide sharper grassroots policy.',
  },
  {
    title: 'Book Project',
    detail: 'Publishing testimonies and advocacy literature under The Triumph of Widowhood initiative.',
  },
];

export const DONATION_TIERS: DonationTier[] = [
  {
    amount: 5000,
    formatted: '₦5,000',
    shortLabel: 'Weekly Groceries',
    description: "Feeds a widow's family for a full week with essential groceries and hygiene items.",
    programmeLink: 'Super Woman Relief Outreach',
  },
  {
    amount: 15000,
    formatted: '₦15,000',
    shortLabel: 'Training Kit & Screening',
    description: 'Funds a full vocational training kit and materials, or comprehensive medical screening, for one widow.',
    programmeLink: 'Medical & Vocational Track',
  },
  {
    amount: 50000,
    formatted: '₦50,000',
    shortLabel: 'Enterprise Micro-Grant',
    description: 'Provides a seed micro-grant to launch a small sustainable market stall or trade business.',
    programmeLink: 'Agricultural & Livelihood Support',
  },
  {
    amount: 100000,
    formatted: '₦100,000',
    shortLabel: 'Full Seed Capital Grant',
    description: 'Awards a complete seed capital grant for a self-sustaining enterprise plus child schooling support.',
    programmeLink: 'Economic Sovereignty Fund',
  },
];

export const DONATE_TRANSPARENCY_STATS = [
  { value: '5,000+', label: 'Widows Empowered' },
  { value: '12+', label: 'Communities Reached' },
  { value: '₦180M+', label: 'Aid Disbursed' },
];
