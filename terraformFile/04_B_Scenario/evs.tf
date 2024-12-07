resource "huaweicloud_evs_volume" "medium_volume" {
  count              = length(huaweicloud_compute_instance.app_instance)

  name               = "medium_volume_${count.index}"
  size               = 50  
  availability_zone  = data.huaweicloud_availability_zones.az_info.names[0]
  volume_type        = "SSD"
}

resource "huaweicloud_compute_volume_attach" "attach_medium_volume" {
  count       = length(huaweicloud_compute_instance.app_instance)

  instance_id = huaweicloud_compute_instance.app_instance[count.index].id
  volume_id   = huaweicloud_evs_volume.medium_volume[count.index].id
}
