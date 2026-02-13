import type { rdvForm } from "~/interfaces/RdvInterface";
import FormService from "~/services/forms.service";


const isOpen = ref(false)
export const useFunctions = () => {
    const form = FormService.form;
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
        setTimeout(() => {
            isOpen.value = false
        }, 500)
    }

    function handleResize() {
        if (window.innerWidth >= 992) {
            closeMenu()
        }
    }
    const onSubmit = (form: rdvForm) => {
        const finalForm = {
            name: form.name,
            email: form.email,
            phone: form.phone,
            subject: form.subject,
            message: form.message,
            date: formatDate(form.date) || null,
            hour: form.hour,
            minute: form.minute,
            ampm: form.ampm,
        }
        console.log("Form envoyé:", form.date, finalForm);
    };

    function disableButton(form: rdvForm, requiredFields: string[]): boolean {
        // Vérifie si tous les champs requis sont remplis
        const requiredNotFilled = requiredFields.some((field) => !form[field] || form[field] === "");

        const isValidNumber = form.phone ? !isValidCanadianPhone(form.phone) : false;
        const isValidAdresse = form.email ? !isValidEmail(form.email) : false;


        return requiredNotFilled || isValidNumber || isValidAdresse;
    }


    return {
        form,
        isOpen,
        onSubmit,
        toggleMenu,
        closeMenu,
        handleResize,
        disableButton
    }
}
