resource "huaweicloud_evs_volume" "myevs" {
  count              = length(huaweicloud_compute_instance.mytest)

  name               = "myvolume_${count.index}"
  size               = 10
  availability_zone  = data.huaweicloud_availability_zones.testaz.names[0]
  volume_type        = "SATA"
}



resource "huaweicloud_compute_volume_attach" "attached" {


  count       = length(huaweicloud_compute_instance.mytest)

  instance_id = huaweicloud_compute_instance.mytest[count.index].id
  volume_id   = huaweicloud_evs_volume.myevs[count.index].id

}