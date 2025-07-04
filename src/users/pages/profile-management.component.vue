<template>
  <div class="profile-wrapper">
    <div class="profile-content">
      <div class="left-panel">
        <h1>Perfil {{ activeProfile === 'comprador' ? 'Comprador' : 'Vendedor' }}</h1>

        <div class="profile-tabs">
          <button
              :class="{ active: activeProfile === 'comprador' }"
              @click="activeProfile = 'comprador'"
          >COMPRADOR</button>
          <button
              :class="{ active: activeProfile === 'vendedor' }"
              @click="activeProfile = 'vendedor'"
          >VENDEDOR</button>
        </div>

        <!-- SECCIÓN COMPRADOR -->
        <div v-if="activeProfile === 'comprador'" class="favoritos-section">
          <div class="tabs-fav-ti">
            <button :class="{ active: favTab === 'favoritos' }" @click="favTab='favoritos'">Favoritos</button>
            <button :class="{ active: favTab === 'parati' }" @click="favTab='parati'">Para ti</button>
          </div>

          <div v-if="favTab === 'favoritos'" class="favoritos-list">
            <div class="clothes-item" v-for="clothes in favoritos" :key="clothes.id" @click="goToProductDetail(clothes)">
              <img :src="clothes.imagen" alt="Prenda" />
              <div class="heart">♡</div>
            </div>
            <button class="btn-ver-fav" @click="showFavoritesDialog">Ver catálogo de favoritos</button>
          </div>

          <div v-if="favTab === 'parati'" class="favoritos-list">
            <h4 class="section-title">Artículos recomendados para ti</h4>
            <h4 class="subtext">Basada en tus gustos te sugerimos estas prendas:</h4>
            <div class="clothes-item" v-for="clothes in favoritos" :key="clothes.id" @click="goToProductDetail(clothes)">
              <img :src="clothes.imagen" alt="Prenda" />
              <div class="star">☆</div>
            </div>
          </div>

          <Dialog v-if="visibleFavoritesList">
            <h2 class="section-title">Tus Favoritos</h2>
            <h2 class="subtext">Aquí están tus prendas favoritas</h2>
            <div class="favorite-card" v-for="clothes in favoritos" :key="clothes.id" @click="showProductDetail(clothes)">
              <img :src="clothes.imagen" alt="Prenda" class="favorite-image" />
              <div class="favorite-info">
                <h3 class="favorite-nombre">{{ clothes.nombre }}</h3>
                <p class="favorite-price">Precio: ${{ clothes.precio }}</p>
                <p class="favorite-category">Categoría: {{ clothes.categorias }}</p>
              </div>
              <div class="favorite-heart">♡</div>
            </div>
            <Button label="Cerrar" @click="visibleFavoritesList = false" class="p-button-secondary" />
          </Dialog>
        </div>

        <!-- SECCIÓN VENDEDOR -->
        <div v-if="activeProfile === 'vendedor'" class="vendedor-section">
          <!-- SECCIÓN VENDIDOS -->
          <div class="section-title-custom">
            <h3>Vendidos:</h3>
          </div>
          <div class="vendidas-grid">
            <div class="vendida-card" v-for="item in vendidas.slice(0, 6)" :key="item.id">
              <img :src="item.imagen" alt="Prenda vendida" style="width:80px; border-radius:15px; margin-bottom:5px;" />
              <div>Tipo: {{ item.tipo }}</div>
              <div>Estado: Vendido</div>
              <div>Precio: {{ item.precio }}</div>
            </div>
          </div>
          <a class="label-lista" @click.prevent="showSoldModal = true">
            Lista de prendas vendidas
          </a>
          <SoldClothesModal
              v-if="showSoldModal"
              :items="vendidas"
              @close="showSoldModal = false"
          />

          <!-- SECCIÓN PUBLICADOS -->
          <div class="section-title-custom">
            <h3>Publicados:</h3>
          </div>
          <div class="pendientes-grid">
            <div class="pendiente-card" v-for="item in pendientes.slice(0, 6)" :key="item.id">
              <img :src="item.imagen" alt="Prenda pendiente" style="width:80px; border-radius:15px; margin-bottom:5px;" />
              <div>Tipo: {{ item.tipo }}</div>
              <div>Estado: Publicado</div>
              <div>Precio: {{ item.precio }}</div>
              <button class="editar-btn" @click="openEditClotheModal(item)">Editar</button>
            </div>
          </div>
          <a class="label-lista" @click.prevent="showPendingModal = true">
            Lista de prendas publicadas
          </a>
          <PendingClothesModal
              v-if="showPendingModal"
              :items="pendientes"
              @close="showPendingModal = false"
              @edit="onEditPendingClothe"
          />
          <EditClotheModal
              v-if="editModalVisible"
              :clothe="clotheToEdit"
              :visible="editModalVisible"
              @close="closeEditClotheModal"
              @save="onSaveClothe"
              @remove="onRemoveClothe"
              @sell="openSellClotheModal"
          />
          <SellClotheModal
              v-if="sellModalVisible"
              :visible="sellModalVisible"
              :clothe="clotheToSell"
              @close="closeSellClotheModal"
              @confirm="onConfirmSell"
          />

          <!-- SECCIÓN ESTADÍSTICAS DE VENDEDOR -->
          <div class="estadisticas-section">
            <div class="section-title-custom">
              <h3>Estadísticas de Ventas:</h3>
            </div>
            <div v-if="estadisticasVentas.total > 0" class="estadisticas-cards">
              <div class="estadistica-card">
                <div class="icono-card">🛒</div>
                <div class="dato-card">{{ estadisticasVentas.total }}</div>
                <div class="label-card">Vendidas</div>
              </div>
              <div class="estadistica-card">
                <div class="icono-card">💰</div>
                <div class="dato-card">S/. {{ estadisticasVentas.ingresos }}</div>
                <div class="label-card">Ingresos</div>
              </div>
              <div class="estadistica-card">
                <div class="icono-card">🏆</div>
                <div class="dato-card">{{ estadisticasVentas.topCategoria }}</div>
                <div class="label-card">Top Categoría</div>
              </div>
            </div>
            <div v-if="estadisticasVentas.total > 0" class="estadisticas-categorias">
              <span class="label-categorias">Ventas por categoría:</span>
              <div class="categorias-badges">
                <span
                    v-for="(cantidad, categoria) in estadisticasVentas.porCategoria"
                    :key="categoria"
                    class="badge-categoria"
                >
                  {{ categoria }}: <b>{{ cantidad }}</b>
                </span>
              </div>
            </div>
            <div v-else class="estadisticas-empty">
              <span>Sin ventas registradas aún.</span>
            </div>
          </div>

        </div>
      </div>

      <!-- Panel derecho -->
      <div class="right-panel">
        <div v-if="profile" class="profile-image-wrapper">
          <img :src="profile.imagen || 'https://i.imgur.com/XwiWtcq.png'" alt="Perfil Usuario" />
          <p><strong>Correo electrónico:</strong> {{ profile.email }}</p>
          <p><strong>Dirección:</strong> {{ profile.direccion }}</p>
        </div>
        <div v-else class="profile-image-wrapper">
          <p>No hay datos de perfil disponibles.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useProfileStore } from "@/users/services/profile.store.js";
