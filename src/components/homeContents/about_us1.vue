<template>
<div style="font-size:50px; text-align: center;"> About Us
    <p class="display-5 font-weight-normal">HERE WE ARE THE MAN BEHIND OF THIS PROJECT</p>

<div class="row">
  <v-card
    max-width="344"
    class="
    pa-md-4 mx-lg-auto"
  >
    <v-img
      src="../../assets/team/adhi.jpg"
      height="200px"
    ></v-img>

    <v-card-title>
      Adhi Sanjaya P.N.
    </v-card-title>

    <v-card-subtitle  style="text-align: left;">
      Bukan Pro Player
    </v-card-subtitle>

    <v-card-actions>
      <v-btn href="https://www.instagram.com/adhisanjayapn/">Instagram</v-btn>
    </v-card-actions>

    
  </v-card>
    <p style="height= 200px"></p>
  <!-- about 2 -->
    <v-card
    max-width="344"
    class="
    pa-md-4 mx-lg-auto"
  >
    <v-img
      src="../../assets/team/tegar.jpg"
      height="200px"
    ></v-img>

    <v-card-title>
      Tegar Sahaduta
    </v-card-title>

    <v-card-subtitle style="text-align: left;">
      Bakul Kaset Dangdut
    </v-card-subtitle>

    <v-card-actions>
      <v-btn href=https://www.instagram.com/tegarsahaduta/>Instagram</v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show2">
        <v-divider></v-divider>

        <v-card-text>
          I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>

  <!-- about 3 -->
    <v-card
    max-width="344"
    class="
    pa-md-4 mx-lg-auto"
  >
    <v-img
      src="../../assets/team/eric.jpg"
      height="200px"
    ></v-img>

    <v-card-title>
      Mateus Eric H.
    </v-card-title>

    <v-card-subtitle style="text-align: left;">
      Bakul Cendol Dawet
    </v-card-subtitle>

    <v-card-actions>
      <v-btn href="https://www.instagram.com/m__eric/">Instagram</v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show3">
        <v-divider></v-divider>

        <v-card-text>
          I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>

  <!-- about 4 -->
    <v-card
    max-width="344"
    class="
    pa-md-4 mx-lg-auto"
  >
    <v-img
      src="../../assets/team/hartono.jpg"
      height="200px"
    ></v-img>

    <v-card-title>
      Hartono Rusli
    </v-card-title>

    <v-card-subtitle style="text-align: left;">
      Kulakan Sego Jinggo
    </v-card-subtitle>

    <v-card-actions>
      <v-btn href="https://www.instagram.com/lieton27/">Instagram</v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show4">
        <v-divider></v-divider>

        <v-card-text>
          I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>

  <!-- about 5 -->
    <v-card
    max-width="344"
    class="
    pa-md-4 mx-lg-auto"
  >
    <v-img
      src="../../assets/team/arya.jpg"
      height="200px"
    ></v-img>

    <v-card-title>
      Arya Krisna
    </v-card-title>

    <v-card-subtitle style="text-align: left;">
      Bakul Remahan Peyek
    </v-card-subtitle>

    <v-card-actions>
      <v-btn href="https://www.instagram.com/aryakrisna_04/">Instagram</v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show5">
        <v-divider></v-divider>

        <v-card-text>
          I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</div>
</div>
</template>


<script>
  export default {
    data: () => ({
      show: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
    })
  }
</script>