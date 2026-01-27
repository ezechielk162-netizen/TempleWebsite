
export default class FormService {

    static activeForm = reactive({
        pseudo: "",
        email: "",
    })

    static clearForm(form: any) {
        Object.keys(form).forEach((key) => {
            if (
                key === "locatePlace" ||
                key === "options" ||
                key === "dateRdv"
            ) {
                form[key] = [];
            }else if(key === "createdAt"){
                form[key] = {
                    startDate: "",
                    endDate: ""
                };
            } else {
                form[key] = "";
            }
        });
    }
}