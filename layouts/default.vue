<template>
    <div>
        <slot />
    </div>
</template>

<script setup>
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("ServiceWorker/index.js")
        .then(registration => {
          registration.update();
        })
        .catch(error => {
          console.error("Service worker registration failed:", error);
        });
    }
</script>