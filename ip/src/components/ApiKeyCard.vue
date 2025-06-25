<template>
  <div class="api-key-card">
    <div class="card-row">
      <div class="col col-name">
        <div class="status-section">
          <div class="status-icon" />
          <div class="name-section">
            <div class="service-name">{{ token.name }}</div>
            <div
              class="status-chip"
              :style="{
                color: token.isActive ? 'green' : 'red',
                backgroundColor: token.isActive ? '  #263027' : '#360101',
              }"
            >
              {{ token.isActive ? "Active" : "Inactive" }}
            </div>
          </div>
        </div>
      </div>

      <div class="key-properties-section">
        <div class="col col-key">
          <div class="label">API Key</div>
          <div class="key">
            {{ token.apiKey }}
          </div>
        </div>

        <div class="col col-small">
          <div class="label">Usage</div>
          <div class="value">{{ token.tokenUsage }}</div>
        </div>

        <div class="col col-small">
          <div class="label">Cost</div>
          <div class="value green-text">${{ token.moneySpent }}</div>
        </div>

        <div class="col">
          <div class="label">Created</div>
          <div class="value">{{ token.createdAt.toLocaleString() }}</div>
        </div>

        <div class="col col-toggle">
          <label class="switch">
            <input
              v-model="token.isActive"
              type="checkbox"
              @click="handleClick"
            />
            <span class="slider" />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { type ApiKeyDto } from "@/models/dto/apiKeyDto";
import { useTokeStore } from "@/stores/tokenStore";

const props = defineProps<{
  token: ApiKeyDto;
}>();
console.log("props.token");
console.log(props.token);

const tokenStore = useTokeStore();
const handleClick = async () => {
  await tokenStore.deleteApiKey(props.token.id!);
};
</script>

<style scoped>
.api-key-card {
  padding: 16px;
  border-radius: 8px;
  background-color: #222222;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #121212;
}

.card-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.col {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.key-properties-section {
  display: flex;
  flex-direction: row;
}

.col-name {
  flex: 3;
  min-width: 200px;
}

.col-key {
  flex: 2;
  min-width: 150px;
}

.col-small {
  flex: 1;
  min-width: 80px;
}

.col-toggle {
  flex: 0 0 auto;
  margin-left: 20px;
}

.status-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.status-icon {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #4caf50;
}

.name-section {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.service-name {
  font-weight: 500;
  font-size: 14px;
  color: #fff;
}

.status-chip {
  display: inline-block;
  padding: 4px 10px;
  font-size: 11px;

  border-radius: 14px;
  width: fit-content;
}

.label {
  font-size: 12px;
  color: #b9bbbe;
  margin-bottom: 4px;
  font-weight: 400;
}

.key,
.value {
  font-size: 14px;
  font-weight: 500;
  color: #888;
}

.key {
  display: flex;
  align-items: center;
  gap: 4px;
}

.copy-icon {
  cursor: pointer;
  font-size: 12px;
  color: #1976d2;
  transition: opacity 0.2s;
}

.copy-icon:hover {
  opacity: 0.7;
}

.green-text {
  color: #64b968;
}

.switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.3s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #4caf50;
}

input:checked + .slider:before {
  transform: translateX(20px);
}

@media (max-width: 768px) {
  .card-row {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }

  .col {
    flex: none;
  }

  .col-toggle {
    margin-left: 0;
    align-self: flex-end;
  }

  .status-section {
    justify-content: space-between;
  }
}
</style>
