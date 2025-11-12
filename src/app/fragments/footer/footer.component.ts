import { Component, inject, computed } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

// Import of services
import { TranslationService } from '../../services';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class Footer {
  translationService = inject(TranslationService);

  // Traducciones reactivas
  copyrightText = computed(() => 
    this.translationService.translate('fragments.footer.copyright')
  );
  githubText = computed(() => 
    this.translationService.translate('fragments.footer.github')
  );
}
