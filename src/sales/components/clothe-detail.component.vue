<template>
  <div class="detail-container">
    <router-link to="/start" class="back-button">⬅ Volver</router-link>

    <div class="product-main">
      <!-- COLUMNA IZQUIERDA -->
      <div class="left-column">
        <h2>{{ clothe.nombre }}</h2>
        <div class="clothe-box">
          <img :src="clothe.imagen" :alt="clothe.nombre" width="300" height="300" />
          <p class="price">Precio: S/{{ clothe.precio }}</p>
          <p class="description">{{ clothe.descripcion }}</p>
        </div>
      </div>

      <!-- COLUMNA DERECHA -->
      <div class="right-column">
        <div class="seller-box" v-if="seller">
          <img :src="seller.imageprofile" class="seller-img" />
          <p><strong>VENDEDOR:</strong> {{ seller.fullName }}</p>
        </div>
        <div v-else>
          <p><em>Vendedor no disponible</em></p>
        </div>


        <div class="chat-box">
          <label>Chatea y pregunta:</label>
          <input type="text" v-model="message" placeholder="Hola, esta prenda..." />
          <button @click="sendMessage">Enviar</button>
        </div>
      </div>
    </div>

    <!-- RECOMENDACIONES -->
    <div class="recommendations">
      <h3>Recomendaciones</h3>
      <div class="recommendation-list">
        <div v-for="rec in recommendations" :key="rec.id" class="recommendation-item">
          <img :src="rec.imagen" />
          <p>{{ rec.nombre }}</p>
          <p>S/{{ rec.precio }}</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { ClotheService } from "../services/clothe.service.js";
import { ProfileService } from "@/users/services/profile.service.js";
import { Profile } from "@/users/model/profile.entity.js";

export default {
  data() {
    return {
      clothe: {},
      seller: null,
      message: "",
      recommendations: [],
    };
  },
  methods: {
    async loadData() {
      const id = this.$route.params.id;
      const clotheService = new ClotheService();
      const profileService = new ProfileService();

      try {
        console.log("Buscando prenda con ID:", id);
        const clothe = await clotheService.getById(id);
        this.clothe = clothe;
        console.log("Prenda cargada:", clothe);

        if (clothe.usuario != null) {
          const sellerData = await profileService.getById(clothe.usuario);
          this.seller = new Profile(sellerData);
          console.log(" Vendedor cargado:", this.seller);
        } else {
          console.warn("La prenda no tiene vendedor asignado (usuario)");
        }

        const allClothes = await clotheService.getAll();
        this.recommendations = allClothes
            .filter(
                (item) =>
                    item.id !== clothe.id &&
                    item.categorias?.some((cat) => clothe.categorias?.includes(cat))
            )
            .slice(0, 2);
        console.log("💡 Recomendaciones:", this.recommendations);
      } catch (err) {
        console.error(" Error al cargar datos:", err);
      }
    }
    ,
    sendMessage() {
      alert(`Mensaje enviado al vendedor: ${this.message}`);
      this.message = "";
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style >
.detail-container {
  background-color: #ffeef1;
  padding: 1rem;
}

.back-button {
  text-decoration: none;
  color: #d33;
  margin-bottom: 1rem;
  display: inline-block;
}

.product-main {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.left-column {
  flex: 1;
}

.left-column h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.clothe-box {
  background-color: #f5b9cb;
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
}

.clothe-image {
  width: 200px;
  border-radius: 10px;
  margin-bottom: 10px;
}

.price {
  font-weight: bold;
}

.description {
  margin-top: 10px;
}

.right-column {
  flex: 1;
  background-color: #fdf7f9;
  padding: 1rem;
  border-radius: 12px;
}

.seller-box {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 1rem;
}

.seller-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.chat-box label {
  display: block;
  margin-bottom: 5px;
}

.chat-box input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fdf7f9;
  margin-bottom: 10px;
}

.chat-box button {
  background-color: #e4738f;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.recommendations {
  margin-top: 2rem;
}

.recommendations h3 {
  margin-bottom: 1rem;
}

.recommendation-list {
  background-color: #e4738f;
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  gap: 1rem;
}

.recommendation-item {
  background-color: white;
  padding: 0.5rem;
  border-radius: 8px;
  text-align: center;
  width: 120px;
}

.recommendation-item img {
  width: 100%;
  border-radius: 5px;
}

</style>
