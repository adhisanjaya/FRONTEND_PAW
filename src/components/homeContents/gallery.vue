<template>
  <v-row>
    <v-col cols="12" sm="6" offset-sm="3">
      <v-card>
        <v-container fluid>
          <!-- Row pertama gambar-->
          <v-row>
            <v-col v-for="n in 1" :key="n" class="d-flex child-flex" cols="4">
              <v-card flat tile class="d-flex">
                <v-img
                  src="../../assets/Panadol.png"
                  lazy-src="lazy-src"
                  aspect-ratio="1"
                  class="grey lighten-2"
                >
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-card>
            </v-col>

            <v-col v-for="n in 1" :key="n" class="d-flex child-flex" cols="4">
              <v-card flat tile class="d-flex">
                <v-img
                  src="../../assets/marijuana.png"
                  lazy-src="lazy-src"
                  aspect-ratio="1"
                  class="grey lighten-2"
                >
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-card>
            </v-col>

            <v-col v-for="n in 1" :key="n" class="d-flex child-flex" cols="4">
              <v-card flat tile class="d-flex">
                <v-img
                  src="../../assets/betadine.jpg"
                  lazy-src="lazy-src"
                  aspect-ratio="1"
                  class="grey lighten-2"
                >
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-card>
            </v-col>
          </v-row>

          <!-- Row kedua gambar -->
          <v-row>
            <v-col v-for="n in 1" :key="n" class="d-flex child-flex" cols="4">
              <v-card flat tile class="d-flex">
                <v-img
                  src="../../assets/hufagrip.jpg"
                  lazy-src="lazy-src"
                  aspect-ratio="1"
                  class="grey lighten-2"
                >
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-card>
            </v-col>

            <v-col v-for="n in 1" :key="n" class="d-flex child-flex" cols="4">
              <v-card flat tile class="d-flex">
                <v-img
                  src="../../assets/procold.jpg"
                  lazy-src="lazy-src"
                  aspect-ratio="1"
                  class="grey lighten-2"
                >
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-card>
            </v-col>

            <v-col v-for="n in 1" :key="n" class="d-flex child-flex" cols="4">
              <v-card flat tile class="d-flex">
                <v-img
                  src="../../assets/tolakangin.jpg"
                  lazy-src="lazy-src"
                  aspect-ratio="1"
                  class="grey lighten-2"
                >
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-card>
            </v-col>
          </v-row>

          <!-- Row ketiga gambar -->
          <v-row>
            <v-col v-for="n in 1" :key="n" class="d-flex child-flex" cols="4">
              <v-card flat tile class="d-flex">
                <v-img
                  src="../../assets/tunjuk.jpg"
                  lazy-src="lazy-src"
                  aspect-ratio="1"
                  class="grey lighten-2"
                >
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-card>
            </v-col>

            <v-col v-for="n in 1" :key="n" class="d-flex child-flex" cols="4">
              <v-card flat tile class="d-flex">
                <v-img
                  src="../../assets/marijuana.png"
                  lazy-src="lazy-src"
                  aspect-ratio="1"
                  class="grey lighten-2"
                >
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-card>
            </v-col>

            <v-col v-for="n in 1" :key="n" class="d-flex child-flex" cols="4">
              <v-card flat tile class="d-flex">
                <v-img
                  src="../../assets/kucing.jpg"
                  lazy-src="lazy-src"
                  aspect-ratio="1"
                  class="grey lighten-2"
                >
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>
