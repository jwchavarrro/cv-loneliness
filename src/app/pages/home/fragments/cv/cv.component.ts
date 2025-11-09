import { Component, inject, computed } from '@angular/core';
import { LucideAngularModule, Dumbbell, Motorbike } from 'lucide-angular';

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
  imports: [StickyLabelComponent, LucideAngularModule],
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.scss',
})
export class CvComponent {
  // Store global (como Jotai atom)
  cvStore = inject(CvStore);
  
  // Services
  translationService = inject(TranslationService);
  
  // Traducciones reactivas
  cvTitle = computed(() => 
    this.translationService.translate('pages.home.fragments.cv.title')
  );
  cvSubtitle = computed(() => 
    this.translationService.translate('pages.home.fragments.cv.subtitle')
  );
  cvDescription = computed(() => 
    this.translationService.translate('pages.home.fragments.cv.description')
  );
  personalBioLabel = computed(() => 
    this.translationService.translate('pages.home.fragments.cv.personalBio')
  );
  experienceLabel = computed(() => 
    this.translationService.translate('pages.home.fragments.cv.experience')
  );
  educationLabel = computed(() => 
    this.translationService.translate('pages.home.fragments.cv.education')
  );
  skillsLabel = computed(() => 
    this.translationService.translate('pages.home.fragments.cv.skills')
  );
  hobbiesLabel = computed(() => 
    this.translationService.translate('pages.home.fragments.cv.hobbies')
  );
  contactLabel = computed(() => 
    this.translationService.translate('pages.home.fragments.cv.contact')
  );

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
        contact: {
          email: '',
          website: '',
          social: '',
        },
      };
    }
    
    // Mapear los hobbies con los iconos
    const hobbyIcons = [Dumbbell, Motorbike];
    return {
      ...cvData,
      hobbies: cvData.hobbies.map((hobby, index) => ({
        ...hobby,
        icon: hobbyIcons[index] || Dumbbell,
      })),
    };
  });
}
