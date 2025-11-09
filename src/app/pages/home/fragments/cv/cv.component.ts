import { Component, inject } from '@angular/core';

// Import of components custom
import { StickyLabelComponent } from '../../components';

// Import of stores

import { CvStore } from '../../../../stores/pages/home';

/**
 * @component Cv
 * @description Fragmento que muestra el currículum completo
 */
@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [StickyLabelComponent],
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.scss',
})
export class CvComponent {
  // Store global (como Jotai atom)
  cvStore = inject(CvStore);

  /**
   * @name mappingCVData
   * @description Mapping of the CV data
   */
  mappingCVData = {
    personalInfo: {
      name: "Sol",
      profession: "English Teacher | Professor"
    },
    personalBio: "I'm a licensed English teacher with a passion for teaching and helping students of all ages and levels improve their English skills. My teaching style is dynamic, supportive, and focused on building confidence in language learners.",
    experience: [
      {
        year: "2021 - 2023",
        title: "English Teacher, Colegio Primavera",
        description: "Taught English to middle and high school students. Developed engaging lesson plans, implemented interactive speaking activities, and promoted a positive classroom environment."
      },
      {
        year: "2018 - 2021",
        title: "English Teacher, Colegio Horizonte",
        description: "Delivered English language instruction to primary and secondary students. Organized extracurricular English conversation clubs and prepared students for language exams."
      }
    ],
    education: [
      {
        years: "2014 - 2018",
        course: "Licenciatura en Enseñanza del Inglés",
        institution: "Universidad Nacional",
        note: "Learned the fundamentals of English language teaching, methodology, and classroom management."
      }
    ],
    skills: [
      "Lesson planning & curriculum design",
      "Classroom management",
      "Communicative teaching methods",
      "Test & exam preparation",
      "Student mentoring",
      "Digital teaching tools (Google Classroom, Zoom)"
    ],
    hobbies: [
      "Reading literature",
      "Traveling",
      "Language learning",
      "Knitting"
    ],
    contact: {
      email: "sol.teacher@email.com",
      website: "solenglish.com",
      social: "@solenglish"
    }
  };
}
