<template>
  <div class="modal-backdrop">
    <div class="modal-box">
      <button class="back-btn" @click="$emit('close')">←</button>
      <h2 class="title">Agregar Nueva Prenda</h2>

      <div class="form-group">
        <label>Nombre:</label>
        <input v-model="newClothe.nombre" />
      </div>

      <div class="form-group">
        <label>Descripción:</label>
        <input v-model="newClothe.descripcion" />
      </div>

      <div class="form-group">
        <label>Tipo:</label>
        <input v-model="newClothe.tipo" />
      </div>

      <div class="form-group">
        <label>Talla:</label>
        <input v-model="newClothe.talla" />
      </div>

      <div class="form-group">
        <label>Color:</label>
        <input v-model="newClothe.color" />
      </div>

      <div class="form-group">
        <label>Precio:</label>
        <input type="number" v-model.number="newClothe.precio" />
      </div>

      <div class="form-group">
        <label>Imagen (URL):</label>
        <input v-model="newClothe.imagen" />
      </div>

      <div class="modal-actions">
        <button class="btn-save" @click="submitClothe">Agregar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClotheAddForm",
  data() {
    return {
      newClothe: {
        id: '',
        nombre: '',
        descripcion: '',
        precio: 0,
        tipo: '',
        talla: '',
        color: '',
        usuario: 0,
        imagen: '',
        categorias: [],
        apiId: 'v1'
      }
    };
  },
  methods: {
    submitClothe() {
      this.$emit('create', { ...this.newClothe });
    }
  }
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-box {
  background: white;
  border-radius: 40px;
  padding: 40px 30px;
  width: 400px;
  max-width: 90%;
  text-align: center;
  font-family: 'K2D', sans-serif;
  position: relative;
}

.back-btn {
  position: absolute;
  left: 20px;
  top: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #E4738F;
}

.title {
  font-size: 20px;
  margin-bottom: 20px;
  font-weight: bold;
  color: #222;
}

.form-group {
  text-align: left;
  margin: 10px 0;
}

.form-group label {
  display: block;
  font-size: 14px;
  margin-bottom: 4px;
  color: #444;
}

.form-group input {
  background: #f5b9cb;
  border: none;
  border-radius: 12px;
  padding: 8px 12px;
  width: 100%;
  font-size: 14px;
  color: #000;
}

.modal-actions {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.btn-save {
  background-color: #E4738F;
  border: none;
  padding: 10px 20px;
  border-radius: 16px;
  color: white;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn-save:hover {
  background-color: #c85a75;
}
</style>
