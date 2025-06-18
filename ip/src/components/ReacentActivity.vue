<template>
  <div class="activity-usage-container">
    <h2>Reacent Activity</h2>
    <v-virtual-scroll :height="300" :items="[
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
      '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
      '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'
    ]">
      <template #default="{ item }">
        <v-card>
          <div class="usage-card-header">
            <div class="left-section">
              <div class="activity-icon">
                <v-icon>mdi-chart-line</v-icon>
              </div>
              <div class="activity-info">
                <v-card-title>API call to GPT-{{ item }}</v-card-title>
                <v-card-subtitle>2 min ago</v-card-subtitle>
              </div>
            </div>
            <div class="right-section">
              <div class="usage-stats">
                <v-card-subtitle>1,250 tokens</v-card-subtitle>
                <v-card-subtitle>$0.025</v-card-subtitle>
              </div>
            </div>
          </div>

        </v-card>
      </template>
    </v-virtual-scroll>
  </div>
</template>

<style>
.activity-usage-container {
  overflow: auto;
  background-color: #222222;
  margin-left: 20px;
  padding: 10px;
  width: 100%;
}

.activity-icon {
  margin-left: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgb(0, 106, 255);
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

.activity-usage-card-statistics {
  padding: 10px 20px 10px 10px;
}
</style>
