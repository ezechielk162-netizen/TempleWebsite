<template>
  <div class="container py-5">       
    <a-form
      layout="vertical"
      @finish="onSubmit(props.forms as rdvForm)"
      class="bg-white p-4 rounded shadow-sm"
      :model="props.forms"
    >
      <div class="row">
        <!-- Nom -->
        <div class="col-12 mb-3" v-if="props.addOneInput">
          <FormInput
            label="Nom complet"
            name="name"
            v-model="props.forms.name"
            :rules="[{ required: true, message: 'Nom requis' }]"
          />
        </div>

        <!-- Email -->
        <div class="col-md-6 mb-3">
          <FormInput
            label="Email"
            name="email"
            v-model="props.forms.email"
            :rules="[
              { required: true, message: 'Email requis' },
              { type: 'email', message: 'Email invalide' },
            ]"
          />
        </div>

        <!-- Téléphone -->
        <div class="col-md-6 mb-3">
          <FormInput
            :isNormalText="false"
            :isNumberInput="true"
            label="Numéro de téléphone"
            name="phone"
            v-model="props.forms.phone"
            :rules="[{ required: true, message: 'Numéro de téléphone requis' }]"
          />
        </div>

        <!-- Sujet -->
        <div class="col-12 mb-3">
          <FormInput
            label="Sujet"
            name="subject"
            v-model="props.forms.subject"
            placeholder="(Ex: Question, Demande de prière, Rendez-vous, Autre)"
            :rules="[{ required: true, message: 'Sujet requis' }]"
          />
        </div>

        <!-- Message -->
        <div class="col-12 mb-3">
          <FormTextArea
            label="Message ou détails"
            name="message"
            v-model="props.forms.message"
            :rules="[{ required: true, message: 'Message requis' }]"
          />
        </div>

        <!-- Date -->
        <div class="col-md-3 mb-3">
          <FormDatePicker
            :rules="[{ required: true, message: 'Date requise' }]"
            label="Date préférée"
            name="date"
            v-model="props.forms.date"
          />
        </div>

        <div class="col-md-3 mb-3">
          <a-form-item
            :label="'Heure préférée'"
            name="hour"
            :rules="[{ required: true, message: 'Heure requise' }]"
          >
          <ClientOnly>
            <a-input-number
              class="w-100 text-center"
              :min="0"
              :max="12"
              size="large"
              placeholder="Heure"
              @keypress="allowOnlyNumbers"
              v-model:value="form.hour"
            >
              <template #upIcon>
                <ArrowUpOutlined />
              </template>
              <template #downIcon>
                <ArrowDownOutlined />
              </template>
            </a-input-number>
          </ClientOnly>
          </a-form-item>
        </div>

        <div class="col-md-3 mb-3">
          <a-form-item
            :label="'Minutes'"
            name="minute"
            :rules="[{ required: true, message: 'Minute requise' }]"
          >
        <ClientOnly>
            <a-input-number
              class="w-100"
              :min="0"
              :max="59"
              size="large"
              placeholder="Minutes"
              @keypress="allowOnlyNumbers"
              v-model:value="form.minute"
            >
              <template #upIcon>
                <ArrowUpOutlined />
              </template>
              <template #downIcon>
                <ArrowDownOutlined />
              </template>
            </a-input-number>
          </ClientOnly>
          </a-form-item>
        </div>

        <div class="col-md-3 mb-2">
          <a-form-item
            :label="'AM/PM'"
            name="ampm"
            :rules="[{ required: true, message: 'Champ requis' }]"
          >
            <a-select size="large" v-model:value="form.ampm">
              <a-select-option value="AM">AM</a-select-option>
              <a-select-option value="PM">PM</a-select-option>
            </a-select>
          </a-form-item>
        </div>

        <!-- Heure -->

        <!-- CAPTCHA -->
        <!--    <div class="col-12">
          <ClientOnly>
            <vue-recaptcha :sitekey="siteKey" @verify="onCaptchaVerified" />
          </ClientOnly>
        </div> -->

        <!-- Bouton -->
        <div class="col-12">
          <a-button
            type="primary"
            :disabled="disableButton(props.forms as rdvForm, requiredFields)"
            html-type="submit"
            size="large"
            class="w-25 mobile"
            :loading="launchRequest"
          >
            Envoyer la demande
          </a-button>
        </div>
      </div>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { rdvForm } from "~/interfaces/RdvInterface";

const siteKey = "TA_SITE_KEY_ICI";

const requiredFields = [
  "name",
  "email",
  "phone",
  "subject",
  "message",
  "date",
  "hour",
  "minute",
  "ampm",
];

const { onSubmit, disableButton, form, launchRequest } = useFunctions();

const props = defineProps({
  forms: {
    type: Object,
    required: true,
  },
  firstLabel: {
    type: String,
    required: true,
  },
  addOneInput: {
    type: Boolean,
    default: false,
    required: false,
  },
});

const captchaVerified = ref(false);

const onCaptchaVerified = (token: string) => {
  captchaVerified.value = true;
  console.log("Captcha OK:", token);
};
</script>

<style scoped>
@media (max-width: 768px) {
  .mobile {
    width: 100% !important;
  }
}
</style>
