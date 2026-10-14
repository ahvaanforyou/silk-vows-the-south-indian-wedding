export interface CouplePerson {
  name: string;
  teluguName: string;
  role: string;
  parents: string;
  grandparents?: string;
  description: string;
  image: string;
  instagram?: string;
}

export interface WeddingEvent {
  id: string;
  title: string;
  teluguTitle: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  description: string;
  dressCode: string;
  isMainEvent?: boolean;
  googleMapsUrl: string;
  icon: "kalash" | "mehendi" | "mandapam" | "reception";
}

export interface GalleryPhoto {
  id: string;
  src: string;
  caption: string;
  category: "all" | "traditional" | "pre-wedding" | "candid";
  aspect: "portrait" | "landscape" | "square";
}

export interface WeddingConfig {
  couple: {
    bride: CouplePerson;
    groom: CouplePerson;
  };
  shlokas: {
    sanskritGanesha: string;
    teluguGanesha: string;
    blessingTelugu: string;
    blessingEnglish: string;
  };
  weddingDateTime: {
    iso: string;
    dateFormatted: string;
    dayFormatted: string;
    muhurthamTime: string;
    muhurthamTelugu: string;
    teluguTithi: string;
    timezone: string;
  };
  events: WeddingEvent[];
  venue: {
    name: string;
    teluguName: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    landmarks: string;
    googleMapsUrl: string;
    googleMapsEmbedUrl: string;
    parkingNotes: string;
    showMapEmbed: boolean;
  };
  gallery: GalleryPhoto[];
  rsvp: {
    enabled: boolean;
    deadline: string;
    maxGuests: number;
    contactPhone: string;
    contactEmail: string;
  };
  audio: {
    enabled: boolean;
    title: string;
    subtitle: string;
    src: string;
  };
}

