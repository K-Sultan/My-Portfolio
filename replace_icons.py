import re

with open('src/app/page.tsx', 'r') as f:
    content = f.read()

# Add Lucide imports at the top
lucide_imports = "import { Loader2, Menu, ArrowRight, ChevronDown, Code, Globe, Server, Database, Palette, Mail, CheckCircle, Send, ArrowUp } from 'lucide-react';\n"
if 'lucide-react' not in content:
    content = content.replace('"use client";\n', '"use client";\n\n' + lucide_imports)

# Mappings for material-symbols-outlined to Lucide components
replacements = [
    (r'<span className="material-symbols-outlined animate-spin">refresh</span>', r'<Loader2 className="animate-spin inline-block w-5 h-5" />'),
    (r'<span className="material-symbols-outlined text-2xl">\s*menu\s*</span>', r'<Menu className="w-6 h-6" />'),
    (r'<span className="material-symbols-outlined text-sm">\s*arrow_forward\s*</span>', r'<ArrowRight className="w-4 h-4" />'),
    (r'<span className="material-symbols-outlined text-sm">\s*</span>', r'<ArrowRight className="w-4 h-4" />'), # The empty one the user broke
    (r'<span className="material-symbols-outlined text-on-surface-variant">\s*keyboard_arrow_down\s*</span>', r'<ChevronDown className="w-6 h-6 text-on-surface-variant" />'),
    (r'<span className="material-symbols-outlined text-3xl">\s*code\s*</span>', r'<Code className="w-8 h-8" />'),
    (r'<span className="material-symbols-outlined text-3xl">\s*design_services\s*</span>', r'<Palette className="w-8 h-8" />'),
    (r'<span className="material-symbols-outlined text-4xl">\s*database\s*</span>', r'<Database className="w-10 h-10" />'),
    (r'<span className="material-symbols-outlined text-primary text-2xl">\s*web\s*</span>', r'<Globe className="text-primary w-6 h-6" />'),
    (r'<span className="material-symbols-outlined text-secondary text-2xl">\s*dns\s*</span>', r'<Server className="text-secondary w-6 h-6" />'),
    (r'<span className="material-symbols-outlined text-tertiary text-2xl">\s*database\s*</span>', r'<Database className="text-tertiary w-6 h-6" />'),
    (r'<span className="material-symbols-outlined text-on-surface text-2xl">\s*design_services\s*</span>', r'<Palette className="text-on-surface w-6 h-6" />'),
    (r'<span className="material-symbols-outlined">\s*mail\s*</span>', r'<Mail className="w-6 h-6" />'),
    (r'<span className="material-symbols-outlined text-6xl text-primary mb-4">\s*check_circle\s*</span>', r'<CheckCircle className="w-16 h-16 text-primary mb-4" />'),
    (r'<span className="material-symbols-outlined text-sm">\s*send\s*</span>', r'<Send className="w-4 h-4" />'),
    (r'<span className="material-symbols-outlined">\s*arrow_upward\s*</span>', r'<ArrowUp className="w-6 h-6" />')
]

for pattern, replacement in replacements:
    content = re.sub(pattern, replacement, content)

with open('src/app/page.tsx', 'w') as f:
    f.write(content)
