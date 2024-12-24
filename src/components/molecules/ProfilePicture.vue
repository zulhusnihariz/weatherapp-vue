<script setup lang="ts">
import defaultProfilePicture from '@/assets/default_pp.png'
import useProfile from '@/store/profile'
import { Base64 } from 'js-base64'
import { onMounted, useTemplateRef } from 'vue'
import UploadImageIcon from '../icons/UploadImageIcon.vue'

const fileupload = useTemplateRef<HTMLInputElement>('file-uploader')
const profilePicture = useTemplateRef<HTMLImageElement>('profile-picture')

const { profile, setProfile } = useProfile()

function isValidBase64(imageUrl: string) {
  let [_, excludeImageTag] = imageUrl.split(';')
  let [__, b64] = excludeImageTag.split(',')[1]
  return Base64.isValid(b64)
}

function upload() {
  fileupload.value!.click()
}

function onChange(event: Event) {
  let target = event.target as HTMLInputElement

  if (!target.files || target.files.length <= 0) {
    return
  }

  const file = target.files[0]
  const FIVE_MB = 5 * 1024 * 1024

  if (file.size > FIVE_MB) {
    return
  }

  const reader = new FileReader()

  reader.addEventListener('load', () => {
    if (profilePicture.value) {
      profilePicture.value.src = reader.result as string
      setProfile({ imageBase64: reader.result as string })
    }
  })

  reader.readAsDataURL(file)
}

onMounted(() => {
  if (!profilePicture.value) {
    return
  }

  if (profile.value.imageBase64 === '' || !isValidBase64(profile.value.imageBase64)) {
    profilePicture.value.src = defaultProfilePicture
    return
  }

  profilePicture.value.src = profile.value.imageBase64
})
</script>

<template>
  <section style="position: relative">
    <input ref="file-uploader" type="file" @change="(e) => onChange(e)" accept="image/*" hidden />
    <Button aria-label="Save" class="upload" @click="upload" unstyled>
      <UploadImageIcon />
    </Button>
    <img
      ref="profile-picture"
      :src="defaultProfilePicture"
      alt="profile picture"
      width="120"
      height="120"
      style="border-radius: 50%; object-fit: cover"
    />
  </section>
</template>
<style>
.bg {
  position: absolute;
  width: 350px;
  height: 350px;
  background-color: lightblue;
  clip-path: ellipse(50% 50% at 50% 50%);
  transform: translateX(180);
  z-index: -1;
}
.upload {
  position: absolute;
  bottom: 0;
  right: 0;
  border-radius: 50%;
  z-index: 3;

  box-sizing: border-box;
  width: 46px;
  height: 46px;

  background: #f5f5f5;
  border: 5px solid #ffffff;
  outline: none;
}
</style>
