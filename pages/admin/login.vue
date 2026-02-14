<template>
  <div class="admin-layout">
    <!-- Sidebar -->
    <div class="admin-sidebar" :class="{ collapsed: sidebarCollapsed }">
      <div class="sidebar-header">
        <img
          src="/assets/img/logo.png"
          alt="Logo"
          class="sidebar-logo"
          v-if="!sidebarCollapsed"
        />
        <h3 v-if="!sidebarCollapsed">Admin Panel</h3>
      </div>

      <a-menu
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        :inline-collapsed="sidebarCollapsed"
        theme="dark"
        class="sidebar-menu"
      >
        <a-menu-item key="dashboard" @click="currentView = 'dashboard'">
          <DashboardOutlined />
          <span>Tableau de bord</span>
        </a-menu-item>

        <a-menu-item key="events" @click="currentView = 'events'">
          <CalendarOutlined />
          <span>Événements</span>
        </a-menu-item>

        <a-menu-item key="users" @click="currentView = 'users'">
          <UserOutlined />
          <span>Utilisateurs</span>
        </a-menu-item>

        <a-menu-item key="messages" @click="currentView = 'messages'">
          <MailOutlined />
          <span>Messages</span>
        </a-menu-item>

        <a-menu-item key="prayers" @click="currentView = 'prayers'">
          <HeartOutlined />
          <span>Demandes de prière</span>
        </a-menu-item>
      </a-menu>

      <div class="sidebar-footer">
        <a-button type="text" @click="toggleSidebar" class="collapse-btn">
          <MenuFoldOutlined v-if="!sidebarCollapsed" />
          <MenuUnfoldOutlined v-else />
        </a-button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="admin-content">
      <!-- Header -->
      <div class="admin-header">
        <div class="header-left">
          <h2>{{ getPageTitle() }}</h2>
        </div>
        <div class="header-right">
          <a-badge :count="5" class="notification-badge">
            <BellOutlined style="font-size: 20px; cursor: pointer" />
          </a-badge>
          <a-dropdown>
            <div class="user-profile">
              <a-avatar size="large" style="background-color: #667eea">
                <UserOutlined />
              </a-avatar>
              <span class="username">Admin</span>
            </div>
            <template #overlay>
              <a-menu>
                <a-menu-item key="profile"> <UserOutlined /> Mon profil </a-menu-item>
                <a-menu-item key="settings"> <SettingOutlined /> Paramètres </a-menu-item>
                <a-menu-divider />
                <a-menu-item key="logout" @click="logout">
                  <LogoutOutlined /> Déconnexion
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </div>

      <!-- Page Content -->
      <div class="page-content">
        <!-- Dashboard -->
        <div v-if="currentView === 'dashboard'" class="dashboard">
          <div class="row g-4">
            <div class="col-md-3">
              <div class="stat-card purple">
                <div class="stat-icon">
                  <CalendarOutlined />
                </div>
                <div class="stat-details">
                  <h3>{{ stats.events }}</h3>
                  <p>Événements</p>
                </div>
              </div>
            </div>

            <div class="col-md-3">
              <div class="stat-card blue">
                <div class="stat-icon">
                  <UserOutlined />
                </div>
                <div class="stat-details">
                  <h3>{{ stats.users }}</h3>
                  <p>Utilisateurs</p>
                </div>
              </div>
            </div>

            <div class="col-md-3">
              <div class="stat-card green">
                <div class="stat-icon">
                  <MailOutlined />
                </div>
                <div class="stat-details">
                  <h3>{{ stats.messages }}</h3>
                  <p>Messages</p>
                </div>
              </div>
            </div>

            <div class="col-md-3">
              <div class="stat-card pink">
                <div class="stat-icon">
                  <HeartOutlined />
                </div>
                <div class="stat-details">
                  <h3>{{ stats.prayers }}</h3>
                  <p>Demandes de prière</p>
                </div>
              </div>
            </div>
          </div>

          <div class="row g-4 mt-4">
            <div class="col-md-8">
              <div class="card">
                <div class="card-header">
                  <h4>Événements à venir</h4>
                </div>
                <div class="card-body">
                  <a-table
                    :columns="upcomingEventsColumns"
                    :data-source="upcomingEvents"
                    :pagination="false"
                  >
                    <template #bodyCell="{ column, record }">
                      <template v-if="column.key === 'status'">
                        <a-tag :color="record.status === 'Confirmé' ? 'green' : 'orange'">
                          {{ record.status }}
                        </a-tag>
                      </template>
                    </template>
                  </a-table>
                </div>
              </div>
            </div>

            <div class="col-md-4">
              <div class="card">
                <div class="card-header">
                  <h4>Activités récentes</h4>
                </div>
                <div class="card-body">
                  <a-timeline>
                    <a-timeline-item
                      v-for="activity in recentActivities"
                      :key="activity.id"
                      :color="activity.color"
                    >
                      <p class="activity-text">{{ activity.text }}</p>
                      <small class="text-muted">{{ activity.time }}</small>
                    </a-timeline-item>
                  </a-timeline>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Events Management -->
        <EventsManagement v-if="currentView === 'events'" />

        <!-- Users Management -->
        <UsersManagement v-if="currentView === 'users'" />

        <!-- Messages -->
        <MessagesView v-if="currentView === 'messages'" />

        <!-- Prayer Requests -->
        <PrayerRequestsView v-if="currentView === 'prayers'" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  DashboardOutlined,
  CalendarOutlined,
  UserOutlined,
  MailOutlined,
  HeartOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons-vue";

