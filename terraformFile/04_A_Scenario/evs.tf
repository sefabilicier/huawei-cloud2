resource "huaweicloud_evs_volume" "low_volume" {
  count             = length(huaweicloud_compute_instance.low_instance)
  name              = "low-volume-${count.index}"
  size              = 10
  availability_zone = data.huaweicloud_availability_zones.low_az.names[0]
  volume_type       = "SSD"
}

resource "huaweicloud_compute_volume_attach" "low_attached" {
  count       = length(huaweicloud_compute_instance.low_instance)
  instance_id = huaweicloud_compute_instance.low_instance[count.index].id
  volume_id   = huaweicloud_evs_volume.low_volume[count.index].id
}
