resource "huaweicloud_evs_volume" "eva_large_volume" {
  count              = length(huaweicloud_compute_instance.eva_large_test)

  name               = "eva_large_volume_${count.index}"
  size               = 100  # Büyük hacim (GB)
  availability_zone  = data.huaweicloud_availability_zones.eva_az.names[0]
  volume_type        = "SSD"
}

resource "huaweicloud_compute_volume_attach" "eva_attach_large_volume" {
  count       = length(huaweicloud_compute_instance.eva_large_test)

  instance_id = huaweicloud_compute_instance.eva_large_test[count.index].id
  volume_id   = huaweicloud_evs_volume.eva_large_volume[count.index].id
}
