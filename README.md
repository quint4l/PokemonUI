# PokemonUI

Aplicación web desarrollada con React que consume la API pública de Pokémon para mostrar información de diferentes criaturas con paginación, búsqueda y filtrado por tipo.

La interfaz está inspirada en la estética retro de Game Boy y la Pokédex clásica, priorizando una experiencia visual nostálgica y una interfaz responsiva.

---

## Datos del Desarrollador

**Nombre:** Carlos Daniel Quintal Pech

**Título:** Ingeniero en Sistemas Computacionales

---

## Descripción del Proyecto

La aplicación permite explorar Pokémon mediante una interfaz interactiva que incluye:

* Paginación de Pokémon (6 por página)
* Búsqueda por nombre
* Filtrado por tipo
* Interfaz retro inspirada en la Pokédex
* Diseño responsivo

El manejo del estado global se realiza con Redux Toolkit, mientras que las peticiones HTTP a la API se gestionan mediante Axios.
El proyecto utiliza Vite como herramienta de desarrollo para ofrecer una compilación rápida y eficiente.

La información de los Pokémon se obtiene desde la API pública PokéAPI.

---

## Tecnologías Utilizadas

| Tecnología    | Descripción                                     |
| ------------- | ----------------------------------------------- |
| React         | Biblioteca para construir interfaces de usuario |
| Vite          | Herramienta rápida para desarrollo frontend     |
| Redux Toolkit | Manejo de estado global                         |
| React Redux   | Integración de Redux con React                  |
| Axios         | Cliente HTTP para consumir APIs                 |
| React Icons   | Biblioteca de iconos para React                 |
| Node.js       | Entorno de ejecución para JavaScript            |

---

## Requisitos del Sistema

Para ejecutar el proyecto localmente se recomienda:

| Herramienta | Versión         |
| ----------- | --------------- |
| Node.js     | v22.22.1        |
| npm         | 10.x o superior |

---

## Cómo Ejecutar el Proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/quint4l/PokemonUI.git
cd PokemonUI
cd pokemon-app
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar el servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en:

```
http://localhost:5173
```

### 4. Construir versión de producción

```bash
npm run build
```


## Documentación del Proyecto

El repositorio incluye un documento PDF con información detallada sobre el sistema:

### Documentación Técnica

* Arquitectura del proyecto
* Decisiones técnicas
* Estructura de carpetas
* Buenas prácticas utilizadas
* [Documentación técnica](./pokemon-app/docs/documentacion-tecnica.pdf)

### Documentación Funcional de la Interfaz de Usuario

* Descripción de la interfaz
* Flujo de interacción del usuario
* Explicación de funcionalidades
* [Documentación funcional de la interfaz de usuario](./pokemon-app/docs/documentacion-interfaz-usuario.pdf)
---

## Licencia

Este proyecto fue desarrollado con findes de demostración técnica.

Pokémon y sus imágenes son propiedad de sus respectivos dueños.
