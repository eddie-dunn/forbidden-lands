<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import { notify, notifier, Notification } from "@/util/notifications"
import { EventBus, BusEvent } from "@/util/eventBus"
import FLButton from "@/components/base/FLButton.vue"
import SvgIcon from "@/components/SvgIcon.vue"

@Component({
  components: {
    FLButton,
    SvgIcon,
  },
})
export default class Notify extends Vue {
  notifications: Notification[] = []

  mounted() {
    EventBus.$on(BusEvent.notification, (notifications: Notification[]) => {
      this.notifications = notifications
    })
  }

  notificationClass(notification: Notification) {
    return `notification-${notification.type}`
  }

  colorClass(notification: Notification) {
    return `color-${notification.type}`
  }

  close(id: string) {
    notifier.remove(id)
  }

  icon(notification: Notification) {
    return `alert-${notification.type}`
  }
  closeSymbol(notification: Notification) {
    if (notification.displayTime) {
      return "check"
    }
    return "close"
  }
}
</script>

<template>
  <div class="notifications">
    <div
      v-for="(notification, index) in notifications"
      :key="'notification' + index"
      :class="['notification', notificationClass(notification)]"
    >
      <span class="message">
        <SvgIcon
          :name="icon(notification)"
          title="Close"
          :class="colorClass(notification)"
        />
        {{ notification.message }}
      </span>
      <FLButton
        type="cancel"
        :class="['message-button', colorClass(notification)]"
        @click="close(notification.id)"
      >
        <SvgIcon :name="closeSymbol(notification)" title="Close" />
      </FLButton>
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
  margin: 0.5rem;
  padding: 1rem;
  background: @color-background;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}

.notification-warning {
  border: 2px solid @color-warning;
}

.notification-info {
  border: 2px solid @color-main;
}

.notification-error {
  border: 2px solid @color-danger;
}

.message {
  flex-grow: 1;
  display: inline-block;
  text-align: left;
}

.message-button {
  padding: 2px;
  border: none;
  box-shadow: none;
}

.color {
  &-warning {
    color: @color-warning;
  }
  &-error {
    color: @color-danger;
  }
  &-info {
    color: @color-main;
  }
}
</style>
