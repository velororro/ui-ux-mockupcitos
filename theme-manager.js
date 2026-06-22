// theme-manager.js

// 1. Definición de las 3 opciones de colores institucionales
const themes = {
    marron: {
        "primary": "#41000c",
        "primary-container": "#650a1b",
        "on-primary-container": "#ed737b",
        "surface-tint": "#a33a44"
    },
    azul: {
        "primary": "#0a2540",
        "primary-container": "#103154",
        "on-primary-container": "#70a1ff",
        "surface-tint": "#1e4e8c"
    },
    verde: {
        "primary": "#0a3622",
        "primary-container": "#0f4c31",
        "on-primary-container": "#52be80",
        "surface-tint": "#196f3d"
    }
};

// 2. Función global para inyectar y cambiar los colores en Tailwind en tiempo real
window.changeTheme = function(themeName) {
    const theme = themes[themeName];
    if (!theme) return;

    // Guardar la preferencia del usuario
    localStorage.setItem('selected-educational-theme', themeName);

    // Actualizar la configuración activa de Tailwind CSS
    if (window.tailwind && window.tailwind.config) {
        window.tailwind.config.theme.extend.colors.primary = theme["primary"];
        window.tailwind.config.theme.extend.colors["primary-container"] = theme["primary-container"];
        window.tailwind.config.theme.extend.colors["on-primary-container"] = theme["on-primary-container"];
        window.tailwind.config.theme.extend.colors["surface-tint"] = theme["surface-tint"];
        
        // Forzar un refresco visual de clases de Tailwind mediante un trigger ligero
        document.documentElement.classList.toggle('theme-refresh');
    }
};

// 3. Renderizar e inicializar la interfaz de botones flotantes automáticamente
document.addEventListener('DOMContentLoaded', () => {
    // Cargar el tema guardado previamente (por defecto 'marron')
    const savedTheme = localStorage.getItem('selected-educational-theme') || 'marron';
    
    // Pequeño delay para asegurar que el script principal de Tailwind ya cargó en el DOM
    setTimeout(() => window.changeTheme(savedTheme), 50);
    
    // Crear el contenedor de botones flotantes (Esquina inferior izquierda)
    const controlPanel = document.createElement('div');
    controlPanel.className = 'fixed bottom-4 left-4 z-50 bg-white/90 backdrop-blur-md p-2 px-3 rounded-full border border-outline-variant/50 shadow-lg flex gap-3 items-center';
    
    controlPanel.innerHTML = `
        <span class="text-[11px] font-bold tracking-wider text-on-surface-variant uppercase font-sans">Temas:</span>
        <div class="flex gap-2">
            <button onclick="window.changeTheme('marron')" class="w-6 h-6 rounded-full bg-[#41000c] border border-white/60 shadow-sm hover:scale-115 active:scale-90 transition-all cursor-pointer" title="Marrón Institucional"></button>
            <button onclick="window.changeTheme('azul')" class="w-6 h-6 rounded-full bg-[#0a2540] border border-white/60 shadow-sm hover:scale-115 active:scale-90 transition-all cursor-pointer" title="Azul Académico"></button>
            <button onclick="window.changeTheme('verde')" class="w-6 h-6 rounded-full bg-[#0a3622] border border-white/60 shadow-sm hover:scale-115 active:scale-90 transition-all cursor-pointer" title="Verde Tecnológico"></button>
        </div>
    `;
    
    document.body.appendChild(controlPanel);
});