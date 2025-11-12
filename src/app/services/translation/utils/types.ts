/**
 * @fileoverview
 * @description Tipos para el servicio de traducción
 */

/**
 * @type Type_TRANSLATION_KEY
 * @description Tipo para las claves de traducción
 */
export type Type_TRANSLATION_KEY =
  | 'fragments.header.changeLanguage'
  | 'fragments.header.back'
  | 'fragments.header.download'
  | 'fragments.header.share'
  | 'fragments.footer.copyright'
  | 'fragments.footer.github'
  | 'pages.home.fragments.welcome.dialogue'
  | 'pages.home.fragments.welcome.button'
  | 'pages.home.fragments.cv.title'
  | 'pages.home.fragments.cv.subtitle'
  | 'pages.home.fragments.cv.description'
  | 'pages.home.fragments.cv.personalBio'
  | 'pages.home.fragments.cv.greeting'
  | 'pages.home.fragments.cv.experience'
  | 'pages.home.fragments.cv.education'
  | 'pages.home.fragments.cv.skills'
  | 'pages.home.fragments.cv.hobbies'
  | 'pages.home.fragments.cv.contact'
  | 'pages.home.fragments.cv.profession';

/**
 * @interface CvData
 * @description Interface for the CV data
 */
export interface CvData {
  personalInfo: {
    name: string;
    profession: string;
  };
  personalBio: string;
  experience: Array<{
    year: string;
    title: string;
    description: string;
  }>;
  education: Array<{
    years: string;
    course: string;
    institution: string;
  }>;
  skills: string[];
  hobbies: Array<{
    name: string;
  }>;
  contact: Array<{
    value: string;
  }>;
}

/**
 * @interface TranslationsFile
 * @description Interface for the translations file
 */
export interface TranslationsFile {
  fragments: {
    header: {
      changeLanguage: string;
      back: string;
      download: string;
      share: string;
    };
    footer: {
      copyright: string;
      github: string;
    };
  };
  pages: {
    home: {
      fragments: {
        welcome: {
          dialogue: string;
          button: string;
        };
        cv: {
          title: string;
          subtitle: string;
          description: string;
          personalBio: string;
          greeting: string;
          experience: string;
          education: string;
          skills: string;
          hobbies: string;
          contact: string;
          profession: string;
        };
      };
    };
  };
  cv: CvData;
}
