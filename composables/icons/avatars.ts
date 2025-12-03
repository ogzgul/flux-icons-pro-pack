export const avatarsIcons = {
    "avatar-online": `<path d="M20 21v-2a4 4 0 0 0-3-3.8"/><path d="M4 21v-2a4 4 0 0 1 4-4h3"/><circle cx="12" cy="7" r="4"/><circle cx="20" cy="21" r="2" fill="#10B981" stroke="none"/>`,
    "avatar-offline": `<path d="M20 21v-2a4 4 0 0 0-3-3.8"/><path d="M4 21v-2a4 4 0 0 1 4-4h3"/><circle cx="12" cy="7" r="4"/><circle cx="20" cy="21" r="2" fill="#9CA3AF" stroke="none"/>`,
    "avatar-busy": `<path d="M20 21v-2a4 4 0 0 0-3-3.8"/><path d="M4 21v-2a4 4 0 0 1 4-4h3"/><circle cx="12" cy="7" r="4"/><circle cx="20" cy="21" r="2" fill="#EF4444" stroke="none"/>`,
    "avatar-blocked": `<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><rect x="18" y="15" width="4" height="5" rx="1"/><path d="M20 15v-1a1 1 0 1 0-2 0v1"/>`,
    "avatar-error-explode": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <radialGradient id="skin-grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stop-color="#FCD34D" />
            <stop offset="100%" stop-color="#F59E0B" />
        </radialGradient>
        <radialGradient id="brain-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#EF4444" />
            <stop offset="100%" stop-color="#B91C1C" />
        </radialGradient>
    </defs>
    <circle cx="12" cy="14" r="7" fill="url(#skin-grad)"/> <path d="M8 13h2M14 13h2" stroke="#78350F" stroke-width="1.5" stroke-linecap="round"/> <path d="M10 17c1 1 3 1 4 0" stroke="#78350F" stroke-width="1.5" stroke-linecap="round"/> <path d="M7 8l-2-3M17 8l2-3M12 7V3" stroke="#B91C1C" stroke-width="2" stroke-linecap="round"/> <path d="M9 8c1-2 3-3 6 0" fill="url(#brain-grad)" stroke="#B91C1C" stroke-width="1"/> </svg>`,
    "avatar-error-sick": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <radialGradient id="skin-sick" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#86EFAC" />
            <stop offset="100%" stop-color="#22C55E" />
        </radialGradient>
    </defs>
    <circle cx="12" cy="12" r="8" fill="url(#skin-sick)"/> <path d="M8 11l2 1M14 12l2-1" stroke="#14532D" stroke-width="1.5" stroke-linecap="round"/> <path d="M11 16c.5-.5 1.5-.5 2 0" stroke="#14532D" stroke-width="1.5" stroke-linecap="round"/> <path d="M16 9l1-2M7 9L6 7" stroke="#14532D" stroke-width="1.5" opacity="0.5"/> <rect x="11" y="17" width="2" height="4" rx="1" fill="#14532D" opacity="0.8"/> </svg>`,
    "avatar-char-coder": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="grad-coder" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#FCD34D"/><stop offset="100%" stop-color="#F59E0B"/></radialGradient></defs>
    <path d="M12 2a8 8 0 0 0-8 8v5c0 4 3 8 8 8s8-4 8-8v-5a8 8 0 0 0-8-8z" fill="#1F2937"/> <circle cx="12" cy="13" r="6" fill="url(#grad-coder)"/> <g fill="#111827"><rect x="8" y="11" width="3" height="2" rx="1"/><rect x="13" y="11" width="3" height="2" rx="1"/><path d="M7 12h10" stroke="#111827" stroke-width="1"/></g> <path d="M10 16h4" stroke="#92400E" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,
    "avatar-char-doctor": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="grad-doc" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#FDE68A"/><stop offset="100%" stop-color="#F59E0B"/></radialGradient></defs>
    <circle cx="12" cy="12" r="8" fill="url(#grad-doc)"/>
    <path d="M6 6h12v4H6z" fill="#EFF6FF" stroke="#DBEAFE" stroke-width="1"/> <path d="M12 7v2M11 8h2" stroke="#3B82F6" stroke-width="1.5"/> <rect x="6" y="13" width="12" height="8" rx="4" fill="#3B82F6" opacity="0.9"/> <path d="M5 14h14" stroke="white" stroke-width="1" opacity="0.5"/>
    <circle cx="9" cy="11" r="1" fill="#78350F"/><circle cx="15" cy="11" r="1" fill="#78350F"/>
    </svg>`,
    "avatar-char-artist": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="grad-art" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#FCD34D"/><stop offset="100%" stop-color="#D97706"/></radialGradient></defs>
    <circle cx="12" cy="13" r="7" fill="url(#grad-art)"/>
    <path d="M16 3c3 0 5 2 5 5s-2 4-5 4h-6c-2 0-4-2-4-4" fill="#DC2626" stroke="#991B1B" stroke-width="1"/> <path d="M16 2v2" stroke="#DC2626" stroke-width="2"/>
    <circle cx="9" cy="12" r="1" fill="#78350F"/><circle cx="15" cy="12" r="1" fill="#78350F"/>
    <path d="M11 16a2 2 0 0 0 2 0" stroke="#92400E" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M7 14l-2 2" stroke="#78350F" stroke-width="1.5"/> </svg>`,
    "avatar-char-ninja": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="grad-ninja" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#4B5563"/><stop offset="100%" stop-color="#1F2937"/></radialGradient></defs>
    <circle cx="12" cy="12" r="9" fill="url(#grad-ninja)"/>
    <rect x="6" y="10" width="12" height="4" rx="2" fill="#FDE68A"/> <circle cx="10" cy="12" r="1" fill="black"/><circle cx="14" cy="12" r="1" fill="black"/>
    <path d="M4 11h2M18 11h2" stroke="#1F2937" stroke-width="2"/> </svg>`,
    "avatar-fantasy-zombie": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="grad-zom" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#86EFAC"/><stop offset="100%" stop-color="#15803D"/></radialGradient></defs>
    <circle cx="12" cy="12" r="8" fill="url(#grad-zom)"/>
    <circle cx="9" cy="11" r="1.5" fill="white"/><circle cx="9" cy="11" r="0.5" fill="black"/>
    <circle cx="15" cy="11" r="2" fill="white"/><circle cx="15" cy="11" r="0.5" fill="black"/> <path d="M10 16h4" stroke="#14532D" stroke-width="1.5"/>
    <path d="M11 15v2M13 15v2" stroke="#14532D" stroke-width="1"/> <path d="M15 5l-2 2" stroke="#14532D" stroke-width="1.5"/> </svg>`,
    "avatar-fantasy-vampire": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="grad-vamp" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#F3F4F6"/><stop offset="100%" stop-color="#D1D5DB"/></radialGradient></defs>
    <path d="M12 2l3 3h-6l3-3z" fill="#111827"/> <circle cx="12" cy="12" r="8" fill="url(#grad-vamp)"/>
    <path d="M8 11h2M14 11h2" stroke="#DC2626" stroke-width="1.5" stroke-linecap="round"/> <path d="M10 16h4" stroke="#374151" stroke-width="1"/>
    <path d="M10 16l1 2M14 16l-1 2" fill="#white" stroke="#374151" stroke-width="0.5"/> </svg>`,
    "avatar-fantasy-clown": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="grad-clown" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#FFFFFF"/><stop offset="100%" stop-color="#E5E7EB"/></radialGradient></defs>
    <circle cx="12" cy="12" r="8" fill="url(#grad-clown)"/>
    <circle cx="12" cy="12" r="2" fill="#EF4444"/> <path d="M8 9l1 1M16 9l-1 1" stroke="#111827" stroke-width="2" stroke-linecap="round"/>
    <path d="M8 16s2 2 4 2 4-2 4-2" stroke="#EF4444" stroke-width="2" fill="none"/>
    <circle cx="5" cy="12" r="1.5" fill="#3B82F6"/><circle cx="19" cy="12" r="1.5" fill="#3B82F6"/> </svg>`,
    "avatar-tech-vr": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="grad-vr" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#FDE68A"/><stop offset="100%" stop-color="#F59E0B"/></radialGradient></defs>
    <circle cx="12" cy="12" r="8" fill="url(#grad-vr)"/>
    <rect x="5" y="9" width="14" height="6" rx="1" fill="#111827"/>
    <circle cx="9" cy="12" r="1" fill="#3B82F6" opacity="0.8"/>
    <circle cx="15" cy="12" r="1" fill="#3B82F6" opacity="0.8"/>
    <path d="M10 17h4" stroke="#92400E" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,
    "avatar-tech-headset": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="grad-head" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#FCD34D"/><stop offset="100%" stop-color="#D97706"/></radialGradient></defs>
    <path d="M4 12v-2a8 8 0 0 1 16 0v2" stroke="#4B5563" stroke-width="3" fill="none"/> <circle cx="12" cy="13" r="7" fill="url(#grad-head)"/>
    <rect x="2" y="10" width="4" height="8" rx="2" fill="#EF4444"/>
    <rect x="18" y="10" width="4" height="8" rx="2" fill="#EF4444"/>
    <circle cx="9" cy="12" r="1" fill="#78350F"/><circle cx="15" cy="12" r="1" fill="#78350F"/>
    <path d="M10 15h4" stroke="#92400E" stroke-width="1.5"/>
    </svg>`,
    "avatar-reaction-rich": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="grad-rich" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#86EFAC"/><stop offset="100%" stop-color="#15803D"/></radialGradient></defs>
    <circle cx="12" cy="12" r="8" fill="url(#grad-rich)"/>
    <text x="7.5" y="13" font-family="sans-serif" font-size="6" font-weight="bold" fill="#064E3B">$</text>
    <text x="13.5" y="13" font-family="sans-serif" font-size="6" font-weight="bold" fill="#064E3B">$</text>
    <path d="M10 16h4" stroke="#064E3B" stroke-width="2" stroke-linecap="round"/>
    <path d="M14 17l2 1" stroke="#064E3B" stroke-width="1.5"/> </svg>`,
    "avatar-reaction-sleep": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="grad-sleep" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#E0F2FE"/><stop offset="100%" stop-color="#93C5FD"/></radialGradient></defs>
    <circle cx="12" cy="13" r="8" fill="url(#grad-sleep)"/>
    <path d="M8 12h3" stroke="#1E3A8A" stroke-width="1.5"/><path d="M14 12h3" stroke="#1E3A8A" stroke-width="1.5"/>
    <circle cx="12" cy="16" r="1" fill="#1E3A8A" opacity="0.5"/> <path d="M18 5l2-2M20 7l2-2" stroke="#60A5FA" stroke-width="2"/> </svg>`,
    "avatar-reaction-angry": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="grad-ang" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#FCA5A5"/><stop offset="100%" stop-color="#DC2626"/></radialGradient></defs>
    <circle cx="12" cy="13" r="8" fill="url(#grad-ang)"/>
    <path d="M7 10l3 2M17 10l-3 2" stroke="#7F1D1D" stroke-width="2"/>
    <circle cx="9" cy="13" r="1" fill="#7F1D1D"/><circle cx="15" cy="13" r="1" fill="#7F1D1D"/>
    <path d="M10 17h4" stroke="#7F1D1D" stroke-width="2"/>
    <path d="M5 8l-2-2M19 8l2-2" stroke="#DC2626" stroke-width="2"/> </svg>`,
    "avatar-fantasy-devil": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="grad-devil" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#F87171"/><stop offset="100%" stop-color="#DC2626"/></radialGradient></defs>
    <path d="M7 5l2 4M17 5l-2 4" stroke="#991B1B" stroke-width="2" stroke-linecap="round"/> <circle cx="12" cy="13" r="8" fill="url(#grad-devil)"/>
    <path d="M8 12l2 1M16 12l-2 1" stroke="#7F1D1D" stroke-width="2" stroke-linecap="round"/> <circle cx="9" cy="14" r="1" fill="#7F1D1D"/><circle cx="15" cy="14" r="1" fill="#7F1D1D"/>
    <path d="M10 17c1-.5 3-.5 4 0" stroke="#7F1D1D" stroke-width="1.5" stroke-linecap="round"/> </svg>`,
    "avatar-fantasy-angel": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="grad-angel" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#FEF3C7"/><stop offset="100%" stop-color="#FCD34D"/></radialGradient></defs>
    <ellipse cx="12" cy="5" rx="6" ry="1.5" stroke="#F59E0B" stroke-width="1.5" fill="none"/> <circle cx="12" cy="13" r="8" fill="url(#grad-angel)"/>
    <circle cx="9" cy="12" r="1" fill="#92400E"/><circle cx="15" cy="12" r="1" fill="#92400E"/>
    <path d="M11 15c.5.5 1.5.5 2 0" stroke="#92400E" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M6 10c-2 2-3 6-1 8M18 10c2 2 3 6 1 8" stroke="white" stroke-width="1.5" opacity="0.6" fill="none"/> </svg>`,
    "avatar-fantasy-alien-green": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="grad-alien" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#86EFAC"/><stop offset="100%" stop-color="#22C55E"/></radialGradient></defs>
    <path d="M12 4c-5 0-9 5-9 11 0 5 3 8 9 8s9-3 9-8c0-6-4-11-9-11z" fill="url(#grad-alien)"/>
    <ellipse cx="8" cy="13" rx="2.5" ry="4" fill="black" transform="rotate(15 8 13)"/>
    <ellipse cx="16" cy="13" rx="2.5" ry="4" fill="black" transform="rotate(-15 16 13)"/>
    <circle cx="8" cy="12" r="0.5" fill="white"/><circle cx="16" cy="12" r="0.5" fill="white"/>
    <path d="M11 19h2" stroke="#064E3B" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,
    "avatar-vibe-party": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="grad-party" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#FDE68A"/><stop offset="100%" stop-color="#F59E0B"/></radialGradient></defs>
    <path d="M12 2L8 9h8z" fill="#EF4444"/> <circle cx="12" cy="13" r="8" fill="url(#grad-party)"/>
    <path d="M9 12c0-1 1-2 2-2M13 12c0-1 1-2 2-2" stroke="#92400E" stroke-width="1.5" stroke-linecap="round"/> <path d="M12 15h3l2 1" stroke="#3B82F6" stroke-width="2" stroke-linecap="round"/> <circle cx="5" cy="8" r="1" fill="#10B981"/><circle cx="19" cy="6" r="1" fill="#8B5CF6"/> </svg>`,
    "avatar-vibe-sick-mask": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="grad-sick-m" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#FEF3C7"/><stop offset="100%" stop-color="#FCD34D"/></radialGradient></defs>
    <circle cx="12" cy="12" r="8" fill="url(#grad-sick-m)"/>
    <path d="M8 10c.5.5 2 0 2.5-.5M13.5 9.5c.5.5 2 0 2.5-.5" stroke="#92400E" stroke-width="1.5" stroke-linecap="round"/> <rect x="6" y="12" width="12" height="8" rx="3" fill="#3B82F6" opacity="0.9"/> <path d="M5 13h14" stroke="white" stroke-width="1" opacity="0.5"/>
    <path d="M16 6l1-2M7 6l-1-2" stroke="#92400E" stroke-width="1.5" opacity="0.4"/> </svg>`,
    "avatar-vibe-rich-cool": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="grad-rich-c" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#86EFAC"/><stop offset="100%" stop-color="#22C55E"/></radialGradient></defs>
    <circle cx="12" cy="12" r="8" fill="url(#grad-rich-c)"/>
    <path d="M4 10h16v5H4z" fill="#111827"/> <text x="7" y="13.5" font-family="sans-serif" font-size="4" font-weight="bold" fill="#10B981">$</text>
    <text x="15" y="13.5" font-family="sans-serif" font-size="4" font-weight="bold" fill="#10B981">$</text>
    <path d="M10 16c1 1 3 1 4 0" stroke="#064E3B" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M14 11h2" stroke="white" stroke-width="1" opacity="0.3"/> </svg>`,
    "avatar-pro-detective": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="grad-det" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#FDE68A"/><stop offset="100%" stop-color="#D97706"/></radialGradient></defs>
    <path d="M4 8h16v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2z" fill="#78350F"/> <rect x="2" y="8" width="20" height="1" fill="#451A03"/> <circle cx="12" cy="13" r="7" fill="url(#grad-det)"/>
    <circle cx="15" cy="12" r="3" stroke="#4B5563" stroke-width="1" fill="none"/> <line x1="17" y1="14" x2="19" y2="16" stroke="#4B5563" stroke-width="2"/> <circle cx="9" cy="12" r="1" fill="#451A03"/> <circle cx="15" cy="12" r="1" fill="#451A03" opacity="0.5"/> <path d="M11 16h2" stroke="#451A03" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,
    "avatar-pro-chef": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="grad-chef" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#FEF3C7"/><stop offset="100%" stop-color="#F59E0B"/></radialGradient></defs>
    <path d="M8 6V4c0-2 2-2 4-2s4 0 4 2v2h-8z" fill="#FFFFFF" stroke="#D1D5DB" stroke-width="1"/> <rect x="6" y="6" width="12" height="3" fill="#FFFFFF" stroke="#D1D5DB" stroke-width="1"/>
    <circle cx="12" cy="14" r="7" fill="url(#grad-chef)"/>
    <circle cx="9" cy="13" r="1" fill="#78350F"/><circle cx="15" cy="13" r="1" fill="#78350F"/>
    <path d="M11 16a2 2 0 0 0 2 0" stroke="#92400E" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M8 16l-2 2M16 16l2 2" stroke="#92400E" stroke-width="1.5" opacity="0.6"/> </svg>`,
    "avatar-3d-worker": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="grad-work" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#FDE68A"/><stop offset="100%" stop-color="#D97706"/></radialGradient></defs>
    <path d="M5 8c0-3 3-5 7-5s7 2 7 5v2H5V8z" fill="#F59E0B" stroke="#B45309" stroke-width="1"/> <rect x="11" y="2" width="2" height="2" fill="#B45309"/>
    <circle cx="12" cy="14" r="7" fill="url(#grad-work)"/>
    <circle cx="9" cy="13" r="1" fill="#78350F"/><circle cx="15" cy="13" r="1" fill="#78350F"/>
    <path d="M10 17h4" stroke="#92400E" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,
    "avatar-3d-astronaut": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="grad-astro" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#F3F4F6"/><stop offset="100%" stop-color="#9CA3AF"/></radialGradient></defs>
    <circle cx="12" cy="12" r="9" fill="url(#grad-astro)" stroke="#4B5563" stroke-width="1"/>
    <circle cx="12" cy="12" r="6" fill="#1F2937"/> <circle cx="10" cy="11" r="1" fill="white"/><circle cx="14" cy="11" r="1" fill="white"/>
    <path d="M12 4c3 0 5 1 6 3" stroke="white" stroke-width="1.5" opacity="0.4" fill="none"/> </svg>`,
    "avatar-3d-scientist": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="grad-sci" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#FFEDD5"/><stop offset="100%" stop-color="#F97316"/></radialGradient></defs>
    <path d="M12 2c-4 0-7 3-7 6v2h14V8c0-3-3-6-7-6z" fill="#E5E7EB"/> <circle cx="12" cy="13" r="7" fill="url(#grad-sci)"/>
    <circle cx="9" cy="12" r="2" stroke="#111827" stroke-width="1" fill="#EFF6FF"/><circle cx="9" cy="12" r="0.5" fill="black"/>
    <circle cx="15" cy="12" r="2" stroke="#111827" stroke-width="1" fill="#EFF6FF"/><circle cx="15" cy="12" r="0.5" fill="black"/>
    <path d="M11 12h2" stroke="#111827" stroke-width="1"/>
    <path d="M12 17c1 0 2-.5 2-1" stroke="#9A3412" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,
    "avatar-3d-skull": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="grad-skull" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#F9FAFB"/><stop offset="100%" stop-color="#D1D5DB"/></radialGradient></defs>
    <path d="M12 3c-4 0-7 3-7 7 0 3 2 6 3 7v2h8v-2c1-1 3-4 3-7s-3-7-7-7z" fill="url(#grad-skull)"/>
    <circle cx="9" cy="11" r="2" fill="#374151"/>
    <circle cx="15" cy="11" r="2" fill="#374151"/>
    <path d="M11 17h2" stroke="#374151" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M12 14l-1 1h2l-1-1z" fill="#374151"/> </svg>`,
    "avatar-3d-cyclops": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="grad-cyc" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#C084FC"/><stop offset="100%" stop-color="#7E22CE"/></radialGradient></defs>
    <circle cx="12" cy="12" r="9" fill="url(#grad-cyc)"/>
    <circle cx="12" cy="10" r="4" fill="white"/>
    <circle cx="12" cy="10" r="1.5" fill="black"/>
    <path d="M10 17h4" stroke="#581C87" stroke-width="2" stroke-linecap="round"/>
    <path d="M8 5l2-2M16 5l-2-2" stroke="#7E22CE" stroke-width="2" stroke-linecap="round"/> </svg>`,
    "avatar-3d-starstruck": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="grad-star" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#FDE68A"/><stop offset="100%" stop-color="#F59E0B"/></radialGradient></defs>
    <circle cx="12" cy="12" r="9" fill="url(#grad-star)"/>
    <path d="M8 10l1-3 1 3h3l-2 2 1 3-3-2-3 2 1-3-2-2h3z" fill="#EF4444"/> <path d="M16 10l1-3 1 3h3l-2 2 1 3-3-2-3 2 1-3-2-2h3z" fill="#EF4444"/> <path d="M10 16a2 2 0 0 0 4 0" stroke="#92400E" stroke-width="1.5" stroke-linecap="round" fill="none"/>
    </svg>`,
    "avatar-3d-wink": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="grad-wink" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#FEF3C7"/><stop offset="100%" stop-color="#F59E0B"/></radialGradient></defs>
    <circle cx="12" cy="12" r="9" fill="url(#grad-wink)"/>
    <circle cx="9" cy="11" r="1.5" fill="#78350F"/>
    <path d="M15 11l2 1" stroke="#78350F" stroke-width="2" stroke-linecap="round"/> <path d="M10 15c1 1 3 1 4 0" stroke="#78350F" stroke-width="1.5" stroke-linecap="round" fill="none"/>
    <circle cx="17" cy="14" r="1.5" fill="#FCA5A5" opacity="0.6"/> </svg>`,
    "avatar-3d-bandit": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="grad-band" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#E5E7EB"/><stop offset="100%" stop-color="#9CA3AF"/></radialGradient></defs>
    <circle cx="12" cy="12" r="9" fill="url(#grad-band)"/>
    <rect x="5" y="9" width="14" height="4" rx="2" fill="#1F2937"/>
    <circle cx="9" cy="11" r="1" fill="white"/>
    <circle cx="15" cy="11" r="1" fill="white"/>
    <path d="M10 16h4" stroke="#374151" stroke-width="1.5"/>
    <path d="M11 2v2M13 2v2" stroke="#374151" stroke-width="1.5"/> </svg>`,
    "avatar-3d-baby": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="grad-baby" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#FECACA"/><stop offset="100%" stop-color="#FCA5A5"/></radialGradient></defs>
    <circle cx="12" cy="13" r="8" fill="url(#grad-baby)"/>
    <path d="M10 2c0 2 1 4 2 4s2-2 2-4" stroke="#78350F" stroke-width="1" fill="none"/> <circle cx="9" cy="12" r="1" fill="#78350F"/><circle cx="15" cy="12" r="1" fill="#78350F"/>
    <circle cx="12" cy="16" r="2" fill="#3B82F6"/> <rect x="10" y="15" width="4" height="1" rx="0.5" fill="white" opacity="0.5"/>
    </svg>`,
    "avatar-3d-grandma": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="grad-granny" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#E5E7EB"/><stop offset="100%" stop-color="#9CA3AF"/></radialGradient></defs>
    <circle cx="12" cy="6" r="3" fill="#D1D5DB"/> <circle cx="12" cy="13" r="7" fill="#FDE68A"/>
    <path d="M6 10c0-3 3-5 6-5s6 2 6 5" fill="#D1D5DB"/> <circle cx="9" cy="13" r="2" stroke="#4B5563" stroke-width="1" fill="none"/><circle cx="15" cy="13" r="2" stroke="#4B5563" stroke-width="1" fill="none"/> <path d="M11 13h2" stroke="#4B5563" stroke-width="1"/>
    <path d="M11 17a2 2 0 0 0 2 0" stroke="#92400E" stroke-width="1" stroke-linecap="round"/>
    </svg>`,
    "avatar-3d-grandpa": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="13" r="7" fill="#FDE68A"/>
    <path d="M5 13c0-4 2-7 7-7s7 3 7 7" stroke="#D1D5DB" stroke-width="2" fill="none"/> <path d="M8 12h2M14 12h2" stroke="#78350F" stroke-width="1.5" stroke-linecap="round"/> <path d="M9 16h6" stroke="#9CA3AF" stroke-width="3" stroke-linecap="round"/> <path d="M12 14v1" stroke="#92400E" stroke-width="1"/>
    </svg>`,
    "avatar-3d-punk": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2v8" stroke="#9333EA" stroke-width="4" stroke-linecap="round"/> <circle cx="12" cy="13" r="7" fill="#FDE68A"/>
    <circle cx="9" cy="12" r="1" fill="#111827"/><circle cx="15" cy="12" r="1" fill="#111827"/>
    <path d="M12 16h.01" stroke="#111827" stroke-width="2" stroke-linecap="round"/> <path d="M10 18c1 .5 3 .5 4 0" stroke="#92400E" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,
    "avatar-3d-afro": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="11" r="9" fill="#451A03"/> <circle cx="12" cy="14" r="6" fill="#854D0E"/> <circle cx="10" cy="13" r="1" fill="black"/><circle cx="14" cy="13" r="1" fill="black"/>
    <path d="M10 17a3 3 0 0 0 4 0" stroke="#451A03" stroke-width="1.5" stroke-linecap="round" fill="none"/>
    </svg>`,
    "avatar-3d-hijab": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="grad-hijab" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#34D399"/><stop offset="100%" stop-color="#059669"/></radialGradient></defs>
    <path d="M12 5c-4 0-7 3-7 8v6h14v-6c0-5-3-8-7-8z" fill="url(#grad-hijab)"/>
    <circle cx="12" cy="13" r="5" fill="#FDE68A"/>
    <circle cx="10" cy="13" r="1" fill="#78350F"/><circle cx="14" cy="13" r="1" fill="#78350F"/>
    <path d="M11 16c.5.5 1.5.5 2 0" stroke="#92400E" stroke-width="1.5"/>
    </svg>`,
    "avatar-3d-hipster": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 6h10v4H7z" fill="#1F2937"/> <circle cx="12" cy="13" r="7" fill="#FDE68A"/>
    <rect x="8" y="11" width="8" height="3" rx="1" stroke="#1F2937" stroke-width="1" fill="none"/> <path d="M8 15a4 4 0 0 0 8 0" fill="#451A03"/> </svg>`,
    "avatar-3d-pilot": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 6h12v4H6z" fill="#1E40AF"/> <rect x="8" y="5" width="8" height="1" fill="#FCD34D"/> <circle cx="12" cy="13" r="7" fill="#FDE68A"/>
    <rect x="7" y="11" width="10" height="4" rx="2" fill="#111827"/> <circle cx="10" cy="13" r="1" fill="#374151"/><circle cx="14" cy="13" r="1" fill="#374151"/>
    <path d="M11 17h2" stroke="#92400E" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,
    "avatar-3d-firefighter": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 9c0-4 3-6 7-6s7 2 7 6v2H5V9z" fill="#DC2626"/> <rect x="11" y="4" width="2" height="3" fill="#FCD34D"/> <circle cx="12" cy="14" r="7" fill="#FDE68A"/>
    <path d="M5 11h14" stroke="#991B1B" stroke-width="2"/>
    <circle cx="9" cy="13" r="1" fill="#78350F"/><circle cx="15" cy="13" r="1" fill="#78350F"/>
    <path d="M10 16a2 2 0 0 0 4 0" stroke="#92400E" stroke-width="1.5"/>
    </svg>`,
    "avatar-3d-farmer": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12" cy="8" rx="10" ry="3" fill="#FCD34D" stroke="#B45309" stroke-width="1"/> <path d="M8 8v-3a3 3 0 0 1 8 0v3" fill="#FCD34D" stroke="#B45309" stroke-width="1"/> <circle cx="12" cy="13" r="7" fill="#FDE68A"/>
    <circle cx="9" cy="12" r="1" fill="#78350F"/><circle cx="15" cy="12" r="1" fill="#78350F"/>
    <path d="M12 11v2" stroke="#B45309" stroke-width="1"/> <path d="M10 16h4" stroke="#92400E" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,
    "avatar-3d-pirate": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6h16v4H4z" fill="#DC2626"/> <circle cx="12" cy="5" r="2" fill="#DC2626"/> <circle cx="12" cy="13" r="7" fill="#FDE68A"/>
    <circle cx="15" cy="12" r="1" fill="#78350F"/>
    <path d="M8 11h4v3H8z" fill="#111827"/> <path d="M6 10l4 2" stroke="#111827" stroke-width="1"/>
    <path d="M10 16h4" stroke="#92400E" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M16 15l-2 2" stroke="#92400E" stroke-width="1"/> </svg>`,
    "avatar-3d-viking": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 7l-2-4M18 7l2-4" stroke="#D1D5DB" stroke-width="3" stroke-linecap="round"/> <path d="M6 7h12v5H6z" fill="#4B5563"/> <path d="M12 7v5" stroke="#9CA3AF" stroke-width="1"/>
    <circle cx="12" cy="14" r="7" fill="#FDE68A"/>
    <path d="M7 14a5 5 0 0 0 10 0" fill="#F59E0B"/> <circle cx="10" cy="12" r="1" fill="#78350F"/><circle cx="14" cy="12" r="1" fill="#78350F"/>
    </svg>`,
    "avatar-3d-cyber-girl": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="grad-cyber" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#EC4899"/><stop offset="1" stop-color="#8B5CF6"/></linearGradient></defs>
    <path d="M6 6c0-4 12-4 12 0v8H6V6z" fill="url(#grad-cyber)"/> <circle cx="12" cy="13" r="7" fill="#FDE68A"/>
    <rect x="7" y="11" width="10" height="3" fill="#111827"/> <rect x="9" y="12" width="2" height="1" fill="#22D3EE"/>
    <rect x="13" y="12" width="2" height="1" fill="#22D3EE"/>
    <path d="M11 17h2" stroke="#DB2777" stroke-width="1.5"/>
    </svg>`,
    "avatar-3d-blonde": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="grad-blonde" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#FFE4E6"/><stop offset="100%" stop-color="#FDA4AF"/></radialGradient></defs>
    <path d="M12 2c-4 0-8 3-8 8v4h16v-4c0-5-4-8-8-8z" fill="#FCD34D"/> <circle cx="12" cy="14" r="7" fill="url(#grad-blonde)"/>
    <circle cx="9" cy="13" r="1" fill="#881337"/><circle cx="15" cy="13" r="1" fill="#881337"/>
    <path d="M4 10c0 3 1 6 1 6" stroke="#FCD34D" stroke-width="2" stroke-linecap="round"/>
    <path d="M20 10c0 3-1 6-1 6" stroke="#FCD34D" stroke-width="2" stroke-linecap="round"/>
    <path d="M11 17c.5.5 1.5.5 2 0" stroke="#BE123C" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,
    "avatar-3d-ginger": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="grad-ginger" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#FFEDD5"/><stop offset="100%" stop-color="#FB923C"/></radialGradient></defs>
    <circle cx="12" cy="11" r="9" fill="#C2410C"/> <circle cx="12" cy="14" r="6" fill="url(#grad-ginger)"/>
    <circle cx="10" cy="13" r="1" fill="#431407"/><circle cx="14" cy="13" r="1" fill="#431407"/>
    <circle cx="8" cy="15" r="0.5" fill="#9A3412" opacity="0.6"/> <circle cx="16" cy="15" r="0.5" fill="#9A3412" opacity="0.6"/> <path d="M12 2c2 0 4 1 5 3" stroke="#C2410C" stroke-width="1" fill="none"/>
    </svg>`,
    "avatar-3d-afro-cool": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="grad-afro" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#A16207"/><stop offset="100%" stop-color="#713F12"/></radialGradient></defs>
    <circle cx="12" cy="10" r="10" fill="#292524"/> <circle cx="12" cy="14" r="6" fill="url(#grad-afro)"/>
    <path d="M6 13h12v4H6z" fill="#111827"/> <rect x="11" y="13" width="2" height="1" fill="#4B5563"/>
    <path d="M10 18h4" stroke="#451A03" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,
    "avatar-3d-cowboy": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="grad-cow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#FDE68A"/><stop offset="100%" stop-color="#D97706"/></radialGradient></defs>
    <path d="M2 10c0-2 2-3 5-3h10c3 0 5 1 5 3" fill="#78350F"/> <path d="M6 7h12v-3c0-2-2-2-6-2s-6 0-6 2z" fill="#92400E"/> <circle cx="12" cy="14" r="7" fill="url(#grad-cow)"/>
    <circle cx="9" cy="13" r="1" fill="#451A03"/><circle cx="15" cy="13" r="1" fill="#451A03"/>
    <path d="M7 11l1 1M17 11l-1 1" stroke="#451A03" stroke-width="1"/> <rect x="6" y="7" width="12" height="1" fill="#FCD34D"/> </svg>`,
    "avatar-3d-orc": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="grad-orc" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#86EFAC"/><stop offset="100%" stop-color="#166534"/></radialGradient></defs>
    <path d="M4 10l2-4M20 10l-2-4" stroke="#166534" stroke-width="2"/> <circle cx="12" cy="13" r="8" fill="url(#grad-orc)"/>
    <path d="M8 12l2 1M16 12l-2 1" stroke="#064E3B" stroke-width="2"/> <circle cx="9" cy="14" r="1" fill="black"/><circle cx="15" cy="14" r="1" fill="black"/>
    <path d="M10 18l1-2 2 2 1-2 1 2" fill="white" stroke="#064E3B" stroke-width="0.5"/> </svg>`,
    "avatar-3d-elf": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="grad-elf" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#FEF3C7"/><stop offset="100%" stop-color="#FCD34D"/></radialGradient></defs>
    <path d="M2 10l4 4M22 10l-4 4" fill="#FCD34D" stroke="#FBBF24" stroke-width="4"/> <circle cx="12" cy="13" r="7" fill="url(#grad-elf)"/>
    <path d="M12 2l-4 6h8z" fill="#10B981"/> <path d="M12 2v6" stroke="#047857" stroke-width="1"/>
    <circle cx="9" cy="13" r="1" fill="#064E3B"/><circle cx="15" cy="13" r="1" fill="#064E3B"/>
    <path d="M11 16h2" stroke="#064E3B" stroke-width="1"/>
    </svg>`,
    "avatar-3d-cyborg": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <radialGradient id="grad-cyb-skin" cx="0%" cy="50%" r="60%"><stop offset="0%" stop-color="#FDE68A"/><stop offset="100%" stop-color="#D97706"/></radialGradient>
        <linearGradient id="grad-cyb-metal" x1="12" y1="0" x2="24" y2="0"><stop offset="0%" stop-color="#9CA3AF"/><stop offset="100%" stop-color="#374151"/></linearGradient>
    </defs>
    <mask id="half-face"><rect x="0" y="0" width="12" height="24" fill="white"/></mask>
    <circle cx="12" cy="13" r="8" fill="url(#grad-cyb-metal)"/> <circle cx="12" cy="13" r="8" fill="url(#grad-cyb-skin)" mask="url(#half-face)"/> <circle cx="8" cy="13" r="1" fill="#451A03"/> <circle cx="16" cy="13" r="1.5" fill="#EF4444" stroke="#7F1D1D" stroke-width="1"/> <path d="M12 5v16" stroke="#1F2937" stroke-width="0.5"/> </svg>`,
    "avatar-3d-money": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="grad-money" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#86EFAC"/><stop offset="100%" stop-color="#166534"/></radialGradient></defs>
    <circle cx="12" cy="13" r="8" fill="url(#grad-money)"/>
    <text x="7.5" y="14" font-family="sans-serif" font-size="5" font-weight="bold" fill="#064E3B">$</text>
    <text x="14.5" y="14" font-family="sans-serif" font-size="5" font-weight="bold" fill="#064E3B">$</text>
    <path d="M10 17c1 1 3 1 4 0" stroke="#064E3B" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M2 13h4M18 13h4" stroke="#22C55E" stroke-width="2" stroke-dasharray="2 2"/> </svg>`,
    "avatar-3d-love": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="grad-love2" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#FBCFE8"/><stop offset="100%" stop-color="#BE123C"/></radialGradient></defs>
    <circle cx="12" cy="13" r="8" fill="url(#grad-love2)"/>
    <path d="M7 12l1-1 2 1 1-2-2-2zm10 0l-1-1-2 1 1-2 2-2z" fill="#BE123C"/> <path d="M11 17a2 2 0 0 0 2 0" stroke="#881337" stroke-width="1.5" stroke-linecap="round"/>
    <circle cx="6" cy="14" r="1" fill="#F472B6" opacity="0.6"/>
    <circle cx="18" cy="14" r="1" fill="#F472B6" opacity="0.6"/>
    </svg>`,
    "avatar-3d-hypno": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="grad-hypno" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#E9D5FF"/><stop offset="100%" stop-color="#7C3AED"/></radialGradient></defs>
    <circle cx="12" cy="13" r="8" fill="url(#grad-hypno)"/>
    <path d="M7 13c.5-1 1.5-1 2 0s-.5 1-1.5 1m7 0c.5-1 1.5-1 2 0s-.5 1-1.5 1" stroke="#4C1D95" stroke-width="1.5"/>
    <path d="M10 17h4" stroke="#4C1D95" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M12 2v4M12 20v2" stroke="#7C3AED" stroke-width="2" opacity="0.5"/>
    </svg>`,
    "avatar-3d-spec-ops": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="grad-ops" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#4B5563"/><stop offset="100%" stop-color="#111827"/></radialGradient></defs>
    <circle cx="12" cy="13" r="8" fill="url(#grad-ops)"/>
    <rect x="6" y="11" width="12" height="4" rx="1" fill="#1F2937"/>
    <circle cx="8" cy="13" r="1.5" fill="#22C55E" stroke="#14532D" stroke-width="1"/>
    <circle cx="12" cy="13" r="1.5" fill="#22C55E" stroke="#14532D" stroke-width="1"/>
    <circle cx="16" cy="13" r="1.5" fill="#22C55E" stroke="#14532D" stroke-width="1"/>
    <path d="M12 9V7" stroke="#374151" stroke-width="2"/>
    </svg>`,
    "avatar-3d-king": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="grad-k" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#FDE68A"/><stop offset="100%" stop-color="#D97706"/></radialGradient></defs>
    <circle cx="12" cy="14" r="7" fill="url(#grad-k)"/>
    <path d="M8 7l2 3 2-3 2 3 2-3v4H8z" fill="#FACC15" stroke="#B45309" stroke-width="1"/> <circle cx="10" cy="14" r="1" fill="#451A03"/><circle cx="14" cy="14" r="1" fill="#451A03"/>
    <path d="M10 17h4" stroke="#451A03" stroke-width="1" stroke-linecap="round"/>
    <path d="M9 17v1a1 1 0 0 0 2 0h2a1 1 0 0 0 2 0v-1" fill="#451A03" opacity="0.2"/> </svg>`,
};
