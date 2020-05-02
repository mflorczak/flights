import { required, confirmed, email } from "vee-validate/dist/rules"
import { extend } from "vee-validate"

extend("required", {
  ...required,
  message: "To pole nie może być puste"
})

extend("email", {
  ...email,
  message: "To pole musi zawierać email"
})

extend("confirmed", {
  ...confirmed,
  message: "Hasła muszą być identyczne"
})

