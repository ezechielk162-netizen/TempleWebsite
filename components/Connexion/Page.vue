<template>
  <div class="login-page">
    <div class="h-100">
      <div class="row h-100 g-0">
        <!-- Left Side - Image -->
        <div class="col-lg-6 d-none d-lg-flex p-0">
          <div class="login-image-section">
            <div class="overlay"></div>
            <div class="content">
              <div class="logo-container">
                <img src="/assets/img/logo.png" alt="Logo" />
              </div>
              <h1>Tabernacle of Hallel</h1>
              <p>Bienvenue dans l'espace d'administration</p>
              <div class="features">
                <div class="feature-item">
                  <i class="fas fa-check-circle"></i>
                  <span>Gestion des événements</span>
                </div>
                <div class="feature-item">
                  <i class="fas fa-check-circle"></i>
                  <span>Suivi des membres</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side - Login Form -->
        <div class="col-lg-6 d-flex align-items-center justify-content-center">
          <div class="login-form-wrapper">
            <div class="login-form-container">
              <!-- Logo for Mobile -->
              <div class="mobile-logo d-lg-none">
                <div class="logo-icon">
                  <img src="/assets/img/logo.png" alt="Logo" width="40" />
                </div>
                <h2>Tabernacle of Hallel</h2>
              </div>

              <div class="login-header">
                <h2>Connexion</h2>
                <p>Accédez à votre espace d'administration</p>
              </div>

              <a-form
                :model="loginForm"
                @finish="handleLogin"
                layout="vertical"
                class="login-form"
              >
                <a-form-item
                  label="Email"
                  name="email"
                  class="pb-2"
                  :rules="[
                    { required: true, message: 'Veuillez entrer votre email' },
                    { type: 'email', message: 'Email invalide' },
                  ]"
                >
                  <a-input
                    v-model:value="loginForm.email"
                    size="large"
                    placeholder="votre@email.com"
                  >
                    <template #prefix>
                      <i class="fas fa-envelope"></i>
                    </template>
                  </a-input>
                </a-form-item>

                <a-form-item
                  label="Mot de passe"
                  name="password"
                  :rules="[
                    { required: true, message: 'Veuillez entrer votre mot de passe' },
                  ]"
                >
                  <a-input-password
                    v-model:value="loginForm.password"
                    size="large"
                    placeholder="••••••••"
                  >
                    <template #prefix>
                      <i class="fas fa-lock"></i>
                    </template>
                  </a-input-password>
                </a-form-item>

                <a-form-item class="submit-form-item">
                  <a-button
                    type="primary"
                    html-type="submit"
                    size="large"
                    block
                    :loading="loading"
                    class="login-button mt-3"
                  >
                    Se connecter
                  </a-button>
                </a-form-item>
              </a-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { message } from "ant-design-vue";

const loginForm = ref({
  email: "",
  password: "",
  remember: false,
});

const loading = ref(false);

const handleLogin = async (values) => {
  loading.value = true;

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    message.success("Connexion réussie !");

    // Redirect to admin dashboard
    setTimeout(() => {
      navigateTo("/admin");
    }, 500);
  } catch (error) {
    message.error("Email ou mot de passe incorrect");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background-color: #f5f7fa;
}

.h-100 {
  min-height: 100vh;
}

.g-0 {
  margin: 0 !important;
  padding: 0 !important;
}

/* Left Side - Image Section */
.login-image-section {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 40px;
}

.login-image-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="%23ffffff" fill-opacity="0.1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>');
  background-size: cover;
  background-position: bottom;
  opacity: 0.5;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.15);
}

.login-image-section .content {
  position: relative;
  z-index: 1;
  color: white;
  text-align: center;
  max-width: 500px;
  width: 100%;
}

