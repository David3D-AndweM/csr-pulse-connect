
import { BlogPost } from "@/components/content/ContentBlogManager";
import { Testimonial } from "@/components/content/ContentTestimonialManager";

export const mockBlogPosts: BlogPost[] = [
  {
    id: "blog-1",
    title: "Transforming Lives Through Clean Water Access",
    excerpt: "How our water project is helping communities in rural Zambia overcome health challenges.",
    content: "Access to clean water is a fundamental human right, yet millions around the world still struggle to obtain this essential resource. In rural Zambia, the challenge is particularly acute, with communities facing long walks to water sources that are often contaminated.\n\nThrough our recent initiative, we've established 15 new water wells across three districts, providing clean water to over 5,000 people. The impact has been immediate and profound. Local clinics report a 40% decrease in waterborne illnesses, and school attendance has improved as children spend less time collecting water.\n\nThe project also included community training on well maintenance and water sanitation practices, ensuring long-term sustainability. Local committees have been formed to oversee the wells, creating a sense of ownership and pride.",
    imageUrl: "https://source.unsplash.com/random/800x600/?water,africa",
    author: "Sarah Mwangi",
    date: "2025-02-15T10:30:00Z",
    category: "Water & Sanitation",
    tags: ["water", "health", "community development", "sustainability"]
  },
  {
    id: "blog-2",
    title: "Renewable Energy Solutions for Rural Schools",
    excerpt: "Solar power is bringing electricity to schools that have never had it before, revolutionizing education.",
    content: "In the remote eastern provinces of Zambia, many schools have operated without electricity for decades. As the sun sets around 6pm, learning activities must end, limiting educational opportunities and outcomes.\n\nOur renewable energy project has installed solar panels in 12 schools across the region, bringing reliable electricity to classrooms for the first time. This has enabled evening study sessions, computer labs, and modern teaching tools.\n\nTeachers report that student performance has already shown improvement, with examination scores rising by an average of 18% in the first semester after installation. The schools have also become community hubs, with adult literacy programs now possible in the evenings.",
    imageUrl: "https://source.unsplash.com/random/800x600/?solar,school",
    author: "Michael Banda",
    date: "2025-03-22T14:15:00Z",
    category: "Education",
    tags: ["renewable energy", "education", "technology", "rural development"]
  },
  {
    id: "blog-3",
    title: "Women's Agricultural Cooperative Yields Record Harvest",
    excerpt: "A group of female farmers is changing traditional agriculture practices with impressive results.",
    content: "In a society where farming has traditionally been dominated by men, a cooperative of 35 women from the Choma district is breaking barriers and setting new standards in agricultural productivity.\n\nArmed with training in modern farming techniques, access to quality seeds, and improved irrigation methods provided through our agricultural support program, these women have harvested a record crop this season. Their maize yield was 40% higher than the regional average, and their vegetable production has created new income streams for their families.\n\n'Before the cooperative, I struggled to feed my children. Now I can provide three meals a day and even pay school fees,' says Mary Chulu, the cooperative's chairperson. The group has also established a savings scheme that provides emergency loans to members, further strengthening community resilience.",
    imageUrl: "https://source.unsplash.com/random/800x600/?farming,women",
    author: "Jennifer Phiri",
    date: "2025-01-05T09:45:00Z",
    category: "Agriculture",
    tags: ["women empowerment", "agriculture", "food security", "economic development"]
  },
  {
    id: "blog-4",
    title: "Youth Technology Hub Opens Doors to Digital Careers",
    excerpt: "New training center equips young Zambians with skills for the digital economy.",
    content: "The digital divide remains a significant challenge for young people in Zambia, limiting their opportunities in an increasingly tech-driven global economy. To address this gap, our Youth Technology Hub has opened in Lusaka, providing free training, internet access, and mentorship to ambitious young Zambians.\n\nThe hub offers courses in web development, digital marketing, graphic design, and basic computer literacy. In its first month of operation, over 200 youth have enrolled in various programs, with a waiting list growing daily.\n\n'I've been trying to learn coding on my phone for years, but never had proper guidance or reliable internet,' says Joseph, 19. 'Now I'm building my first website after just three weeks of training.'\n\nThe hub also connects participants with online freelancing opportunities and local businesses needing digital services, creating immediate income-generating possibilities.",
    imageUrl: "https://source.unsplash.com/random/800x600/?technology,youth",
    author: "David Mulenga",
    date: "2025-04-10T16:20:00Z",
    category: "Technology",
    tags: ["digital skills", "youth development", "employment", "education"]
  },
  {
    id: "blog-5",
    title: "Community Health Workers Bring Medical Care to Remote Villages",
    excerpt: "Trained local volunteers are transforming healthcare access in areas without clinics.",
    content: "For communities living more than 20 kilometers from the nearest health facility, even minor medical issues can become life-threatening due to delayed treatment. Our Community Health Worker program is changing this reality by training local volunteers to provide basic healthcare services and early intervention.\n\nEquipped with medical kits, bicycles for transportation, and connected to district health officials via mobile phones, these 45 community health workers now serve a population of approximately 30,000 people. They conduct regular home visits, provide first aid, monitor childhood vaccinations, and identify cases requiring urgent medical attention.\n\nThe impact has been particularly significant for maternal health, with early pregnancy complication detection increasing by 60%. Malaria treatment has also improved, with cases being identified and treated an average of 3 days earlier than before the program began.",
    imageUrl: "https://source.unsplash.com/random/800x600/?healthcare,africa",
    author: "Grace Mumba",
    date: "2025-02-28T11:10:00Z",
    category: "Healthcare",
    tags: ["healthcare", "community workers", "rural development", "maternal health"]
  },
  {
    id: "blog-6",
    title: "Sustainable Forestry Initiative Combats Deforestation",
    excerpt: "New approaches to timber harvesting are protecting forests while supporting livelihoods.",
    content: "Deforestation has accelerated across many regions of Zambia, threatening biodiversity and contributing to climate change. Our Sustainable Forestry Initiative is working with communities who depend on forest resources to develop alternative approaches that protect the environment while supporting economic needs.\n\nThe program has introduced agroforestry techniques, where timber trees are grown alongside food crops, creating dual income sources. Fast-growing bamboo has been promoted as an alternative building material, reducing pressure on slow-growing hardwoods. Community-managed tree nurseries have been established, with over 50,000 seedlings planted this season.\n\n'We used to just cut trees without thinking about tomorrow,' explains village chief Mwamba. 'Now we understand that properly managed forests can provide for us and our children's children.' The project has also explored eco-tourism possibilities, with the first community-run forest tours beginning next month.",
    imageUrl: "https://source.unsplash.com/random/800x600/?forest,conservation",
    author: "Patrick Lungu",
    date: "2025-03-14T13:25:00Z",
    category: "Environment",
    tags: ["forestry", "conservation", "sustainable livelihoods", "climate action"]
  }
];

