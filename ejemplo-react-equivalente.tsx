// ============================================
// EJEMPLO REACT EQUIVALENTE
// ============================================

import { useState } from 'react';
import { Undo, Printer } from 'lucide-react';
import { Tooltip } from './components/Tooltip';

interface ButtonConfig {
  icon: typeof Undo;
  ariaLabel: string;
  condition: () => boolean;
  action: () => void;
}

export const Header = () => {
  const [tooltipStates, setTooltipStates] = useState<Record<number, boolean>>({});
  
  // En React, necesitarías inyectar el store de otra forma
  // const cvStore = useCvStore(); // Ejemplo con Zustand/Jotai
  
  const showTooltip = (index: number) => {
    setTooltipStates(prev => ({
      ...prev,
      [index]: true
    }));
  };

  const hideTooltip = (index: number) => {
    setTooltipStates(prev => ({
      ...prev,
      [index]: false
    }));
  };

  const isTooltipVisible = (index: number): boolean => {
    return tooltipStates[index] ?? false;
  };

  const navigationButtonsHeader: ButtonConfig[] = [
    {
      icon: Undo,
      ariaLabel: 'Regresar',
      condition: () => true, // cvStore.showCv()
      action: () => {}, // cvStore.hideCvView()
    },
    {
      icon: Printer,
      ariaLabel: 'Imprimir',
      condition: () => true, // cvStore.showCv()
      action: () => {},
    },
  ];

  return (
    <header className="header">
      <div className="header__container">
        {navigationButtonsHeader.map((button, i) => {
          // Renderizado condicional en React
          if (!button.condition()) return null;

          return (
            <div key={i} className="header__button-wrapper">
              <button
                className="header__button"
                aria-label={button.ariaLabel}
                onClick={button.action}
                onMouseEnter={() => showTooltip(i)}  // ← Diferencia: onMouseEnter
                onMouseLeave={() => hideTooltip(i)}  // ← Diferencia: onMouseLeave
              >
                <button.icon size={60} />
              </button>
              
              {/* Renderizado condicional con operador && */}
              {isTooltipVisible(i) && (
                <Tooltip
                  text={button.ariaLabel}  // ← Diferencia: sin corchetes
                  position="bottom"
                  show={isTooltipVisible(i)}
                />
              )}
            </div>
          );
        })}
      </div>
    </header>
  );
};

// ============================================
// COMPARACIÓN LADO A LADO
// ============================================

/*
┌─────────────────────────────────────────────────────────────┐
│                    ANGULAR                    │    REACT     │
├─────────────────────────────────────────────────────────────┤
│ (mouseenter)="showTooltip(i)"                │ onMouseEnter  │
│ (mouseleave)="hideTooltip(i)"                │ onMouseLeave  │
│ [text]="button.ariaLabel"                     │ text={...}    │
│ [show]="isTooltipVisible(i)"                  │ show={...}    │
│ @if (condition) { ... }                       │ {cond && ...} │
│ @for (item of items; track id; let i=$index)  │ .map((i) =>)  │
│ class="header__button"                        │ className     │
│ signal<boolean>(false)                        │ useState()    │
│ this.showTooltip(i)                           │ showTooltip() │
└─────────────────────────────────────────────────────────────┘
*/

