<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import { notify, notifier, Notification } from "@/util/notifications"
import { EventBus, BusEvent } from "@/util/eventBus"

@Component({
  components: {},
})
export default class Notify extends Vue {
  notifications: Notification[] = []

  mounted() {
    EventBus.$on(BusEvent.notification, (notifications: Notification[]) => {
      this.notifications = notifications
    })
  }

  notificationClass(notification: Notification) {
    const notificationClassType = `notification-${notification.type}`
    return `notification ${notificationClassType}`
  }

  close(id: string) {
    notifier.remove(id)
  }
}
</script>

<template>
  <div class="notifications">
    <div
      v-for="(notification, index) in notifications"
      :key="'notification' + index"
      :class="notificationClass(notification)"
    >
      <span class="message">
        {{ notification.type }}: {{ notification.message }}
      </span>
      <button class="message-button" @click="close(notification.id)">X</button>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

.notifications {
  position: absolute;
  top: 10vh;
  z-index: @z-notifications;
  width: 100%;
}

.notification {
  display: flex;
  align-items: baseline;

  background: gray;
  margin: 1rem 0;
  padding: 1rem;
}

.notification-warning {
  background: orange;
}

.notification-info {
  background: gray;
}

.notification-error {
  background: red;
}

.message {
  flex-grow: 1;
  display: inline-block;
  text-align: left;
}

.message-button {
}
</style>
