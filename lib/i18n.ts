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
      title: "Designing reliable systems for controlled decisions.",
      subtitle:
        "I support organizations and businesses in structuring their information systems, analyzing their data, and optimizing their processes.",
      cta: "Discuss Your Project",
      viewWork: "View My Work",
      stats: {
        experience: "Years Experience",
        projects: "Projects Completed",
        technologies: "Technologies",
      },
    },
    problem: {
      title: "Your systems should support your growth, not slow it down.",
      description:
        "Manual processes, scattered data, lack of visibility, decisions based on intuition... A poorly structured system creates uncertainty. I design clear, robust, and scalable architectures.",
      items: {
        manual: "Manual processes",
        dispersed: "Scattered data",
        visibility: "Lack of visibility",
        intuition: "Intuition-based decisions",
      },
    },
    method: {
      title: "A structured approach in three steps.",
      approach: "Clear objectives. Strategic approach. Mastered decisions.",
      steps: {
        analysis: {
          title: "Needs & Flow Analysis",
          description: "Understanding your challenges and mapping your current processes to identify optimization opportunities.",
        },
        implementation: {
          title: "System Design & Implementation",
          description: "Building robust, scalable solutions tailored to your specific requirements and business context.",
        },
        optimization: {
          title: "Monitoring, Optimization & Reliability",
          description: "Continuous improvement and system reliability to ensure long-term performance and stability.",
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
          title: "Web Application Development",
          description: "Creating modern, performant web applications with optimal user experience.",
        },
        infrastructure: {
          title: "Maintenance & IT Infrastructure",
          description: "Ensuring system reliability, security, and continuous operational excellence.",
        },
      },
    },
    trust: {
      title: "Why Trust Me?",
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
          title: "Results-Oriented Approach",
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
      title: "Featured Projects",
      subtitle: "Recent projects with measurable impact",
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
      subtitle: "Let's discuss your project.",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send Message",
      or: "Or reach me directly at",
      location: "Kinshasa, Democratic Republic of the Congo",
      availability: "Open to remote work",
    },
    footer: {
      rights: "All rights reserved.",
      built: "Built with Next.js and Tailwind CSS",
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
      title: "Conception de systèmes fiables pour des décisions maîtrisées.",
      subtitle:
        "J'accompagne organisations et entreprises dans la structuration de leurs systèmes d'information, l'analyse de leurs données et l'optimisation de leurs processus.",
      cta: "Discuter de votre projet",
      viewWork: "Voir mes réalisations",
      stats: {
        experience: "Ans d'Expérience",
        projects: "Projets Réalisés",
        technologies: "Technologies",
      },
    },
    problem: {
      title: "Vos systèmes doivent soutenir votre croissance, pas la freiner.",
      description:
        "Processus manuels, données dispersées, manque de visibilité, décisions basées sur l'intuition... Un système mal structuré crée de l'incertitude. Je conçois des architectures claires, robustes et évolutives.",
      items: {
        manual: "Processus manuels",
        dispersed: "Données dispersées",
        visibility: "Manque de visibilité",
        intuition: "Décisions intuitives",
      },
    },
    method: {
      title: "Une approche structurée en trois étapes.",
      approach: "Objectifs clairs. Approche stratégique. Décisions maîtrisées.",
      steps: {
        analysis: {
          title: "Analyse des besoins et des flux",
          description: "Comprendre vos défis et cartographier vos processus actuels pour identifier les opportunités d'optimisation.",
        },
        implementation: {
          title: "Conception et mise en place du système",
          description: "Construction de solutions robustes et évolutives adaptées à vos besoins spécifiques et votre contexte métier.",
        },
        optimization: {
          title: "Suivi, optimisation et fiabilisation",
          description: "Amélioration continue et fiabilité du système pour assurer performance et stabilité à long terme.",
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
          title: "Développement d'applications web",
          description: "Création d'applications web modernes et performantes avec une expérience utilisateur optimale.",
        },
        infrastructure: {
          title: "Maintenance & infrastructure IT",
          description: "Assurance de la fiabilité, sécurité et excellence opérationnelle continue des systèmes.",
        },
      },
    },
    trust: {
      title: "Pourquoi me faire confiance ?",
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
          title: "Approche orientée résultat",
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
      title: "Projets Phares",
      subtitle: "Projets récents avec impact mesurable",
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
      subtitle: "Discutons de votre projet.",
      name: "Nom",
      email: "Email",
      message: "Message",
      send: "Envoyer le Message",
      or: "Ou contactez-moi directement à",
      location: "Kinshasa, République Démocratique du Congo",
      availability: "Ouvert au travail à distance",
    },
    footer: {
      rights: "Tous droits réservés.",
      built: "Construit avec Next.js et Tailwind CSS",
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
