---
title: Personalized Customization Guide
publishDate: 2024-07-27
description: 'astro-theme-pure Personalized Customization Guide'
tags:
  - Waline
  - Vercel
  - Supabase
heroImage: { src: './thumbnail.jpg', color: '#64574D' }
language: 'English'
---



### 1. Si usas VS Code (La más rápida)

Puedes usar el **"Buscar y Reemplazar" con Expresiones Regulares (Regex)**. Es como un "super buscar" que detecta patrones.

1. Presiona `Ctrl + Shift + F` (o `Cmd + Shift + F` en Mac) para buscar en todo el proyecto.
2. Activa el icono de **.* ** (Use Regular Expression).
3. En **Buscar**, pega esto: `\!\[\[(.*?)\]\]`
4. En **Reemplazar**, pega esto: `![$1]($1)`
5. Dale a "Replace All".

> **¿Qué hace esto?** El `$1` es una variable que captura el nombre del archivo que estaba dentro de los corchetes dobles y lo pone en el formato estándar.

---

### 2. Si usas Obsidian (Plugin oficial)

Si tus notas están en Obsidian y quieres "exportarlas" o convertirlas definitivamente para que funcionen en tu proyecto MDX, hay un plugin llamado **"Consistent Attachments and Links"**.

* Ve a **Settings** > **Community Plugins** > **Browse**.
* Busca **"Consistent Attachments and Links"**.
* Tiene una opción llamada **"Convert links to standard Markdown"**.
* Esto convertirá todos los `![[imagen.png]]` a `![imagen.png](imagen.png)` en toda tu bóveda automáticamente.

---

### 3. Si tienes muchos archivos y prefieres un Script (Python)

Si tienes miles de archivos y quieres algo ultra seguro, este pequeño script de Python hace el trabajo sucio por ti. Solo tienes que ejecutarlo en la carpeta de tus archivos `.mdx`.

```python
import re
import os

# Carpeta donde están tus archivos .mdx
path = './tus_archivos_mdx'

# El patrón busca ![[archivo.png]]
pattern = re.compile(r'\!\[\[(.*?)\]\]')

for filename in os.listdir(path):
    if filename.endswith(".mdx") or filename.endswith(".md"):
        with open(os.path.join(path, filename), 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Reemplazamos por el formato ![archivo.png](archivo.png)
        new_content = pattern.sub(r'![\1](\1)', content)
        
        with open(os.path.join(path, filename), 'w', encoding='utf-8') as f:
            f.write(new_content)

print("¡Conversión completada!")

```

---

### ¿Cuál elegir?

* Si solo son **unos pocos archivos** dentro de tu editor: **Opción 1 (VS Code Regex)**. Es instantáneo.
* Si quieres que **Obsidian** deje de usar ese formato para siempre: **Opción 2**.
* Si eres **desarrollador** y quieres automatizarlo en un pipeline: **Opción 3**.

**Ojo con las rutas:** Ten en cuenta que el formato estándar `!(...)` a veces necesita la ruta relativa (ej: `../public/imagen.png`). Si tus imágenes no están en la misma carpeta que el `.mdx`, la opción de VS Code es la mejor porque puedes ajustar el reemplazo a algo como `![$1](./images/$1)`.




## Site Configuration

[astro-theme-pure](https://github.com/cworld1/astro-theme-pure)

Customizing this theme requires adjusting a significant amount of source code.

We have made efforts to centralize the configuration options in the `src/site.config.ts` file for user convenience and have integrated a variety of common social media/tools icons. If you want to add new icons, you will need to modify the source code yourself.

You can globally search for the following keywords to find the text that needs to be replaced:

- `Lorem ipsum`
- `astro-theme-pure`
- `cworld`

Next, we will introduce each aspect in detail.

### Configuration Files

See [Configuration Files](/docs/setup/configuration) for details.

#### Waline Comment System

See [Waline Comment System](/docs/integrations/comment) for details.

#### Footer

Currently supported social media include:

- `coolapk`
- `telegram`
- `github`
- `bilibili`
- `twitter`
- `zhihu`
- `steam`
- `netease_music`

If you want to add new social media, you need to modify the following files:

- `src/types.ts`: Add a new `SocialLink.name` enum value and the icon mapping relationship for `SocialMediaIconId`
- `public/icons/social.svg`: Follow the existing format and add a new icon as a symbol

  It is recommended to find social media icons on the following websites to maintain consistency:
  - [remixicon](https://remixicon.com/)
  - [mingcute](https://www.mingcute.com/)

### Other Files to Replace

- `public/favicon`: The site's favicon. You can generate a favicon at [favicon.io](https://favicon.io/favicon-converter/)
- `public/images/social-card.png`: The site's social card
- `src/assets/`: This directory contains client-rendered avatars, sponsorship QR codes, and other images. Please replace them with your own images

## Other Pages

### About

Currently supported icons can be found in the `src/icons` directory.

If you want to add new Tools icons, you need to add a new icon in the `src/icons` directory.

It is recommended to find new icons on the following websites to maintain consistency:

- [iconify](https://icon-sets.iconify.design/)
- [icones](https://icones.js.org/)

## Deployment Mode

See [Deployment](/docs/deployment) for details.
