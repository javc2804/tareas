# Gestor de Tareas

Este es un proyecto para gestionar tareas. Permite crear, eliminar, editar y marcar tareas como completadas. Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 15.2.11.

## Tecnologías utilizadas

- Angular 15
- Angular Material
- SCSS
- Firestore como base de datos

## Decisiones de diseño

Se decidió utilizar Angular debido a su robusto sistema de componentes y su integración con TypeScript, lo que permite un desarrollo más seguro y predecible. Angular Material se utilizó para proporcionar una interfaz de usuario moderna y responsive.

SCSS se utilizó como preprocesador de CSS debido a sus características avanzadas como variables, anidamiento y mixins que hacen que el código CSS sea más reutilizable y fácil de mantener.

Firestore se eligió como base de datos debido a su escalabilidad, su modelo de datos en tiempo real y su integración con otros productos de Firebase.

## Configuración del entorno

Las variables de entorno se definen en los archivos `environment.ts` y `environment.prod.ts`. Estos archivos contienen la configuración para los entornos de desarrollo y producción, respectivamente, incluyendo la URL de la API y la configuración de Firestore.

Por favor, ten en cuenta que `environment.prod.ts` debe ser creado localmente y no se incluye en el control de versiones debido a que contiene variables sensibles.

## Instrucciones de ejecución

1. Clona el repositorio
2. Ejecuta `npm install` para instalar las dependencias
3. Crea un archivo `environment.prod.ts` en la carpeta `environments` con tus variables de entorno
4. Ejecuta `ng serve` para iniciar el servidor de desarrollo. Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si cambias alguno de los archivos de origen.