export const mockTestimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    name: "Esther Mumba",
    role: "Village Committee Chair",
    organization: "Chongo Community",
    content: "The water project has completely transformed our village. Children used to miss school because they were sick from drinking contaminated water or because they had to walk hours each day to collect water. Now we have clean water right here, and our community is healthier and more prosperous as a result.",
    rating: 5,
    imageUrl: "https://source.unsplash.com/random/200x200/?woman,africa",
    location: "Eastern Province",
    projectId: "proj-water-east-01"
  },
  {
    id: "testimonial-2",
    name: "James Kunda",
    role: "Headmaster",
    organization: "Mwemba Secondary School",
    content: "Before the solar installation, our school had to end all activities when the sun went down. Now our students can study in the evenings, and we've even started adult literacy classes. The computer lab, which was just a room of donated machines gathering dust, is now actively used for teaching digital skills. This is truly an educational revolution for us.",
    rating: 5,
    imageUrl: "https://source.unsplash.com/random/200x200/?man,teacher",
    location: "Northern Province",
    projectId: "proj-energy-north-03"
  },
  {
    id: "testimonial-3",
    name: "Mary Chulu",
    role: "Cooperative Chairperson",
    organization: "Choma Women's Farming Collective",
    content: "The support we received has empowered us to become business leaders in our community. When we started, men would laugh at the idea of women running large-scale farms. Now they come to us for advice on improving their yields! I can pay my children's school fees without struggling, and we're even saving to buy a community tractor.",
    rating: 4,
    imageUrl: "https://source.unsplash.com/random/200x200/?woman,farming",
    location: "Southern Province",
    projectId: "proj-agri-south-02"
  },
  {
    id: "testimonial-4",
    name: "Daniel Mbewe",
    role: "Youth Program Participant",
    organization: "Digital Skills Initiative",
    content: "The tech hub has opened doors I never knew existed. I've learned how to build websites and now earn money working online for clients around the world. I'm teaching these skills to other young people in my neighborhood too. Technology has changed my life completely.",
    rating: 5,
    imageUrl: "https://source.unsplash.com/random/200x200/?young,man",
    location: "Lusaka Province",
    projectId: "proj-tech-lusaka-05"
  },
  {
    id: "testimonial-5",
    name: "Patricia Mwansa",
    role: "Community Health Worker",
    organization: "Rural Health Network",
    content: "Being a health worker has given me purpose and respect in my community. I've helped deliver babies when mothers couldn't reach the clinic in time, I've identified malaria cases early, and I've ensured children get their vaccinations. The training and support I've received has made me confident in helping others.",
    rating: 5,
    imageUrl: "https://source.unsplash.com/random/200x200/?nurse,africa",
    location: "Muchinga Province",
    projectId: "proj-health-much-04"
  },
  {
    id: "testimonial-6",
    name: "Samuel Phiri",
    role: "Forestry Committee Member",
    organization: "Sustainable Timber Cooperative",
    content: "I used to cut trees without thinking about tomorrow. This program taught us that we can harvest timber sustainably while protecting our environment. Our nursery is thriving, and we're planting more trees than we cut. The bamboo project gives us quick harvests and good income, and the forest has started to recover. Future generations will thank us.",
    rating: 4,
    imageUrl: "https://source.unsplash.com/random/200x200/?forest,worker",
    location: "Northwestern Province",
    projectId: "proj-forest-nw-07"
  }
];