.logo-container {
  width: 110px;
  height: 110px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 35px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.logo-container img {
  width: 65px;
  height: auto;
  object-fit: contain;
}

.login-image-section h1 {
  font-family: var(--font-display) !important;
  font-size: 44px;
  font-weight: 700;
  margin-bottom: 18px;
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  line-height: 1.2;
}

.login-image-section .content > p {
  font-size: 19px;
  opacity: 0.95;
  margin-bottom: 55px;
  line-height: 1.5;
}

.features {
  display: flex;
  flex-direction: column;
  gap: 18px;
  max-width: 420px;
  margin: 0 auto;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 17px;
  background: rgba(255, 255, 255, 0.12);
  padding: 16px 22px;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: all 0.3s ease;
}

.feature-item:hover {
  background: rgba(255, 255, 255, 0.18);
  transform: translateX(5px);
}

.feature-item i {
  font-size: 24px;
  color: #ffd700;
  flex-shrink: 0;
}

/* Right Side - Form Section */
.login-form-wrapper {
  width: 100%;
  padding: 40px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-form-container {
  width: 100%;
  max-width: 450px;
  padding: 0 20px;
}

.mobile-logo {
  text-align: center;
  margin-bottom: 45px;
}

.logo-icon {
  width: 75px;
  height: 75px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 18px;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.35);
}

.logo-icon img {
  width: 40px;
  height: auto;
  object-fit: contain;
}

.mobile-logo h2 {
  font-size: 26px;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.login-header {
  margin-bottom: 35px;
  text-align: left;
}

.login-header h2 {
  font-size: 34px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 12px;
  line-height: 1.2;
  font-family: var(--font-display) !important;
}

.login-header p {
  color: #666;
  font-size: 16px;
  margin: 0;
  line-height: 1.5;
  font-family: var(--font-display) !important;
}

.login-form {
  margin-bottom: 0;
}

.login-form :deep(.ant-form-item) {
  margin-bottom: 22px;
}

.login-form :deep(.ant-input-affix-wrapper),
.login-form :deep(.ant-input-password) {
  border-radius: 10px;
  padding: 13px 16px;
  border: 1.5px solid #e0e0e0;
  transition: all 0.3s ease;
}

.login-form :deep(.ant-input-affix-wrapper:hover),
.login-form :deep(.ant-input-password:hover) {
  border-color: #667eea;
}

.login-form :deep(.ant-input-affix-wrapper:focus),
.login-form :deep(.ant-input-affix-wrapper-focused),
.login-form :deep(.ant-input-password:focus),
.login-form :deep(.ant-input-password-focused) {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.12);
}

.login-form :deep(.ant-input) {
  font-size: 15px;
}

.login-form :deep(.ant-input-prefix) {
  color: #999;
  margin-right: 12px;
  font-size: 16px;
}

.login-form :deep(.ant-form-item-label > label) {
  font-weight: 600;
  color: #333;
  font-size: 14px;
  height: auto;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
  margin-top: 8px;
}

.form-options :deep(.ant-checkbox-wrapper) {
  font-size: 14px;
  color: #555;
}

.forgot-password {
  color: #667eea;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.3s;
}

.forgot-password:hover {
  color: #764ba2;
  text-decoration: underline;
}

.submit-form-item {
  margin-bottom: 0 !important;
}

.login-button {
  height: 52px;
  font-size: 16px;
  font-weight: 600;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
  margin-top: 8px;
}

.login-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 22px rgba(102, 126, 234, 0.45);
  background: linear-gradient(135deg, #5568d3 0%, #653a8b 100%);
}

.login-button:active {
  transform: translateY(0);
}

/* Responsive */
@media (max-width: 1199px) {
  .login-image-section h1 {
    font-size: 38px;
  }

  .login-image-section .content > p {
    font-size: 17px;
  }
}

@media (max-width: 991px) {
  .login-form-wrapper {
    padding: 50px 20px;
  }

  .login-form-container {
    max-width: 500px;
  }

  .login-header h2 {
    font-size: 30px;
  }
}

@media (max-width: 575px) {
  .login-form-wrapper {
    padding: 30px 15px;
  }

  .login-form-container {
    padding: 0 10px;
  }

  .login-header {
    margin-bottom: 30px;
  }

  .login-header h2 {
    font-size: 26px;
  }

  .login-header p {
    font-size: 15px;
  }

  .login-button {
    height: 48px;
  }

  .form-options {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>
