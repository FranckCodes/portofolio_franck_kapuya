export const languages = {
  en: "English",
  fr: "Français",
} as const

export type Language = keyof typeof languages

export const translations = {
  en: {
    nav: {
      home: "Home",
      method: "Approach",
      projects: "Projects",
      expertise: "Expertise",
      contact: "Contact",
    },
    hero: {
      greeting: "Hello, I'm",
      title: "Reliable systems for controlled decisions.",
      subtitle:
        "I support businesses and organizations in structuring information systems, strategic data analysis, and developing reliable and scalable multi-platform solutions.",
      credibility:
        "Projects delivered for academic platforms, organizations, and operational management systems.",
      cta: "Discuss Your Project",
      viewWork: "View My Work",
      stats: {
        experience: "Years Experience",
        projects: "Projects Completed",
        technologies: "Technologies",
      },
    },
    aboutIntro: {
      description:
        "I am Franck KAPUYA MBALA, information systems analyst and architect, data analyst and multi-platform consultant. I support businesses and organizations in structuring reliable systems, strategic data analysis, and operational process optimization.",
      learnMore: "Learn More",
    },
    problem: {
      title: "When information is poorly structured, decision-making becomes risky.",
      description:
        "Scattered data, manual processes, lack of visibility, repetitive errors... A poorly designed information system hinders performance and increases uncertainty. Reliability is not a luxury. It's a strategic necessity.",
      items: {
        manual: "Manual processes",
        dispersed: "Scattered data",
        visibility: "Lack of visibility",
        intuition: "Repetitive errors",
      },
    },
    solution: {
      title: "A structured, results-oriented approach.",
      description:
        "Every project begins with a rigorous analysis of needs and information flows. I then design an adapted, scalable, and secure architecture, enabling clear and efficient data management. The goal is simple: transform complexity into operational clarity.",
    },
    method: {
      title: "My Method",
      approach: "Clarity. Rigor. Performance.",
      steps: {
        analysis: {
          title: "Analysis and flow mapping",
          description: "Understanding your challenges and mapping information flows to identify optimization opportunities.",
        },
        implementation: {
          title: "System design and tool integration",
          description: "Building robust, scalable solutions tailored to your specific requirements.",
        },
        optimization: {
          title: "Continuous optimization and data security",
          description: "Ensuring long-term performance, reliability, and data protection.",
        },
      },
    },
    expertise: {
      title: "Areas of Expertise",
      areas: {
        systems: {
          title: "Information Systems Design",
          description: "Architecture and structuring of reliable and scalable information systems.",
        },
        data: {
          title: "Data Analysis & Visualization",
          description: "Transforming raw data into actionable insights for informed decision-making.",
        },
        development: {
          title: "Multi-Platform Application Development",
          description: "Creating high-performance, fluid applications accessible on web, mobile, and desktop, with optimal user experience.",
        },
        infrastructure: {
          title: "Maintenance & IT Infrastructure",
          description: "Ensuring system reliability, security, and continuous operational excellence.",
        },
      },
    },
    trust: {
      title: "Why Work With Me?",
      reasons: {
        strategic: {
          title: "Strategic Systems Vision",
          description: "Ability to see the big picture and design solutions that align with your business goals.",
        },
        analytical: {
          title: "Analytical Rigor",
          description: "Methodical approach to problem-solving with attention to detail and data-driven decisions.",
        },
        experience: {
          title: "Field Experience",
          description: "Proven track record across diverse projects and industries, from startups to established organizations.",
        },
        results: {
          title: "Performance-Oriented Approach",
          description: "Focus on delivering measurable outcomes and tangible value for your business.",
        },
      },
    },
    about: {
      title: "About Me",
      description:
        "I'm a passionate web developer and digital marketer with expertise in both frontend and backend development. My mastery of SQL and databases allows me to create high-performing and reliable systems. Thanks to my agile management and communication skills, I contribute effectively to the success of digital projects.",
      strengths: "Key Strengths",
      analytical: "Analytical & Problem-Solving",
      analyticalDesc: "Ability to quickly analyze problems and find effective solutions.",
      adaptability: "Adaptability & Flexibility",
      adaptabilityDesc: "Capacity to rapidly adapt to new technologies, project changes, and client demands.",
    },
    skills: {
      title: "Technical Skills",
      subtitle: "Technologies and tools I work with",
      frontend: "Frontend Development",
      backend: "Backend Development",
      database: "Database & Tools",
      other: "Other Skills",
      showMore: "Show More",
      showLess: "Show Less",
    },
    experience: {
      title: "Work Experience",
      present: "Present",
      responsibilities: "Key Responsibilities",
    },
    projects: {
      title: "Recent Projects",
      subtitle: "Concrete achievements with measurable impact",
      problem: "Problem",
      solution: "Solution",
      impact: "Impact",
      viewProject: "View Project",
      seeMore: "See More",
      allProjects: "All Projects",
      backToHome: "Back to Home",
    },
    education: {
      title: "Education & Certifications",
      degree: "Degree",
      certification: "Certification",
      seeMore: "See More",
      allCertifications: "All Certifications",
      backToHome: "Back to Home",
      degrees: "Degrees",
      certifications: "Certifications",
      categories: {
        all: "All",
        marketing: "Marketing",
        projectManagement: "Project Management",
        ai: "AI",
        development: "Development",
      },
      pagination: {
        previous: "Previous",
        next: "Next",
        page: "Page",
        of: "of",
      },
    },
    contact: {
      title: "Ready to structure or modernize your information system?",
      subtitle: "Contact me for an analysis of your needs and a tailored proposal.",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Schedule an Exchange",
      or: "Or reach me directly at",
      location: "Kinshasa, Democratic Republic of the Congo",
      availability: "Open to remote work",
    },
    shop: {
      title: "My Shop",
      description: "Discover my selection of reliable equipment for your IT and personal projects.",
      cta: "Visit the Shop",
    },
    footer: {
      rights: "All rights reserved.",
      built: "Built with Next.js and Tailwind CSS",
      aboutTitle: "Who Am I?",
      aboutText:
        "I am Franck KAPUYA MBALA, information systems analyst and architect, data analyst and multi-platform consultant. I support businesses and organizations in structuring reliable systems and optimizing operational processes.",
      aboutLink: "Learn More",
      contactTitle: "Contact",
      shopTitle: "Shop",
      shopText: "Discover my selection of reliable equipment",
      shopLink: "Visit the Shop",
      linksTitle: "Quick Links",
      portfolio: "Portfolio",
      scheduleCall: "Schedule an Exchange",
    },
    admin: {
      dashboard: "Admin Dashboard",
      login: "Admin Login",
      logout: "Logout",
      viewSite: "View Site",
      backToSite: "Back to Site", // Added translation for back to site button
      backToDashboard: "Back to Dashboard",
      saveChanges: "Save Changes",
      saved: "Saved successfully!",
      personal: {
        title: "Personal Information",
        basicInfo: "Basic Information",
        contactInfo: "Contact Information",
        biography: "Biography",
        name: "Full Name",
        titleEn: "Title (English)",
        titleFr: "Title (French)",
        email: "Email",
        phone: "Phone",
        location: "Location",
        github: "GitHub/GitLab URL",
        linkedin: "LinkedIn URL",
        bioEn: "Bio (English)",
        bioFr: "Bio (French)",
      },
    },
  },
  fr: {
    nav: {
      home: "Accueil",
      method: "Approche",
      projects: "Projets",
      expertise: "Expertise",
      contact: "Contact",
    },
    hero: {
      greeting: "Bonjour, je suis",
      title: "Des systèmes fiables pour des décisions maîtrisées.",
      subtitle:
        "J'accompagne entreprises et organisations dans la structuration de systèmes d'information, l'analyse stratégique des données et le développement de solutions multi-plateformes fiables et évolutives.",
      credibility:
        "Projets réalisés pour plateformes académiques, organisations et systèmes de gestion opérationnelle.",
      cta: "Discuter de votre projet",
      viewWork: "Voir mes réalisations",
      stats: {
        experience: "Ans d'Expérience",
        projects: "Projets Réalisés",
        technologies: "Technologies",
      },
    },
    aboutIntro: {
      description:
        "Je suis Franck KAPUYA MBALA, analyste et architecte de systèmes d'information, data analyst et consultant multi-plateformes. J'accompagne entreprises et organisations dans la structuration de systèmes fiables, l'analyse stratégique des données et l'optimisation des processus opérationnels.",
      learnMore: "En savoir plus",
    },
    problem: {
      title: "Quand l'information est mal structurée, la décision devient risquée.",
      description:
        "Données dispersées, processus manuels, manque de visibilité, erreurs répétitives... Un système d'information mal conçu freine la performance et augmente l'incertitude. La fiabilité n'est pas un luxe. C'est une nécessité stratégique.",
      items: {
        manual: "Processus manuels",
        dispersed: "Données dispersées",
        visibility: "Manque de visibilité",
        intuition: "Erreurs répétitives",
      },
    },
    solution: {
      title: "Une approche structurée et orientée résultats.",
      description:
        "Chaque projet commence par une analyse rigoureuse des besoins et des flux d'information. Je conçois ensuite une architecture adaptée, évolutive et sécurisée, permettant une gestion claire et efficace des données. L'objectif est simple : transformer la complexité en clarté opérationnelle.",
    },
    method: {
      title: "Ma méthode",
      approach: "Clarté. Rigueur. Performance.",
      steps: {
        analysis: {
          title: "Analyse et cartographie des flux",
          description: "Comprendre vos défis et cartographier les flux d'information pour identifier les opportunités d'optimisation.",
        },
        implementation: {
          title: "Conception du système et intégration des outils",
          description: "Construction de solutions robustes et évolutives adaptées à vos besoins spécifiques.",
        },
        optimization: {
          title: "Optimisation continue et sécurisation des données",
          description: "Assurer performance à long terme, fiabilité et protection des données.",
        },
      },
    },
    expertise: {
      title: "Domaines d'Expertise",
      areas: {
        systems: {
          title: "Conception de SI",
          description: "Architecture et structuration de systèmes d'information fiables et évolutifs.",
        },
        data: {
          title: "Analyse & visualisation de données",
          description: "Transformation des données brutes en insights actionnables pour une prise de décision éclairée.",
        },
        development: {
          title: "Développement d'applications multi-plateformes",
          description: "Création d'applications performantes et fluides, accessibles sur web, mobile et desktop, avec une expérience utilisateur optimale.",
        },
        infrastructure: {
          title: "Maintenance & infrastructure IT",
          description: "Assurance de la fiabilité, sécurité et excellence opérationnelle continue des systèmes.",
        },
      },
    },
    trust: {
      title: "Pourquoi travailler avec moi ?",
      reasons: {
        strategic: {
          title: "Vision stratégique des systèmes",
          description: "Capacité à voir la vue d'ensemble et concevoir des solutions alignées avec vos objectifs métier.",
        },
        analytical: {
          title: "Rigueur analytique",
          description: "Approche méthodique de résolution de problèmes avec attention aux détails et décisions basées sur les données.",
        },
        experience: {
          title: "Expérience terrain",
          description: "Parcours éprouvé à travers divers projets et secteurs, des startups aux organisations établies.",
        },
        results: {
          title: "Approche orientée performance",
          description: "Focus sur la livraison de résultats mesurables et de valeur tangible pour votre entreprise.",
        },
      },
    },
    about: {
      title: "À Propos de Moi",
      description:
        "Je suis un développeur web et marketeur digital passionné avec une expertise en développement frontend et backend. Ma maîtrise de SQL et des bases de données me permet de créer des systèmes performants et fiables. Grâce à ma gestion agile et mes compétences en communication, je contribue efficacement au succès des projets numériques.",
      strengths: "Points Forts",
      analytical: "Analytique & Résolution de Problèmes",
      analyticalDesc: "Capacité à analyser rapidement les problèmes et à trouver des solutions efficaces.",
      adaptability: "Adaptabilité & Flexibilité",
      adaptabilityDesc:
        "Capacité à s'adapter rapidement aux nouvelles technologies, aux changements de projet et aux demandes des clients.",
    },
    skills: {
      title: "Compétences Techniques",
      subtitle: "Technologies et outils que j'utilise",
      frontend: "Développement Frontend",
      backend: "Développement Backend",
      database: "Base de Données & Outils",
      other: "Autres Compétences",
      showMore: "Voir Plus",
      showLess: "Voir Moins",
    },
    experience: {
      title: "Expérience Professionnelle",
      present: "Présent",
      responsibilities: "Responsabilités Clés",
    },
    projects: {
      title: "Projets récents",
      subtitle: "Réalisations concrètes avec impact mesurable",
      problem: "Problème",
      solution: "Solution",
      impact: "Impact",
      viewProject: "Voir le Projet",
      seeMore: "Voir Plus",
      allProjects: "Tous les Projets",
      backToHome: "Retour à l'Accueil",
    },
    education: {
      title: "Formation & Certifications",
      degree: "Diplôme",
      certification: "Certification",
      seeMore: "Voir Plus",
      allCertifications: "Toutes les Certifications",
      backToHome: "Retour à l'Accueil",
      degrees: "Diplômes",
      certifications: "Certifications",
      categories: {
        all: "Tous",
        marketing: "Marketing",
        projectManagement: "Gestion de Projet",
        ai: "IA",
        development: "Développement",
      },
      pagination: {
        previous: "Précédent",
        next: "Suivant",
        page: "Page",
        of: "sur",
      },
    },
    contact: {
      title: "Vous souhaitez structurer ou moderniser votre système d'information ?",
      subtitle: "Contactez-moi pour une analyse de vos besoins et une proposition adaptée.",
      name: "Nom",
      email: "Email",
      message: "Message",
      send: "Planifier un échange",
      or: "Ou contactez-moi directement à",
      location: "Kinshasa, République Démocratique du Congo",
      availability: "Ouvert au travail à distance",
    },
    shop: {
      title: "Ma Boutique",
      description: "Découvrez ma sélection d'équipements fiables pour vos projets IT et personnels.",
      cta: "Visiter la boutique",
    },
    footer: {
      rights: "Tous droits réservés.",
      built: "Construit avec Next.js et Tailwind CSS",
      aboutTitle: "Qui suis-je ?",
      aboutText:
        "Je suis Franck KAPUYA MBALA, analyste et architecte de systèmes d'information, data analyst et consultant multi-plateformes. J'accompagne entreprises et organisations dans la structuration de systèmes fiables et l'optimisation des processus opérationnels.",
      aboutLink: "En savoir plus",
      contactTitle: "Contact",
      shopTitle: "Boutique",
      shopText: "Découvrez ma sélection d'équipements fiables",
      shopLink: "Visiter la boutique",
      linksTitle: "Liens rapides",
      portfolio: "Portfolio",
      scheduleCall: "Planifier un échange",
    },
    admin: {
      dashboard: "Tableau de Bord Admin",
      login: "Connexion Admin",
      logout: "Déconnexion",
      viewSite: "Voir le Site",
      backToSite: "Retour au Site", // Added French translation for back to site button
      backToDashboard: "Retour au Tableau de Bord",
      saveChanges: "Enregistrer les Modifications",
      saved: "Enregistré avec succès!",
      personal: {
        title: "Informations Personnelles",
        basicInfo: "Informations de Base",
        contactInfo: "Informations de Contact",
        biography: "Biographie",
        name: "Nom Complet",
        titleEn: "Titre (Anglais)",
        titleFr: "Titre (Français)",
        email: "Email",
        phone: "Téléphone",
        location: "Localisation",
        github: "URL GitHub/GitLab",
        linkedin: "URL LinkedIn",
        bioEn: "Bio (Anglais)",
        bioFr: "Bio (Français)",
      },
    },
  },
}

export function getTranslation(lang: Language, key: string): string {
  const keys = key.split(".")
  let value: any = translations[lang]

  for (const k of keys) {
    value = value?.[k]
  }

  return value || key
}
