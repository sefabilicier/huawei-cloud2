resource "huaweicloud_evs_volume" "example_small_volume" {
  count              = length(huaweicloud_compute_instance.example_small_instance)

  name               = "example_small_volume_${count.index}"
  size               = 10  # Küçük hacim (GB)
  availability_zone  = data.huaweicloud_availability_zones.example_az.names[0]
  volume_type        = "SSD"
}

resource "huaweicloud_compute_volume_attach" "example_attach_small_volume" {
  count       = length(huaweicloud_compute_instance.example_small_instance)

  instance_id = huaweicloud_compute_instance.example_small_instance[count.index].id
  volume_id   = huaweicloud_evs_volume.example_small_volume[count.index].id
}