import { ProfileService } from "@/users/services/profile.service.js";
import { ClotheService } from "@/sales/services/clothe.service.js";
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import SoldClothesModal from "@/users/components/sold-clothes-modal.vue";
import PendingClothesModal from "@/users/components/pending-clothes-modal.vue";
import EditClotheModal from "@/users/components/edit-clothe-modal.vue";
import SellClotheModal from "@/users/components/sell-clothe-modal.vue";

export default {
  name: "ProfileView",
  data() {
    return {
      activeProfile: 'comprador',
      favTab: 'favoritos',
      pendientes: [],
      selectedProduct: null,
      visibleFavoritesList: false,
      favoritos: [],
      vendidas: [],
      showSoldModal: false,
      showPendingModal: false,
      editModalVisible: false,
      clotheToEdit: null,
      sellModalVisible: false,
      clotheToSell: null,
      clothes: [],
    };
  },
  components: {SoldClothesModal, Dialog, Button, PendingClothesModal, EditClotheModal, SellClotheModal },
  computed: {
    profile() {
      return this.profileStore.profile;
    },
    estadisticasVentas() {
      if (!this.vendidas.length) return {
        total: 0,
        ingresos: 0,
        topCategoria: null,
        porCategoria: {},
      };

      const porCategoria = {};
      let ingresos = 0;

      this.vendidas.forEach(item => {
        const cat = item.tipo || 'Sin categoría';
        porCategoria[cat] = (porCategoria[cat] || 0) + 1;
        ingresos += Number(item.precio) || 0;
      });

      let topCategoria = null;
      let max = 0;
      for (const [cat, count] of Object.entries(porCategoria)) {
        if (count > max) {
          max = count;
          topCategoria = cat;
        }
      }

      return {
        total: this.vendidas.length,
        ingresos,
        topCategoria,
        porCategoria,
      };
    }
  },
  setup() {
    const profileStore = useProfileStore();
    const profileService = new ProfileService();
    const clotheService = new ClotheService();
    return { profileStore, profileService, clotheService };
  },
  async created() {
    this.profileStore.initialize();
    await this.loadProfileData();
  },
  methods: {
    async loadProfileData() {
      try {
        const userId = this.profileStore.profile?.id;
        if (!userId) return;

        const fullProfile = await this.profileService.getById(userId);
        const favoritosIds = fullProfile.favoritos || [];
        const publicadosIds = fullProfile.publicados || [];
        const vendidosIds = fullProfile.vendidos || [];

        const favoritosPromises = favoritosIds.map(id => this.clotheService.getById(id));
        this.favoritos = (await Promise.all(favoritosPromises)).filter(p => p);

        const publicadosPromises = publicadosIds.map(id => this.clotheService.getById(id));
        this.pendientes = (await Promise.all(publicadosPromises)).filter(p => p);

        const vendidosPromises = vendidosIds.map(id => this.clotheService.getById(id));
        this.vendidas = (await Promise.all(vendidosPromises)).filter(p => p);


        this.clothes = await this.clotheService.getAll();

      } catch (error) {
        console.error("Error al cargar datos del perfil:", error);
      }
    },

    goToProductDetail(product) {
      this.$router.push({ name: 'ProductDetail', params: { productId: product.id } });
    },
    showProductDetail(item) {
      this.selectedProduct = item;
    },
    showFavoritesDialog() {
      this.visibleFavoritesList = true;
    },
    openEditClotheModal(clothe) {
      this.clotheToEdit = { ...clothe };
      this.editModalVisible = true;
    },
    closeEditClotheModal() {
      this.editModalVisible = false;
      this.clotheToEdit = null;
    },
    async onSaveClothe(editedClothe) {
      try {
        await this.clotheService.update(editedClothe.id, editedClothe);
        this.clothes = await this.clotheService.getAll();
        this.closeEditClotheModal();
        this.$toast.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Prenda actualizada correctamente',
          life: 3000
        });
      } catch (error) {
        console.error('Error al actualizar la prenda:', error);
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo actualizar la prenda',
          life: 3000
        });
      }
    },
    async onRemoveClothe(editedClothe) {
      try {
        const userId = this.profileStore.profile?.id;
        if (!userId) return;
        const fullProfile = await this.profileService.getById(userId);

        fullProfile.publicados = (fullProfile.publicados || []).filter(id => id !== editedClothe.id);
        if (!fullProfile.armario.includes(editedClothe.id)) {
          fullProfile.armario.push(editedClothe.id);
        }

        await this.profileService.update(userId, fullProfile);
        await this.loadProfileData();
        this.closeEditClotheModal();
        this.$toast.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Prenda movida al armario',
          life: 3000
        });
      } catch (error) {
        console.error('Error al mover la prenda al armario:', error);
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo mover la prenda al armario',
          life: 3000
        });
      }
    },
    onEditPendingClothe(item) {
      this.clotheToEdit = { ...item };
      this.editModalVisible = true;
      this.showPendingModal = true;
    },
    openSellClotheModal(clothe) {
      this.clotheToSell = { ...clothe };
      this.sellModalVisible = true;
    },
    closeSellClotheModal() {
      this.sellModalVisible = false;
      this.clotheToSell = null;
    },
    async onConfirmSell({ comprador, clothe }) {
      try {
        const vendedorId = this.profileStore.profile?.id;
        const vendedorProfile = await this.profileService.getById(vendedorId);
        vendedorProfile.publicados = (vendedorProfile.publicados || []).filter(id => id !== clothe.id);
        if (!vendedorProfile.vendidos.includes(clothe.id)) {
          vendedorProfile.vendidos.push(clothe.id);
        }
        await this.profileService.update(vendedorId, vendedorProfile);

        if (!comprador.armario.includes(clothe.id)) {
          comprador.armario.push(clothe.id);
          await this.profileService.update(comprador.id, comprador);
        }

        await this.loadProfileData();
        this.closeSellClotheModal();
        this.closeEditClotheModal();
        this.$toast.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Venta realizada correctamente',
          life: 3000
        });
      } catch (error) {
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo realizar la venta',
          life: 3000
        });
      }
    }
  }
};
</script>


