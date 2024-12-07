data "huaweicloud_compute_flavors" "spot_flavor" {
  availability_zone = data.huaweicloud_availability_zones.example_zones.names[0]
  performance_type  = "normal"
  cpu_core_count    = 2
  memory_size       = 4
}


data "huaweicloud_images_image" "spot_image" {
  name        = "Ubuntu 18.04 server 64bit"
  most_recent = true
}


data "huaweicloud_availability_zones" "example_zones" {}


resource "huaweicloud_networking_secgroup" "example_secgroup" {
  name = "example_security_group"
}


resource "huaweicloud_compute_instance" "spot_instance" {
  name               = "spot_instance_${count.index}"
  flavor_id          = data.huaweicloud_compute_flavors.spot_flavor.ids[0]
  image_id           = data.huaweicloud_images_image.spot_image.id
  availability_zone  = data.huaweicloud_availability_zones.example_zones.names[0]
  security_group_ids = [huaweicloud_networking_secgroup.example_secgroup.id]

  network {
    uuid = huaweicloud_vpc_subnet.example_subnet.id
  }

  count = 2
}
