# CvLoneliness

Aplicación web interactiva de currículum vitae desarrollada con Angular, que permite visualizar, descargar y compartir un CV profesional con soporte multiidioma (Español/Inglés).

## 🚀 Características

- **CV Interactivo**: Visualización completa del currículum con secciones organizadas (Experiencia, Educación, Habilidades, Hobbies, Contacto)
- **Multiidioma**: Soporte completo para Español e Inglés con cambio dinámico de idioma
- **Descarga de PDF**: Funcionalidad para descargar el CV en formato PDF
- **Compartir en Redes Sociales**: Integración con Web Share API y soporte para compartir en Facebook, Twitter, LinkedIn y WhatsApp
- **Diseño Responsive**: Interfaz adaptativa para dispositivos móviles, tablets y desktop
- **Iconos Modernos**: Integración con Lucide Angular para iconos elegantes
- **Estado Reactivo**: Gestión de estado con Angular Signals para una experiencia fluida
- **Componentes Modulares**: Arquitectura basada en componentes standalone reutilizables

## 🛠️ Tecnologías

- **Angular** 20.3.0 - Framework principal
- **TypeScript** 5.9.2 - Lenguaje de programación
- **@ngx-translate/core** 17.0.0 - Internacionalización
- **Lucide Angular** 0.552.0 - Biblioteca de iconos
- **RxJS** 7.8.0 - Programación reactiva
- **Karma & Jasmine** - Testing framework

## 📋 Requisitos Previos

- Node.js (versión 18 o superior)
- npm (versión 9 o superior)
- Angular CLI 20.3.8

## 🔧 Instalación

1. Clona el repositorio:
```bash
git clone <repository-url>
cd cv-loneliness
```

2. Instala las dependencias:
```bash
npm install
```

## 🎯 Scripts Disponibles

### Desarrollo

Inicia el servidor de desarrollo:
```bash
npm start
# o
ng serve
```

La aplicación estará disponible en `http://localhost:4200/`. Se recargará automáticamente cuando modifiques los archivos fuente.

### Build

Compila el proyecto para producción:
```bash
npm run build
# o
ng build
```

Los archivos compilados se guardarán en el directorio `dist/`. El build de producción optimiza la aplicación para rendimiento y velocidad.

### Build en Modo Watch

Compila el proyecto y observa cambios:
```bash
npm run watch
```

### Testing

Ejecuta los tests unitarios con Karma:
```bash
npm test
# o
ng test
```

Ejecuta los tests con cobertura de código:
```bash
npm run test:coverage
```

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── components/          # Componentes reutilizables
│   │   └── tooltip/         # Componente de tooltip
│   ├── fragments/           # Fragmentos de UI
│   │   ├── header/         # Header con navegación
│   │   └── footer/         # Footer
│   ├── pages/              # Páginas principales
│   │   ├── home/           # Página principal
│   │   │   ├── components/ # Componentes específicos de home
│   │   │   │   ├── dialogue-bubble/
│   │   │   │   └── sticky-label/
│   │   │   └── fragments/  # Fragmentos de home
│   │   │       ├── cv/     # Componente CV principal
│   │   │       └── welcome/ # Componente de bienvenida
│   │   └── contact/        # Página de contacto
│   ├── services/           # Servicios de la aplicación
│   │   ├── translation/    # Servicio de traducción
│   │   │   └── utils/      # Utilidades de traducción
│   │   └── pages/          # Servicios específicos de páginas
│   │       └── home/       # Servicios de home
│   │           ├── download/ # Servicio de descarga PDF
│   │           └── share/    # Servicio de compartir
│   ├── stores/             # Stores globales (estado)
│   │   ├── language/       # Store de idioma
│   │   └── pages/          # Stores de páginas
│   │       └── home/       # Store del CV
│   └── utils/              # Utilidades y tipos
│       └── types.ts        # Tipos TypeScript globales
├── locales/                # Archivos de traducción
│   ├── en/                 # Traducciones en inglés
│   │   └── common.json
│   └── es/                 # Traducciones en español
│       └── common.json
└── styles.scss             # Estilos globales