<style scoped>

.subtext {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 20px;
}

.section-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
}

.favorites-list {
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding-bottom: 10px;
}

.favorite-card {
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 15px;
  min-width: 200px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.favorite-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
}

.favorite-info {
  text-align: center;
}

.favorite-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.favorite-price,
.favorite-category {
  font-size: 0.9rem;
  color: #555;
}

.star {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5rem;
  color: yellow;
}

.favorite-heart {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5rem;
  color: red;
}

.profile-wrapper {
  font-family: 'Poppins', sans-serif;
  background-color: #ffebed;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.profile-content {
  display: flex;
  gap: 20px;
  padding: 20px;
  flex: 1;
}

.left-panel {
  background-color: #ffdde4;
  flex: 2;
  border-radius: 20px 0 0 20px;
  padding: 20px;
  color: #222;
}

.right-panel {
  background-color: #e4738f;
  flex: 1;
  border-radius: 0 20px 20px 0;
  padding: 30px 20px;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-image-wrapper img {
  border-radius: 50% 50% 50% 50% / 45% 60% 40% 60%;
  width: 180px;
  margin-bottom: 30px;
  object-fit: cover;
}

.profile-image-wrapper p {
  color: black;
  font-weight: 600;
  text-align: center;
  margin: 15px 0 10px 0;
}

.profile-tabs {
  margin-bottom: 15px;
}

.profile-tabs button {
  background-color: #ffb6c1;
  border: none;
  padding: 10px 25px;
  margin-right: 10px;
  font-weight: 700;
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.profile-tabs button.active,
.profile-tabs button:hover {
  background-color: #e4738f;
  color: white;
}

.tabs-fav-ti {
  display: flex;
  gap: 30px;
  margin-bottom: 20px;
}

.tabs-fav-ti button {
  background: none;
  border: none;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  padding-bottom: 5px;
  color: #7a3030;
  border-bottom: 2px solid transparent;
  transition: border-color 0.3s ease, color 0.3s ease;
}

.tabs-fav-ti button.active {
  border-color: #7a3030;
  font-weight: 900;
}

.favoritos-list {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.clothes-item {
  background-color: #e4738f44;
  border-radius: 25px;
  padding: 10px;
  position: relative;
  width: 100px;
  height: 100px;
  cursor: pointer;
  overflow: hidden;
}

.clothes-item img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 20px;
}

.clothes-item .heart {
  position: absolute;
  top: 5px;
  right: 10px;
  font-size: 1.2rem;
  color: red;
  user-select: none;
}

.btn-ver-fav {
  background-color: #f7cfd7;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.btn-ver-fav:hover {
  background-color: #e4738f;
  color: white;
}

.vendida-item img {
  width: 80px;
  border-radius: 15px;
  margin-bottom: 5px;
}

.label-lista {
  display: block;
  text-align: center;
  font-size: 1.15rem;
  color: #d1718f;
  font-weight: 600;
  margin: 18px 0 10px 0;
  text-decoration: none !important;
  cursor: pointer;
}

.label-lista:hover {
  color: #e4738f;
  text-decoration: none;
}

.vendidas-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 10px;
}

.vendida-card,
.pendiente-card {
  background: #f5b9cb !important;
  border-radius: 15px;
  padding: 10px;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.vendida-card div,
.pendiente-card div {
  background: #fff;
  color: #000000 !important;
  border-radius: 15px;
  padding: 4px 12px;
  margin-bottom: 4px;
  font-weight: 600;
  font-size: 1rem;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
  box-shadow: 0 1px 4px rgba(180,110,126,0.07);
}

.pendientes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 10px;
}

.pendientes-list li {
  margin-bottom: 8px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
}

.editar-btn {
  background: #ffd2dd;
  border: none;
  padding: 4px 12px;
  border-radius: 15px;
  cursor: pointer;
  color: #b46e7e;
  font-weight: 700;
  transition: background 0.2s, color 0.2s;
}

.editar-btn:hover {
  background: #e4738f;
  color: #fff;
}

.estadisticas-section {
  margin: 20px 0 0 0;
  padding: 0 0 18px 0;
  color: #7a3030;
  border-radius: 0;
  box-shadow: none;
  background: none;
}

.estadisticas-cards {
  display: flex;
  gap: 22px;
  margin-bottom: 10px;
}

.estadistica-card {
  background: rgba(255,221,228,0.7);
  border-radius: 18px;
  padding: 18px 24px 12px 24px;
  min-width: 110px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 8px rgba(180,110,126,0.07);
  transition: transform 0.15s;
}

.estadistica-card:hover {
  transform: translateY(-3px) scale(1.04);
  box-shadow: 0 4px 16px rgba(180,110,126,0.13);
}

.icono-card {
  font-size: 2.1rem;
  margin-bottom: 6px;
}

.dato-card {
  font-size: 1.5rem;
  font-weight: 900;
  color: #e4738f;
  margin-bottom: 2px;
}

.label-card {
  font-size: 0.95rem;
  color: #7a3030;
  font-weight: 600;
  opacity: 0.8;
}

.estadisticas-categorias {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.label-categorias {
  font-weight: 700;
  color: #b46e7e;
  margin-bottom: 4px;
}

.categorias-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.badge-categoria {
  background: #ffd2dd;
  color: #b46e7e;
  border-radius: 12px;
  padding: 5px 14px;
  font-size: 1rem;
  font-weight: 700;
  box-shadow: 0 1px 4px rgba(180,110,126,0.07);
}

.estadisticas-empty {
  color: #b46e7e;
  font-weight: 600;
  padding: 12px 0 0 0;
  font-size: 1.1rem;
}

.section-title-custom h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 18px;
  color: #000000;
  display: flex;
  align-items: center;
  gap: 8px;
}

.vendida-card img,
.pendiente-card img {
  height: 110px;
  object-fit: cover;
  border-radius: 15px;
  background: #fff;
  display: block;
  margin-bottom: 5px;
}

</style>