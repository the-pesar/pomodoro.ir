<script lang="ts" setup></script>

<template>
  <nav class="flex justify-between pt-6 px-3 md:px-6">
    <div class="flex">
      <GlassButton class="p-3" disabled>
        <img src="@/assets/icons/person.svg" alt="person" />
        <span class="text-white mx-2 hidden md:inline">پروفایل</span>
      </GlassButton>
      <GlassButton class="p-3 mr-3" disabled>
        <img src="@/assets/icons/activity.svg" alt="activity" />
        <span class="text-white mx-2 hidden md:inline">تاریخچه</span>
      </GlassButton>
      <GlassButton class="p-3 mr-3" disabled>
        <img src="@/assets/icons/people-fill.svg" alt="cloud" />
        <span class="text-white mx-2 hidden md:inline">لیست کاربران</span>
      </GlassButton>
    </div>
    <div class="flex">
      <GlassButton class="p-3 ml-3" disabled>
        <img src="@/assets/icons/language.svg" alt="language" />
      </GlassButton>
      <GlassButton class="p-3" disabled>
        <img src="@/assets/icons/settings.svg" alt="settings" />
      </GlassButton>
    </div>
  </nav>
</template>
