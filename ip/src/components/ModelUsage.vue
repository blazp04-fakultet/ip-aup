<template>
  <div class="model-usage-container">
    <h2>Korišteni modeli</h2>
    <v-virtual-scroll :height="300" :items="[
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
      '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
      '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'
    ]">
      <template #default="{ item }">
        <v-card>
          <div class="usage-card-header">
            <div class="left-section">
              <div class="model-icon">
                <v-icon>mdi-chart-line</v-icon>
              </div>
              <div class="model-info">
                <v-card-title>GPT-{{ item }}</v-card-title>
                <v-card-subtitle>OpenAI - 5487 request</v-card-subtitle>
              </div>
            </div>
            <div class="right-section">
              <div class="usage-stats">
                <v-card-subtitle>0.0001 $</v-card-subtitle>
                <v-card-subtitle>Usage</v-card-subtitle>
              </div>
            </div>
          </div>
          <div class="model-usage-card-statistics">
            <v-progress-linear model-value="34" />
            <p>34% of total usage</p>
          </div>
        </v-card>
      </template>
    </v-virtual-scroll>
  </div>
</template>

<style>
.model-usage-container {
  overflow: auto;
  background-color: #222222;
  margin-left: 20px;
  padding: 10px;
  width: 100%;
}

.model-icon {
  margin-left: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: aqua;
  display: flex;
  justify-content: center;
  align-items: center;
}

.usage-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  width: 100%;
}

.left-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.right-section {
  display: flex;
  align-items: center;
}

.usage-stats {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
}

.model-usage-card-statistics {
  padding: 10px 20px 10px 10px;
}
</style>
