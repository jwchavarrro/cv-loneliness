# Comparación: React vs Angular - Implementación de Tooltip

## 🔴 ANGULAR (Implementación Actual)

### Estructura: Separación de archivos
- `header.component.ts` - Lógica
- `header.component.html` - Template
- `header.component.scss` - Estilos

### Gestión de Estado
```typescript
// Angular usa Signals (reactivo)
tooltipStates = signal<Record<number, boolean>>({});

showTooltip(index: number) {
  this.tooltipStates.update((states) => ({
    ...states,
    [index]: true
  }));
}
```

### Template
```html
@for (button of navigationButtonsHeader; track button.icon; let i = $index) {
  @if (button.condition()) {
    <div class="header__button-wrapper">
      <button 
        (mouseenter)="showTooltip(i)"
        (mouseleave)="hideTooltip(i)">
        <lucide-icon [img]="button.icon" [size]="60"></lucide-icon>
      </button>
      <app-tooltip 
        [text]="button.ariaLabel"
        [show]="isTooltipVisible(i)">
      </app-tooltip>
    </div>
  }
}
```

---

## ⚛️ REACT (Equivalente)

### Estructura: Todo en un archivo JSX
- `Header.tsx` - Lógica + Template + Estilos (o CSS modules)

### Gestión de Estado
```typescript
// React usa useState (hook)
const [tooltipStates, setTooltipStates] = useState<Record<number, boolean>>({});

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
```

### JSX Template
```tsx
return (
  <header className="header">
    <div className="header__container">
      {navigationButtonsHeader.map((button, i) => {
        if (!button.condition()) return null;
        
        return (
          <div key={i} className="header__button-wrapper">
            <button
              aria-label={button.ariaLabel}
              onClick={button.action}
              onMouseEnter={() => showTooltip(i)}
              onMouseLeave={() => hideTooltip(i)}
            >
              <LucideIcon icon={button.icon} size={60} />
            </button>
            {isTooltipVisible(i) && (
              <Tooltip
                text={button.ariaLabel}
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
```

---

## 🔑 DIFERENCIAS PRINCIPALES

### 1. **Sintaxis de Eventos**
- **Angular**: `(mouseenter)="showTooltip(i)"` - Paréntesis para eventos
- **React**: `onMouseEnter={() => showTooltip(i)}` - Prefijo `on` + camelCase

### 2. **Binding de Propiedades**
- **Angular**: `[text]="button.ariaLabel"` - Corchetes para propiedades
- **React**: `text={button.ariaLabel}` - Llaves para todo

### 3. **Renderizado Condicional**
- **Angular**: `@if (condition) { ... }` - Directiva de control de flujo
- **React**: `{condition && <Component />}` - Operador lógico

### 4. **Iteración**
- **Angular**: `@for (item of items; track item.id; let i = $index)` - Directiva con tracking
- **React**: `{items.map((item, i) => ...)}` - Método de array

### 5. **Gestión de Estado**
- **Angular**: `signal()` con `.update()` - Reactivo, granular
- **React**: `useState()` con función setter - Re-render completo del componente

### 6. **Estructura de Archivos**
- **Angular**: Separación clara (TS, HTML, SCSS)
- **React**: Todo en un archivo (JSX) o con CSS modules separados

### 7. **Clases CSS**
- **Angular**: `class="header__button"` o `[ngClass]="..."` 
- **React**: `className="header__button"` (JSX requiere className)

### 8. **Acceso a Métodos**
- **Angular**: `this.showTooltip(i)` - Contexto de clase
- **React**: `showTooltip(i)` - Función en scope

---

## 📊 VENTAJAS DE CADA UNO

### Angular
✅ Separación de concerns (lógica/template/estilos)
✅ Signals reactivos más eficientes
✅ Directivas de template más declarativas
✅ Type-safe en templates con compilador
✅ Mejor para proyectos grandes y estructurados

### React
✅ Todo en un lugar (más fácil de seguir)
✅ Sintaxis más familiar (JavaScript puro)
✅ Menos "magia" del framework
✅ Más flexible en estructura
✅ Ecosistema más grande

---

## 🎯 CONCLUSIÓN

La **diferencia principal** es que:
- **Angular** separa la lógica del template y usa directivas especiales (`@for`, `@if`, `()` para eventos, `[]` para props)
- **React** usa JavaScript puro en JSX con convenciones (`onEvent`, `{}` para todo, `.map()` para loops)

Ambos logran lo mismo, pero con filosofías diferentes:
- **Angular**: Más estructura y separación
- **React**: Más flexibilidad y JavaScript nativo

