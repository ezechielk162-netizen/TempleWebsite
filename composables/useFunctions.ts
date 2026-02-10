import FormService from "~/services/forms.service";


const isOpen = ref(false)
export const useFunctions = () => {
    const form = FormService.activeForm;
    const resetForm = FormService.clearForm;

    const languageStore = useLanguageStore();
    const choiceLanguage = computed(() => languageStore.language);


    function changeLanguage(lang: any) {
        languageStore.setLanguage(lang);
    }

    function toggleMenu() {
        isOpen.value = !isOpen.value
    }

    function closeMenu() {
        setTimeout(() =>{
            isOpen.value = false
        }, 500)
    }

    function handleResize() {
        if (window.innerWidth >= 992) {
            closeMenu()
        }
    }


    return {
        isOpen,
        toggleMenu,
        closeMenu,
        handleResize,
    }
}
