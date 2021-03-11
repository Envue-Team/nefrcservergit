<template>
  <v-container>
    <v-row
    ><!---------------------First Container Row-------------------------------->
      <v-col class="col-md-5 col-sm-12"
      ><!----------------------Left Column-------------------------->
        <!---------------------Contact Basic Data-------------------------------->
        <v-card
            class="pa-1 mx-10 hidden-md-and-down"
            elevation="3 text-wrap">
          <v-card
              style="margin-top:-15px; width:100%;"
              color="#6D6E70"
              class="pa-7"
              rounded
          >
            <v-card-text>
              <div class="card-header-title">404 Error:
              </div>
              <div
                  class="card-header-subtitle">
                This page cannot be found
              </div>
            </v-card-text>
          </v-card>
        </v-card>
        <!--------------------------Small Screen------------------------------>
        <span class="hidden-md-and-up">
        <div
            style="font-weight: 700; color: #878686; font-size: 18px;"
        >
            404 Error: This page cannot be found
          </div>
        <div
            style="
              padding: 10px 20px;
              font-family: 'Poppins', sans-serif;
              color: #504b4b;
              font-size: 16px;
            "
        >
        </div>
          </span>
        <!--------------------------Small Screen------------------------------>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>

export default {}
</script>
