import { Component, inject, computed } from '@angular/core';
import { LucideAngularModule, Dumbbell, Motorbike, Globe, Mail, Share2 } from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';

// Import of components custom
import { StickyLabelComponent } from '../../components';

// Import of stores
import { CvStore } from '../../../../stores/pages/home';

// Import of services
import { TranslationService } from '../../../../services';

/**
 * @component Cv
 * @description Fragmento que muestra el currículum completo
 */
@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [StickyLabelComponent, LucideAngularModule, TranslateModule],
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.scss',
})
export class CvComponent {
  // Store global (como Jotai atom)
  cvStore = inject(CvStore);
  
  // Services
  translationService = inject(TranslationService);
  
  // Traducciones reactivas - usando el helper del servicio para simplificar
  cvTitle = this.translationService.translateComputed('pages.home.fragments.cv.title');
  cvSubtitle = this.translationService.translateComputed('pages.home.fragments.cv.subtitle');
  cvDescription = this.translationService.translateComputed('pages.home.fragments.cv.description');
  personalBioLabel = this.translationService.translateComputed('pages.home.fragments.cv.personalBio');
  experienceLabel = this.translationService.translateComputed('pages.home.fragments.cv.experience');
  educationLabel = this.translationService.translateComputed('pages.home.fragments.cv.education');
  skillsLabel = this.translationService.translateComputed('pages.home.fragments.cv.skills');
  hobbiesLabel = this.translationService.translateComputed('pages.home.fragments.cv.hobbies');
  contactLabel = this.translationService.translateComputed('pages.home.fragments.cv.contact');
  greetingText = this.translationService.translateComputed('pages.home.fragments.cv.greeting');
  professionText = this.translationService.translateComputed('pages.home.fragments.cv.profession');

  /**
   * @name mappingCVData
   * @description Mapping of the CV data - ahora viene del servicio de traducción
   */
  mappingCVData = computed(() => {
    const cvData = this.translationService.cvData();
    if (!cvData) {
      // Datos por defecto mientras se cargan los JSON
      return {
        personalInfo: {
          name: 'Sol',
          profession: 'English Teacher | Professor',
        },
        personalBio: '',
        experience: [],
        education: [],
        skills: [],
        hobbies: [],
        contact: [],
      };
    }
    
    /**
     * Mapear los hobbies con los iconos
     * Mapear el contacto con los iconos
     */
    const hobbyIcons = [Dumbbell, Motorbike];
    const contactIcons = [Mail, Globe, Share2];
    return {
      ...cvData,
      hobbies: cvData.hobbies.map((hobby, index) => ({
        ...hobby,
        icon: hobbyIcons[index] || Dumbbell,
      })),
      contact: cvData.contact.map((contact, index) => ({
        ...contact,
        icon: contactIcons[index] || Mail,
      })),
    };
  });
}