export const weddingConfig: WeddingConfig = {
  couple: {
    bride: {
      name: "Sravya Reddy",
      teluguName: "శ్రావ్య",
      role: "Meet the Bride",
      parents: "Smt. Madhavi & Sri Ramana Reddy",
      grandparents: "Granddaughter of Late Smt. Lakshmi Devi & Late Sri Venkata Reddy",
      description:
        "A graceful classical Kuchipudi artist and lead software architect with a deep love for Telugu poetry, Carnatic melodies, and warm family gatherings.",
      image: "/images/bride.jpg",
    },
    groom: {
      name: "Karthik Varma",
      teluguName: "కార్తీక్",
      role: "Meet the Groom",
      parents: "Smt. Sunitha & Sri Prabhakar Varma",
      grandparents: "Grandson of Smt. Sarada & Sri Suryanarayana Varma",
      description:
        "A visionary fintech creator, passionate heritage traveler, and cricket aficionado who finds endless joy in traditional celebrations and spontaneous road trips.",
      image: "/images/groom.jpg",
    },
  },
  shlokas: {
    sanskritGanesha: "॥ श्री गणेशाय नमः ॥",
    teluguGanesha: "॥ శ్రీ గణేశాయ నమః ॥",
    blessingTelugu: "కల్యాణ వైభోగమే",
    blessingEnglish:
      "With the loving blessings of our elders and the divine grace of Sri Venkateswara Swamy, we invite you to share our joy as we begin our sacred journey of togetherness.",
  },
  weddingDateTime: {
    iso: "2026-12-18T10:38:00+05:30",
    dateFormatted: "Friday, December 18, 2026",
    dayFormatted: "Friday",
    muhurthamTime: "10:38 AM",
    muhurthamTelugu: "శుభ ముహూర్తం : ఉదయం 10:38 నిమిషములకు",
    teluguTithi: "మార్గశిర శుద్ధ దశమి, శుక్రవారం",
    timezone: "Asia/Kolkata",
  },
  events: [
    {
      id: "event-pellikuthuru",
      title: "Pellikuthuru & Pellikoduku",
      teluguTitle: "పెళ్లికూతురు / పెళ్లికొడుకు",
      date: "Wednesday, December 16, 2026",
      time: "9:00 AM onwards",
      venue: "Reddy Residence & Varma Nilayam",
      address: "Road No. 36, Jubilee Hills, Hyderabad",
      description:
        "The sacred Nalugu, turmeric and mangala snaanam ceremony where the bride and groom are lovingly anointed with holy oils and blessed by elders.",
      dressCode: "Traditional Yellow / Pattu Silks",
      googleMapsUrl: "https://maps.google.com/?q=Jubilee+Hills+Hyderabad",
      icon: "kalash",
    },
    {
      id: "event-mehendi",
      title: "Mehendi & Sangeet Sandhya",
      teluguTitle: "మెహందీ & సంగీత్ వేడుక",
      date: "Thursday, December 17, 2026",
      time: "6:30 PM onwards",
      venue: "The Royal Palace Lawns",
      address: "Financial District, Gachibowli, Hyderabad",
      description:
        "An enchanting evening of intricate henna artistry, joyous South Indian folk dances, musical celebrations, and delectable Andhra & Telangana delicacies.",
      dressCode: "Vibrant Festive Pastels & Ethnic Wear",
      googleMapsUrl: "https://maps.google.com/?q=Gachibowli+Hyderabad",
      icon: "mehendi",
    },
    {
      id: "event-muhurtham",
      title: "Pradhana Vivaham & Sumuhurtham",
      teluguTitle: "ప్రధాన వివాహం (మాంగల్య ధారణం)",
      date: "Friday, December 18, 2026",
      time: "10:38 AM (Sumuhurtham)",
      venue: "Golkonda Resorts & Grand Kalyana Mandapam",
      address: "Sagar Mahal Complex, Osman Sagar, Gandipet, Hyderabad",
      description:
        "The sacred Vedic Hindu wedding ceremony: Kanyadaanam, Jeelakarra Bellam, Mangalya Dharana, and Saptapadi as two souls unite into one eternal bond.",
      dressCode: "Traditional Kanchipuram Pattu Sarees & Pattu Dhoti Kurta",
      isMainEvent: true,
      googleMapsUrl: "https://maps.google.com/?q=Golkonda+Resorts+Gandipet+Hyderabad",
      icon: "mandapam",
    },
    {
      id: "event-reception",
      title: "Wedding Reception",
      teluguTitle: "శుభ పరిణయ విందు (రిసెప్షన్)",
      date: "Saturday, December 19, 2026",
      time: "7:00 PM onwards",
      venue: "Grand Ballroom, Taj Krishna",
      address: "Road No. 1, Banjara Hills, Hyderabad",
      description:
        "An evening of celebration, live Carnatic fusion orchestra, lavish banquet dinner, and warm congratulations with family and dear friends.",
      dressCode: "Royal Ethnic / Elegant Formal Attire",
      googleMapsUrl: "https://maps.google.com/?q=Taj+Krishna+Banjara+Hills+Hyderabad",
      icon: "reception",
    },
  ],
  venue: {
    name: "Golkonda Resorts & Grand Kalyana Mandapam",
    teluguName: "గోల్కొండ రిసార్ట్స్ & కళ్యాణ మండపం",
    address: "Sagar Mahal Complex, Osman Sagar Lake Road, Gandipet",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500075",
    landmarks: "Near Osman Sagar Lake Viewpoint & CBIT Engineering College",
    googleMapsUrl: "https://maps.google.com/?q=Golkonda+Resorts+Gandipet+Hyderabad",
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.478956983057!2d78.3188544!3d17.388722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9542a1f0d559%3A0xe54b8dfec4d4f826!2sThe%20Golkonda%20Resort%20%26%20Spa!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin",
    parkingNotes:
      "Ample dedicated parking space available with complimentary valet service for all wedding guests at the main entrance.",
    showMapEmbed: true,
  },
  gallery: [
    {
      id: "photo-1",
      src: "/images/gallery-1.jpg",
      caption: "Sacred Jeelakarra Bellam — Auspicious Muhurtham Moment",
      category: "traditional",
      aspect: "landscape",
    },
    {
      id: "photo-2",
      src: "/images/gallery-2.jpg",
      caption: "Bride in Traditional Kanchipuram Gold Silk Pattu",
      category: "traditional",
      aspect: "portrait",
    },
    {
      id: "photo-3",
      src: "/images/gallery-3.jpg",
      caption: "Pre-wedding Sunset by the Osman Sagar Lake",
      category: "pre-wedding",
      aspect: "portrait",
    },
    {
      id: "photo-4",
      src: "/images/gallery-4.jpg",
      caption: "Laughter and Turmeric during Nalugu Ceremonies",
      category: "candid",
      aspect: "landscape",
    },
    {
      id: "photo-5",
      src: "/images/gallery-5.jpg",
      caption: "Groom in Regal Raw Silk Dhoti and Golden Angavastram",
      category: "traditional",
      aspect: "portrait",
    },
    {
      id: "photo-6",
      src: "/images/gallery-6.jpg",
      caption: "Together into a Lifetime of Adventures",
      category: "pre-wedding",
      aspect: "landscape",
    },
    {
      id: "photo-7",
      src: "/images/gallery-7.jpg",
      caption: "Mehendi Hues & Sangeet Celebrations",
      category: "candid",
      aspect: "square",
    },
    {
      id: "photo-8",
      src: "/images/gallery-8.jpg",
      caption: "Saptapadi — Seven Sacred Steps around the Agni",
      category: "traditional",
      aspect: "landscape",
    },
  ],
  rsvp: {
    enabled: true,
    deadline: "December 10, 2026",
    maxGuests: 6,
    contactPhone: "+91 98765 43210",
    contactEmail: "celebrate@sravya-karthik.com",
  },
  audio: {
    enabled: true,
    title: "Mangala Vaadhyam",
    subtitle: "Nadaswaram & Thavil Traditional Wedding Harmony",
    src: "/audio/seetha-kalyana.mp3",
  },
};