public/
├── pdfs/                   # Archivos PDF del CV
│   └── cv-maria-soledad-duero.pdf
├── fonts/                  # Fuentes personalizadas
└── images/                 # Imágenes estáticas
```

## 🎨 Funcionalidades Principales

### 1. Visualización del CV

El CV se muestra con las siguientes secciones:
- **Información Personal**: Nombre y profesión
- **Biografía Personal**: Descripción breve
- **Experiencia**: Lista de experiencias laborales con años, título y descripción
- **Educación**: Lista de estudios con años, curso e institución
- **Habilidades**: Lista de habilidades técnicas
- **Hobbies**: Lista de pasatiempos con iconos
- **Contacto**: Información de contacto con iconos

### 2. Internacionalización

La aplicación soporta dos idiomas:
- **Español (ES)**
- **Inglés (EN)**

El idioma se puede cambiar desde el header y se guarda en `localStorage` para persistir la preferencia del usuario.

### 3. Descarga de PDF

El botón de descarga en el header permite descargar el CV en formato PDF desde la carpeta `public/pdfs/`.

### 4. Compartir en Redes Sociales

El botón de compartir permite:
- Usar la Web Share API nativa (dispositivos móviles)
- Compartir en Facebook, Twitter, LinkedIn o WhatsApp
- Fallback automático a Twitter si Web Share API no está disponible

### 5. Navegación

El header incluye:
- Botón de retroceso (volver a la pantalla de bienvenida)
- Botón de cambio de idioma
- Botón de descarga PDF
- Botón de compartir

## 🧪 Testing

El proyecto utiliza Karma y Jasmine para testing. Todos los componentes, servicios y stores incluyen tests unitarios.

Para ejecutar los tests:
```bash
npm test
```

Para ejecutar los tests con cobertura:
```bash
npm run test:coverage
```

## 📦 Build y Deployment

### Build de Producción

```bash
npm run build
```

El build de producción:
- Optimiza el código
- Minifica los archivos
- Genera source maps
- Almacena los artefactos en `dist/cv-loneliness/`

### Deployment

Los archivos en `dist/cv-loneliness/browser/` pueden ser desplegados en cualquier servidor web estático o servicio de hosting como:
- Netlify
- Vercel
- GitHub Pages
- Firebase Hosting
- AWS S3 + CloudFront

## 🔨 Generación de Código

Angular CLI incluye herramientas poderosas de scaffolding. Para generar un nuevo componente:

```bash
ng generate component component-name
```

Para ver una lista completa de schematics disponibles (como `components`, `directives`, o `pipes`):

```bash
ng generate --help
```

## 📝 Configuración

### Prettier

El proyecto incluye configuración de Prettier:
- `printWidth`: 100
- `singleQuote`: true
- Parser Angular para archivos HTML

### Archivos de Traducción

Los archivos de traducción se encuentran en `src/locales/` y siguen la estructura definida en `src/app/services/translation/utils/types.ts`.

## 🎯 Arquitectura

### Componentes Standalone

Todos los componentes son standalone, lo que permite:
- Mejor tree-shaking
- Carga lazy más eficiente
- Menor tamaño del bundle

### Gestión de Estado

El proyecto utiliza Angular Signals para la gestión de estado:
- `CvStore`: Controla la visualización del CV
- `LanguageStore`: Gestiona el idioma actual

### Servicios

Los servicios están organizados por contexto:
- `TranslationService`: Maneja traducciones y datos del CV
- `DownloadService`: Gestiona la descarga de PDFs
- `ShareService`: Maneja el compartir en redes sociales

## 📚 Recursos Adicionales

Para más información sobre Angular CLI, incluyendo referencias detalladas de comandos, visita la [Documentación de Angular CLI](https://angular.dev/tools/cli).

## 📄 Licencia

Este proyecto es privado.

---

**Desarrollado con ❤️ usando Angular**
