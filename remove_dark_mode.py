#!/usr/bin/env python3
"""
Script para eliminar todas las reglas CSS de modo oscuro del archivo styles.css
"""

import re

def remove_dark_mode_rules(css_content):
    """
    Elimina todas las reglas CSS que contengan [data-theme="dark"]
    """
    # Patrón para encontrar reglas CSS de modo oscuro
    # Busca desde [data-theme="dark"] hasta el cierre de llave correspondiente
    pattern = r'\s*\[data-theme="dark"\][^{]*\{[^}]*\}'
    
    # Eliminar las reglas
    cleaned_content = re.sub(pattern, '', css_content, flags=re.MULTILINE | re.DOTALL)
    
    # Limpiar líneas vacías múltiples
    cleaned_content = re.sub(r'\n\s*\n\s*\n', '\n\n', cleaned_content)
    
    return cleaned_content

def main():
    css_file = 'css/styles.css'
    
    # Leer el archivo CSS
    with open(css_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    print(f"Archivo original: {len(content)} caracteres")
    
    # Eliminar reglas de modo oscuro
    cleaned_content = remove_dark_mode_rules(content)
    
    print(f"Archivo limpio: {len(cleaned_content)} caracteres")
    print(f"Eliminados: {len(content) - len(cleaned_content)} caracteres")
    
    # Escribir el archivo limpio
    with open(css_file, 'w', encoding='utf-8') as f:
        f.write(cleaned_content)
    
    print("✅ Reglas de modo oscuro eliminadas exitosamente!")

if __name__ == '__main__':
    main()