<template>
    <div class="header">
        <div class="logo">
            <img src="@/assets/logo.svg" />
        </div>
        <div class="profile">
            <img src="@/assets/user.svg"/>
        </div>
    </div>
</template>

<script>
export default {
    name: "page-header"
}
</script>

<style lang="scss">
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    padding: 4px 20px;
    background-color: #ffffff;
    border-bottom: 1px solid #e2e2e2;
    margin-bottom: 30px;

    .profile {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #e2e2e2;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>