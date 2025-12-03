// composables/useFluxIcons.ts
import { allIcons } from './icons/index'; // Otomatik oluşturduğumuz index'ten çekiyoruz

export const useFluxIcons = () => {
    return {
        icons: allIcons
    };
};