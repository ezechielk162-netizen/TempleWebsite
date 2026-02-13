<template>
  <div class="container py-5">
    <a-form
      layout="vertical"
      @finish="onSubmit"
      class="bg-white p-4 rounded shadow-sm"
      :model="props.forms"
    >
      <div class="row">
        <!-- Nom -->
        <div class="col-12 mb-3" v-if="props.addOneInput">
          <a-form-item
            label="Nom complet"
            name="name"
            :rules="[{ required: true, message: 'Nom requis' }]"
          >
            <a-input size="large" v-model:value="props.firstLabel" />
          </a-form-item>
        </div>

        <!-- Email -->
        <div class="col-md-6 mb-3">
          <a-form-item
            label="Courriel"
            name="email"
            :rules="[
              { required: true, message: 'Email requis' },
              { type: 'email', message: 'Email invalide' },
            ]"
          >
            <a-input size="large" v-model:value="props.forms.email" />
          </a-form-item>
        </div>

        <!-- Téléphone -->
        <div class="col-md-6 mb-3">
          <a-form-item
            label="Numéro de téléphone"
            name="phone"
            :rules="[{ required: true, message: 'Téléphone requis' }]"
          >
            <a-input size="large" v-model:value="props.forms.phone" />
          </a-form-item>
        </div>

        <!-- Sujet -->
        <div class="col-12 mb-3">
          <a-form-item label="Sujet" name="subject">
            <a-input size="large" v-model:value="props.forms.subject" />
          </a-form-item>
        </div>

        <!-- Message -->
        <div class="col-12 mb-3">
          <a-form-item
            label="Message ou détails"
            name="message"
            :rules="[{ required: true, message: 'Message requis' }]"
          >
            <a-textarea
              v-model:value="props.forms.message"
              :maxlength="180"
              show-count
              :rows="4"
              size="large"
            />
            {{ props.forms.message }}
          </a-form-item>
        </div>

        <!-- Date -->
        <div class="col-md-6 mb-3">
          <a-form-item label="Date préférée" name="date">
            <a-date-picker
              size="large"
              v-model:value="props.forms.date"
              style="width: 100%"
            />
          </a-form-item>
        </div>

        <!-- Heure -->
        <div class="col-md-6">
          <a-form-item label="Heure préférée" name="date">
            <div class="d-flex gap-2">
              <a-input
                size="large"
                v-model:value="props.forms.hour"
                placeholder="Hours"
              />
              <a-input
                size="large"
                v-model:value="props.forms.minute"
                placeholder="Minutes"
              />
              <a-select
                size="large"
                v-model:value="props.forms.ampm"
                style="width: 100px"
              >
                <a-select-option value="AM">AM</a-select-option>
                <a-select-option value="PM">PM</a-select-option>
              </a-select>
            </div>
          </a-form-item>
        </div>

        <!-- CAPTCHA -->
        <div class="col-12">
          <ClientOnly>
            <vue-recaptcha :sitekey="siteKey" @verify="onCaptchaVerified" />
          </ClientOnly>
        </div>

        <!-- Bouton -->
        <div class="col-12">
          <a-button type="primary" html-type="submit" size="large" class="w-25 mobile">
            Envoyer la demande
          </a-button>
        </div>
      </div>
    </a-form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const siteKey = "TA_SITE_KEY_ICI";

const props = defineProps({
  forms: {
    type: Object,
    required: true,
  },
  firstLabel:{
    type: String,
    required: true,
  },
  addOneInput:{
    type: Boolean,
    default: false,
    required: false
  }
});

const captchaVerified = ref(false);

const onCaptchaVerified = (token) => {
  captchaVerified.value = true;
  console.log("Captcha OK:", token);
};

const onSubmit = () => {
  console.log("Form envoyé:", form.value);
};
</script>

<style scoped>
@media (max-width: 768px) {
  .mobile {
    width: 100% !important;
  }
  
}

</style>
