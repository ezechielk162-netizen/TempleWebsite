import type { rdvForm } from "~/interfaces/RdvInterface";
import FormService from "~/services/forms.service";
import { encryptData } from "~/utils/crypto.client";


const isOpen = ref(false)
const launchRequest = ref(false);

export const useFunctions = () => {
    const form = FormService.form;
    const resetForm = FormService.clearForm;

    const languageStore = useLanguageStore();
    const choiceLanguage = computed(() => languageStore.language);

    const config = useRuntimeConfig();

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
        sendEmail(finalForm);
        console.log("Form envoyé:", form.date, finalForm);
    };

    function disableButton(form: rdvForm, requiredFields: string[]): boolean {
        // Vérifie si tous les champs requis sont remplis
        const requiredNotFilled = requiredFields.some((field) => {
            const value = form[field];
            return value === null || value === undefined || value === "";
        });

        const isValidNumber = form.phone ? !isValidCanadianPhone(form.phone) : false;
        const isValidAdresse = form.email ? !isValidEmail(form.email) : false;


        return requiredNotFilled || isValidNumber || isValidAdresse;
    }

    async function sendEmail(form: Object) {
        const secret = config.public.cryptoSecrect;
        launchRequest.value = true;

        try {
            const encryptedPayload = encryptData(form, secret);

            const { data, error } = await useFetch("/api/rdv-request", {
                method: "POST",
                body: {
                    payload: encryptedPayload,
                },
            });

            if (error.value) {
                alert("Erreur lors de l'envoi");
                return;
            }

            if (data.value?.success) {
                message.success("Succès ! Votre opération a été traitée !");
            } else {
                alert("Erreur lors de l'envoi");
            }

        } catch (err) {
            console.error(err);
            alert("Erreur serveur");
        } finally {
            launchRequest.value = false;
        }
    }



    return {
        form,
        isOpen,
        launchRequest,
        onSubmit,
        toggleMenu,
        closeMenu,
        handleResize,
        disableButton,
        sendEmail
    }
}
