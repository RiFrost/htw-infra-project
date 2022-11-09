<template>
    <div>
        <h3>This is only visible to logged-in User</h3>
        <p>{{ email }}</p>
        <p>{{ phone }}</p>
    </div>
</template>
<script>
import { Auth } from 'aws-amplify'
import { ref } from 'vue'

export default {
    setup() {
        const email = ref('')
        const phone = ref('')

        const userInfo = Auth.currentUserInfo().then((userInfo) => {
            const { attributes = {} } = userInfo;
            email.value = attributes['email']
            phone.value = attributes['phone_number']
        })

        return {
            email,
            phone
        }
    }
}
</script>
<style>

</style>