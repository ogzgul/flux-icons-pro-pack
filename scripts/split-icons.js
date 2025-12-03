import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// AYARLAR
const INPUT_FILE = path.resolve(__dirname, '../lib/icons.js'); // Kaynak dosyan
const OUTPUT_DIR = path.resolve(__dirname, '../lib/sets'); // Çıktı klasörü

// KATEGORİ KURALLARI (Öncelik sırasına göre)
const CATEGORIES = [
    { name: 'aero', check: (key) => key.startsWith('aero-') },
    { name: 'liquid', check: (key) => key.startsWith('liquid-') },
    { name: 'brands', check: (key) => key.startsWith('brand-') || key.startsWith('flag-') },
    { name: 'solid', check: (key) => key.endsWith('-solid') || key.endsWith('-fill') },
    { name: 'outline', check: (key) => key.endsWith('-outline') || key.endsWith('-line') },
    { name: 'duotone', check: (key) => key.includes('duotone') },
    { name: 'vivid', check: (key) => key.startsWith('vivid-') },
    { name: 'avatars', check: (key) => key.startsWith('avatar-') || key.startsWith('memoji-') },
    { name: 'general', check: () => true } // Geriye kalan her şey buraya
];

async function splitIcons() {
    console.log('🦁 Flux Icon Splitter Başlatılıyor...');

    // 1. Kaynak Dosyayı Oku
    if (!fs.existsSync(INPUT_FILE)) {
        console.error('❌ Hata: Kaynak dosya bulunamadı!');
        return;
    }
    const fileContent = fs.readFileSync(INPUT_FILE, 'utf8');

    // 2. İkonları Regex ile Ayıkla
    // "key": `svg...` yapısını yakalar
    const regex = /["']?([\w-]+)["']?:\s*`([\s\S]*?)`,/g;
    const icons = {};
    let match;
    let totalCount = 0;

    while ((match = regex.exec(fileContent)) !== null) {
        icons[match[1]] = match[2];
        totalCount++;
    }

    console.log(`📦 Toplam ${totalCount} ikon bulundu. Ayrıştırılıyor...`);

    // 3. Kategorilere Dağıt
    const buckets = {};
    CATEGORIES.forEach(c => buckets[c.name] = {});

    Object.keys(icons).forEach(key => {
        for (const cat of CATEGORIES) {
            if (cat.check(key)) {
                buckets[cat.name][key] = icons[key];
                break; // İlk eşleşen kategoriye at ve döngüden çık
            }
        }
    });

    // 4. Dosyaları Yaz
    if (fs.existsSync(OUTPUT_DIR)) fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    let indexFileContent = '';

    for (const [catName, catIcons] of Object.entries(buckets)) {
        const iconCount = Object.keys(catIcons).length;
        if (iconCount === 0) continue;

        console.log(`   👉 ${catName}.js oluşturuluyor... (${iconCount} ikon)`);

        // Dosya İçeriği
        let content = `export const ${catName}Icons = {\n`;
        for (const [key, svg] of Object.entries(catIcons)) {
            content += `    "${key}": \`${svg}\`,\n`;
        }
        content += `};\n`;

        fs.writeFileSync(path.join(OUTPUT_DIR, `${catName}.js`), content);
        
        // Index'e import ekle
        indexFileContent += `import { ${catName}Icons } from './${catName}';\n`;
    }

    // 5. Index Dosyasını Oluştur (Hepsini Birleştiren)
    indexFileContent += `\nexport const allIcons = {\n`;
    for (const catName of Object.keys(buckets)) {
        if (Object.keys(buckets[catName]).length > 0) {
            indexFileContent += `    ...${catName}Icons,\n`;
        }
    }
    indexFileContent += `};\n`;

    fs.writeFileSync(path.join(OUTPUT_DIR, 'index.js'), indexFileContent);

    console.log('✅ İŞLEM TAMAM! Tüm ikonlar parçalandı ve indexlendi.');
    console.log('⚠️  ŞİMDİ YAPMAN GEREKEN: useFluxIcons.ts dosyasını güncellemek.');
}

splitIcons();




//node ./scripts/split-icons.js
//// lib/index.js

// import FluxIcon from './FluxIcon.vue';

// // 1. Alt setleri içeri al (sets klasörünü oluşturmuştuk)
// import { aeroIcons } from './sets/aero';
// import { solidIcons } from './sets/solid';
// import { outlineIcons } from './sets/outline';
// import { liveIcons } from './sets/live';
// import { brandIcons } from './sets/brands';
// import { avatarIcons } from './sets/avatars';
// // ... diğer setlerin varsa ekle

// // 2. Hepsini tek bir 'icons' objesinde birleştir (Geriye dönük uyumluluk için)
// const icons = {
//   ...aeroIcons,
//   ...solidIcons,
//   ...outlineIcons,
//   ...liveIcons,
//   ...brandIcons,
//   ...avatarIcons
// };

// 3. Named Exports (Yeni Nesil Kullanım İçin - Tree Shaking Dostu)
// Kullanıcı isterse sadece `import { AeroHome } from 'flux-icons'` yapabilsin.
// Bunun için SVG stringlerini component veya string olarak dışarı açabiliriz.
// Şimdilik ham SVG stringlerini dışarı açıyoruz.
// export * from './sets/aero';
// export * from './sets/solid';
// export * from './sets/outline';
// export * from './sets/live';
// export * from './sets/brands';
// export * from './sets/avatars';

// // 4. Ana Bileşeni ve Toplu Listeyi Dışarı Aktar
// export { FluxIcon, icons };

// // 5. Vue Plugin (app.use)
// export default {
//   install: (app) => {
//     app.component('FluxIcon', FluxIcon);
//   }
// };