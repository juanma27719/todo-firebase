**Ionic To-Do App (Angular + Firebase)**

Aplicación To-Do multiplataforma (Web / Android / iOS) desarrollada con Ionic + Angular (Standalone Components), utilizando Angular Signals para el manejo de estado y Firebase Remote Config para habilitar funcionalidades dinámicamente.

**Funcionalidades**
* Crear, editar, completar y eliminar tareas
* Gestión de categorías
* Filtrado de tareas por categoría
* Persistencia local
* Edición de tareas controlada por Remote Config
* UI con Ionic Components, modales, alerts y toasts

**Arquitectura**
* Angular Signals (signal, computed)
* Servicios desacoplados
* Componentes standalone
* Tipado fuerte con modelos
* Estado reactivo y mantenible

**Firebase Remote Config**
* Feature flag: enable_edit
* Permite activar/desactivar edición sin recompilar la app

**Ejecución**
1. npm install
2. ionic serve

**Mobile**
1. ionic build
2. npx cap add android
3. npx cap open android

--------------

Cross-platform To-Do application (Web / Android / iOS) built with Ionic + Angular Standalone Components, using Angular Signals for state management and Firebase Remote Config for dynamic feature control.

**Features**
* Create, edit, complete and delete tasks
* Category management
* Task filtering by category
* Local persistence
* Task editing controlled via Remote Config
* UI built with Ionic Components, modals, alerts and toasts

**Architecture**
* Angular Signals (signal, computed)
* Decoupled services
* Standalone components
* Strong typing with models
* Reactive and maintainable state

**Firebase Remote Config**
* Feature flag: enable_edit
* Enables/disables task editing without rebuilding the app

**Author**
* Juan Manuel Valderrama Rengifo
* Angular • Ionic • Firebase
