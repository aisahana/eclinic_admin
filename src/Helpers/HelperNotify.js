export default {
  methods: {
    confirmDestroy (subject) {
      const config = {
        title: 'Please Confirm',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'YES',
        cancelTitle: 'NO',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      }
      const message = `Please confirm that you want to delete ${subject}.`
      return this.$bvModal.msgBoxConfirm(message, config)
    },
    confirmAnything (message) {
      const config = {
        title: 'Tolong Konfirmasi',
        size: 'lg',
        buttonSize: 'sm',
        okVariant: 'warning',
        okTitle: 'YES',
        cancelTitle: 'NO',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      }
      return this.$bvModal.msgBoxConfirm(message, config)
    },
    toastWarning (message) {
      if (!message) {
        message = `You cannot take this action because there are some rules regarding the policy regarding it!`
      }
      this.$bvToast.toast(message, {
        title: `Warning!`,
        toaster: 'b-toaster-top-right',
        solid: true,
        variant: 'warning',
        appendToast: true
      })
    },
    toastPublish (message) {
      if (!message) {
        message = `You have successfully published.`
      }
      this.$bvToast.toast(message, {
        title: `Success!`,
        toaster: 'b-toaster-top-right',
        solid: true,
        variant: 'success',
        appendToast: true,
        autoHideDelay: 10
      })
    },
    toastUpdate (message) {
      if (!message) {
        message = `Updating Data...`
      }
      this.$bvToast.toast(message, {
        toaster: 'b-toaster-top-left',
        solid: true,
        variant: 'light',
        noCloseButton: true,
        noFade: true,
        appendToast: true,
        autoHideDelay: 10
      })
    }
  }
}
