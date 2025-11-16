export const languages = {
  en: "English",
  fr: "Français",
} as const

export type Language = keyof typeof languages

export const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      experience: "Experience",
      projects: "Projects",
      education: "Education",
      contact: "Contact",
    },
    hero: {
      greeting: "Hello, I'm",
      title: "Web Developer & Digital Marketer",
      subtitle:
        "A passionate web developer and digital marketer, expert in frontend and backend development. I create innovative digital solutions with a focus on performance and user experience.",
      cta: "Get In Touch",
      viewWork: "View My Work",
      stats: {
        experience: "Years Experience",
        projects: "Projects Completed",
        technologies: "Technologies",
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
      subtitle: "Some of the projects I've worked on",
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
      title: "Get In Touch",
      subtitle:
        "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.",
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
      about: "À Propos",
      skills: "Compétences",
      experience: "Expérience",
      projects: "Projets",
      education: "Formation",
      contact: "Contact",
    },
    hero: {
      greeting: "Bonjour, je suis",
      title: "Développeur Web & Marketeur Digital",
      subtitle:
        "Un développeur web et marketeur digital passionné, expert en développement frontend et backend. Je crée des solutions numériques innovantes avec un accent sur la performance et l'expérience utilisateur.",
      cta: "Me Contacter",
      viewWork: "Voir Mon Travail",
      stats: {
        experience: "Ans d'Expérience",
        projects: "Projets Réalisés",
        technologies: "Technologies",
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
      subtitle: "Quelques projets sur lesquels j'ai travaillé",
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
      title: "Contactez-Moi",
      subtitle:
        "Je suis toujours ouvert à discuter de nouveaux projets, d'idées créatives ou d'opportunités de faire partie de votre vision.",
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
