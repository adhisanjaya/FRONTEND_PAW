<template>
  <v-app>
    <v-app-bar app>
      <img src="../assets/logo.png" style="height:45px;width:45px">
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-toolbar-title class="headline text-uppercase">
        <span>Healthy Consultant</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text router to="/">Home</v-btn>
        <v-btn text router to="/about_us">About us</v-btn>
        <v-btn text router to="/gallery">Gallery</v-btn>
        <v-btn text router to="/contact">Contact Us</v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <VContent>
      <router-view />
    </VContent>
  </v-app>
</template>