definePageMeta({
  layout: "none",
});

const sidebarCollapsed = ref(false);
const selectedKeys = ref(["dashboard"]);
const currentView = ref("dashboard");

const stats = ref({
  events: 24,
  users: 156,
  messages: 89,
  prayers: 43,
});

const upcomingEventsColumns = [
  { title: "Événement", dataIndex: "name", key: "name" },
  { title: "Date", dataIndex: "date", key: "date" },
  { title: "Heure", dataIndex: "time", key: "time" },
  { title: "Statut", dataIndex: "status", key: "status" },
];

const upcomingEvents = ref([
  {
    key: 1,
    name: "Culte du dimanche",
    date: "16 Fév 2026",
    time: "10:00 AM",
    status: "Confirmé",
  },
  {
    key: 2,
    name: "Réunion de prière",
    date: "18 Fév 2026",
    time: "6:00 PM",
    status: "Confirmé",
  },
  {
    key: 3,
    name: "Étude biblique",
    date: "19 Fév 2026",
    time: "7:00 PM",
    status: "En attente",
  },
]);

const recentActivities = ref([
  {
    id: 1,
    text: "Nouvel événement ajouté: Culte du dimanche",
    time: "Il y a 2 heures",
    color: "blue",
  },
  {
    id: 2,
    text: "Nouveau message reçu de Marie Dupont",
    time: "Il y a 3 heures",
    color: "green",
  },
  { id: 3, text: "Demande de prière soumise", time: "Il y a 5 heures", color: "pink" },
  {
    id: 4,
    text: "Nouvel utilisateur enregistré",
    time: "Il y a 1 jour",
    color: "purple",
  },
]);

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value;
};

const getPageTitle = () => {
  const titles = {
    dashboard: "Tableau de bord",
    events: "Gestion des événements",
    users: "Gestion des utilisateurs",
    messages: "Messages",
    prayers: "Demandes de prière",
  };
  return titles[currentView.value] || "Admin";
};

const logout = () => {
  // Logique de déconnexion
  navigateTo("/");
};
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fa;
}

/* Sidebar */
.admin-sidebar {
  width: 250px;
  background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
  transition: width 0.3s;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  z-index: 1000;
}

.admin-sidebar.collapsed {
  width: 80px;
}

.sidebar-header {
  padding: 20px;
  text-align: center;
  color: white;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-logo {
  max-width: 50px;
  margin-bottom: 10px;
}

.sidebar-header h3 {
  color: white;
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.sidebar-menu {
  flex: 1;
  border-right: none;
  background: transparent;
}

.sidebar-menu :deep(.ant-menu-item) {
  color: rgba(255, 255, 255, 0.8);
  margin: 4px 8px;
  border-radius: 8px;
}

.sidebar-menu :deep(.ant-menu-item:hover),
.sidebar-menu :deep(.ant-menu-item-selected) {
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
}

.sidebar-menu :deep(.ant-menu-item-selected)::after {
  display: none;
}

.sidebar-footer {
  padding: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.collapse-btn {
  width: 100%;
  color: white;
}

/* Main Content */
.admin-content {
  flex: 1;
  margin-left: 250px;
  transition: margin-left 0.3s;
}

.admin-sidebar.collapsed + .admin-content {
  margin-left: 80px;
}

.admin-header {
  background: white;
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.header-left h2 {
  margin: 0;
  color: #333;
  font-size: 24px;
  font-weight: 600;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 25px;
}

.notification-badge {
  cursor: pointer;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.user-profile:hover {
  background-color: #f5f7fa;
}

.username {
  font-weight: 500;
  color: #333;
}

/* Page Content */
.page-content {
  padding: 30px;
}

/* Dashboard Stats Cards */
.stat-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s, box-shadow 0.3s;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: white;
}

.stat-card.purple .stat-icon {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.stat-card.blue .stat-icon {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.stat-card.green .stat-icon {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.stat-card.pink .stat-icon {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

.stat-details h3 {
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  color: #333;
}

.stat-details p {
  margin: 0;
  color: #999;
  font-size: 14px;
}

/* Card */
.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.card-header {
  padding: 20px 25px;
  border-bottom: 1px solid #f0f0f0;
}

.card-header h4 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.card-body {
  padding: 25px;
}

.activity-text {
  margin: 0 0 5px 0;
  color: #333;
  font-size: 14px;
}

/* Responsive */
@media (max-width: 768px) {
  .admin-sidebar {
    width: 80px;
  }

  .admin-content {
    margin-left: 80px;
  }

  .sidebar-header h3,
  .sidebar-logo {
    display: none;
  }
}
</style>
