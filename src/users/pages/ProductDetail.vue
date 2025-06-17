<template>
  <div class="product-detail-wrapper">
    <!-- Detalles del producto -->
    <div class="product-info">
      <img :src="product.imagen" alt="Imagen del producto" class="product-image" />
      <h1 class="product-name">{{ product.nombre }}</h1>
      <p class="product-price">Precio: S/{{ product.precio }}</p>
      <p class="product-size">Talla: {{ product.talla }}</p>
      <p class="product-color">Color: {{ product.color }}</p>
      <p class="product-description">{{ product.descripcion }}</p>
    </div>

    <!-- Información del vendedor -->
    <div class="seller-info">
      <h2>Información del vendedor</h2>
      <img :src="seller.imageprofile || defaultSellerImage" alt="Foto del vendedor" class="seller-image" />
      <p class="seller-name">{{ seller.nombre }}</p>
    </div>

    <!-- Chat integrado -->
    <div class="chat-section">
      <h2>Chat con el vendedor</h2>
      <div class="chat-messages">
        <div v-for="(message, index) in chatMessages" :key="index" class="chat-message">
          <p><strong>{{ message.sender }}:</strong> {{ message.text }}</p>
        </div>
      </div>
      <div class="chat-input">
        <input
            type="text"
            v-model="newMessage"
            placeholder="Escribe tu mensaje..."
            class="message-input"
        />
        <button @click="sendMessage" class="send-button">Enviar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ClotheService } from "@/sales/services/clothe.service.js";
import { ProfileService } from "@/users/services/profile.service.js";

export default {
  name: "ProductDetail",
  data() {
    return {
      product: {},
      seller: {},
      chatMessages: [],
      newMessage: "",
      defaultSellerImage: "https://via.placeholder.com/150",
    };
  },
  async created() {
    const productId = this.$route.params.id;
    await this.fetchProductDetails(productId);
  },
  methods: {
    async fetchProductDetails(productId) {
      const clotheService = new ClotheService();
      const profileService = new ProfileService();

      try {
        const product = await clotheService.getById(productId);
        this.product = product;

        // Obtener vendedor (perfil del usuario asociado)
        const sellers = await profileService.getById(product.usuario);
        this.seller = sellers;

        // Simulación de mensajes de chat por ahora
        this.chatMessages = [
          { sender: "Vendedor", text: "¡Hola! ¿En qué puedo ayudarte?" }
        ];
      } catch (error) {
        console.error("Error al cargar los detalles del producto:", error);
      }
    },

    sendMessage() {
      if (this.newMessage.trim()) {
        this.chatMessages.push({ sender: "Comprador", text: this.newMessage });
        this.newMessage = "";
        // Aquí iría una llamada real a un servicio de chat si se implementa
      }
    },
  },
};
</script>

<style scoped>
.product-detail-wrapper {
  font-family: 'Poppins', sans-serif;
  padding: 20px;
  background-color: #f9f9f9;
}
.product-info {
  margin-bottom: 20px;
}
.product-image {
  width: 100%;
  max-width: 300px;
  border-radius: 10px;
  margin-bottom: 15px;
}
.product-name {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 10px;
}
.product-price,
.product-size,
.product-color,
.product-description {
  font-size: 1rem;
  margin-bottom: 5px;
}
.seller-info {
  margin-bottom: 20px;
}
.seller-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
}
.seller-name {
  font-size: 1.2rem;
  font-weight: bold;
}
.chat-section {
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.chat-messages {
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 10px;
}
.chat-message {
  margin-bottom: 5px;
}
.chat-input {
  display: flex;
  gap: 10px;
}
.message-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.send-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}
.send-button:hover {
  background-color: #0056b3;
}
</style>
